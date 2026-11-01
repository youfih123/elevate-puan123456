
export default function PageShell({ children }) {
  return (
    <main className="elevate-bg">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-7">
        {children}
      </div>

      <footer className="pb-8 text-center font-serif italic text-purple-800">
        Better Decisions, Bigger Dreams ✦
      </footer>
    </main>
  );
}
