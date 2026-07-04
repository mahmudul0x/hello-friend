import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  BadgeCheck,
  CheckCircle2,
  Flame,
  Headset,
  Leaf,
  MessageCircle,
  MinusCircle,
  PlusCircle,
  Quote,
  ShieldCheck,
  Sprout,
  Star,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SmartImage } from "@/components/common/SmartImage";
import { ensureLandingPage } from "@/hooks/useCatalog";
import { formatBDT, toBnDigits } from "@/lib/format";
import { createOrder } from "@/lib/supabase/orders.server";
import { friendlyError } from "@/lib/errorMessage";
import { divisionNames, getDistricts, getUpazilas } from "@/data/bangladesh-geo";
import type { LandingTestimonial } from "@/lib/supabase/queries";
import landingLogo from "@/assets/landing-logo.png";

const whatsappNumber = "8801839208687";
const whatsappHref = `https://wa.me/${whatsappNumber}`;

const defaultBenefits = [
  "উন্নত মানের ও রোগমুক্ত চারা",
  "অভিজ্ঞ নার্সারি বিশেষজ্ঞ দ্বারা পরিচর্যা",
  "সঠিক প্যাকেজিং এবং নিরাপদ ডেলিভারি",
  "পোস্ট সেল সহায়তা ও পরামর্শ",
];

const defaultTestimonials: LandingTestimonial[] = [
  { name: "রহিম ইসলাম", city: "ঢাকা", text: "গাছগুলো খুবই ভালো মানের এবং ডেলিভারি ছিল দ্রুত।" },
  { name: "মো. সাকিব", city: "চট্টগ্রাম", text: "সুন্দর করে প্যাকেজিং করা ছিল, গাছ একদম তাজা।" },
  { name: "নাদিয়া আক্তার", city: "সিলেট", text: "প্রফেশনাল সার্ভিস, খুবই খুশি হয়েছি।" },
];

export const Route = createFileRoute("/offer/$slug")({
  loader: async ({ params, context }) => {
    const page = await ensureLandingPage(context.queryClient, params.slug);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.page;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.headline} — অল ট্রি বিডি শপ` },
        { name: "robots", content: "noindex" },
        { property: "og:title", content: p.headline },
        { property: "og:image", content: p.heroImage ?? "" },
      ],
    };
  },
  component: LandingPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <h1 className="font-bn text-2xl font-bold">পেজটি পাওয়া যায়নি</h1>
        <a href="/" className="font-bn mt-3 inline-block text-primary underline">হোমে ফিরে যান</a>
      </div>
    </div>
  ),
});

function LandingPage() {
  const { page } = Route.useLoaderData();
  const formRef = useRef<HTMLFormElement>(null);
  const galleryLimit = 4;

  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", division: "", district: "", upazila: "", note: "",
  });

  useEffect(() => {
    const t = setTimeout(() => setPopupOpen(true), 800);
    return () => clearTimeout(t);
  }, []);

  const districts = useMemo(() => getDistricts(form.division), [form.division]);
  const upazilas = useMemo(() => getUpazilas(form.division, form.district), [form.division, form.district]);

  const setDivision = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForm((f) => ({ ...f, division: e.target.value, district: "", upazila: "" }));
  const setDistrict = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForm((f) => ({ ...f, district: e.target.value, upazila: "" }));
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const shipping = 0;
  const total = page.price * qty + shipping;
  const discount = page.oldPrice ? Math.round(((page.oldPrice - page.price) / page.oldPrice) * 100) : 0;
  const testimonials = page.testimonials.length > 0 ? page.testimonials : defaultTestimonials;
  const visibleGallery = page.gallery.slice(0, galleryLimit);
  const extraGalleryCount = page.gallery.length - galleryLimit;

  const scrollToOrder = () => {
    setPopupOpen(false);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const mutation = useMutation({
    mutationFn: () =>
      createOrder({
        data: {
          customerName: form.name,
          customerPhone: form.phone,
          customerEmail: form.email,
          shippingAddress: form.address,
          shippingDivision: form.division,
          shippingDistrict: form.district,
          shippingUpazila: form.upazila,
          shippingNote: form.note,
          items: [{
            slug: `landing-${page.slug}`,
            name: page.productName,
            image: page.heroImage ?? "",
            price: page.price,
            qty,
          }],
          subtotal: page.price * qty,
          shippingFee: shipping,
          total,
          source: `landing:${page.slug}`,
        },
      }),
    onSuccess: (res) => {
      setOrderNumber(res.orderNumber);
      setDone(true);
      toast.success("অর্ডার সফল হয়েছে!");
    },
    onError: (err: Error) => toast.error(friendlyError(err, "অর্ডার ব্যর্থ হয়েছে। আবার চেষ্টা করুন।")),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  if (done) {
    return (
      <div className="grid min-h-screen place-items-center bg-gradient-to-b from-primary/10 via-background to-background px-4">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto grid size-20 place-items-center rounded-full gradient-primary text-primary-foreground shadow-elegant">
            <CheckCircle2 className="size-10" />
          </div>
          <h1 className="font-bn mt-6 text-3xl font-bold">অর্ডার সফল হয়েছে!</h1>
          <p className="font-bn mt-3 text-lg font-semibold text-primary">অর্ডার নম্বর: {orderNumber}</p>
          <p className="font-bn mt-2 text-muted-foreground">শীঘ্রই আমরা কল দিয়ে অর্ডার নিশ্চিত করব।</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 sm:pb-0">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <img src={landingLogo} alt="Abid Nursery and Plants" className="size-9 rounded-full object-contain" />
            <span className="font-display hidden text-base font-bold sm:inline">Abid Nursery</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="font-bn hidden items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-white shadow-soft sm:flex"
            >
              <MessageCircle className="size-4" /> WhatsApp
            </a>
            <button
              type="button"
              onClick={scrollToOrder}
              className="font-bn rounded-full gradient-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-soft transition hover:shadow-elegant"
            >
              অর্ডার করুন
            </button>
          </div>
        </div>
      </header>

      {/* Hero: split layout — headline left, image right */}
      <section className="overflow-hidden bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="gradient-radial-leaf pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-30" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-8 px-4 py-12 sm:py-16 lg:grid-cols-2 lg:gap-12">
          <div className="text-center lg:text-left">
            {discount > 0 && (
              <span className="font-bn inline-flex items-center gap-1.5 rounded-full bg-destructive px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-destructive-foreground shadow-soft">
                <Flame className="size-3.5" /> সীমিত সময়ের অফার — {toBnDigits(discount)}% ছাড়
              </span>
            )}
            <h1 className="font-bn font-display mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {page.headline}
            </h1>
            <p className="font-bn mt-3 text-base text-muted-foreground">আপনার বাগান হোক সবুজ ও ফলবতী</p>

            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <TrustItem Icon={Truck} label="সারা বাংলাদেশে ডেলিভারি" compact />
              <TrustItem Icon={ShieldCheck} label="ক্যাশ অন ডেলিভারি" compact />
              <TrustItem Icon={BadgeCheck} label="মানের নিশ্চয়তা" compact />
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="font-bn inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-soft transition hover:shadow-elegant"
              >
                <MessageCircle className="size-4" /> WhatsApp এ অর্ডার করুন
              </a>
              <button
                type="button"
                onClick={scrollToOrder}
                className="font-bn inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-card px-6 py-3.5 text-sm font-bold text-primary shadow-soft transition hover:bg-primary/5"
              >
                অর্ডার ফর্ম পূরণ করুন
              </button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {page.heroImage ? (
              <SmartImage src={page.heroImage} alt={page.headline} aspect="square" className="w-full shadow-elegant" priority />
            ) : (
              <div className="grid aspect-square place-items-center rounded-3xl gradient-primary shadow-elegant">
                <Leaf className="size-24 text-primary-foreground/70" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8">
        {/* Product info card */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <div className="p-6 sm:p-8">
            <span className="font-bn inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              ফল গাছ
            </span>
            <h2 className="font-bn font-display mt-3 text-2xl font-bold text-foreground">{page.productName}</h2>
            <div className="mt-1.5 flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-gold" />)}
              <span className="font-bn ml-1 text-xs font-semibold text-muted-foreground">(৫.০)</span>
            </div>

            <div className="font-bn mt-4 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-primary">{formatBDT(page.price)}</span>
              {page.oldPrice && <span className="text-sm text-muted-foreground line-through">{formatBDT(page.oldPrice)}</span>}
              {discount > 0 && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                  {toBnDigits(discount)}% ছাড়
                </span>
              )}
            </div>

            {page.description && (
              <p className="font-bn mt-5 whitespace-pre-line leading-relaxed text-muted-foreground">{page.description}</p>
            )}
          </div>

          {/* Gallery thumbnails with +N overlay */}
          {visibleGallery.length > 0 && (
            <div className="grid grid-cols-4 gap-1 px-4 pb-4">
              {visibleGallery.map((url, i) => {
                const isLast = i === visibleGallery.length - 1 && extraGalleryCount > 0;
                return (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setPreviewImage(url)}
                    className="relative aspect-square overflow-hidden rounded-xl border border-border transition hover:scale-105"
                    aria-label="ছবি বড় করে দেখুন"
                  >
                    <SmartImage src={url} alt="" aspect="square" rounded={false} className="size-full" />
                    {isLast && (
                      <span className="absolute inset-0 grid place-items-center bg-black/60 text-sm font-bold text-white">
                        +{toBnDigits(extraGalleryCount)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Benefits section */}
        <div className="mt-6 rounded-3xl border border-border bg-primary/5 p-6 sm:p-8">
          <h3 className="font-bn font-display flex items-center gap-2 text-lg font-bold text-foreground">
            <Sprout className="size-5 text-primary" /> কেন আমাদের গাছ নিবেন?
          </h3>
          <ul className="mt-4 space-y-2.5">
            {defaultBenefits.map((b) => (
              <li key={b} className="font-bn flex items-start gap-2.5 text-sm text-foreground">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Order form */}
        <form ref={formRef} id="order-form" onSubmit={submit} className="mt-8 space-y-5 rounded-3xl border-2 border-primary/25 bg-card p-6 shadow-elegant sm:p-8">
          <div className="text-center">
            <h3 className="font-bn font-display text-xl font-bold text-foreground">এখনই অর্ডার করুন</h3>
            <p className="font-bn mt-1 text-sm text-muted-foreground">ফর্মটি পূরণ করুন, আমরা কল দিয়ে নিশ্চিত করব</p>
          </div>

          <div className="flex items-center justify-center gap-4 rounded-2xl bg-muted/40 p-4">
            <span className="font-bn text-sm font-semibold">পরিমাণ</span>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background p-1">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-9 place-items-center rounded-full transition hover:bg-accent"><MinusCircle className="size-4" /></button>
              <span className="font-bn min-w-9 text-center text-xl font-bold leading-normal">{toBnDigits(qty)}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} className="grid size-9 place-items-center rounded-full transition hover:bg-accent"><PlusCircle className="size-4" /></button>
            </div>
          </div>

          <Field label="পুরো নাম" required><input required className={fieldCls} placeholder="মো. ইমরান হোসেন" value={form.name} onChange={set("name")} /></Field>
          <Field label="ফোন (হোয়াটসঅ্যাপ)" required><input required type="tel" className={fieldCls} placeholder="+৮৮০ ১XXX-XXXXXX" value={form.phone} onChange={set("phone")} /></Field>

          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="বিভাগ" required>
              <select required className={fieldCls} value={form.division} onChange={setDivision}>
                <option value="" disabled>বিভাগ</option>
                {divisionNames.map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="জেলা" required>
              <select required disabled={!form.division} className={fieldCls} value={form.district} onChange={setDistrict}>
                <option value="" disabled>জেলা</option>
                {districts.map((d) => <option key={d.name}>{d.name}</option>)}
              </select>
            </Field>
            <Field label="উপজেলা" required>
              <select required disabled={!form.district} className={fieldCls} value={form.upazila} onChange={set("upazila")}>
                <option value="" disabled>উপজেলা</option>
                {upazilas.map((u) => <option key={u}>{u}</option>)}
              </select>
            </Field>
          </div>

          <Field label="বিস্তারিত ঠিকানা" required><input required className={fieldCls} placeholder="বাড়ি ১২, রোড ৪, ধানমন্ডি" value={form.address} onChange={set("address")} /></Field>

          <div className="flex items-center justify-between border-t border-dashed border-border pt-4">
            <span className="font-bn text-base font-semibold">সর্বমোট</span>
            <span className="font-display text-2xl font-bold text-primary">{formatBDT(total)}</span>
          </div>

          <button type="submit" disabled={mutation.isPending} className="font-bn w-full rounded-full gradient-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-soft transition hover:shadow-elegant disabled:opacity-50">
            {mutation.isPending ? "অর্ডার হচ্ছে…" : `অর্ডার নিশ্চিত করুন — ${formatBDT(total)}`}
          </button>
        </form>

        {/* Trust bar — 4 items */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <TrustItem Icon={Truck} label="সারা বাংলাদেশে ডেলিভারি" />
          <TrustItem Icon={ShieldCheck} label="ক্যাশ অন ডেলিভারি" />
          <TrustItem Icon={BadgeCheck} label="মানের নিশ্চয়তা" />
          <TrustItem Icon={Headset} label="২৪/৭ সাপোর্ট" />
        </div>

        {/* Testimonials — last section */}
        <div className="mt-10">
          <h3 className="font-bn font-display text-center text-lg font-bold">গ্রাহকদের মতামত</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <Quote className="size-5 text-primary/40" />
                <p className="font-bn mt-2 text-sm leading-relaxed text-foreground">{t.text}</p>
                <div className="mt-3 flex items-center gap-2.5">
                  {t.avatar ? (
                    <SmartImage src={t.avatar} alt="" aspect="square" className="size-9 shrink-0 rounded-full" />
                  ) : (
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {t.name.trim().charAt(0)}
                    </span>
                  )}
                  <div>
                    <p className="font-bn text-xs font-bold text-foreground">{t.name}</p>
                    {t.city && <p className="font-bn text-[11px] text-muted-foreground">{t.city}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-card/95 p-3 shadow-elegant backdrop-blur sm:hidden">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="grid size-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-white shadow-soft"
          aria-label="হোয়াটসঅ্যাপে যোগাযোগ করুন"
        >
          <MessageCircle className="size-5" />
        </a>
        <a href="#order-form" className="font-bn flex flex-1 items-center justify-center rounded-full gradient-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-soft">
          অর্ডার করুন — {formatBDT(total)}
        </a>
      </div>

      {/* Image preview modal */}
      <Dialog open={!!previewImage} onOpenChange={(open) => !open && setPreviewImage(null)}>
        <DialogContent className="max-w-lg p-2">
          {previewImage && <SmartImage src={previewImage} alt="" aspect="square" className="w-full" />}
        </DialogContent>
      </Dialog>

      {/* Auto-show offer popup */}
      <Dialog open={popupOpen} onOpenChange={setPopupOpen}>
        <DialogContent className="max-w-sm text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-destructive/10 text-destructive">
            <Flame className="size-7" />
          </div>
          {discount > 0 && (
            <p className="font-bn font-display text-2xl font-bold text-destructive">সীমিত সময়ের অফার — {toBnDigits(discount)}% ছাড়</p>
          )}
          <p className="font-bn text-lg font-bold">{page.productName}</p>
          <div className="font-bn flex items-center justify-center gap-2">
            {page.oldPrice && <span className="text-sm text-muted-foreground line-through">{formatBDT(page.oldPrice)}</span>}
            <span className="text-2xl font-bold text-primary">{formatBDT(page.price)}</span>
          </div>
          <button
            type="button"
            onClick={scrollToOrder}
            className="font-bn mt-2 w-full rounded-full gradient-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-soft transition hover:shadow-elegant"
          >
            অফার দেখুন
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TrustItem({ Icon, label, compact }: { Icon: typeof Truck; label: string; compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2.5 shadow-soft">
        <Icon className="size-4 shrink-0 text-primary" />
        <span className="font-bn text-xs font-medium">{label}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-soft">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-4.5" />
      </span>
      <span className="font-bn text-sm font-medium">{label}</span>
    </div>
  );
}

const fieldCls = "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 font-bn";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-bn mb-1.5 block text-xs font-medium tracking-wide text-muted-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      {children}
    </label>
  );
}
