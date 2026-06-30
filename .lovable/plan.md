# পরিকল্পনা: সম্পূর্ণ বাংলা UI + Premium Homepage Redesign

## লক্ষ্য
সম্পূর্ণ ওয়েবসাইটের UI/UX ১০০% বাংলায় রূপান্তর করা এবং Homepage-কে সংযুক্ত Reference অনুযায়ী Premium, Modern Design-এ পুনর্গঠন করা। শুধু Logo, Domain, Email, Social Link, URL ও Code ইংরেজি থাকবে।

---

## ১. Typography ও Font Setup
- `src/routes/__root.tsx` head-এ Google Fonts link যোগ: **Hind Siliguri** (primary) + **Noto Sans Bengali** (fallback)
- `src/styles.css`-এ `body { font-family: 'Hind Siliguri', 'Noto Sans Bengali', sans-serif; }`
- বাংলা typography-র জন্য line-height ও letter-spacing tuning
- `lang="bn"` attribute root HTML-এ যোগ

## ২. Color Theme আপডেট
`src/styles.css`-এ semantic tokens আপডেট:
- `--primary` → #2E7D32 (oklch রূপান্তরিত)
- `--primary-dark` → #1B5E20
- `--primary-soft` → #EAF8E7
- `--background` → #F8FFF7
- `--accent-gold` → #C8A415
- `--gradient-primary`, `--shadow-elegant` পুনঃসংজ্ঞায়িত

## ৩. Homepage Premium Redesign
`src/components/desktop/DesktopHome.tsx` ও `src/components/mobile/MobileHome.tsx` পুনঃনির্মাণ — Reference অনুযায়ী একই Layout Desktop ও Mobile উভয়ে (Scale ভিন্ন)।

### Section ক্রম:
1. **Announcement Bar** — উপরে slim bar: "সারা বাংলাদেশে ক্যাশ অন ডেলিভারি"
2. **Navbar** — অপরিবর্তিত, শুধু সব menu বাংলায়
3. **Hero Slider** — Full-width, বাম-Heading + Button, ডান-Plant Image, Auto-slide, Fade, Arrows, Dots
4. **Floating Benefits Card** — Hero-এর নিচে overlap, 4 সুবিধা (ডেলিভারি, COD, মানসম্মত গাছ, ২৪/৭ সাপোর্ট)
5. **Category Banner** — ২টি বড় Card: 🌳 ফলের গাছ (সবুজ bg) + 🌸 ফুলের গাছ (গোলাপি bg)
6. **জনপ্রিয় গাছসমূহ Grid** — Responsive (Desktop 4 / Tablet 3 / Mobile 2)
7. **Promotional Banner** — সবুজ gradient, "ক্যাশ অন ডেলিভারি" + Delivery Box image
8. **নতুন Collection** rail
9. **গ্রাহকদের মতামত** — Testimonial cards
10. **Blog** preview — সর্বশেষ ৩টি article
11. **Footer** — সম্পূর্ণ বাংলায়

### Card spec:
- Product Card: বড় image, বাংলা নাম, ৳ মূল্য, "অর্ডার করুন" button, Wishlist heart icon, rounded-2xl, soft shadow, hover lift+scale
- Category Card: rounded-3xl, Premium image, "দেখুন" button

## ৪. বাংলা অনুবাদ — সব Component ও Route
নিচের সব file-এ ইংরেজি text বাংলায় রূপান্তর:

### Layout
- `Navbar.tsx` — Menu: হোম, শপ, ক্যাটাগরি, ব্লগ, গ্যালারি, যোগাযোগ, আমাদের সম্পর্কে; Search placeholder: "গাছ খুঁজুন..."
- `MobileBottomNav.tsx` — হোম, শপ, কার্ট, ইচ্ছেতালিকা, অ্যাকাউন্ট
- `Footer.tsx` — সব heading, link, copyright বাংলায়
- `SearchOverlay.tsx`, `PageHeader.tsx`

### Common
- `ProductCard.tsx` — "অর্ডার করুন", "ইচ্ছার তালিকায়", "স্টক শেষ"
- `CategoryCard.tsx` — "দেখুন"

### Routes (সব route-এর head meta + page content বাংলায়):
- `index.tsx`, `shop.tsx`, `categories.tsx`, `categories.$slug.tsx`, `products.$slug.tsx`
- `cart.tsx`, `checkout.tsx`, `track-order.tsx`
- `account.*` (index, orders, addresses, wishlist), `login.tsx`, `register.tsx`
- `about.tsx`, `contact.tsx`, `faq.tsx`, `care-guide.tsx`
- `blog.tsx`, `blog.$slug.tsx`, `gallery.tsx`, `video-gallery.tsx`, `reviews.tsx`, `search.tsx`
- `privacy.tsx`, `terms.tsx`, `return-policy.tsx`, `shipping-policy.tsx`
- `admin.*` — admin labels বাংলায়

### Data
- `src/data/site.ts` — site name, tagline, nav labels
- `src/data/categories.ts` — category নাম ও description বাংলায়
- `src/data/products.ts` — গাছের নাম, description, tags বাংলায়

### Forms, Toast, Error
- সব form label, placeholder, validation message, toast notification বাংলায়

## ৫. Image Quality
সব placeholder ও দুর্বল image কে high-resolution Unsplash nursery/plant photo দিয়ে প্রতিস্থাপন (`?w=1600&q=85&auto=format&fit=crop`)।

## ৬. Animation
Framer Motion — fade-up, slide-in, hover scale, image zoom, smooth scroll, button ripple — Homepage-এর প্রতিটি section-এ।

## ৭. Responsive
Reference Layout Desktop, Laptop, Tablet, Mobile — সব breakpoint-এ একই structure, ভিন্ন scale। Container width, padding, grid columns breakpoint-অনুযায়ী tune করা হবে।

---

## প্রযুক্তিগত নোট
- কাজের ব্যাপ্তি বড় (৪০+ file)। আমি batch parallel edit ব্যবহার করব দ্রুত সম্পন্নের জন্য।
- কোনো hardcoded color (`text-white`, `bg-black`) ব্যবহার করব না — সব semantic token-এর মাধ্যমে।
- বিদ্যমান route structure, data shape, business logic অপরিবর্তিত থাকবে — শুধু presentation ও copy পরিবর্তন।
- বাংলা সংখ্যা (১২৩৪৫৬৭৮৯০) মূল্য display-এ ব্যবহার করা হবে format helper-এর মাধ্যমে।

আপনি Plan অনুমোদন দিলে আমি ধাপে ধাপে বাস্তবায়ন শুরু করব।
