## Jigsaw Cookies — Frontend Plan

A warm, editorial cookie storefront using the Autumn Harvest palette, DM Serif Display + Fira Sans, and a hero + card-grid layout. Fully responsive, no backend (frontend-only; cart in localStorage).

### Design system (src/styles.css)
- Tokens (oklch): background cream `#fdf8f0`, foreground deep cocoa `#2a1410`, primary burnt sienna `#9b4423`, primary-foreground cream, secondary amber `#d4842a`, accent honey `#e8b84a`, muted warm sand. Dark mode included.
- Radius 1rem (soft, bakery feel). Subtle warm shadows.
- Fonts via Google Fonts: DM Serif Display (headings), Fira Sans (body). Loaded in `__root.tsx` head links.

### Routes (TanStack Start, file-based)
```
src/routes/
  __root.tsx           layout: header (logo, nav, cart icon w/ count), footer, <Outlet/>
  index.tsx            home: hero, featured cookies, story strip, reviews preview, CTA
  shop.tsx             full product grid + category filter
  product.$slug.tsx    product detail + add-to-cart
  cart.tsx             cart line items, qty controls, totals
  checkout.tsx         multi-step form (contact → delivery → payment mock) → confirmation
  reviews.tsx          full customer reviews wall
  contact.tsx          contact form (zod validated) + business info
```
Each route sets its own `head()` meta (title, description, og:*).

### Components
- `components/site/Header.tsx`, `Footer.tsx`, `CookieCard.tsx`, `Hero.tsx`, `ReviewCard.tsx`, `QuantityStepper.tsx`, `CartDrawer.tsx` (Sheet from shadcn), `CheckoutStepper.tsx`.
- Reuse shadcn: button, card, input, textarea, sheet, sonner (toasts), form, separator, badge.

### Cart state
- `src/lib/cart-store.ts` — lightweight Zustand-free context + `useSyncExternalStore` persisted to `localStorage`. Methods: add, remove, updateQty, clear, totals.
- Cart icon in header shows live item count.

### Data
- `src/data/cookies.ts` — 8–10 cookie products (name, slug, price, description, tags, image).
- `src/data/reviews.ts` — 6–8 testimonials with name, rating, quote.
- Images generated via imagegen (premium for hero, fast for product shots) and saved under `src/assets/`.

### Checkout flow
- 3 steps in single `checkout.tsx` with local state: Contact info → Delivery address → Payment (mock fields, no real processing). Zod validation per step with inline errors. On submit: clear cart, show confirmation screen with order summary + "Continue shopping".

### Contact form
- Name, email, subject, message. Zod validation, length limits, success toast (no backend send — visual confirmation only).

### Responsiveness
- Mobile-first Tailwind. Header collapses to hamburger (Sheet). Product grid: 1 / 2 / 3 / 4 columns at sm/md/lg/xl. Hero stacks on mobile.

### SEO
- Per-route `head()` with unique titles/descriptions. Single H1 per page. Semantic HTML. Alt text on all product images. JSON-LD Product schema on product detail pages.

### Out of scope (frontend-only)
- No real payment processing, no database, no auth, no order persistence beyond localStorage. Can layer Lovable Cloud + Stripe later if requested.
