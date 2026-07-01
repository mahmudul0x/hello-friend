import { createFileRoute, Link } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { AlertTriangle, ArrowRight, DollarSign, Leaf, Package, ShoppingBag, Users } from "lucide-react";
import { formatBDT, toBnDigits } from "@/lib/format";
import { useProducts } from "@/hooks/useCatalog";
import { useOrders, useCustomers } from "@/hooks/useAdmin";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

const chartConfig = {
  revenue: { label: "আয়", color: "var(--color-primary)" },
} satisfies ChartConfig;

function buildRevenueSeries(orders: { created_at: string; total: number }[]) {
  const days = 14;
  const buckets = new Map<string, number>();
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    buckets.set(d.toISOString().slice(0, 10), 0);
  }
  for (const o of orders) {
    const key = o.created_at.slice(0, 10);
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + Number(o.total));
  }
  return [...buckets.entries()].map(([date, revenue]) => ({
    date: new Date(date).toLocaleDateString("bn-BD", { day: "numeric", month: "short" }),
    revenue,
  }));
}

function Dashboard() {
  const { data: products = [] } = useProducts();
  const { data: orders = [] } = useOrders();
  const { data: customers = [] } = useCustomers();

  const revenue = orders.reduce((sum, o) => sum + Number(o.total), 0);
  const topProducts = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);
  const outOfStock = products.filter((p) => !p.inStock);
  const recentOrders = [...orders].slice(0, 5);
  const series = buildRevenueSeries(orders);

  const stats = [
    { Icon: DollarSign, label: "মোট আয়", value: formatBDT(revenue) },
    { Icon: ShoppingBag, label: "মোট অর্ডার", value: toBnDigits(orders.length) },
    { Icon: Leaf, label: "চলমান পণ্য", value: toBnDigits(products.length) },
    { Icon: Users, label: "গ্রাহক", value: toBnDigits(customers.length) },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="ড্যাশবোর্ড" subtitle="আপনার নার্সারির সামগ্রিক পারফরম্যান্স এক নজরে।" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ Icon, label, value }) => (
          <Card key={label}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="font-bn text-xs font-medium text-muted-foreground">{label}</p>
                <p className="font-bn mt-1.5 text-2xl font-bold tracking-tight">{value}</p>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-bn">আয়ের ধারা (গত ১৪ দিন)</CardTitle>
            <CardDescription className="font-bn">প্রতিদিনের মোট অর্ডার মূল্য</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-auto h-55 w-full">
              <AreaChart data={series} margin={{ left: 0, right: 12 }}>
                <defs>
                  <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} minTickGap={24} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent formatter={(value) => formatBDT(Number(value))} />}
                />
                <Area
                  dataKey="revenue"
                  type="monotone"
                  fill="url(#fillRevenue)"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="font-bn">স্টক সতর্কতা</CardTitle>
              <CardDescription className="font-bn">স্টক শেষ হওয়া পণ্য</CardDescription>
            </div>
            {outOfStock.length > 0 && (
              <Badge variant="destructive" className="font-bn">{toBnDigits(outOfStock.length)}</Badge>
            )}
          </CardHeader>
          <CardContent className="max-h-55 space-y-1 overflow-y-auto">
            {outOfStock.length === 0 ? (
              <p className="font-bn py-8 text-center text-sm text-muted-foreground">সব পণ্য স্টকে আছে</p>
            ) : (
              outOfStock.slice(0, 6).map((p) => (
                <Link
                  key={p.slug}
                  to="/admin/products"
                  className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-accent"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-destructive/10 text-destructive">
                    <AlertTriangle className="size-4" />
                  </span>
                  <span className="font-bn min-w-0 flex-1 truncate text-sm font-medium">{p.name}</span>
                </Link>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="font-bn">শীর্ষ পণ্য</CardTitle>
            <Link to="/admin/products" className="font-bn inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              সব দেখুন <ArrowRight className="size-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {topProducts.length === 0 ? (
              <p className="font-bn py-8 text-center text-sm text-muted-foreground">কোনো পণ্য পাওয়া যায়নি।</p>
            ) : (
              <div className="divide-y">
                {topProducts.map((p, i) => (
                  <div key={p.slug} className="flex items-center gap-4 py-3">
                    <span className="font-bn grid size-7 shrink-0 place-items-center rounded-full bg-muted text-xs font-semibold">
                      {toBnDigits(i + 1)}
                    </span>
                    <img src={p.image} alt="" className="size-10 shrink-0 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="font-bn truncate text-sm font-medium">{p.name}</div>
                      <div className="font-bn text-xs text-muted-foreground">{toBnDigits(p.reviews)}টি রিভিউ</div>
                    </div>
                    <div className="font-bn text-sm font-semibold text-primary">{formatBDT(p.price)}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="font-bn">সাম্প্রতিক অর্ডার</CardTitle>
            <Link to="/admin/orders" className="font-bn inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              সব দেখুন <ArrowRight className="size-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="font-bn py-8 text-center text-sm text-muted-foreground">এখনো কোনো অর্ডার নেই।</p>
            ) : (
              <div className="divide-y">
                {recentOrders.map((o) => (
                  <div key={o.id} className="flex items-center gap-4 py-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Package className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{o.order_number}</div>
                      <div className="font-bn truncate text-xs text-muted-foreground">{o.customer_name}</div>
                    </div>
                    <div className="font-bn text-sm font-semibold text-primary">{formatBDT(o.total)}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
