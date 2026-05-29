import { useSyncExternalStore } from "react";
import type { Cookie } from "@/data/cookies";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = { items: CartItem[] };

const STORAGE_KEY = "jigsaw-cart-v1";

const listeners = new Set<() => void>();
let state: CartState = { items: [] };

function load(): CartState {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.items)) return parsed;
  } catch {
    /* noop */
  }
  return { items: [] };
}

function persist() {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function emit() {
  listeners.forEach((l) => l());
}

function setState(next: CartState) {
  state = next;
  persist();
  emit();
}

// Hydrate on import in browser
if (typeof window !== "undefined") {
  state = load();
}

export const cart = {
  add(cookie: Cookie, qty = 1) {
    const existing = state.items.find((i) => i.slug === cookie.slug);
    if (existing) {
      setState({
        items: state.items.map((i) =>
          i.slug === cookie.slug ? { ...i, qty: i.qty + qty } : i,
        ),
      });
    } else {
      setState({
        items: [
          ...state.items,
          {
            slug: cookie.slug,
            name: cookie.name,
            price: cookie.price,
            image: cookie.image,
            qty,
          },
        ],
      });
    }
  },
  remove(slug: string) {
    setState({ items: state.items.filter((i) => i.slug !== slug) });
  },
  updateQty(slug: string, qty: number) {
    if (qty <= 0) return cart.remove(slug);
    setState({
      items: state.items.map((i) => (i.slug === slug ? { ...i, qty } : i)),
    });
  },
  clear() {
    setState({ items: [] });
  },
  get() {
    return state;
  },
};

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return state;
}

function getServerSnapshot(): CartState {
  return { items: [] };
}

export function useCart() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const subtotal = s.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = s.items.reduce((n, i) => n + i.qty, 0);
  const shipping = subtotal > 0 ? (subtotal >= 35 ? 0 : 6) : 0;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);
  return { items: s.items, subtotal, shipping, tax, total, count };
}
