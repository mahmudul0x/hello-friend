import { createFileRoute } from "@tanstack/react-router";
import { formatBDT, toBnDigits } from "@/lib/format";

const sample = [
  { name: "রাশেদ খান", city: "ঢাকা", orders: 14, spent: 28400, joined: "জানু ২০২৫" },
  { name: "সুমাইয়া আক্তার", city: "চট্টগ্রাম", orders: 8, spent: 16200, joined: "মার্চ ২০২৫" },
  { name: "তানভীর হোসেন", city: "রংপুর", orders: 21, spent: 54300, joined: "অক্টো ২০২৪" },
  { name: "নুসরাত জাহান", city: "সিলেট", orders: 5, spent: 8900, joined: "এপ্রিল ২০২৫" },
];

export const Route = createFileRoute("/admin/customers")({
  component: () => (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-xs tracking-wide text-muted-foreground">
          <tr><th className="font-bn px-4 py-3 text-left">গ্রাহক</th><th className="font-bn px-4 py-3 text-left">শহর</th><th className="font-bn px-4 py-3 text-right">অর্ডার</th><th className="font-bn px-4 py-3 text-right">মোট খরচ</th><th className="font-bn px-4 py-3 text-right">যোগ দিয়েছেন</th></tr>
        </thead>
        <tbody className="divide-y">
          {sample.map((c) => (
            <tr key={c.name} className="hover:bg-muted/30">
              <td className="font-bn px-4 py-3 font-semibold">{c.name}</td>
              <td className="font-bn px-4 py-3 text-muted-foreground">{c.city}</td>
              <td className="font-bn px-4 py-3 text-right">{toBnDigits(c.orders)}</td>
              <td className="font-bn px-4 py-3 text-right font-semibold text-primary">{formatBDT(c.spent)}</td>
              <td className="font-bn px-4 py-3 text-right text-muted-foreground">{c.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
});
