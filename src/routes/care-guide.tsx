import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Leaf, Scissors, Sprout, Sun, Thermometer } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/common/Section";

const guides = [
  { Icon: Sun, t: "সূর্যালোক ১০১", d: "অধিকাংশ ফল গাছের ৬+ ঘণ্টা সরাসরি রোদ প্রয়োজন। ইনডোর গাছ পূর্ব জানালার পরোক্ষ আলোতে ভালো থাকে।" },
  { Icon: Droplets, t: "পানি দেওয়ার নিয়ম", d: "গভীরভাবে কিন্তু কম বার পানি দিন। উপরের ২ ইঞ্চি মাটি শুকনো হলে তবেই পানি — অতিরিক্ত পানিতেই বেশি গাছ মরে।" },
  { Icon: Leaf, t: "সার দেওয়ার সময়সূচি", d: "প্রতি ৩ মাসে অর্গানিক কম্পোস্ট দিন। বাড়ার মৌসুমে মাসে একবার NPK ১৯-১৯-১৯; ফুল ফোটার সময় পটাশসমৃদ্ধ সার।" },
  { Icon: Scissors, t: "ছাঁটাইয়ের মূলনীতি", d: "শীতে মৃত, রোগাক্রান্ত ও ক্রস হওয়া শাখা ছাঁটাই করুন। মাথা চিমটি দিলে গাছ ঘন হয়।" },
  { Icon: Thermometer, t: "মৌসুমী পরিচর্যা", d: "বর্ষা: পানি নিষ্কাশন বাড়ান, ছত্রাকের প্রতি সতর্ক থাকুন। গ্রীষ্ম: ভালো করে মালচ দিন, সকালে পানি দিন। শীত: সার কমান।" },
  { Icon: Sprout, t: "রিপটিং", d: "প্রতি ২–৩ বছরে ২ ইঞ্চি বড় পাত্রে স্থানান্তর করুন। ফল গাছের জন্য ৩০% বালি, ৪০% কম্পোস্ট, ৩০% মাটি।" },
];

export const Route = createFileRoute("/care-guide")({
  head: () => ({
    meta: [
      { title: "গাছ পরিচর্যা গাইড — অল ট্রি বিডি শপ" },
      { name: "description", content: "সূর্যালোক, পানি, সার ও ছাঁটাই — বাংলাদেশের আবহাওয়ার জন্য সম্পূর্ণ পরিচর্যা গাইড।" },
      { property: "og:title", content: "গাছ পরিচর্যা গাইড — অল ট্রি বিডি শপ" },
      { property: "og:url", content: "/care-guide" },
    ],
    links: [{ rel: "canonical", href: "/care-guide" }],
  }),
  component: () => (
    <PageLayout>
      <PageHeader crumbs={[{ label: "হোম", to: "/" }, { label: "পরিচর্যা গাইড" }]} title="অপরিহার্য গাছ পরিচর্যা গাইড" subtitle="সুস্থ গাছ রাখতে যা যা প্রয়োজন — বাংলাদেশের আবহাওয়ার জন্য তৈরি।" />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map(({ Icon, t, d }) => (
            <div key={t} className="rounded-3xl border border-border bg-card p-6 shadow-soft transition hover-lift">
              <div className="mb-4 inline-grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary"><Icon className="size-5" /></div>
              <h3 className="font-bn font-display text-lg font-semibold">{t}</h3>
              <p className="font-bn mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageLayout>
  ),
});
