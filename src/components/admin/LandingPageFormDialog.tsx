import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { friendlyError } from "@/lib/errorMessage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageUploader, MultiImageUploader } from "@/components/admin/ImageUploader";
import { useUpsertLandingPage } from "@/hooks/useAdmin";
import type { LandingPage, LandingTestimonial } from "@/lib/supabase/queries";
import type { LandingPageInput } from "@/lib/supabase/mutations";

const emptyForm = (): LandingPageInput => ({
  slug: "",
  isActive: true,
  headline: "",
  heroImage: null,
  productName: "",
  price: 0,
  oldPrice: null,
  description: "",
  gallery: [],
  testimonials: [],
});

function toInput(page: LandingPage): LandingPageInput {
  return {
    id: page.id,
    slug: page.slug,
    isActive: page.isActive,
    headline: page.headline,
    heroImage: page.heroImage,
    productName: page.productName,
    price: page.price,
    oldPrice: page.oldPrice,
    description: page.description,
    gallery: page.gallery,
    testimonials: page.testimonials,
  };
}

const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function LandingPageFormDialog({
  open,
  onOpenChange,
  page,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  page: LandingPage | null;
}) {
  const [form, setForm] = useState<LandingPageInput>(emptyForm());
  const upsert = useUpsertLandingPage();

  useEffect(() => {
    setForm(page ? toInput(page) : emptyForm());
  }, [page, open]);

  const set = <K extends keyof LandingPageInput>(key: K, value: LandingPageInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const addTestimonial = () => set("testimonials", [...form.testimonials, { name: "", text: "", city: "", avatar: "" }]);
  const updateTestimonial = (i: number, patch: Partial<LandingTestimonial>) =>
    set("testimonials", form.testimonials.map((t, idx) => (idx === i ? { ...t, ...patch } : t)));
  const removeTestimonial = (i: number) =>
    set("testimonials", form.testimonials.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.slug || !form.headline || !form.productName) {
      toast.error("URL, হেডলাইন ও পণ্যের নাম আবশ্যক");
      return;
    }
    if (!slugPattern.test(form.slug)) {
      toast.error("URL শুধু ছোট হাতের ইংরেজি অক্ষর, সংখ্যা ও হাইফেন দিয়ে হতে হবে (যেমন: mango-offer)");
      return;
    }
    try {
      await upsert.mutateAsync(form);
      toast.success("ল্যান্ডিং পেজ সংরক্ষিত হয়েছে");
      onOpenChange(false);
    } catch (err) {
      toast.error(friendlyError(err, "সংরক্ষণ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bn">{page ? "ল্যান্ডিং পেজ এডিট করুন" : "নতুন ল্যান্ডিং পেজ"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="font-bn">URL (slug)</Label>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">/offer/</span>
              <Input value={form.slug} onChange={(e) => set("slug", e.target.value.toLowerCase())} placeholder="mango-offer" />
            </div>
          </div>

          <div>
            <Label className="font-bn">হেডলাইন</Label>
            <Input className="font-bn" value={form.headline} onChange={(e) => set("headline", e.target.value)} placeholder="বিশেষ অফার — মাত্র ৫৯৯ টাকা" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="font-bn">পণ্যের নাম</Label>
              <Input className="font-bn" value={form.productName} onChange={(e) => set("productName", e.target.value)} />
            </div>
            <div>
              <Label className="font-bn">মূল্য (৳)</Label>
              <Input type="number" value={form.price} onChange={(e) => set("price", Number(e.target.value))} />
            </div>
          </div>

          <div>
            <Label className="font-bn">পুরনো মূল্য (ঐচ্ছিক)</Label>
            <Input type="number" value={form.oldPrice ?? ""} onChange={(e) => set("oldPrice", e.target.value ? Number(e.target.value) : null)} />
          </div>

          <div>
            <Label className="font-bn">বিবরণ</Label>
            <Textarea className="font-bn" rows={3} value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} />
          </div>

          <div>
            <Label className="font-bn">হিরো ছবি</Label>
            <ImageUploader value={form.heroImage} onChange={(url) => set("heroImage", url)} />
          </div>
          <div>
            <Label className="font-bn">গ্যালারি</Label>
            <MultiImageUploader value={form.gallery} onChange={(urls) => set("gallery", urls)} />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label className="font-bn">টেস্টিমোনিয়াল (ঐচ্ছিক)</Label>
              <Button type="button" variant="outline" size="sm" onClick={addTestimonial}>
                <Plus className="size-3.5" /> যোগ করুন
              </Button>
            </div>
            <div className="mt-2 space-y-2">
              {form.testimonials.map((t, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-border p-3">
                  <ImageUploader value={t.avatar || null} onChange={(url) => updateTestimonial(i, { avatar: url ?? "" })} className="shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="grid gap-2 sm:grid-cols-2">
                      <Input className="font-bn" placeholder="নাম" value={t.name} onChange={(e) => updateTestimonial(i, { name: e.target.value })} />
                      <Input className="font-bn" placeholder="শহর (ঐচ্ছিক)" value={t.city ?? ""} onChange={(e) => updateTestimonial(i, { city: e.target.value })} />
                    </div>
                    <Textarea className="font-bn" rows={2} placeholder="মন্তব্য" value={t.text} onChange={(e) => updateTestimonial(i, { text: e.target.value })} />
                  </div>
                  <button type="button" onClick={() => removeTestimonial(i)} className="grid size-8 shrink-0 place-items-center rounded-full text-destructive hover:bg-destructive/10" aria-label="মুছুন">
                    <X className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2">
            <Switch checked={form.isActive} onCheckedChange={(v) => set("isActive", v)} />
            <span className="font-bn text-sm">সক্রিয় (visitor-রা দেখতে পাবে)</span>
          </label>

          <DialogFooter>
            <Button type="submit" disabled={upsert.isPending} className="font-bn">
              {upsert.isPending ? "সংরক্ষণ হচ্ছে…" : "সংরক্ষণ করুন"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
