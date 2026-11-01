import PublicHeader from "@/components/landing/PublicHeader";

export default function PublicLayout({ children }) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
    </>
  );
}