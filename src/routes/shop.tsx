import { createFileRoute } from "@tanstack/react-router";
import { cookies } from "@/data/cookies";
import { CookieCard } from "@/components/site/CookieCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop all cookies — Jigsaw Cookies" },
      {
        name: "description",
        content:
          "Browse all eight Jigsaw cookie flavors. Small-batch, baked to order, delivered nationwide.",
      },
      { property: "og:title", content: "Shop — Jigsaw Cookies" },
      {
        property: "og:description",
        content: "Browse all eight Jigsaw cookie flavors.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">
          The whole menu
        </p>
        <h1 className="mt-2 font-serif text-5xl leading-tight tracking-tight">
          Every cookie we bake.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Eight flavors, baked fresh the day they ship. Mix and match — free
          shipping on boxes over $35.
        </p>
      </header>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cookies.map((c) => (
          <CookieCard key={c.slug} cookie={c} />
        ))}
      </div>
    </section>
  );
}
