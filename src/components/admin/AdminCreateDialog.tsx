import { useState } from "react";
import { toast } from "sonner";
import { friendlyError } from "@/lib/errorMessage";
import { useCreateAdmin } from "@/hooks/useAdmin";
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

const empty = { email: "", password: "", fullName: "" };

export function AdminCreateDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [form, setForm] = useState(empty);
  const createAdmin = useCreateAdmin();

  const set = (key: keyof typeof empty, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || form.password.length < 6) {
      toast.error("সঠিক ইমেইল দিন ও পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে");
      return;
    }
    try {
      await createAdmin.mutateAsync({
        email: form.email,
        password: form.password,
        fullName: form.fullName || undefined,
      });
      toast.success("নতুন অ্যাডমিন তৈরি হয়েছে");
      setForm(empty);
      onOpenChange(false);
    } catch (err) {
      toast.error(friendlyError(err, "অ্যাডমিন তৈরি ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"));
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setForm(empty);
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bn">নতুন অ্যাডমিন যোগ করুন</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="font-bn">নাম</Label>
            <Input
              className="font-bn"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              placeholder="ঐচ্ছিক"
            />
          </div>
          <div>
            <Label className="font-bn">ইমেইল</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <Label className="font-bn">পাসওয়ার্ড</Label>
            <Input
              type="text"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              placeholder="অন্তত ৬ অক্ষর"
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={createAdmin.isPending} className="font-bn">
              {createAdmin.isPending ? "তৈরি হচ্ছে…" : "অ্যাডমিন তৈরি করুন"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
