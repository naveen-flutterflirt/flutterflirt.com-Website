type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function Button({
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors";

  const variantClasses =
    variant === "primary"
      ? "bg-slate-900 text-white hover:bg-slate-800"
      : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50";

  return <button className={`${baseClasses} ${variantClasses} ${className}`}>{children}</button>;
}
