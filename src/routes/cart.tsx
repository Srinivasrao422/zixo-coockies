import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/site/QuantityStepper";
import { cart, useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your cart — Jigsaw Cookies" },
      { name: "description", content: "Review your Jigsaw cookie box before checkout." },
      { property: "og:title", content: "Your cart — Jigsaw Cookies" },
      { property: "og:description", content: "Review your box before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, shipping, tax, total } = useCart();

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-muted">
          <ShoppingBag className="h-7 w-7 text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-serif text-4xl">Your box is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Pick a few flavors — your box ships fresh the next morning.
        </p>
        <Button asChild size="lg" className="mt-6 rounded-full px-8">
          <Link to="/shop">Start shopping</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Your box</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
          {items.map((i) => (
            <li key={i.slug} className="flex gap-4 p-4 sm:p-6">
              <img
                src={i.image}
                alt={i.name}
                width={120}
                height={120}
                loading="lazy"
                className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    to="/product/$slug"
                    params={{ slug: i.slug }}
                    className="font-serif text-lg leading-tight hover:text-primary sm:text-xl"
                  >
                    {i.name}
                  </Link>
                  <span className="font-medium tabular-nums">
                    ${(i.price * i.qty).toFixed(2)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  ${i.price.toFixed(2)} each
                </p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <QuantityStepper
                    value={i.qty}
                    onChange={(v) => cart.updateQty(i.slug, v)}
                  />
                  <button
                    onClick={() => cart.remove(i.slug)}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-2xl">Order summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="tabular-nums">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Estimated tax</dt>
              <dd className="tabular-nums">${tax.toFixed(2)}</dd>
            </div>
            <div className="my-3 border-t border-border" />
            <div className="flex justify-between text-base font-medium">
              <dt>Total</dt>
              <dd className="tabular-nums">${total.toFixed(2)}</dd>
            </div>
          </dl>
          {subtotal < 35 && (
            <p className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
              Add ${(35 - subtotal).toFixed(2)} more for free shipping.
            </p>
          )}
          <Button asChild size="lg" className="mt-6 w-full rounded-full">
            <Link to="/checkout">Checkout</Link>
          </Button>
          <Link
            to="/shop"
            className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}
