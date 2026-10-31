import Navbar from "@/components/Navbar";

export default function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl p-4">{children}</main>
    </>
  );
}