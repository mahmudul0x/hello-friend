import { useEffect, useState } from "react";
import { toast } from "sonner";
import { friendlyError } from "@/lib/errorMessage";
import { useUpdateAdminPassword } from "@/hooks/useAdmin";
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
import type { AdminUser } from "@/lib/supabase/admins.server";

export function AdminPasswordDialog({
  admin,
  onOpenChange,
}: {
  admin: AdminUser | null;
  onOpenChange: (open: boolean) => void;
}) {
  const [password, setPassword] = useState("");
  const updatePassword = useUpdateAdminPassword();

  useEffect(() => setPassword(""), [admin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!admin || password.length < 6) {
      toast.error("পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে");
      return;
    }
    try {
      await updatePassword.mutateAsync({ userId: admin.id, password });
      toast.success("পাসওয়ার্ড পরিবর্তন হয়েছে");
      onOpenChange(false);
    } catch (err) {
      toast.error(friendlyError(err, "পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"));
    }
  };

  return (
    <Dialog open={!!admin} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bn">পাসওয়ার্ড পরিবর্তন করুন</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="font-bn">{admin?.email}</Label>
            <Input
              type="text"
              className="mt-1.5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="নতুন পাসওয়ার্ড (অন্তত ৬ অক্ষর)"
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={updatePassword.isPending} className="font-bn">
              {updatePassword.isPending ? "পরিবর্তন হচ্ছে…" : "পাসওয়ার্ড পরিবর্তন করুন"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
