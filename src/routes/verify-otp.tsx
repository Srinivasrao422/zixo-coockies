import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthCard } from "@/components/site/AuthCard";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/verify-otp")({
  head: () => ({
    meta: [
      { title: "Verify code — Jigsaw Cookies" },
      { name: "description", content: "Enter the 6-digit verification code we sent you." },
    ],
  }),
  component: VerifyPage,
});

function VerifyPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState<string | null>(null);
  const [channel, setChannel] = useState<"email" | "sms">("email");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(45);

  useEffect(() => {
    const id = sessionStorage.getItem("jc-otp-identifier");
    const ch = sessionStorage.getItem("jc-otp-channel") as "email" | "sms" | null;
    if (!id) {
      navigate({ to: "/forgot-password" });
      return;
    }
    setIdentifier(id);
    if (ch) setChannel(ch);
  }, [navigate]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const verify = async () => {
    if (!identifier || code.length !== 6) return;
    setLoading(true);
    const { error } =
      channel === "email"
        ? await supabase.auth.verifyOtp({ email: identifier, token: code, type: "email" })
        : await supabase.auth.verifyOtp({
            phone: identifier.replace(/[^\d+]/g, ""),
            token: code,
            type: "sms",
          });
    setLoading(false);
    if (error) {
      toast.error("Invalid code", { description: error.message });
      return;
    }
    toast.success("Verified", { description: "Now set a new password." });
    navigate({ to: "/reset-password" });
  };

  const resend = async () => {
    if (!identifier || countdown > 0) return;
    setResending(true);
    const { error } =
      channel === "email"
        ? await supabase.auth.signInWithOtp({ email: identifier })
        : await supabase.auth.signInWithOtp({ phone: identifier.replace(/[^\d+]/g, "") });
    setResending(false);
    if (error) toast.error("Couldn't resend", { description: error.message });
    else {
      toast.success("Code resent");
      setCountdown(45);
    }
  };

  return (
    <AuthCard
      title="Enter verification code"
      subtitle={identifier ? `Sent to ${identifier}` : "Check your inbox"}
      footer={
        <>
          Wrong address?{" "}
          <Link to="/forgot-password" className="font-medium text-primary hover:underline">
            Try again
          </Link>
        </>
      }
    >
      <div className="space-y-6">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={setCode}
            onComplete={verify}
            autoFocus
          >
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button onClick={verify} disabled={loading || code.length !== 6} className="w-full">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Verify
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          {countdown > 0 ? (
            <>Resend code in {countdown}s</>
          ) : (
            <button
              type="button"
              onClick={resend}
              disabled={resending}
              className="font-medium text-primary hover:underline disabled:opacity-50"
            >
              {resending ? "Resending…" : "Resend code"}
            </button>
          )}
        </div>
      </div>
    </AuthCard>
  );
}
