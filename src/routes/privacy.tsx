import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "গোপনীয়তা নীতি — অল ট্রি বিডি শপ" }, { name: "description", content: "আমরা কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার ও সুরক্ষা করি।" }],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

const SECTIONS = [
  { t: "যে তথ্য সংগ্রহ করি", d: "অর্ডার প্রসেস ও ডেলিভারির জন্য আমরা আপনার নাম, ফোন, ইমেইল, ঠিকানা ও অর্ডারের বিস্তারিত সংগ্রহ করি। আমরা পেমেন্ট কার্ডের তথ্য সংরক্ষণ করি না।" },
  { t: "তথ্য ব্যবহারের উপায়", d: "আপনার তথ্য শুধু অর্ডার পূরণ, গ্রাহক সাপোর্ট ও আপনার অনুমতিতে অফার পাঠানোর জন্য ব্যবহৃত হয়। আমরা তথ্য বিক্রি বা ভাড়া দিই না।" },
  { t: "কুকিজ ও অ্যানালিটিকস", d: "কার্ট ও চেকআউটের জন্য প্রয়োজনীয় কুকিজ এবং ব্যবহার বুঝতে গোপনীয়তা-বান্ধব অ্যানালিটিকস ব্যবহার করি। ব্রাউজার থেকে অপ্রয়োজনীয় কুকিজ বন্ধ করতে পারেন।" },
  { t: "তথ্য শেয়ারিং", d: "ডেলিভারি পার্টনার ও SMS/ইমেইল গেটওয়ের সাথে শুধু প্রয়োজনীয় তথ্য শেয়ার করি। সব পার্টনার গোপনীয়তা চুক্তিতে আবদ্ধ।" },
  { t: "আপনার অধিকার", d: "আপনি যেকোনো সময় তথ্যের কপি, সংশোধন বা মুছে ফেলার অনুরোধ করতে পারেন — ibrahimhossain362840@gmail.com এ ইমেইল করুন।" },
  { t: "শিশুদের গোপনীয়তা", d: "আমাদের সেবা ১৩ বছরের নিচের শিশুদের জন্য নয়। অপ্রাপ্তবয়স্কদের তথ্য আমরা সচেতনভাবে সংগ্রহ করি না।" },
  { t: "নীতি আপডেট", d: "এই নীতি মাঝে মাঝে পরিবর্তিত হতে পারে। সর্বশেষ পরিবর্তনের তারিখ উপরে দেওয়া আছে।" },
];

function Privacy() {
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "হোম", to: "/" }, { label: "গোপনীয়তা নীতি" }]} title="গোপনীয়তা নীতি" subtitle="সর্বশেষ আপডেট: ১ জুন, ২০২৬" />
      <Container className="py-14">
        <article className="mx-auto max-w-3xl space-y-10">
          <p className="font-bn text-lg text-muted-foreground">আপনার গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। এই নীতি ব্যাখ্যা করে আমরা কী সংগ্রহ করি, কেন করি এবং আপনার নিয়ন্ত্রণ কতটুকু।</p>
          {SECTIONS.map((s, i) => (
            <section key={i} className="rounded-3xl border bg-card p-7 shadow-soft">
              <h2 className="font-bn font-display text-2xl font-bold">{i + 1}. {s.t}</h2>
              <p className="font-bn mt-3 leading-relaxed text-muted-foreground">{s.d}</p>
            </section>
          ))}
        </article>
      </Container>
    </PageLayout>
  );
}
