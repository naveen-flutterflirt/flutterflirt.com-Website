type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-black tracking-[-0.05em] text-slate-900 md:text-5xl">
        {title}
      </h2>
    </div>
  );
}
