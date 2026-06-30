import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { products } from "@/data/products";
import { formatBDT } from "@/lib/format";

export const Route = createFileRoute("/admin/products")({
  component: () => (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5">
          <Search className="size-4 text-muted-foreground" />
          <input placeholder="পণ্য খুঁজুন…" className="font-bn flex-1 bg-transparent text-sm focus:outline-none" />
        </div>
        <button className="font-bn inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"><Plus className="size-4" /> নতুন পণ্য</button>
      </div>
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs tracking-wide text-muted-foreground">
            <tr><th className="font-bn px-4 py-3 text-left">পণ্য</th><th className="font-bn px-4 py-3 text-left">বিভাগ</th><th className="font-bn px-4 py-3 text-right">মূল্য</th><th className="font-bn px-4 py-3 text-center">স্টক</th><th className="px-4 py-3"></th></tr>
          </thead>
          <tbody className="divide-y">
            {products.map((p) => (
              <tr key={p.slug} className="hover:bg-muted/30">
                <td className="px-4 py-3"><div className="flex items-center gap-3"><img src={p.image} alt="" className="size-10 shrink-0 rounded-lg object-cover" /><div className="min-w-0"><div className="font-bn truncate font-medium">{p.name}</div><div className="font-bn truncate text-xs text-muted-foreground">{p.nameBn}</div></div></div></td>
                <td className="px-4 py-3 capitalize text-muted-foreground">{p.category}</td>
                <td className="font-bn px-4 py-3 text-right font-semibold">{formatBDT(p.price)}</td>
                <td className="px-4 py-3 text-center">{p.inStock ? <span className="font-bn rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">স্টকে আছে</span> : <span className="font-bn rounded-full bg-destructive/10 px-2 py-0.5 text-xs text-destructive">শেষ</span>}</td>
                <td className="px-4 py-3 text-right"><div className="inline-flex gap-1"><button aria-label="এডিট" className="grid size-8 place-items-center rounded-lg hover:bg-accent"><Pencil className="size-3.5" /></button><button aria-label="মুছুন" className="grid size-8 place-items-center rounded-lg text-destructive hover:bg-destructive/10"><Trash2 className="size-3.5" /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
});
