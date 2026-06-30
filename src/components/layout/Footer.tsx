import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Leaf, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { toast } from "sonner";
import { site } from "@/data/site";
import { categories } from "@/data/categories";
import { Container } from "@/components/common/Container";

const socialLinks = [
  { Icon: Facebook, href: site.socials.facebook, label: "Facebook" },
  { Icon: Instagram, href: site.socials.instagram, label: "Instagram" },
  { Icon: Youtube, href: site.socials.youtube, label: "YouTube" },
];

const cols = [
  {
    title: "শপ",
    links: [
      { label: "সব গাছ", to: "/shop" },
      { label: "সব বিভাগ", to: "/categories" },
      { label: "নতুন এসেছে", to: "/shop" },
      { label: "বেস্ট সেলার", to: "/shop" },
    ],
  },
  {
    title: "প্রতিষ্ঠান",
    links: [
      { label: "আমাদের সম্পর্কে", to: "/about" },
      { label: "ব্লগ", to: "/blog" },
      { label: "পরিচর্যা গাইড", to: "/care-guide" },
      { label: "প্রশ্নোত্তর", to: "/faq" },
    ],
  },
  {
    title: "একাউন্ট",
    links: [
      { label: "আমার একাউন্ট", to: "/account" },
      { label: "আমার অর্ডার", to: "/account/orders" },
      { label: "ইচ্ছার তালিকা", to: "/account/wishlist" },
      { label: "ঠিকানা", to: "/account/addresses" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t bg-primary-dark text-primary-foreground">
      <div className="pointer-events-none absolute -top-32 right-0 size-[420px] rounded-full bg-primary-light/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-0 size-[380px] rounded-full bg-gold/20 blur-3xl" />

      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_3fr_1.4fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-white/10 backdrop-blur">
                <Leaf className="size-6" />
              </span>
              <div className="leading-tight">
                <div className="font-display text-lg font-bold">All Tree BD Shop</div>
                <div className="font-bn text-xs opacity-80">অনলাইনে গাছের চারা বিক্রয়</div>
              </div>
            </Link>
            <p className="font-bn mt-5 text-sm opacity-80">
              বাংলাদেশের প্রিমিয়াম অনলাইন নার্সারি — গ্রাফটিং ফল গাছ, ইনডোর গ্রিন ও দুর্লভ বিদেশি চারা, ৬৪ জেলায় নিরাপদে ডেলিভারি।
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer noopener" aria-label={label} className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-gold hover:text-gold-foreground">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid gap-8 sm:grid-cols-4">
            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="font-bn mb-4 text-sm font-semibold tracking-wide opacity-90">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="font-bn text-sm opacity-75 transition hover:opacity-100 hover:text-gold">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="font-bn mb-4 text-sm font-semibold tracking-wide opacity-90">জনপ্রিয় বিভাগ</h4>
              <ul className="space-y-2.5">
                {categories.slice(0, 5).map((c) => (
                  <li key={c.slug}>
                    <Link to="/categories/$slug" params={{ slug: c.slug }} className="font-bn text-sm opacity-75 transition hover:opacity-100 hover:text-gold">{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bn mb-4 text-sm font-semibold tracking-wide opacity-90">যোগাযোগ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span className="font-bn opacity-85">{site.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-gold" />
                <a href={`tel:${site.phone}`} className="opacity-85 hover:opacity-100">{site.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-gold" />
                <a href={`mailto:${site.email}`} className="opacity-85 hover:opacity-100">{site.email}</a>
              </li>
            </ul>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                toast.success("সাবস্ক্রাইব হয়েছে — ইনবক্সে গাছ পরিচর্যার টিপস পাবেন 🌱");
                form.reset();
              }}
              className="mt-6"
            >
              <label htmlFor="footer-newsletter" className="font-bn text-xs tracking-wide opacity-80">সাপ্তাহিক গাছ পরিচর্যার টিপস</label>
              <div className="mt-2 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur">
                <input id="footer-newsletter" name="email" type="email" required placeholder="আপনার ইমেইল" className="font-bn flex-1 bg-transparent px-3 py-2 text-sm placeholder:text-white/50 focus:outline-none" />
                <button type="submit" className="font-bn rounded-full bg-gold px-4 py-2 text-xs font-semibold text-gold-foreground transition hover:brightness-110">
                  সাবস্ক্রাইব
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs opacity-75 sm:flex-row">
          <p className="font-bn">© {new Date().getFullYear()} অল ট্রি বিডি শপ। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="font-bn">বাংলাদেশে ভালোবাসা দিয়ে তৈরি 🇧🇩</p>
        </div>
      </Container>
    </footer>
  );
}
