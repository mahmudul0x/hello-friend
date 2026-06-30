import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "শর্তাবলী — অল ট্রি বিডি শপ" }, { name: "description", content: "আমাদের নার্সারি সেবার ব্যবহার নিয়ন্ত্রণকারী শর্তাবলী।" }],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

const SECTIONS = [
  { t: "গ্রহণযোগ্যতা", d: "alltreebd.shop ব্যবহার করে আপনি এই শর্তাবলী মেনে নিচ্ছেন। সম্মত না হলে দয়া করে সেবা ব্যবহার করবেন না।" },
  { t: "অর্ডার ও মূল্য", d: "সব মূল্য বাংলাদেশি টাকায় এবং প্রযোজ্য ক্ষেত্রে ভ্যাট অন্তর্ভুক্ত। মূল্যের ভুল, স্টক সমস্যা বা সন্দেহজনক আচরণে অর্ডার বাতিল করার অধিকার আমাদের আছে।" },
  { t: "জীবন্ত পণ্য", d: "জীবন্ত গাছ পচনশীল। পরিবহনে সামান্য পাতা ঝরা স্বাভাবিক। গ্যারান্টি শুধু পরিচর্যা নির্দেশনা অনুসরণ করলে প্রযোজ্য।" },
  { t: "পেমেন্ট", d: "বর্তমানে আমরা ক্যাশ অন ডেলিভারি গ্রহণ করি। অতিরিক্ত পেমেন্ট পদ্ধতি যোগ হলে তাদের নিজস্ব শর্ত প্রযোজ্য হবে।" },
  { t: "বৌদ্ধিক সম্পত্তি", d: "সব কন্টেন্ট, ছবি ও ব্র্যান্ডিং অল ট্রি বিডি শপের সম্পত্তি — অনুমতি ছাড়া পুনঃব্যবহার নিষিদ্ধ।" },
  { t: "দায়িত্বের সীমা", d: "আমরা পরোক্ষ বা পরিণতিগত ক্ষতির জন্য দায়ী নই। আমাদের সর্বোচ্চ দায়িত্ব সংশ্লিষ্ট অর্ডারের মূল্যে সীমাবদ্ধ।" },
  { t: "প্রযোজ্য আইন", d: "এই শর্তাবলী বাংলাদেশের আইন দ্বারা পরিচালিত। বিরোধ ঢাকার আদালতে নিষ্পত্তি হবে।" },
];

function Terms() {
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "হোম", to: "/" }, { label: "শর্তাবলী" }]} title="শর্তাবলী" subtitle="সর্বশেষ আপডেট: ১ জুন, ২০২৬" />
      <Container className="py-14">
        <article className="mx-auto max-w-3xl space-y-8">
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
