import { createFileRoute } from "@tanstack/react-router";
import { Truck, Package, MapPin, Clock } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/common/Section";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({
    meta: [{ title: "শিপিং নীতি — অল ট্রি বিডি শপ" }, { name: "description", content: "সারা বাংলাদেশে আমরা কীভাবে গাছ প্যাক ও ডেলিভারি করি।" }],
    links: [{ rel: "canonical", href: "/shipping-policy" }],
  }),
  component: Shipping,
});

const FEATURES = [
  { Icon: Package, t: "কাস্টম শক-প্রুফ ক্রেট", d: "চারাকে রুক্ষ হ্যান্ডলিং থেকে রক্ষা করতে ইন-হাউস ডিজাইন।" },
  { Icon: Truck, t: "৬৪ জেলায় কভারেজ", d: "বাংলাদেশের প্রতিটি জেলায় আমরা ডেলিভারি করি।" },
  { Icon: Clock, t: "১–৪ দিন ডেলিভারি", d: "ঢাকায় পরের দিন; দূরের জেলায় ২–৪ কার্যদিবস।" },
  { Icon: MapPin, t: "৳১,৫০০+ অর্ডারে ফ্রি", d: "এর কম অর্ডারে ৳১২০ ফ্ল্যাট ফি।" },
];

const ZONES = [
  { zone: "ঢাকা সিটি", time: "১–২ দিন", fee: "৳৮০" },
  { zone: "ঢাকা বিভাগ", time: "২–৩ দিন", fee: "৳১২০" },
  { zone: "চট্টগ্রাম, সিলেট, খুলনা", time: "২–৩ দিন", fee: "৳১৫০" },
  { zone: "অন্যান্য জেলা", time: "৩–৪ দিন", fee: "৳১৮০" },
  { zone: "দূরবর্তী/পাহাড়ি অঞ্চল", time: "৪–৬ দিন", fee: "৳২৫০" },
];

function Shipping() {
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "হোম", to: "/" }, { label: "শিপিং" }]} title="শিপিং নীতি" subtitle="জীবন্ত গাছের জন্য বিশেষভাবে তৈরি — প্রতিটি ধাপে নিরাপদ আগমন।" />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.t} className="rounded-3xl border bg-card p-6 shadow-soft">
              <div className="mb-4 inline-grid size-12 place-items-center rounded-2xl gradient-primary text-primary-foreground"><f.Icon className="size-5" /></div>
              <h3 className="font-bn font-display text-lg font-semibold">{f.t}</h3>
              <p className="font-bn mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section bg="muted" title="ডেলিভারি জোন ও সময়">
        <div className="overflow-hidden rounded-3xl border bg-card shadow-soft">
          <table className="w-full text-left">
            <thead className="bg-muted/50 text-sm">
              <tr><th className="font-bn p-4">এলাকা</th><th className="font-bn p-4">ডেলিভারি সময়</th><th className="font-bn p-4">স্ট্যান্ডার্ড ফি</th></tr>
            </thead>
            <tbody>
              {ZONES.map((z, i) => (
                <tr key={i} className="border-t">
                  <td className="font-bn p-4 font-medium">{z.zone}</td>
                  <td className="font-bn p-4 text-muted-foreground">{z.time}</td>
                  <td className="font-bn p-4 font-semibold text-primary">{z.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-bn mt-6 text-sm text-muted-foreground">৳১,৫০০ এর উপরে অর্ডারে স্বয়ংক্রিয়ভাবে ফ্রি শিপিং প্রযোজ্য। বাল্ক অর্ডারের (৫০+ গাছ) ক্ষেত্রে কাস্টম লজিস্টিকস হতে পারে — দয়া করে যোগাযোগ করুন।</p>
      </Section>
    </PageLayout>
  );
}
