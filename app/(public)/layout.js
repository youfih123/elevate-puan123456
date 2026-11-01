import PublicHeader from "@/components/landing/PublicHeader";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <PublicHeader />
      <main>
        {children}
        <Footer/>
      </main>
    </>
  );
}