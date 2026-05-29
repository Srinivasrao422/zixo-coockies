import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Leaf, Truck } from "lucide-react";
import { cookies } from "@/data/cookies";
import { reviews } from "@/data/reviews";
import { CookieCard } from "@/components/site/CookieCard";
import { ReviewCard } from "@/components/site/ReviewCard";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";
import storyImg from "@/assets/story.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jigsaw Cookies — Small-batch cookies, delivered warm" },
      {
        name: "description",
        content:
          "Brown-butter cookies with hand-broken chocolate, baked the morning they ship. Free shipping over $35.",
      },
      { property: "og:title", content: "Jigsaw Cookies" },
      {
        property: "og:description",
        content: "Small-batch cookies baked the morning they ship.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = cookies.filter((c) => c.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-2 md:items-center md:gap-16 md:pb-24 md:pt-20 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Baked this morning · Shipped today
            </span>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Cookies worth<br />
              <span className="italic text-primary">solving for.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Brown-butter dough. Hand-broken chocolate. Eight flavors baked in
              small batches and packed warm — delivered to your door in two
              days or fewer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to="/shop">
                  Shop cookies <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <Link to="/reviews">Read reviews</Link>
              </Button>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Flavors</dt>
                <dd className="font-serif text-2xl">8</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Avg. rating</dt>
                <dd className="font-serif text-2xl">4.9★</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Boxes shipped</dt>
                <dd className="font-serif text-2xl">42k+</dd>
              </div>
            </dl>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-accent/30 blur-2xl" />
            <img
              src={heroImg}
              alt="A wooden board piled with salted caramel chocolate cookies"
              width={1600}
              height={1200}
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_30px_80px_-30px_rgba(92,32,24,0.55)]"
            />
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-y border-border/60 bg-muted/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { Icon: Clock, title: "Baked to order", body: "We bake the morning your box ships — never sitting on a shelf." },
            { Icon: Truck, title: "Free delivery $35+", body: "Two-day shipping nationwide, packed to stay fresh and intact." },
            { Icon: Leaf, title: "Real ingredients", body: "European butter, Valrhona chocolate, single-origin vanilla." },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="flex items-start gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-serif text-lg">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              The lineup
            </p>
            <h2 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
              This week's favorites
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden shrink-0 text-sm font-medium text-foreground hover:text-primary sm:inline-flex items-center gap-1"
          >
            See all cookies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((c) => (
            <CookieCard key={c.slug} cookie={c} />
          ))}
        </div>
      </section>

      {/* Story strip */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center md:gap-16 lg:px-8">
          <img
            src={storyImg}
            alt="A baker pulling a tray of cookies from the oven"
            width={1200}
            height={900}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-3xl object-cover"
          />
          <div>
            <p className="text-sm font-medium uppercase tracking-wider opacity-70">
              Our story
            </p>
            <h2 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">
              Started as a Sunday habit.
            </h2>
            <p className="mt-5 text-lg/relaxed opacity-90">
              Jigsaw began in a Brooklyn kitchen with one stand mixer, a notebook
              of recipes, and a stubborn belief that a cookie should feel like
              an event. We still bake every order ourselves — slowly, in small
              batches, the way your grandmother would.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="mt-8 rounded-full bg-background text-foreground hover:bg-background/90"
            >
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews preview */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Word of mouth
            </p>
            <h2 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
              Loved by 12,000 sweet teeth
            </h2>
          </div>
          <Link
            to="/reviews"
            className="hidden shrink-0 text-sm font-medium text-foreground hover:text-primary sm:inline-flex items-center gap-1"
          >
            Read all reviews <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.slice(0, 3).map((r) => (
            <ReviewCard key={r.name} review={r} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-accent/40 px-8 py-16 text-center md:px-16">
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            Build your own box.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Mix and match any eight cookies. Arrives in our signature kraft box,
            tied with twine.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-full px-8">
            <Link to="/shop">Start your box</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
