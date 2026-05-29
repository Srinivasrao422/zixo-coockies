export type Review = {
  name: string;
  city: string;
  rating: number;
  title: string;
  quote: string;
};

export const reviews: Review[] = [
  {
    name: "Maya R.",
    city: "Brooklyn, NY",
    rating: 5,
    title: "Better than the bakery down the street",
    quote:
      "The salted caramel arrived still warm and the box smelled like a bakery in Paris. I've ordered three weeks in a row.",
  },
  {
    name: "Daniel K.",
    city: "Austin, TX",
    rating: 5,
    title: "Office hero status unlocked",
    quote:
      "Sent a Jigsaw box to my team and got a Slack channel renamed in my honor. The double chocolate is dangerous.",
  },
  {
    name: "Priya S.",
    city: "Chicago, IL",
    rating: 5,
    title: "Tastes like a memory",
    quote:
      "Snickerdoodles that actually taste like cinnamon, not just sugar. My grandmother would approve.",
  },
  {
    name: "Theo B.",
    city: "Seattle, WA",
    rating: 4,
    title: "Hazelnut espresso changed my mornings",
    quote:
      "Coffee + cookie at 7am is a personality now. Genuinely the best espresso glaze I've had on anything baked.",
  },
  {
    name: "Lena M.",
    city: "Portland, OR",
    rating: 5,
    title: "Wedding favors, sorted",
    quote:
      "Ordered 120 boxes for our wedding. Packaging was beautiful, every single one perfect. Guests are still texting.",
  },
  {
    name: "Marcus T.",
    city: "Atlanta, GA",
    rating: 5,
    title: "Worth every cent",
    quote:
      "Not the cheapest cookies online — they're just the best. The chocolate chunk has ruined me for all others.",
  },
];
