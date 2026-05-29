import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cart, useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Jigsaw Cookies" },
      { name: "description", content: "Securely place your Jigsaw Cookies order." },
      { property: "og:title", content: "Checkout — Jigsaw Cookies" },
      { property: "og:description", content: "Securely place your order." },
    ],
  }),
  component: CheckoutPage,
});

const contactSchema = z.object({
  fullName: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Required").max(20),
});

const deliverySchema = z.object({
  address: z.string().trim().min(1, "Required").max(200),
  city: z.string().trim().min(1, "Required").max(100),
  state: z.string().trim().min(2, "Required").max(50),
  zip: z.string().trim().min(3, "Required").max(12),
});

const paymentSchema = z.object({
  cardName: z.string().trim().min(1, "Required").max(100),
  cardNumber: z.string().trim().regex(/^[0-9 ]{12,23}$/, "Invalid card number"),
  exp: z.string().trim().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY"),
  cvc: z.string().trim().regex(/^\d{3,4}$/, "3–4 digits"),
});

type FormState = {
  fullName: string; email: string; phone: string;
  address: string; city: string; state: string; zip: string;
  cardName: string; cardNumber: string; exp: string; cvc: string;
};

const steps = ["Contact", "Delivery", "Payment"] as const;

function CheckoutPage() {
  const { items, subtotal, shipping, tax, total } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [data, setData] = useState<FormState>({
    fullName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "",
    cardName: "", cardNumber: "", exp: "", cvc: "",
  });

  const update = <K extends keyof FormState>(k: K, v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  if (done) {
    return (
      <section className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-7 w-7" />
        </div>
        <h1 className="mt-6 font-serif text-4xl">Order placed!</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you, {data.fullName.split(" ")[0]}. We'll email a confirmation
          to <span className="text-foreground">{data.email}</span>. Your box
          ships tomorrow morning.
        </p>
        <Button asChild size="lg" className="mt-8 rounded-full px-8">
          <Link to="/shop">Continue shopping</Link>
        </Button>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-serif text-3xl">Your box is empty</h1>
        <p className="mt-2 text-muted-foreground">Add a few cookies first.</p>
        <Button asChild size="lg" className="mt-6 rounded-full">
          <Link to="/shop">Browse cookies</Link>
        </Button>
      </section>
    );
  }

  const validateStep = (): boolean => {
    const schema =
      step === 0 ? contactSchema : step === 1 ? deliverySchema : paymentSchema;
    const result = schema.safeParse(data);
    if (!result.success) {
      const e: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        e[issue.path[0] as keyof FormState] = issue.message;
      }
      setErrors(e);
      return false;
    }
    setErrors({});
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < 2) {
      setStep((s) => s + 1);
    } else {
      cart.clear();
      setDone(true);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/cart"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to cart
      </Link>
      <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">Checkout</h1>

      {/* Stepper */}
      <ol className="mt-8 flex items-center gap-2 sm:gap-4">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-medium ${
                i < step
                  ? "bg-primary text-primary-foreground"
                  : i === step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span
              className={`hidden text-sm sm:inline ${
                i === step ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <span className="ml-2 h-px flex-1 bg-border" />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" id="fullName" value={data.fullName} onChange={(v) => update("fullName", v)} error={errors.fullName} className="sm:col-span-2" />
              <Field label="Email" id="email" type="email" value={data.email} onChange={(v) => update("email", v)} error={errors.email} />
              <Field label="Phone" id="phone" value={data.phone} onChange={(v) => update("phone", v)} error={errors.phone} />
            </div>
          )}
          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Street address" id="address" value={data.address} onChange={(v) => update("address", v)} error={errors.address} className="sm:col-span-2" />
              <Field label="City" id="city" value={data.city} onChange={(v) => update("city", v)} error={errors.city} />
              <Field label="State" id="state" value={data.state} onChange={(v) => update("state", v)} error={errors.state} />
              <Field label="ZIP" id="zip" value={data.zip} onChange={(v) => update("zip", v)} error={errors.zip} />
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name on card" id="cardName" value={data.cardName} onChange={(v) => update("cardName", v)} error={errors.cardName} className="sm:col-span-2" />
              <Field label="Card number" id="cardNumber" placeholder="4242 4242 4242 4242" value={data.cardNumber} onChange={(v) => update("cardNumber", v)} error={errors.cardNumber} className="sm:col-span-2" />
              <Field label="Expiration (MM/YY)" id="exp" placeholder="08/28" value={data.exp} onChange={(v) => update("exp", v)} error={errors.exp} />
              <Field label="CVC" id="cvc" value={data.cvc} onChange={(v) => update("cvc", v)} error={errors.cvc} />
              <p className="sm:col-span-2 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" /> Demo checkout — no real card is charged.
              </p>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            {step > 0 ? (
              <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
            ) : (
              <button
                onClick={() => navigate({ to: "/cart" })}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
            )}
            <Button onClick={next} size="lg" className="rounded-full px-6">
              {step < 2 ? (
                <>Continue <ArrowRight className="ml-1 h-4 w-4" /></>
              ) : (
                <>Place order · ${total.toFixed(2)}</>
              )}
            </Button>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl">Order summary</h2>
          <ul className="mt-4 divide-y divide-border">
            {items.map((i) => (
              <li key={i.slug} className="flex gap-3 py-3">
                <img src={i.image} alt={i.name} width={56} height={56} loading="lazy" className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex flex-1 flex-col text-sm">
                  <span className="line-clamp-1">{i.name}</span>
                  <span className="text-muted-foreground">Qty {i.qty}</span>
                </div>
                <span className="text-sm tabular-nums">${(i.price * i.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="tabular-nums">${subtotal.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="tabular-nums">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Tax</dt><dd className="tabular-nums">${tax.toFixed(2)}</dd></div>
            <div className="mt-2 flex justify-between border-t border-border pt-3 text-base font-medium"><dt>Total</dt><dd className="tabular-nums">${total.toFixed(2)}</dd></div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

function Field({
  label, id, value, onChange, error, type = "text", placeholder, className,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5"
        aria-invalid={!!error}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
