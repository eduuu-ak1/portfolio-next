export default function AutomationGraphFallback() {
  return (
    <svg viewBox="0 0 440 300" className="h-full w-full" aria-hidden="true">
      <path
        d="M 40,150 C 100,80 180,80 230,150 S 340,220 400,150"
        stroke="var(--wire)"
        strokeWidth="1"
        fill="none"
        opacity="0.35"
      />
      <path
        d="M 40,150 C 90,220 160,230 210,180"
        stroke="var(--wire)"
        strokeWidth="1"
        fill="none"
        opacity="0.35"
      />
      <path
        d="M 230,150 C 260,90 320,70 360,90"
        stroke="var(--wire)"
        strokeWidth="1"
        fill="none"
        opacity="0.35"
      />
      <circle cx="40" cy="150" r="7" fill="var(--bg-alt-2)" stroke="var(--wire)" strokeWidth="1.5" />
      <circle cx="230" cy="150" r="8" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1.5" />
      <circle cx="400" cy="150" r="7" fill="var(--bg-alt-2)" stroke="var(--wire)" strokeWidth="1.5" />
      <circle cx="210" cy="180" r="6" fill="var(--bg-alt-2)" stroke="var(--wire)" strokeWidth="1.5" />
      <circle cx="360" cy="90" r="6" fill="var(--bg-alt-2)" stroke="var(--wire)" strokeWidth="1.5" />
    </svg>
  );
}
