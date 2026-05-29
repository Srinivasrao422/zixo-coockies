import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthCard } from "@/components/site/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, MailCheck } from "lucide-react";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone = (v: string) => /^\+?[0-9 ()-]{7,}$/.test(v);

const schema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Enter your email or phone")
    .refine((v) => isEmail(v) || isPhone(v), "Use a valid email or phone"),
});

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot password — Jigsaw Cookies" },
      { name: "description", content: "Reset your Jigsaw Cookies password via a one-time code." },
    ],
  }),
  component: ForgotPage,
});

function ForgotPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ identifier });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError(null);
    setLoading(true);
    const id = parsed.data.identifier;
    const channel: "email" | "sms" = isEmail(id) ? "email" : "sms";
    const { error } = isEmail(id)
      ? await supabase.auth.signInWithOtp({ email: id })
      : await supabase.auth.signInWithOtp({ phone: id.replace(/[^\d+]/g, "") });

    setLoading(false);
    if (error) {
      toast.error("Couldn't send code", { description: error.message });
      return;
    }
    setSent(true);
    sessionStorage.setItem("jc-otp-identifier", id);
    sessionStorage.setItem("jc-otp-channel", channel);
    setTimeout(() => {
      navigate({ to: "/verify-otp" });
    }, 1200);
  };

  return (
    <AuthCard
      title="Forgot password?"
      subtitle="We'll send you a 6-digit code to reset it."
      footer={
        <>
          Remembered it?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Back to sign in
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="space-y-4 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
            <MailCheck className="h-7 w-7" />
          </div>
          <p className="text-sm text-muted-foreground">
            We've sent a 6-digit code to <span className="font-medium text-foreground">{identifier}</span>.
            Redirecting…
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="identifier">Email or phone</Label>
            <Input
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="you@example.com"
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Send OTP
          </Button>
        </form>
      )}
    </AuthCard>
  );
}
