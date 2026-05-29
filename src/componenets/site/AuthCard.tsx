import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Cookie } from "lucide-react";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent/30 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col items-center justify-center px-4 py-12">
        <Link to="/" className="mb-8 flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Cookie className="h-5 w-5" />
          </span>
          <span className="font-serif text-2xl tracking-tight text-foreground">
            Jigsaw Cookies
          </span>
        </Link>

        <div className="w-full rounded-3xl border border-border/60 bg-card/70 p-8 shadow-2xl shadow-primary/5 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60">
          <div className="mb-6 text-center">
            <h1 className="font-serif text-3xl text-foreground">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {children}
        </div>

        {footer && (
          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        )}
      </div>
    </div>
  );
}
