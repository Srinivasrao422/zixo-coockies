import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground font-serif text-xl">
              J
            </span>
            <span className="font-serif text-xl">Jigsaw Cookies</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Small-batch cookies baked the morning they ship. Delivered nationwide in
            two days or fewer.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
            Shop
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-foreground">All cookies</Link></li>
            <li><Link to="/shop" className="hover:text-foreground">Bestsellers</Link></li>
            <li><Link to="/shop" className="hover:text-foreground">Gift boxes</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
            Company
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/reviews" className="hover:text-foreground">Reviews</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
            Visit
          </h4>
          <p className="mt-4 text-sm text-muted-foreground">
            218 Baker Street<br />
            Brooklyn, NY 11201<br />
            Mon–Sat · 8am–7pm
          </p>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Jigsaw Cookies Co. Baked fresh, shipped warm.</p>
          <p>Made with butter, sugar, and a little obsession.</p>
        </div>
      </div>
    </footer>
  );
}
