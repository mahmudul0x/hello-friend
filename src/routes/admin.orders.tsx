import { createFileRoute } from "@tanstack/react-router";
import { formatBDT } from "@/lib/format";

const sample = [
  { id: "ATB-10312", customer: "রাশেদ খান", city: "ঢাকা", total: 1290, status: "প্রসেসিং", date: "২৮ জুন" },
  { id: "ATB-10311", customer: "সুমাইয়া আক্তার", city: "চট্টগ্রাম", total: 2840, status: "শিপড", date: "২৭ জুন" },
  { id: "ATB-10310", customer: "তানভীর হোসেন", city: "রংপুর", total: 4520, status: "ডেলিভার্ড", date: "২৫ জুন" },
  { id: "ATB-10309", customer: "নুসরাত জাহান", city: "সিলেট", total: 890, status: "ডেলিভার্ড", date: "২৪ জুন" },
  { id: "ATB-10308", customer: "ইমরান আলী", city: "খুলনা", total: 1560, status: "বাতিল", date: "২৩ জুন" },
];

const statusColor: Record<string, string> = {
  "প্রসেসিং": "bg-gold/15 text-gold-foreground",
  "শিপড": "bg-primary/10 text-primary",
  "ডেলিভার্ড": "bg-primary text-primary-foreground",
  "বাতিল": "bg-destructive/10 text-destructive",
};

export const Route = createFileRoute("/admin/orders")({
  component: () => (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-xs tracking-wide text-muted-foreground">
          <tr><th className="font-bn px-4 py-3 text-left">অর্ডার</th><th className="font-bn px-4 py-3 text-left">গ্রাহক</th><th className="font-bn px-4 py-3 text-left">শহর</th><th className="font-bn px-4 py-3 text-right">মোট</th><th className="font-bn px-4 py-3 text-left">স্ট্যাটাস</th><th className="font-bn px-4 py-3 text-right">তারিখ</th></tr>
        </thead>
        <tbody className="divide-y">
          {sample.map((o) => (
            <tr key={o.id} className="hover:bg-muted/30">
              <td className="px-4 py-3 font-semibold">{o.id}</td>
              <td className="font-bn px-4 py-3">{o.customer}</td>
              <td className="font-bn px-4 py-3 text-muted-foreground">{o.city}</td>
              <td className="font-bn px-4 py-3 text-right font-semibold">{formatBDT(o.total)}</td>
              <td className="px-4 py-3"><span className={`font-bn rounded-full px-2.5 py-1 text-xs font-medium ${statusColor[o.status]}`}>{o.status}</span></td>
              <td className="font-bn px-4 py-3 text-right text-muted-foreground">{o.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
});
