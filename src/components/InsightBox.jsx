export default function InsightBox({ text, variant = "info" }) {
  const styles = {
    info: "bg-green-50 border-green-primary/30 text-green-dark",
    warning: "bg-amber-50 border-gold/50 text-amber-900",
    note: "bg-blue-50 border-blue-300 text-blue-900",
  };

  return (
    <div className={`rounded-lg border p-4 text-sm leading-relaxed ${styles[variant]}`}>
      {text}
    </div>
  );
}
