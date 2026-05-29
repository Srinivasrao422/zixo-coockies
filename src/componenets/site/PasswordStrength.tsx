export function scorePassword(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 4);
}

const LABELS = ["Too weak", "Weak", "Okay", "Strong", "Excellent"];
const COLORS = [
  "bg-destructive",
  "bg-destructive/80",
  "bg-secondary",
  "bg-accent",
  "bg-primary",
];

export function PasswordStrength({ value }: { value: string }) {
  const score = scorePassword(value);
  return (
    <div className="space-y-1.5">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < score ? COLORS[score] : "bg-muted"
            }`}
          />
        ))}
      </div>
      {value && (
        <p className="text-xs text-muted-foreground">
          Strength: <span className="font-medium text-foreground">{LABELS[score]}</span>
        </p>
      )}
    </div>
  );
}
