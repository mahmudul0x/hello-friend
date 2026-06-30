export type Category = {
  slug: string;
  name: string;
  nameBn: string;
  description: string;
  image: string;
  count: number;
  accent: "green" | "gold" | "lime";
};

export const categories: Category[] = [
  {
    slug: "mango",
    name: "আমের চারা",
    nameBn: "আমের চারা",
    description: "প্রিমিয়াম গ্রাফটিং আমের জাত — আম্রপালি, হাঁড়িভাঙ্গা, বারি-৪।",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=1200&q=80&auto=format&fit=crop",
    count: 24,
    accent: "gold",
  },
  {
    slug: "citrus",
    name: "লেবু ও কমলা",
    nameBn: "লেবু ও কমলা",
    description: "বীজহীন লেবু, দার্জিলিং কমলা, মাল্টা ও কাগজি লেবুর চারা।",
    image: "https://images.unsplash.com/photo-1591287083773-9a52902db5f0?w=1200&q=80&auto=format&fit=crop",
    count: 18,
    accent: "lime",
  },
  {
    slug: "guava",
    name: "পেয়ারা",
    nameBn: "পেয়ারা",
    description: "থাই পিংক, বারি-২, বীজহীন ও লাল শাঁসের পেয়ারা।",
    image: "https://images.unsplash.com/photo-1633380110125-f6e685676160?w=1200&q=80&auto=format&fit=crop",
    count: 12,
    accent: "green",
  },
  {
    slug: "litchi",
    name: "লিচু ও লংগান",
    nameBn: "লিচু ও লংগান",
    description: "বোম্বাই, চায়না-৩, বেদানা এবং বিরল ভিয়েতনামি লংগান।",
    image: "https://images.unsplash.com/photo-1629828874514-e1ad6f1de1f5?w=1200&q=80&auto=format&fit=crop",
    count: 9,
    accent: "green",
  },
  {
    slug: "tropical",
    name: "বিদেশি ফল",
    nameBn: "বিদেশি ফল",
    description: "ড্রাগন ফল, রাম্বুটান, মেংগোস্টিন, ডুরিয়ান — সংগ্রহযোগ্য জাত।",
    image: "https://images.unsplash.com/photo-1610917040803-1fccf9623064?w=1200&q=80&auto=format&fit=crop",
    count: 15,
    accent: "gold",
  },
  {
    slug: "indoor",
    name: "ইনডোর গাছ",
    nameBn: "ইনডোর গাছ",
    description: "ঘর, বারান্দা ও অফিসের জন্য বায়ু পরিশোধনকারী গাছ।",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=80&auto=format&fit=crop",
    count: 32,
    accent: "green",
  },
  {
    slug: "flowering",
    name: "ফুলের চারা",
    nameBn: "ফুলের চারা",
    description: "গোলাপ, জবা, বাগানবিলাস এবং মৌসুমী ফুলের গাছ।",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=80&auto=format&fit=crop",
    count: 21,
    accent: "gold",
  },
  {
    slug: "herbs",
    name: "ভেষজ ও মসলা",
    nameBn: "ভেষজ ও মসলা",
    description: "তুলসী, পুদিনা, কারি পাতা, কালো গোলমরিচ এবং ভেষজ গাছ।",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&q=80&auto=format&fit=crop",
    count: 14,
    accent: "lime",
  },
];

export const getCategoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
