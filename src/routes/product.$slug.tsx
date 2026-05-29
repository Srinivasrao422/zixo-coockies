import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Truck } from "lucide-react";
import { toast } from "sonner";
import { cookies, getCookie } from "@/data/cookies";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/site/QuantityStepper";
import { CookieCard } from "@/components/site/CookieCard";
import { cart } from "@/lib/cart-store";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const cookie = getCookie(params.slug);
    if (!cookie) throw notFound();
    return { cookie };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.cookie;
    if (!c) return { meta: [{ title: "Cookie — Jigsaw" }] };
    return {
      meta: [
        { title: `${c.name} — Jigsaw Cookies` },
        { name: "description", content: c.description },
        { property: "og:title", content: `${c.name} — Jigsaw Cookies` },
        { property: "og:description", content: c.description },
        { property: "og:image", content: c.image },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-serif text-3xl">Cookie not found</h1>
      <p className="mt-2 text-muted-foreground">
        That flavor must be out of the oven.
      </p>
      <Button asChild className="mt-6 rounded-full">
        <Link to="/shop">Back to shop</Link>
      </Button>
    </div>
  ),
});

function ProductPage() {
  const { cookie } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const related = cookies.filter((c) => c.slug !== cookie.slug).slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All cookies
        </Link>
        <div className="mt-6 grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-accent/25 blur-2xl" />
            <img
              src={cookie.image}
              alt={cookie.name}
              width={800}
              height={800}
              className="aspect-square w-full rounded-3xl object-cover"
            />
          </div>
          <div>
            <span className="inline-flex rounded-full bg-accent/40 px-3 py-1 text-xs font-medium uppercase tracking-wider">
              {cookie.tag}
            </span>
            <h1 className="mt-4 font-serif text-5xl leading-tight tracking-tight">
              {cookie.name}
            </h1>
            <p className="mt-2 text-2xl font-medium text-primary">
              ${cookie.price.toFixed(2)}
            </p>
            <p className="mt-6 text-lg text-muted-foreground">
              {cookie.description}
            </p>

            <ul className="mt-8 space-y-2 text-sm">
              {[
                "Baked the morning your box ships",
                "Hand-packed in our kraft signature box",
                "Stays fresh up to 10 days at room temp",
              ].map((line) => (
                <li key={line} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <QuantityStepper value={qty} onChange={setQty} />
              <Button
                size="lg"
                className="rounded-full px-8"
                onClick={() => {
                  cart.add(cookie, qty);
                  toast.success(`Added ${qty} × ${cookie.name}`);
                }}
              >
                Add to box · ${(cookie.price * qty).toFixed(2)}
              </Button>
            </div>

            <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4" /> Free shipping on orders over $35
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl tracking-tight">You might also like</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((c) => (
            <CookieCard key={c.slug} cookie={c} />
          ))}
        </div>
      </section>
    </>
  );
}
