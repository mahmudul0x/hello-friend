import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, DollarSign, Leaf, ShoppingBag, Users } from "lucide-react";
import { formatBDT, toBnDigits } from "@/lib/format";
import { products } from "@/data/products";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const stats = [
    { Icon: DollarSign, l: "আয় (৩০ দিন)", v: formatBDT(284500), change: "+১৮.৪%", up: true },
    { Icon: ShoppingBag, l: "অর্ডার (৩০ দিন)", v: "৩৪২", change: "+১২.১%", up: true },
    { Icon: Leaf, l: "চলমান পণ্য", v: toBnDigits(products.length), change: "+৩", up: true },
    { Icon: Users, l: "গ্রাহক", v: "১,২৮৪", change: "-১.২%", up: false },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ Icon, l, v, change, up }) => (
          <div key={l} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <Icon className="size-5 text-primary" />
              <span className={`font-bn inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${up ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />} {change}
              </span>
            </div>
            <div className="font-bn mt-4 font-display text-2xl font-bold">{v}</div>
            <div className="font-bn text-xs text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-bn font-display text-lg font-semibold">শীর্ষ পারফর্মার (৩০ দিন)</h3>
        <div className="mt-4 divide-y">
          {products.slice(0, 5).map((p, i) => (
            <div key={p.slug} className="flex items-center gap-4 py-3">
              <span className="font-bn grid size-7 place-items-center rounded-full bg-muted text-xs font-semibold">{toBnDigits(i + 1)}</span>
              <img src={p.image} alt="" className="size-10 shrink-0 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="font-bn truncate font-medium">{p.name}</div>
                <div className="font-bn text-xs text-muted-foreground">{toBnDigits(p.reviews)}টি রিভিউ</div>
              </div>
              <div className="font-bn font-semibold text-primary">{formatBDT(p.price)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
