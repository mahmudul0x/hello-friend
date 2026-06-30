import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Leaf, Sparkles, Truck, Users } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/common/Section";
import { SmartImage } from "@/components/common/SmartImage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "আমাদের সম্পর্কে — অল ট্রি বিডি শপ" },
      { name: "description", content: "আমাদের গল্প, আমাদের চাষি ও বাংলাদেশের প্রতিটি ঘরে প্রিমিয়াম গাছ পৌঁছানোর মিশন।" },
      { property: "og:title", content: "আমাদের সম্পর্কে — অল ট্রি বিডি শপ" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  const values = [
    { Icon: Leaf, t: "গাছ আগে, লাভ পরে", d: "যে চারা আমরা নিজের বাগানে রাখব না, সেটা বিক্রিও করি না।" },
    { Icon: Truck, t: "নিরাপদ ডেলিভারি", d: "নিজস্ব শক-প্রুফ ক্রেট ডিজাইন করেছি — কোনো রেডিমেড সমাধান কাজ করেনি বলে।" },
    { Icon: Users, t: "চাষি অংশীদারিত্ব", d: "সারা দেশে পরিবারচালিত নার্সারির সাথে প্রজন্মান্তরের সরাসরি সম্পর্ক।" },
    { Icon: Award, t: "বাংলায় সেবা", d: "আমাদের কেয়ার টিম আপনার ভাষায় কথা বলে — সাহিত্যিক ও আন্তরিকভাবে।" },
  ];
  return (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "হোম", to: "/" }, { label: "আমাদের সম্পর্কে" }]}
        title="ভালোবাসায় গড়া এক নার্সারি"
        subtitle="২০২০ সালে এক ছাদ, একটি আম গ্রাফটিং আর একটি অটল বিশ্বাস নিয়ে শুরু — বাংলাদেশ এমন একটি নার্সারি পাওয়ার যোগ্য যা প্রিমিয়াম মান দেয়, কিন্তু প্রিমিয়াম দম্ভ ছাড়াই।"
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SmartImage src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1400&q=80" alt="নার্সারি" aspect="4/5" className="rounded-3xl shadow-elegant" />
          <div>
            <div className="font-bn inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wide text-primary">
              <Sparkles className="size-3.5" /> আমাদের গল্প
            </div>
            <h2 className="font-bn mt-4 font-display text-3xl font-bold sm:text-4xl">ধানমন্ডির ছাদ থেকে ৬৪ জেলায়।</h2>
            <p className="font-bn mt-4 text-muted-foreground">
              ছয় বছর আগে আমরা এমন একটিও বাংলাদেশি নার্সারি পাইনি যারা গ্রাফটিং ফল গাছকে গুরুত্বের সাথে নেয়। গাছ আসত ভাঙা, ভুল নামে, বা ভুল জাতের। তাই আমরা সেই নার্সারিটাই তৈরি করলাম যা আমরা চেয়েছিলাম।
            </p>
            <p className="font-bn mt-3 text-muted-foreground">
              আজ আমরা রাজশাহী, রংপুর, কুমিল্লা ও সাভারের ১৪টি পরিবারচালিত নার্সারির সাথে কাজ করি — প্রতি মাসে দেশজুড়ে ১২,০০০+ গাছ পাঠাই বাগানি, কৃষক ও বারান্দা-প্রেমীদের কাছে।
            </p>
          </div>
        </div>
      </Section>

      <Section bg="muted" eyebrow="আমাদের মূল্যবোধ" title="যেসব বিষয়ে আমরা সবচেয়ে যত্নশীল">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, t, d }) => (
            <div key={t} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-4 inline-grid size-12 place-items-center rounded-2xl gradient-primary text-primary-foreground"><Icon className="size-5" /></div>
              <h3 className="font-bn font-display text-lg font-semibold">{t}</h3>
              <p className="font-bn mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="overflow-hidden rounded-[2rem] gradient-primary p-10 text-center text-primary-foreground sm:p-16">
          <h3 className="font-bn font-display text-3xl font-bold sm:text-4xl">চলুন সুন্দর কিছু গড়ি।</h3>
          <p className="font-bn mx-auto mt-3 max-w-xl opacity-90">আমাদের সম্পূর্ণ কালেকশন দেখুন — ১৮০+ গাছ, হাতে বাছাই, আপনার ঘরের জন্য প্রস্তুত।</p>
          <Link to="/shop" className="font-bn mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-gold hover:text-gold-foreground">কালেকশন দেখুন</Link>
        </div>
      </Section>
    </PageLayout>
  );
}
