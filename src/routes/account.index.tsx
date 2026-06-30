import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Package, ShoppingBag } from "lucide-react";
import { toBnDigits } from "@/lib/format";

export const Route = createFileRoute("/account/")({
  component: AccountOverview,
});

function AccountOverview() {
  const tiles = [
    { Icon: Package, t: 0, l: "চলমান অর্ডার", to: "/account/orders" as const },
    { Icon: ShoppingBag, t: 12, l: "মোট অর্ডার", to: "/account/orders" as const },
    { Icon: Heart, t: 5, l: "ইচ্ছার তালিকা", to: "/account/wishlist" as const },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {tiles.map(({ Icon, t, l, to }) => (
          <Link key={l} to={to} className="rounded-3xl border border-border bg-card p-6 shadow-soft transition hover-lift">
            <Icon className="size-6 text-primary" />
            <div className="font-bn mt-3 font-display text-3xl font-bold">{toBnDigits(t)}</div>
            <div className="font-bn text-sm text-muted-foreground">{l}</div>
          </Link>
        ))}
      </div>
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-bn font-display text-lg font-semibold">স্বাগতম 🌿</h3>
        <p className="font-bn mt-2 text-sm text-muted-foreground">নতুন বর্ষা কালেকশন দেখুন বা যেখান থেকে রেখেছিলেন সেখান থেকে শুরু করুন।</p>
        <Link to="/shop" className="font-bn mt-4 inline-flex rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">গাছ দেখুন</Link>
      </div>
    </div>
  );
}
