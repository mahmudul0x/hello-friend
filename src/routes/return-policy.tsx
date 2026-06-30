import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, RefreshCw, AlertCircle, Phone } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/common/Section";

export const Route = createFileRoute("/return-policy")({
  head: () => ({
    meta: [{ title: "রিটার্ন ও রিফান্ড নীতি — অল ট্রি বিডি শপ" }, { name: "description", content: "৭ দিনের লাইভ প্ল্যান্ট গ্যারান্টি ও রিফান্ড প্রক্রিয়া।" }],
    links: [{ rel: "canonical", href: "/return-policy" }],
  }),
  component: Returns,
});

const STEPS = [
  { n: 1, t: "২৪ ঘণ্টার মধ্যে খুলুন", d: "ডেলিভারির ২৪ ঘণ্টার মধ্যে আনপ্যাক করে গাছ পরীক্ষা করুন।" },
  { n: 2, t: "সমস্যা জানান", d: "ছবি তুলে ৪৮ ঘণ্টার মধ্যে হোয়াটসঅ্যাপ বা ইমেইলে যোগাযোগ করুন।" },
  { n: 3, t: "১২ ঘণ্টায় উত্তর", d: "আমাদের কেয়ার টিম রিভিউ করে রিপ্লেসমেন্ট, রিফান্ড বা ক্রেডিট প্রস্তাব দেয়।" },
  { n: 4, t: "ফ্রি রিটার্ন পিকআপ", d: "রিপ্লেসমেন্ট অনুমোদিত হলে মূল গাছের ফ্রি পিকআপ ব্যবস্থা করি।" },
];

function Returns() {
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "হোম", to: "/" }, { label: "রিটার্ন" }]} title="রিটার্ন ও রিফান্ড নীতি" subtitle="প্রতিটি অর্ডারে ৭ দিনের লাইভ প্ল্যান্ট গ্যারান্টি।" />
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl gradient-primary p-8 text-primary-foreground shadow-elegant">
            <ShieldCheck className="size-10" />
            <h2 className="font-bn mt-5 font-display text-3xl font-bold">৭ দিনের গ্যারান্টি</h2>
            <p className="font-bn mt-3 opacity-90">যদি আপনার গাছ ক্ষতিগ্রস্ত, রোগাক্রান্ত হয়ে আসে বা সঠিক যত্ন সত্ত্বেও ৭ দিনের মধ্যে মরে যায়, আমরা ফ্রি রিপ্লেস বা সম্পূর্ণ রিফান্ড দিই।</p>
          </div>
          <div className="rounded-3xl border bg-card p-8 shadow-soft">
            <RefreshCw className="size-10 text-primary" />
            <h2 className="font-bn mt-5 font-display text-3xl font-bold">যা যা অন্তর্ভুক্ত</h2>
            <ul className="font-bn mt-4 space-y-2 text-muted-foreground">
              <li>• পরিবহনে ক্ষতিগ্রস্ত গাছ</li>
              <li>• ভুল জাতের গাছ পাঠানো</li>
              <li>• সঠিক যত্নেও ৭ দিনে মরে যাওয়া গাছ</li>
              <li>• অনুপস্থিত সামগ্রী (পাত্র, মাটি, নির্দেশনা)</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section bg="muted" title="রিটার্ন প্রক্রিয়া">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-3xl border bg-card p-6 shadow-soft">
              <div className="font-display text-4xl font-bold text-primary/30">০{s.n}</div>
              <h3 className="font-bn mt-2 font-display text-lg font-semibold">{s.t}</h3>
              <p className="font-bn mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="rounded-3xl border-2 border-dashed border-amber-400/40 bg-amber-50 p-6 dark:bg-amber-950/20">
          <div className="flex items-start gap-4">
            <AlertCircle className="size-6 shrink-0 text-amber-600" />
            <div>
              <h3 className="font-bn font-display text-lg font-semibold">যা অন্তর্ভুক্ত নয়</h3>
              <p className="font-bn mt-1 text-sm text-muted-foreground">অতিরিক্ত/কম পানি, পোকামাকড়ের অযত্ন, রিপটিং দুর্ঘটনা বা চরম আবহাওয়ার প্রভাবে ক্ষতি। সেল বা ক্লিয়ারেন্স পণ্য চূড়ান্ত।</p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <Phone className="size-6 text-primary" />
            <div>
              <div className="font-bn font-semibold">সাহায্য লাগবে?</div>
              <div className="text-sm text-muted-foreground">01839-208687 · ibrahimhossain362840@gmail.com</div>
            </div>
          </div>
          <a href="/contact" className="font-bn rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground">সাপোর্টে যোগাযোগ করুন</a>
        </div>
      </Section>
    </PageLayout>
  );
}
