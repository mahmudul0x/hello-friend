import { site } from "@/data/site";

const en = "0123456789";
const bn = "০১২৩৪৫৬৭৮৯";

export const toBnDigits = (s: string | number) =>
  s.toString().split("").map((d) => {
    const i = en.indexOf(d);
    return i >= 0 ? bn[i] : d;
  }).join("");

export const formatBDT = (n: number) =>
  `${site.currency}${toBnDigits(n.toLocaleString("en-IN"))}`;

export const formatBn = (n: number) => toBnDigits(n);
