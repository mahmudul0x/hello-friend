import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Plus } from "lucide-react";

export const Route = createFileRoute("/account/addresses")({
  component: Addresses,
});

const sample = [
  { label: "বাসা", line: "পুরান বগুড়া, রাজশাহী", phone: "01839-208687", default: true },
  { label: "অফিস", line: "সাহেব বাজার, রাজশাহী", phone: "01838-208687" },
];

function Addresses() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {sample.map((a) => (
          <div key={a.label} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="font-bn flex items-center gap-2 font-semibold"><MapPin className="size-4 text-primary" /> {a.label}</div>
              {a.default && <span className="font-bn rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">ডিফল্ট</span>}
            </div>
            <p className="font-bn mt-3 text-sm text-muted-foreground">{a.line}</p>
            <p className="font-bn text-sm text-muted-foreground">{a.phone}</p>
            <div className="font-bn mt-4 flex gap-2 text-sm">
              <button className="rounded-full border border-border px-4 py-1.5 hover:bg-accent">এডিট</button>
              {!a.default && <button className="rounded-full border border-border px-4 py-1.5 hover:bg-accent">ডিফল্ট করুন</button>}
            </div>
          </div>
        ))}
        <button className="font-bn grid place-items-center rounded-3xl border-2 border-dashed border-border p-8 text-sm text-muted-foreground transition hover:border-primary hover:text-primary">
          <Plus className="mb-2 size-6" /> নতুন ঠিকানা যোগ করুন
        </button>
      </div>
    </div>
  );
}
