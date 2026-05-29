import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { Cookie } from "@/data/cookies";
import { Button } from "@/components/ui/button";
import { cart } from "@/lib/cart-store";

export function CookieCard({ cookie }: { cookie: Cookie }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-shadow hover:shadow-[0_20px_50px_-30px_rgba(92,32,24,0.45)]">
      <Link
        to="/product/$slug"
        params={{ slug: cookie.slug }}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        <img
          src={cookie.image}
          alt={cookie.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-xs font-medium backdrop-blur">
          {cookie.tag}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <Link
            to="/product/$slug"
            params={{ slug: cookie.slug }}
            className="font-serif text-xl leading-tight hover:text-primary"
          >
            {cookie.name}
          </Link>
          <span className="shrink-0 font-medium">${cookie.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground">{cookie.short}</p>
        <Button
          onClick={() => {
            cart.add(cookie);
            toast.success(`Added ${cookie.name} to cart`);
          }}
          className="mt-auto"
          variant="secondary"
        >
          <Plus className="mr-1 h-4 w-4" /> Add to box
        </Button>
      </div>
    </article>
  );
}
