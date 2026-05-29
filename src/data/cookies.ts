import chocolate from "@/assets/cookie-chocolate.jpg";
import oatmeal from "@/assets/cookie-oatmeal.jpg";
import peanut from "@/assets/cookie-peanut.jpg";
import caramel from "@/assets/cookie-caramel.jpg";
import doubleChoc from "@/assets/cookie-double.jpg";
import snicker from "@/assets/cookie-snicker.jpg";
import matcha from "@/assets/cookie-matcha.jpg";
import espresso from "@/assets/cookie-espresso.jpg";

export type Cookie = {
  slug: string;
  name: string;
  price: number;
  tag: string;
  short: string;
  description: string;
  image: string;
  featured?: boolean;
};

export const cookies: Cookie[] = [
  {
    slug: "classic-chocolate-chunk",
    name: "Classic Chocolate Chunk",
    price: 3.5,
    tag: "Bestseller",
    short: "Brown-butter dough, hand-broken dark chocolate.",
    description:
      "Our signature: slow-creamed brown butter dough loaded with hand-broken 70% dark chocolate. Crisp edge, molten middle, finished with flaky sea salt.",
    image: chocolate,
    featured: true,
  },
  {
    slug: "salted-caramel",
    name: "Salted Caramel",
    price: 3.95,
    tag: "Staff pick",
    short: "Buttery dough, slow-cooked caramel, sea salt.",
    description:
      "A vanilla brown-sugar cookie pulled from the oven, crowned with our small-batch salted caramel and a pinch of Maldon.",
    image: caramel,
    featured: true,
  },
  {
    slug: "double-chocolate",
    name: "Double Chocolate",
    price: 3.75,
    tag: "Rich",
    short: "Cocoa dough with white chocolate chunks.",
    description:
      "Deep cocoa dough studded with creamy white chocolate. Fudgy, decadent, unapologetic.",
    image: doubleChoc,
    featured: true,
  },
  {
    slug: "hazelnut-espresso",
    name: "Hazelnut Espresso",
    price: 4.25,
    tag: "New",
    short: "Toasted hazelnut, single-origin espresso glaze.",
    description:
      "Toasted hazelnuts folded into a brown-butter base, glazed with a single-origin espresso reduction.",
    image: espresso,
    featured: true,
  },
  {
    slug: "oatmeal-raisin",
    name: "Oatmeal Raisin",
    price: 3.25,
    tag: "Classic",
    short: "Steel-cut oats, plump rum-soaked raisins.",
    description:
      "Chewy oat cookie with rum-soaked raisins, cinnamon, and a whisper of nutmeg.",
    image: oatmeal,
  },
  {
    slug: "peanut-butter",
    name: "Peanut Butter",
    price: 3.5,
    tag: "Classic",
    short: "Single-ingredient peanut butter, crosshatch top.",
    description:
      "Made with freshly ground peanut butter and turbinado sugar for a sandy crumb and salty edge.",
    image: peanut,
  },
  {
    slug: "snickerdoodle",
    name: "Snickerdoodle",
    price: 3.25,
    tag: "Classic",
    short: "Soft cinnamon-sugar cookie.",
    description:
      "Pillowy cream of tartar dough rolled generously in Vietnamese cinnamon sugar.",
    image: snicker,
  },
  {
    slug: "matcha-white-chocolate",
    name: "Matcha White Chocolate",
    price: 4.5,
    tag: "Limited",
    short: "Ceremonial matcha, creamy white chocolate.",
    description:
      "Ceremonial-grade matcha cookie with pockets of melted white chocolate. Earthy, sweet, gently bitter.",
    image: matcha,
  },
];

export const getCookie = (slug: string) => cookies.find((c) => c.slug === slug);
