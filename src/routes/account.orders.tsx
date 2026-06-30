import { createFileRoute, Link } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { formatBDT, toBnDigits } from "@/lib/format";

export const Route = createFileRoute("/account/orders")({
  component: Orders,
});

const sample = [
  { id: "ATB-10298", date: "২২ জুন, ২০২৬", items: 3, total: 2340, status: "ডেলিভারি সম্পন্ন" },
  { id: "ATB-10241", date: "১১ মে, ২০২৬", items: 1, total: 650, status: "ডেলিভারি সম্পন্ন" },
  { id: "ATB-10187", date: "০৩ এপ্রিল, ২০২৬", items: 5, total: 4120, status: "বাতিল" },
];

function Orders() {
  return (
    <div className="space-y-3">
      {sample.map((o) => (
        <div key={o.id} className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-5 shadow-soft sm:flex-row sm:items-center">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary"><Package className="size-5" /></span>
          <div className="flex-1 min-w-0">
            <div className="font-semibold">{o.id}</div>
            <div className="font-bn text-xs text-muted-foreground">{o.date} · {toBnDigits(o.items)}টি পণ্য</div>
          </div>
          <div className="text-right">
            <div className="font-bn font-semibold text-primary">{formatBDT(o.total)}</div>
            <div className={`font-bn text-xs ${o.status === "ডেলিভারি সম্পন্ন" ? "text-primary" : "text-destructive"}`}>{o.status}</div>
          </div>
        </div>
      ))}
      <Link to="/shop" className="font-bn block text-center text-sm text-primary hover:underline">আরও কেনাকাটা করুন</Link>
    </div>
  );
}
