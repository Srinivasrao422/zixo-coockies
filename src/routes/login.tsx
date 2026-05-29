import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthCard } from "@/components/site/AuthCard";
import { PasswordInput } from "@/components/site/PasswordInput";
import { GoogleButton } from "@/components/site/GoogleButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone = (v: string) => /^\+?[0-9 ()-]{7,}$/.test(v);

const schema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Enter your email or phone")
    .refine((v) => isEmail(v) || isPhone(v), "Use a valid email or phone"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s.redirect === "string" ? s.redirect : "/dashboard",
  }),
  head: () => ({
    meta: [
      { title: "Sign in — Jigsaw Cookies" },
      { name: "description", content: "Sign in to your Jigsaw Cookies account to track orders and reorder favorites." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/login" });
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ identifier, password });
    if (!parsed.success) {
      const fe: typeof errors = {};
      for (const i of parsed.error.issues) fe[i.path[0] as keyof typeof errors] = i.message;
      setErrors(fe);
      return;
    }
    setErrors({});
    setLoading(true);
    const id = parsed.data.identifier;
    const { error } = isEmail(id)
      ? await supabase.auth.signInWithPassword({ email: id, password: parsed.data.password })
      : await supabase.auth.signInWithPassword({ phone: id.replace(/[^\d+]/g, ""), password: parsed.data.password });
    setLoading(false);
    if (error) {
      toast.error("Sign in failed", { description: error.message });
      return;
    }
    if (!remember) localStorage.setItem("jc-remember", "false");
    toast.success("Welcome back!");
    navigate({ to: redirect });
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to pick up where you left off."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="identifier">Email or phone</Label>
          <Input
            id="identifier"
            autoComplete="username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="you@example.com"
          />
          {errors.identifier && <p className="text-xs text-destructive">{errors.identifier}</p>}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot?
            </Link>
          </div>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <Checkbox checked={remember} onCheckedChange={(v) => setRemember(v === true)} />
          Remember me on this device
        </label>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Sign in
        </Button>

        <div className="relative py-2 text-center">
          <span className="relative z-10 bg-card/0 px-3 text-xs uppercase tracking-wider text-muted-foreground">
            or
          </span>
          <span className="absolute left-0 right-0 top-1/2 -z-0 h-px bg-border" />
        </div>

        <GoogleButton />

        <p className="pt-2 text-center text-xs text-muted-foreground">
          <Link to="/admin-login" className="hover:text-foreground hover:underline">
            Admin sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
