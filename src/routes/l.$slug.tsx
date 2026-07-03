import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, MinusCircle, PlusCircle, ShieldCheck, Truck } from "lucide-react";
import { toast } from "sonner";
import { SmartImage } from "@/components/common/SmartImage";
import { ensureLandingPage } from "@/hooks/useCatalog";
import { formatBDT, toBnDigits } from "@/lib/format";
import { createOrder } from "@/lib/supabase/orders.server";
import { friendlyError } from "@/lib/errorMessage";
import { divisionNames, getDistricts, getUpazilas } from "@/data/bangladesh-geo";
import logoIcon from "@/assets/logo-icon.png";
import { site } from "@/data/site";

export const Route = createFileRoute("/l/$slug")({
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

  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", division: "", district: "", upazila: "", note: "",
  });

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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <img src={logoIcon} alt="Abid Nursery and Plants" className="size-8 object-contain" />
            <span className="font-display text-sm font-bold">Abid Nursery</span>
          </div>
          <a href={`tel:${site.phone}`} className="font-bn text-sm font-semibold text-primary">{site.phone}</a>
        </div>
      </header>

      {done ? (
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <CheckCircle2 className="mx-auto size-16 text-primary" />
          <h1 className="font-bn mt-6 text-3xl font-bold">অর্ডার সফল হয়েছে!</h1>
          <p className="font-bn mt-2 text-muted-foreground">অর্ডার নম্বর: {orderNumber} · শীঘ্রই কল দিয়ে নিশ্চিত করব।</p>
        </div>
      ) : (
        <>
          <section className="border-b border-border bg-primary/5">
            <div className="mx-auto max-w-3xl px-4 py-10 text-center">
              <h1 className="font-bn font-display text-2xl font-bold leading-snug sm:text-3xl">{page.headline}</h1>
              {page.heroImage && (
                <SmartImage src={page.heroImage} alt={page.headline} aspect="video" className="mx-auto mt-6 max-w-lg rounded-2xl shadow-elegant" />
              )}
            </div>
          </section>

          <section className="mx-auto max-w-3xl px-4 py-10">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-bn font-display text-xl font-bold">{page.productName}</h2>
                <div className="font-bn flex items-baseline gap-2">
                  {page.oldPrice && <span className="text-sm text-muted-foreground line-through">{formatBDT(page.oldPrice)}</span>}
                  <span className="text-2xl font-bold text-primary">{formatBDT(page.price)}</span>
                </div>
              </div>
              {page.description && <p className="font-bn mt-3 whitespace-pre-line text-sm text-muted-foreground">{page.description}</p>}

              {page.gallery.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {page.gallery.map((url) => (
                    <SmartImage key={url} src={url} alt="" aspect="square" className="rounded-xl" />
                  ))}
                </div>
              )}
            </div>

            {page.testimonials.length > 0 && (
              <div className="mt-6 space-y-3">
                {page.testimonials.map((t, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-card p-4">
                    <p className="font-bn text-sm">"{t.text}"</p>
                    <p className="font-bn mt-2 text-xs font-semibold text-muted-foreground">— {t.name}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 rounded-2xl bg-primary/5 p-3">
                <Truck className="size-5 text-primary" />
                <span className="font-bn">সারা বাংলাদেশে ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-primary/5 p-3">
                <ShieldCheck className="size-5 text-primary" />
                <span className="font-bn">ক্যাশ অন ডেলিভারি</span>
              </div>
            </div>

            <form onSubmit={submit} className="mt-8 space-y-5 rounded-3xl border-2 border-primary/30 bg-card p-6 shadow-elegant">
              <h3 className="font-bn font-display text-lg font-bold">এখনই অর্ডার করুন</h3>

              <div className="flex items-center gap-3">
                <span className="font-bn text-sm font-medium">পরিমাণ</span>
                <div className="inline-flex items-center gap-1 rounded-full border border-border bg-background p-1">
                  <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-8 place-items-center rounded-full hover:bg-accent"><MinusCircle className="size-4" /></button>
                  <span className="font-bn min-w-8 text-center font-bold tabular-nums">{toBnDigits(qty)}</span>
                  <button type="button" onClick={() => setQty((q) => q + 1)} className="grid size-8 place-items-center rounded-full hover:bg-accent"><PlusCircle className="size-4" /></button>
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

              <dl className="font-bn space-y-1 border-t pt-3 text-sm">
                <div className="flex justify-between border-t pt-2 text-base"><dt className="font-semibold">মোট</dt><dd className="font-display text-xl font-bold text-primary">{formatBDT(total)}</dd></div>
              </dl>

              <button type="submit" disabled={mutation.isPending} className="font-bn w-full rounded-full gradient-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-soft transition hover:shadow-elegant disabled:opacity-50">
                {mutation.isPending ? "অর্ডার হচ্ছে…" : `অর্ডার নিশ্চিত করুন — ${formatBDT(total)}`}
              </button>
            </form>
          </section>
        </>
      )}
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
