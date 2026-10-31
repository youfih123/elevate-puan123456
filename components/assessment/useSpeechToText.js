import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSupported = () =>
  Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
const getServerSupported = () => false;

export default function useSpeechToText({ lang = "id-ID", onFinalText, onError }) {
  const supported = useSyncExternalStore(subscribe, getSupported, getServerSupported);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");

  const recognitionRef = useRef(null);
  const onFinalRef = useRef(onFinalText);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onFinalRef.current = onFinalText;
    onErrorRef.current = onError;
  });

  useEffect(() => {
    return () => recognitionRef.current?.abort();
  }, []);

  const start = useCallback(() => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return;

    const recognition = new Recognition();
    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) finalText += result[0].transcript;
        else interimText += result[0].transcript;
      }
      if (finalText.trim()) onFinalRef.current?.(finalText.trim());
      setInterim(interimText);
    };

    recognition.onerror = (event) => {
      if (event.error !== "aborted") onErrorRef.current?.(event.error);
    };

    recognition.onend = () => {
      setListening(false);
      setInterim("");
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, [lang]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  return { supported, listening, interim, start, stop };
}