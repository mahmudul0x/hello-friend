export type Product = {
  slug: string;
  name: string;
  nameBn: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  badges?: ("বেস্ট সেলার" | "নতুন" | "লিমিটেড" | "গ্রাফটিং" | "অর্গানিক")[];
  shortDescription: string;
  description: string;
  height: string;
  age: string;
  potIncluded: boolean;
  inStock: boolean;
  careLevel: "সহজ" | "মাঝারি" | "এক্সপার্ট";
  sunlight: "পূর্ণ রোদ" | "আংশিক ছায়া" | "ইনডোর উজ্জ্বল";
  water: "কম" | "মাঝারি" | "বেশি";
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;

export const products: Product[] = [
  {
    slug: "amrapali-mango-grafted",
    name: "আম্রপালি আম (গ্রাফটিং)",
    nameBn: "আম্রপালি আম (গ্রাফটিং)",
    category: "mango",
    price: 650,
    oldPrice: 850,
    rating: 4.9,
    reviews: 218,
    image: img("photo-1553279768-865429fa0078"),
    gallery: [
      img("photo-1553279768-865429fa0078"),
      img("photo-1591735026282-bb24fd6c0451"),
      img("photo-1605027990121-cbae9e0642db"),
    ],
    badges: ["বেস্ট সেলার", "গ্রাফটিং"],
    shortDescription: "বামন, উচ্চ ফলনশীল আম — ২ বছরে ফল দেয়।",
    description:
      "আম্রপালি একটি বামন, নিয়মিত ফলদায়ক হাইব্রিড আম। মিষ্টি, আঁশহীন ও গাঢ় কমলা শাঁস। ছাদ ও ছোট বাগানের জন্য আদর্শ। বোম্বাই রুটস্টকে গ্রাফটিং করা — দ্রুত ফল দেয়।",
    height: "২.৫ – ৩ ফুট",
    age: "১২ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "পূর্ণ রোদ",
    water: "মাঝারি",
  },
  {
    slug: "haribhanga-mango",
    name: "হাঁড়িভাঙ্গা আম",
    nameBn: "হাঁড়িভাঙ্গা আম",
    category: "mango",
    price: 780,
    rating: 4.8,
    reviews: 142,
    image: img("photo-1591735026282-bb24fd6c0451"),
    gallery: [img("photo-1591735026282-bb24fd6c0451")],
    badges: ["গ্রাফটিং"],
    shortDescription: "রংপুরের ঐতিহ্যবাহী সুগন্ধি আম।",
    description:
      "রংপুরের আসল হাঁড়িভাঙ্গা। বড়, আঁশহীন, প্রচণ্ড মিষ্টি ও সুগন্ধি ফল। মাতৃ গাছ থেকে গ্রাফটিং করা চারা।",
    height: "৩ – ৩.৫ ফুট",
    age: "১৪ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "পূর্ণ রোদ",
    water: "মাঝারি",
  },
  {
    slug: "seedless-lemon",
    name: "বীজহীন লেবু",
    nameBn: "বীজহীন লেবু",
    category: "citrus",
    price: 420,
    oldPrice: 520,
    rating: 4.7,
    reviews: 89,
    image: img("photo-1591287083773-9a52902db5f0"),
    gallery: [img("photo-1591287083773-9a52902db5f0")],
    badges: ["বেস্ট সেলার"],
    shortDescription: "সারা বছর রসালো লেবু, বীজ নেই।",
    description:
      "কম্প্যাক্ট, কাঁটাবিহীন জাত — সারা বছর ফল দেয়। পাতলা খোসা, প্রচুর রস ও বীজহীন। রান্নাঘরের বাগানের জন্য আদর্শ।",
    height: "১.৫ – ২ ফুট",
    age: "৮ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "পূর্ণ রোদ",
    water: "মাঝারি",
  },
  {
    slug: "darjeeling-orange",
    name: "দার্জিলিং কমলা",
    nameBn: "দার্জিলিং কমলা",
    category: "citrus",
    price: 950,
    rating: 4.6,
    reviews: 54,
    image: img("photo-1582979512210-99b6a53386f9"),
    gallery: [img("photo-1582979512210-99b6a53386f9")],
    badges: ["লিমিটেড", "গ্রাফটিং"],
    shortDescription: "মিষ্টি, সহজে খোসা ছাড়ানো পাহাড়ি কমলা।",
    description:
      "দার্জিলিং অঞ্চলের মাতৃ গাছ থেকে চাষ। মিষ্টি-টক রসালো কমলা, ঢিলেঢালা খোসা। শীতল আবহাওয়ায় ভালো জন্মায়।",
    height: "২ – ২.৫ ফুট",
    age: "১৬ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "মাঝারি",
    sunlight: "পূর্ণ রোদ",
    water: "মাঝারি",
  },
  {
    slug: "thai-pink-guava",
    name: "থাই পিংক পেয়ারা",
    nameBn: "থাই পিংক পেয়ারা",
    category: "guava",
    price: 380,
    rating: 4.8,
    reviews: 167,
    image: img("photo-1633380110125-f6e685676160"),
    gallery: [img("photo-1633380110125-f6e685676160")],
    badges: ["বেস্ট সেলার", "অর্গানিক"],
    shortDescription: "গোলাপি শাঁসের মুচমুচে পেয়ারা, প্রচুর ফলন।",
    description:
      "প্রাণবন্ত থাই জাত — গোলাপি শাঁস, মুচমুচে গঠন, খুব মিষ্টি। রোপণের ৮ মাসের মধ্যেই ফল দেওয়া শুরু করে।",
    height: "২ – ২.৫ ফুট",
    age: "১০ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "পূর্ণ রোদ",
    water: "মাঝারি",
  },
  {
    slug: "bedana-litchi",
    name: "বেদানা লিচু",
    nameBn: "বেদানা লিচু",
    category: "litchi",
    price: 1200,
    oldPrice: 1450,
    rating: 4.9,
    reviews: 73,
    image: img("photo-1629828874514-e1ad6f1de1f5"),
    gallery: [img("photo-1629828874514-e1ad6f1de1f5")],
    badges: ["লিমিটেড", "গ্রাফটিং"],
    shortDescription: "ছোট বীজ, মোটা শাঁসের প্রিমিয়াম লিচু।",
    description:
      "সবচেয়ে প্রিমিয়াম লিচু জাত — অত্যন্ত ছোট বীজ, মোটা রসালো শাঁস, গাঢ় লাল খোসা। এয়ার-লেয়ারিং করা যেন প্রকৃত ফল হয়।",
    height: "২.৫ – ৩ ফুট",
    age: "১৮ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "মাঝারি",
    sunlight: "পূর্ণ রোদ",
    water: "বেশি",
  },
  {
    slug: "red-dragon-fruit",
    name: "রেড ড্রাগন ফল",
    nameBn: "রেড ড্রাগন ফল",
    category: "tropical",
    price: 550,
    rating: 4.7,
    reviews: 198,
    image: img("photo-1610917040803-1fccf9623064"),
    gallery: [img("photo-1610917040803-1fccf9623064")],
    badges: ["বেস্ট সেলার", "নতুন"],
    shortDescription: "উজ্জ্বল লাল শাঁসের অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ সুপারফল।",
    description:
      "স্ব-পরাগায়িত রেড-শাঁস ড্রাগন ফলের কাটিং। খরা সহিষ্ণু, ১২–১৪ মাসে ফল দেয়। বেটালেইন ও অ্যান্টিঅক্সিডেন্টে ভরপুর।",
    height: "১.৫ – ২ ফুট",
    age: "৬ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "পূর্ণ রোদ",
    water: "কম",
  },
  {
    slug: "rambutan",
    name: "রাম্বুটান",
    nameBn: "রাম্বুটান",
    category: "tropical",
    price: 1450,
    rating: 4.6,
    reviews: 41,
    image: img("photo-1591287083773-9a52902db5f0"),
    gallery: [img("photo-1591287083773-9a52902db5f0")],
    badges: ["লিমিটেড", "গ্রাফটিং"],
    shortDescription: "মিষ্টি, লিচু-সদৃশ দক্ষিণ-পূর্ব এশিয়ার দুর্লভ ফল।",
    description:
      "মালয়েশিয়ার মাতৃ গাছ থেকে দুর্লভ গ্রাফটিং রাম্বুটান। লিচুর মতো মিষ্টি স্বচ্ছ শাঁস, কাঁটাযুক্ত লাল খোসা।",
    height: "২.৫ – ৩ ফুট",
    age: "২০ মাস",
    potIncluded: true,
    inStock: false,
    careLevel: "এক্সপার্ট",
    sunlight: "পূর্ণ রোদ",
    water: "বেশি",
  },
  {
    slug: "monstera-deliciosa",
    name: "মনস্টেরা ডেলিসিওসা",
    nameBn: "মনস্টেরা ডেলিসিওসা",
    category: "indoor",
    price: 890,
    oldPrice: 1100,
    rating: 4.9,
    reviews: 312,
    image: img("photo-1485955900006-10f4d324d411"),
    gallery: [img("photo-1485955900006-10f4d324d411")],
    badges: ["বেস্ট সেলার"],
    shortDescription: "আইকনিক স্প্লিট-লিফ স্টেটমেন্ট গাছ।",
    description:
      "ইনস্টাগ্রামে বিখ্যাত মূল গাছ। বড় ছিদ্রযুক্ত পাতা, দ্রুত বাড়ে, কম থেকে উজ্জ্বল পরোক্ষ আলো সহ্য করে।",
    height: "১.৫ – ২ ফুট",
    age: "১০ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "ইনডোর উজ্জ্বল",
    water: "মাঝারি",
  },
  {
    slug: "snake-plant",
    name: "স্নেক প্ল্যান্ট",
    nameBn: "স্নেক প্ল্যান্ট",
    category: "indoor",
    price: 320,
    rating: 4.8,
    reviews: 421,
    image: img("photo-1593482892290-f54927ae1bb6"),
    gallery: [img("photo-1593482892290-f54927ae1bb6")],
    badges: ["বেস্ট সেলার", "অর্গানিক"],
    shortDescription: "প্রায় অবিনাশী বায়ু পরিশোধক।",
    description:
      "NASA-স্বীকৃত বায়ু পরিশোধক। অযত্ন, কম আলো ও কম পানিতেও বাঁচে। রাতে অক্সিজেন ছাড়ে।",
    height: "১ – ১.৫ ফুট",
    age: "৮ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "ইনডোর উজ্জ্বল",
    water: "কম",
  },
  {
    slug: "desi-rose",
    name: "দেশি গোলাপ (মিশ্র রঙ)",
    nameBn: "দেশি গোলাপ (মিশ্র রঙ)",
    category: "flowering",
    price: 250,
    rating: 4.5,
    reviews: 188,
    image: img("photo-1490750967868-88aa4486c946"),
    gallery: [img("photo-1490750967868-88aa4486c946")],
    badges: ["নতুন"],
    shortDescription: "সুগন্ধি ঐতিহ্যবাহী গোলাপ, সারা বছর ফোটে।",
    description:
      "শক্ত দেশি গোলাপ — তীব্র সুগন্ধ এবং নিরন্তর ফুল। মিশ্র গোলাপি, লাল ও সাদা রঙে পাওয়া যায়।",
    height: "১ – ১.৫ ফুট",
    age: "৬ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "পূর্ণ রোদ",
    water: "মাঝারি",
  },
  {
    slug: "tulsi-krishna",
    name: "কৃষ্ণ তুলসী",
    nameBn: "কৃষ্ণ তুলসী",
    category: "herbs",
    price: 120,
    rating: 4.9,
    reviews: 267,
    image: img("photo-1466692476868-aef1dfb1e735"),
    gallery: [img("photo-1466692476868-aef1dfb1e735")],
    badges: ["বেস্ট সেলার", "অর্গানিক"],
    shortDescription: "পবিত্র ভেষজ গাছ, রোগ প্রতিরোধ বাড়ায়।",
    description:
      "আসল কৃষ্ণ তুলসী — গাঢ় বেগুনি পাতা। তীব্র সুগন্ধ, প্রচলিত ঔষধ ও দৈনন্দিন চা-তে ব্যবহৃত।",
    height: "০.৮ – ১ ফুট",
    age: "৪ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "পূর্ণ রোদ",
    water: "মাঝারি",
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (slug: string) =>
  products.filter((p) => p.category === slug);

export const bestsellers = () =>
  products.filter((p) => p.badges?.includes("বেস্ট সেলার"));

export const newArrivals = () =>
  products.filter((p) => p.badges?.includes("নতুন"));
