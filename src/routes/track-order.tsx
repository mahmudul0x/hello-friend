import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle2, Search, MapPin, Clock } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/track-order")({
  head: () => ({
    meta: [
      { title: "অর্ডার ট্র্যাক করুন — অল ট্রি বিডি শপ" },
      { name: "description", content: "সারা বাংলাদেশে রিয়েল টাইমে আপনার নার্সারি অর্ডার ট্র্যাক করুন।" },
    ],
    links: [{ rel: "canonical", href: "/track-order" }],
  }),
  component: Track,
});

const STAGES = [
  { Icon: CheckCircle2, t: "অর্ডার গৃহীত", d: "আমরা আপনার অর্ডার পেয়েছি", time: "২৪ জুন, সকাল ১০:৪২" },
  { Icon: Package, t: "নার্সারিতে প্যাক", d: "শক-প্রুফ ক্রেটে হাতে প্যাক করা", time: "২৫ জুন, সকাল ৯:১৫" },
  { Icon: Truck, t: "ডেলিভারির পথে", d: "এখন সাভার হাবে", time: "২৬ জুন, সকাল ৭:৩০" },
  { Icon: MapPin, t: "ডেলিভারি সম্পন্ন", d: "আগামীকাল সম্ভাব্য", time: "২৭ জুন" },
];

function Track() {
  const [show, setShow] = useState(false);
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "হোম", to: "/" }, { label: "অর্ডার ট্র্যাক" }]} title="অর্ডার ট্র্যাক করুন" subtitle="অর্ডার আইডি ও ফোন নাম্বার দিয়ে রিয়েল-টাইম অবস্থান দেখুন।" />
      <Section>
        <div className="mx-auto max-w-3xl rounded-3xl border bg-card p-8 shadow-soft">
          <form onSubmit={(e) => { e.preventDefault(); setShow(true); }} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
            <Input placeholder="অর্ডার আইডি (যেমন ATB-10293)" required defaultValue="ATB-10293" className="font-bn" />
            <Input placeholder="ফোন নাম্বার" required defaultValue="01700000000" className="font-bn" />
            <Button type="submit" className="font-bn gap-2"><Search className="size-4" /> ট্র্যাক</Button>
          </form>
        </div>

        {show && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-10 max-w-3xl rounded-3xl border bg-card p-8 shadow-soft">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b pb-5">
              <div>
                <div className="font-bn text-xs font-semibold tracking-wide text-muted-foreground">অর্ডার</div>
                <div className="font-display text-xl font-bold">#ATB-10293</div>
              </div>
              <span className="font-bn inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary"><Clock className="size-4" /> পথে আছে</span>
            </div>
            <ol className="relative space-y-8 border-l-2 border-dashed border-primary/30 pl-8">
              {STAGES.map((s, i) => {
                const done = i <= 2;
                return (
                  <li key={i} className="relative">
                    <span className={`absolute -left-[42px] grid size-9 place-items-center rounded-full border-2 ${done ? "border-primary gradient-primary text-primary-foreground" : "border-border bg-background text-muted-foreground"}`}>
                      <s.Icon className="size-4" />
                    </span>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className={`font-bn font-display text-lg font-semibold ${done ? "text-foreground" : "text-muted-foreground"}`}>{s.t}</h3>
                      <span className="font-bn text-xs text-muted-foreground">{s.time}</span>
                    </div>
                    <p className="font-bn mt-1 text-sm text-muted-foreground">{s.d}</p>
                  </li>
                );
              })}
            </ol>
          </motion.div>
        )}
      </Section>
    </PageLayout>
  );
}
