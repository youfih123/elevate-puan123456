import Link from "next/link";

const styles = {
  primary: "bg-brand text-white shadow-sm hover:bg-brand/90",
  ghost: "text-brand hover:bg-brand-soft",
  sun: "bg-sun text-ink-title shadow-sm hover:bg-sun/90",
};

export default function CtaLink({ href, children, variant = "primary" }) {
  return (
    <Link
      href={href}
      className={`type-cta inline-flex items-center rounded-full px-5 py-2.5 transition-colors ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}