export default function InsightBox({ text, variant = "info" }) {
  const styles = {
    info: "bg-[#F0F7E8] border-green-primary/40 text-green-dark",
    warning: "bg-[#FFFBEB] border-amber-400/50 text-amber-900",
    note: "bg-blue-50 border-blue-300 text-blue-900",
  };

  return (
    <div className={`rounded-lg border p-4 text-[14px] leading-relaxed ${styles[variant]}`}>
      {text}
    </div>
  );
}
