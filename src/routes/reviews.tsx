import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";
import { ReviewCard } from "@/components/site/ReviewCard";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer reviews — Jigsaw Cookies" },
      { name: "description", content: "Real reviews from Jigsaw Cookies customers across the country." },
      { property: "og:title", content: "Reviews — Jigsaw Cookies" },
      { property: "og:description", content: "Real reviews from real customers." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">
          Word of mouth
        </p>
        <h1 className="mt-2 font-serif text-5xl leading-tight tracking-tight">
          {avg}★ from 12,400+ reviews
        </h1>
        <div className="mt-4 flex items-center gap-1 text-accent">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5" fill="currentColor" stroke="currentColor" />
          ))}
        </div>
        <p className="mt-4 text-lg text-muted-foreground">
          We only ship cookies we'd be proud to give our grandmothers. Here's
          what our customers have been saying.
        </p>
      </header>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <ReviewCard key={r.name} review={r} />
        ))}
      </div>
    </section>
  );
}
