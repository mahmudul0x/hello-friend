import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { KeyRound, Plus, ShieldOff, ShieldUser } from "lucide-react";
import { toast } from "sonner";
import { toBnDigits } from "@/lib/format";
import { friendlyError } from "@/lib/errorMessage";
import { useAdmins, useRemoveAdmin } from "@/hooks/useAdmin";
import { useSession } from "@/hooks/useSession";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { AdminCreateDialog } from "@/components/admin/AdminCreateDialog";
import { AdminPasswordDialog } from "@/components/admin/AdminPasswordDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AdminUser } from "@/lib/supabase/admins.server";

function initials(name?: string | null) {
  if (!name) return "A";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export const Route = createFileRoute("/admin/admins")({
  component: AdminAdmins,
});

function AdminAdmins() {
  const { data: session } = useSession();
  const { data: admins = [], isLoading } = useAdmins();
  const removeAdmin = useRemoveAdmin();
  const [createOpen, setCreateOpen] = useState(false);
  const [passwordFor, setPasswordFor] = useState<AdminUser | null>(null);
  const [toRemove, setToRemove] = useState<AdminUser | null>(null);

  const handleRemove = async () => {
    if (!toRemove) return;
    try {
      await removeAdmin.mutateAsync(toRemove.id);
      toast.success("অ্যাডমিন অ্যাক্সেস বাতিল হয়েছে");
    } catch (err) {
      toast.error(friendlyError(err, "বাতিল করা যায়নি। আবার চেষ্টা করুন।"));
    } finally {
      setToRemove(null);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="অ্যাডমিন"
        subtitle={`মোট ${toBnDigits(admins.length)}জন অ্যাডমিন`}
        actions={
          <Button onClick={() => setCreateOpen(true)} className="font-bn">
            <Plus /> নতুন অ্যাডমিন
          </Button>
        }
      />

      {!isLoading && admins.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-24 text-center">
            <ShieldUser className="size-10 text-muted-foreground" />
            <p className="font-bn text-muted-foreground">এখনো কোনো অ্যাডমিন নেই।</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bn">অ্যাডমিন</TableHead>
                <TableHead className="font-bn">যোগ হয়েছে</TableHead>
                <TableHead className="font-bn text-right">অ্যাকশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                          {initials(a.fullName || a.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="font-bn truncate font-medium">
                          {a.fullName || "নাম নেই"}
                        </div>
                        <div className="truncate text-xs text-muted-foreground">{a.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(a.createdAt).toLocaleDateString("bn-BD", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPasswordFor(a)}
                        aria-label="পাসওয়ার্ড পরিবর্তন"
                      >
                        <KeyRound className="size-3.5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={a.id === session?.id}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setToRemove(a)}
                        aria-label="অ্যাক্সেস বাতিল"
                      >
                        <ShieldOff className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      <AdminCreateDialog open={createOpen} onOpenChange={setCreateOpen} />
      <AdminPasswordDialog
        admin={passwordFor}
        onOpenChange={(open) => !open && setPasswordFor(null)}
      />

      <AlertDialog open={!!toRemove} onOpenChange={(open) => !open && setToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bn">অ্যাডমিন অ্যাক্সেস বাতিল করবেন?</AlertDialogTitle>
            <AlertDialogDescription className="font-bn">
              "{toRemove?.email}" আর অ্যাডমিন প্যানেলে ঢুকতে পারবে না। একাউন্ট মুছে যাবে না — পরে
              আবার অ্যাডমিন বানাতে চাইলে "নতুন অ্যাডমিন" থেকে এই একই ইমেইল দিয়ে আবার তৈরি করুন, এটি
              স্বয়ংক্রিয়ভাবে আগের একাউন্টটিকেই অ্যাডমিন করে দেবে।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-bn">বাতিল</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              className="font-bn bg-destructive hover:bg-destructive/90"
            >
              অ্যাক্সেস বাতিল করুন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
