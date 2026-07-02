import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, BadgeCheck, Headphones, Leaf, Quote, ShieldCheck, Sparkles, Star, Truck, Wallet,
} from "lucide-react";
import type { Product } from "@/data/products";
import type { Testimonial } from "@/data/site";
import {
  useProducts, useTestimonials, selectBestsellers, selectNewArrivals, selectByCategory,
} from "@/hooks/useCatalog";
import { formatBDT } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { onImgError, unsplash, unsplashSrcSet } from "@/lib/img";
import hero2 from "@/assets/mobile-hero-2.jpg";
import deliveryBanner from "@/assets/delivery-banner.jpg";
import catFruitBanner from "@/assets/cat-fruit-banner.jpg";
import catFlowerBanner from "@/assets/cat-flower-banner.jpg";
import pMango from "@/assets/p-mango.png";
import pJackfruit from "@/assets/p-jackfruit.png";
import pLitchi from "@/assets/p-litchi.png";
import pRose from "@/assets/p-rose.png";

const TRUST = [
  { Icon: Truck, t: "সারা বাংলাদেশে ডেলিভারি", s: "দ্রুত ও নিরাপদ ডেলিভারি" },
  { Icon: Wallet, t: "ক্যাশ অন ডেলিভারি", s: "পণ্য বুঝে নেবেন!" },
  { Icon: BadgeCheck, t: "উন্নত মানের গাছ", s: "সুস্থ ও পরিচর্যা করা গাছ" },
  { Icon: Headphones, t: "২৪/৭ কাস্টমার সাপোর্ট", s: "আমরা আছি আপনার পাশে" },
];

const WHY_US = [
  { Icon: ShieldCheck, t: "নিরাপদ প্যাকেজিং", s: "গাছ সুরক্ষিতভাবে প্যাক করে পাঠানো হয়" },
  { Icon: Leaf, t: "সতেজ ও সুস্থ চারা", s: "নার্সারি থেকে সরাসরি সংগ্রহ" },
  { Icon: Sparkles, t: "বিশেষজ্ঞ পরামর্শ", s: "গাছের যত্নে সঠিক গাইডলাইন" },
];

const POPULAR_SLUGS = ["amrapali-mango-grafted", "thai-pink-guava", "bedana-litchi", "desi-rose"];

export function MobileHome() {
  const { data: products = [] } = useProducts();
  const { data: testimonials = [] } = useTestimonials();

  const fresh = selectNewArrivals(products).slice(0, 8);
  const bestsellers = selectBestsellers(products).slice(0, 8);
  const fruitCollection = [
    ...selectByCategory(products, "guava"),
    ...selectByCategory(products, "litchi"),
    ...selectByCategory(products, "citrus"),
    ...selectByCategory(products, "tropical"),
  ].slice(0, 8);

  return (
    <div className="lg:hidden">
      <MobileHero />
      <MobileTrust />
      <MobileSectionTitle title="আমাদের ক্যাটাগরি" />
      <MobileCategoryCards />
      <MobileSectionTitle title="জনপ্রিয় গাছ সমূহ" />
      <MobilePopular products={products} />
      <MobileCodBanner />
      {fresh.length > 0 && (
        <>
          <MobileSectionTitle title="নতুন এসেছে" />
          <MobileProductRail products={fresh} href="/shop?sort=new" ctaBn="সব নতুন গাছ" />
        </>
      )}
      {bestsellers.length > 0 && (
        <>
          <MobileSectionTitle title="বেস্ট সেলার" />
          <MobileProductRail products={bestsellers} href="/shop?sort=bestsellers" ctaBn="সব বেস্ট সেলার" />
        </>
      )}
      {fruitCollection.length > 0 && (
        <>
          <MobileSectionTitle title="ফল গাছের সংগ্রহ" />
          <MobileProductRail products={fruitCollection} href="/categories/mango" ctaBn="সব ফল গাছ" />
        </>
      )}
      {testimonials.length > 0 && (
        <>
          <MobileSectionTitle title="কাস্টমার রিভিউ" />
          <MobileReviews testimonials={testimonials} />
        </>
      )}
      <MobileSectionTitle title="কেন আমাদের বেছে নেবেন" />
      <MobileWhyUs />
      <div className="h-6" />
    </div>
  );
}


/* ── Hero ──────────────────────────────────────── */
function MobileHero() {
  return (
    <section className="px-3 pt-3">
      <Link to="/shop" aria-label="ফল ও ফুলের গাছ" className="block overflow-hidden rounded-[28px] shadow-elegant">
        <motion.img
          src={hero2}
          alt="ফল ও ফুলের গাছ"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-auto w-full object-contain"
          width={1600}
          height={941}
          onError={onImgError}
        />
      </Link>
    </section>
  );
}

/* ── Trust strip ───────────────────────────────── */
function MobileTrust() {
  return (
    <section className="-mt-6 px-3">
      <div className="relative z-10 grid grid-cols-4 gap-2 rounded-3xl border border-border/60 bg-card p-4 shadow-elegant">
        {TRUST.map(({ Icon, t, s }) => (
          <div key={t} className="flex flex-col items-center text-center">
            <span className="grid size-10 place-items-center rounded-full bg-[#1B5E20]/10 text-[#1B5E20]">
              <Icon className="size-5" strokeWidth={2.2} />
            </span>
            <p className="font-bn mt-2 text-[10px] font-bold leading-tight text-foreground">{t}</p>
            <p className="font-bn mt-1 text-[9px] leading-tight text-muted-foreground">{s}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Section title with decorative dashed arrows ── */
function MobileSectionTitle({ title }: { title: string }) {
  return (
    <div className="mt-8 flex items-center justify-center gap-2 px-4">
      <span aria-hidden className="font-bn flex items-center gap-1 text-[13px] font-bold tracking-tight text-[#1B5E20]">
        <span className="inline-block h-px w-5 bg-[#1B5E20]/60" />
        »»
      </span>
      <h2 className="font-bn text-[15px] font-extrabold tracking-tight text-foreground">{title}</h2>
      <span aria-hidden className="font-bn flex items-center gap-1 text-[13px] font-bold tracking-tight text-[#1B5E20]">
        ««
        <span className="inline-block h-px w-5 bg-[#1B5E20]/60" />
      </span>
    </div>
  );
}

/* ── 2 category banners ────────────────────────── */
function MobileCategoryCards() {
  return (
    <section className="mt-4 grid grid-cols-2 gap-3 px-3">
      <Link to="/categories/fruits" aria-label="ফল গাছ" className="block overflow-hidden rounded-3xl bg-[#EAF8E7] shadow-soft active:scale-[0.98]">
        <img
          src={catFruitBanner}
          alt="ফল গাছ"
          className="h-auto w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </Link>
      <Link to="/categories/flowers" aria-label="ফুল গাছ" className="block overflow-hidden rounded-3xl bg-[#FCE4EC] shadow-soft active:scale-[0.98]">
        <img
          src={catFlowerBanner}
          alt="ফুল গাছ"
          className="h-auto w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </Link>
    </section>
  );
}

/* ── Popular products: 4 horizontal-scroll cards ── */
type PopItem = { slug: string; name: string; price: number; image: string };
const POPULAR: PopItem[] = [
  { slug: "amrapali-mango-grafted", name: "আম গাছ", price: 350, image: pMango },
  { slug: "kathal-jackfruit",       name: "কাঁঠাল গাছ", price: 450, image: pJackfruit },
  { slug: "bedana-litchi",          name: "লিচু গাছ", price: 400, image: pLitchi },
  { slug: "desi-rose",              name: "গোলাপ গাছ", price: 250, image: pRose },
];

function MobilePopular({ products }: { products: Product[] }) {
  return (
    <section className="mt-4 px-3">
      <div className="-mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {POPULAR.map((p, idx) => (
          <PopularCard key={p.slug} item={p} index={idx} products={products} />
        ))}
      </div>
    </section>
  );
}

function PopularCard({ item, index, products }: { item: PopItem; index: number; products: Product[] }) {
  const cart = useCart();
  const fallback = products.find((x) => x.slug === item.slug);

  const handleAdd = () => {
    const product: Product = fallback ?? {
      slug: item.slug,
      name: item.name,
      nameBn: item.name,
      category: "fruit",
      price: item.price,
      rating: 4.8,
      reviews: 0,
      image: item.image,
      gallery: [item.image],
      shortDescription: item.name,
      description: item.name,
      height: "১.৫-২ ফুট",
      age: "১ বছর",
      potIncluded: true,
      inStock: true,
      careLevel: "সহজ",
      sunlight: "পূর্ণ রোদ",
      water: "মাঝারি",
    };
    cart.add({ ...product, price: item.price, name: item.name });
    toast.success(`${item.name} কার্টে যোগ হয়েছে`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.2) }}
      className="flex w-[44%] shrink-0 snap-start flex-col items-center rounded-2xl border border-border/60 bg-card p-3 text-center shadow-soft"
    >
      <Link
        to={fallback ? "/products/$slug" : "/shop"}
        {...(fallback ? { params: { slug: item.slug } } : {})}
        className="grid h-24 w-full place-items-center"
      >
        <img
          src={item.image}
          alt={item.name}
          className="h-24 w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </Link>
      <p className="font-bn mt-2 line-clamp-1 text-[13px] font-bold text-foreground">{item.name}</p>
      <p className="font-bn mt-0.5 text-[15px] font-extrabold text-[#1B5E20]">{formatBDT(item.price)}</p>
      <button
        type="button"
        onClick={handleAdd}
        className="font-bn mt-2 w-full rounded-full border border-[#1B5E20]/30 bg-white py-1.5 text-[11px] font-bold text-[#1B5E20] active:scale-95"
      >
        অর্ডার করুন
      </button>
    </motion.article>
  );
}
function MobileCodBanner() {
  return (
    <section className="mt-6 px-3">
      <div className="overflow-hidden rounded-2xl shadow-elegant">
        <img
          src={deliveryBanner}
          alt="ক্যাশ অন ডেলিভারি"
          className="h-auto w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}

/* ── Generic product rail (new/bestseller/fruit) ── */
function MobileProductRail({ products, href, ctaBn }: { products: Product[]; href: string; ctaBn: string }) {
  return (
    <section className="mt-4 px-3">
      <div className="-mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {products.map((p, idx) => (
          <RailCard key={p.slug} product={p} index={idx} />
        ))}
      </div>
      <div className="mt-3 text-center">
        <Link
          to={href as any}
          className="font-bn inline-flex items-center gap-1.5 rounded-full border border-[#1B5E20]/30 bg-white px-5 py-2.5 text-[12px] font-bold text-[#1B5E20] shadow-soft active:scale-95"
        >
          {ctaBn} <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}

function RailCard({ product, index }: { product: Product; index: number }) {
  const cart = useCart();

  const handleAdd = () => {
    cart.add(product);
    toast.success(`${product.nameBn} কার্টে যোগ হয়েছে`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.2) }}
      className="flex w-[44%] shrink-0 snap-start flex-col items-center rounded-2xl border border-border/60 bg-card p-3 text-center shadow-soft"
    >
      <Link to="/products/$slug" params={{ slug: product.slug }} className="grid h-24 w-full place-items-center">
        <img
          src={product.image}
          alt={product.nameBn}
          className="h-24 w-full object-contain"
          loading="lazy"
          decoding="async"
          onError={onImgError}
        />
      </Link>
      <p className="font-bn mt-2 line-clamp-1 text-[13px] font-bold text-foreground">{product.nameBn}</p>
      <p className="font-bn mt-0.5 text-[15px] font-extrabold text-[#1B5E20]">{formatBDT(product.price)}</p>
      <button
        type="button"
        onClick={handleAdd}
        className="font-bn mt-2 w-full rounded-full border border-[#1B5E20]/30 bg-white py-1.5 text-[11px] font-bold text-[#1B5E20] active:scale-95"
      >
        অর্ডার করুন
      </button>
    </motion.article>
  );
}

/* ── Reviews ───────────────────────────────────── */
function MobileReviews({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="mt-4 px-3">
      <div className="-mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="relative w-[80%] shrink-0 snap-start rounded-2xl border border-border/60 bg-card p-4 shadow-soft"
          >
            <Quote className="absolute right-4 top-4 size-7 text-[#EAF8E7]" />
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: t.rating }).map((_, n) => (
                <Star key={n} className="size-3.5 fill-gold" />
              ))}
            </div>
            <p className="font-bn mt-2.5 line-clamp-3 text-[12.5px] leading-relaxed text-foreground/85">{t.text}</p>
            <div className="mt-3 flex items-center gap-2.5 border-t border-border/50 pt-3">
              <img src={t.avatar} alt={`${t.name} avatar`} width={36} height={36} className="size-9 rounded-full object-cover" loading="lazy" decoding="async" />
              <div>
                <p className="text-[12px] font-semibold text-foreground">{t.name}</p>
                <p className="text-[10px] text-muted-foreground">{t.city} · {t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Why choose us ─────────────────────────────── */
function MobileWhyUs() {
  return (
    <section className="mt-4 px-3">
      <div className="flex flex-col gap-3">
        {WHY_US.map(({ Icon, t, s }) => (
          <div key={t} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#1B5E20]/10 text-[#1B5E20]">
              <Icon className="size-5" strokeWidth={2.2} />
            </span>
            <div>
              <p className="font-bn text-[13px] font-bold text-foreground">{t}</p>
              <p className="font-bn mt-0.5 text-[11px] text-muted-foreground">{s}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
