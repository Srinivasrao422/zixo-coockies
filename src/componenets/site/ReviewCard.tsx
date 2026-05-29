import { Star } from "lucide-react";
import type { Review } from "@/data/reviews";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6">
      <div className="flex items-center gap-0.5 text-accent">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4"
            fill={i < review.rating ? "currentColor" : "transparent"}
            stroke="currentColor"
          />
        ))}
      </div>
      <h3 className="mt-3 font-serif text-lg leading-snug">{review.title}</h3>
      <blockquote className="mt-2 text-sm text-muted-foreground">
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-5 text-sm">
        <span className="font-medium text-foreground">{review.name}</span>
        <span className="text-muted-foreground"> · {review.city}</span>
      </figcaption>
    </figure>
  );
}
