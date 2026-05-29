import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Jigsaw Cookies" },
      { name: "description", content: "Get in touch with the Jigsaw Cookies team about orders, events, or wholesale." },
      { property: "og:title", content: "Contact — Jigsaw Cookies" },
      { property: "og:description", content: "Get in touch with the Jigsaw team." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().min(1, "Required").max(150),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

type Form = z.infer<typeof schema>;

function ContactPage() {
  const [form, setForm] = useState<Form>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const upd = <K extends keyof Form>(k: K, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Partial<Record<keyof Form, string>> = {};
      for (const issue of result.error.issues) errs[issue.path[0] as keyof Form] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    toast.success("Message sent — we'll reply within one business day.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Say hello</p>
        <h1 className="mt-2 font-serif text-5xl leading-tight tracking-tight">
          Questions, custom orders, or just want to chat about cookies?
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We read every message and reply within one business day.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
        <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={(e) => upd("name", e.target.value)} className="mt-1.5" aria-invalid={!!errors.name} />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => upd("email", e.target.value)} className="mt-1.5" aria-invalid={!!errors.email} />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={form.subject} onChange={(e) => upd("subject", e.target.value)} className="mt-1.5" aria-invalid={!!errors.subject} />
              {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={6} value={form.message} onChange={(e) => upd("message", e.target.value)} className="mt-1.5" aria-invalid={!!errors.message} />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>
          </div>
          <Button type="submit" size="lg" className="mt-6 rounded-full px-8">
            Send message
          </Button>
        </form>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl">Visit the bakery</h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>218 Baker Street<br />Brooklyn, NY 11201</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+17185550199" className="hover:text-primary">(718) 555-0199</a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:hello@jigsawcookies.com" className="hover:text-primary">hello@jigsawcookies.com</a>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl">Hours</h2>
            <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
              <li className="flex justify-between"><span>Mon – Fri</span><span>8am – 7pm</span></li>
              <li className="flex justify-between"><span>Saturday</span><span>9am – 6pm</span></li>
              <li className="flex justify-between"><span>Sunday</span><span>Closed</span></li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-accent/30 p-6">
            <h2 className="font-serif text-xl">Wholesale & events</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Catering 50+ cookies for a wedding, office, or pop-up? Mention it in
              your note and we'll send our event menu.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
