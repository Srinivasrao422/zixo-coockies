import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Users, ShoppingBag, DollarSign } from "lucide-react";

export const Route = createFileRoute("/_authenticated/_admin/admin")({
  head: () => ({ meta: [{ title: "Admin — Jigsaw Cookies" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { signOut, user } = useAuth();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <ShieldCheck className="h-3 w-3" /> Admin
          </div>
          <h1 className="mt-2 font-serif text-4xl text-foreground">Operations</h1>
          <p className="text-sm text-muted-foreground">Signed in as {user?.email}</p>
        </div>
        <Button variant="outline" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: Users, label: "Customers", value: "—" },
          { icon: ShoppingBag, label: "Orders today", value: "—" },
          { icon: DollarSign, label: "Revenue (MTD)", value: "—" },
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
    </div>
  );
}
