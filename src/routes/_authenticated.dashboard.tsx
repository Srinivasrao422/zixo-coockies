import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cookie, Package, Heart, MapPin } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "My account — Jigsaw Cookies" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user, signOut } = useAuth();
  const name =
    (user?.user_metadata?.full_name as string) ||
    user?.email?.split("@")[0] ||
    "Cookie lover";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h1 className="font-serif text-4xl text-foreground">Hi, {name} 👋</h1>
        </div>
        <Button variant="outline" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Package, label: "Orders", value: "0" },
          { icon: Heart, label: "Favorites", value: "0" },
          { icon: MapPin, label: "Addresses", value: "0" },
          { icon: Cookie, label: "Rewards", value: "0 pts" },
        ].map(({ icon: Icon, label, value }) => (
          <Card key={label} className="border-border/60">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
              <Icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="font-serif text-3xl">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-border/60">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
            <Cookie className="h-7 w-7" />
          </div>
          <div>
            <h2 className="font-serif text-2xl">Ready for your first order?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Hand-broken chocolate, baked the morning they ship.
            </p>
          </div>
          <Button asChild>
            <Link to="/shop">Browse cookies</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
