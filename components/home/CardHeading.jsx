export default function CardHeading({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2.5 text-[15px] font-extrabold text-ink-title">
      <span className="flex size-8.5 items-center justify-center rounded-xl bg-lav-pale text-brand-deep">
        <Icon className="size-4.5" />
      </span>
      {title}
    </div>
  );
}