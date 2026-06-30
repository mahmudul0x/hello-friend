import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { SmartImage } from "@/components/common/SmartImage";

export const Route = createFileRoute("/video-gallery")({
  head: () => ({
    meta: [
      { title: "ভিডিও গ্যালারি — অল ট্রি বিডি শপ" },
      { name: "description", content: "নার্সারি ট্যুর, গাছ পরিচর্যার টিউটোরিয়াল ও গ্রাফটিং ডেমো দেখুন।" },
    ],
    links: [{ rel: "canonical", href: "/video-gallery" }],
  }),
  component: VideoGallery,
});

const VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "আম গ্রাফটিং মাস্টারক্লাস", cat: "টিউটোরিয়াল", thumb: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=900&q=80", duration: "১২:৩৪" },
  { id: "dQw4w9WgXcQ", title: "নার্সারি ট্যুর: সাভার", cat: "ট্যুর", thumb: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=900&q=80", duration: "০৮:১২" },
  { id: "dQw4w9WgXcQ", title: "বর্ষায় লেবু গাছের পরিচর্যা", cat: "পরিচর্যা", thumb: "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=900&q=80", duration: "০৬:৪৮" },
  { id: "dQw4w9WgXcQ", title: "ছাদ বাগান সেটআপ", cat: "গাইড", thumb: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80", duration: "১৫:০২" },
  { id: "dQw4w9WgXcQ", title: "প্যাকিং ও শিপিং", cat: "বিটিএস", thumb: "https://images.unsplash.com/photo-1518335935020-cfd6580c1ab4?w=900&q=80", duration: "০৪:২১" },
  { id: "dQw4w9WgXcQ", title: "গ্রাহকদের গল্প", cat: "গল্প", thumb: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=900&q=80", duration: "০৯:৫৫" },
];

function VideoGallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "হোম", to: "/" }, { label: "ভিডিও গ্যালারি" }]} title="দেখুন ও শিখুন" subtitle="টিউটোরিয়াল, নার্সারি ট্যুর এবং চাষিদের গল্প।" />
      <Container className="py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setOpen(v.id)}
              className="group relative overflow-hidden rounded-3xl text-left shadow-soft transition hover-lift"
              aria-label={`প্লে করুন: ${v.title}`}
            >
              <SmartImage src={v.thumb} alt={v.title} aspect="video" rounded={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid size-16 place-items-center rounded-full bg-white/95 text-primary shadow-xl transition group-hover:scale-110">
                  <Play className="size-6 fill-current" />
                </span>
              </div>
              <span className="font-bn absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">{v.duration}</span>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="font-bn text-xs font-semibold tracking-wide text-gold">{v.cat}</span>
                <h3 className="font-bn mt-1 font-display text-lg font-semibold">{v.title}</h3>
              </div>
            </motion.button>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4" onClick={() => setOpen(null)}>
            <button aria-label="ভিডিও বন্ধ করুন" onClick={() => setOpen(null)} className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><X /></button>
            <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${open}?autoplay=1`} title="ভিডিও" allow="autoplay; encrypted-media" allowFullScreen />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
