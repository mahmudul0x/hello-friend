import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatBDT, toBnDigits } from "@/lib/format";
import { friendlyError } from "@/lib/errorMessage";
import { useLandingPages, useDeleteLandingPage } from "@/hooks/useAdmin";
import { LandingPageFormDialog } from "@/components/admin/LandingPageFormDialog";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { AdminPagination, usePagination } from "@/components/admin/AdminPagination";
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
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { LandingPage } from "@/lib/supabase/queries";

export const Route = createFileRoute("/admin/landing-pages")({
  component: AdminLandingPages,
});

function AdminLandingPages() {
  const { data: pages = [] } = useLandingPages();
  const deletePage = useDeleteLandingPage();
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<LandingPage | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toDelete, setToDelete] = useState<LandingPage | null>(null);
  const PAGE_SIZE = 15;

  const { pageItems, page: currentPage, totalPages } = usePagination(pages, PAGE_SIZE, page);

  useEffect(() => { setPage(1); }, [pages.length]);

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await deletePage.mutateAsync(toDelete.id);
      toast.success("ল্যান্ডিং পেজ মুছে ফেলা হয়েছে");
    } catch (err) {
      toast.error(friendlyError(err, "মুছতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"));
    } finally {
      setToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="ল্যান্ডিং পেজ"
        subtitle={`মোট ${toBnDigits(pages.length)}টি ক্যাম্পেইন পেজ`}
        actions={
          <Button onClick={() => { setEditing(null); setDialogOpen(true); }} className="font-bn">
            <Plus /> নতুন ল্যান্ডিং পেজ
          </Button>
        }
      />

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bn">পেজ</TableHead>
              <TableHead className="font-bn">URL</TableHead>
              <TableHead className="font-bn text-right">মূল্য</TableHead>
              <TableHead className="font-bn text-center">স্ট্যাটাস</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="font-bn h-32 text-center text-muted-foreground">
                  এখনো কোনো ল্যান্ডিং পেজ তৈরি হয়নি।
                </TableCell>
              </TableRow>
            ) : (
              pageItems.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {p.heroImage && <img src={p.heroImage} alt="" className="size-10 shrink-0 rounded-lg object-cover" />}
                      <div className="min-w-0">
                        <div className="font-bn truncate font-medium">{p.headline}</div>
                        <div className="font-bn truncate text-xs text-muted-foreground">{p.productName}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <a href={`/l/${p.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                      /l/{p.slug} <ExternalLink className="size-3" />
                    </a>
                  </TableCell>
                  <TableCell className="font-bn text-right font-semibold">{formatBDT(p.price)}</TableCell>
                  <TableCell className="text-center">
                    {p.isActive ? (
                      <Badge variant="secondary" className="font-bn bg-primary/10 text-primary hover:bg-primary/10">সক্রিয়</Badge>
                    ) : (
                      <Badge variant="outline" className="font-bn text-muted-foreground">নিষ্ক্রিয়</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => { setEditing(p); setDialogOpen(true); }} aria-label="এডিট">
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setToDelete(p)}
                        aria-label="মুছুন"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <AdminPagination
          page={currentPage}
          totalPages={totalPages}
          totalItems={pages.length}
          onPageChange={setPage}
        />
      </Card>

      <LandingPageFormDialog open={dialogOpen} onOpenChange={setDialogOpen} page={editing} />

      <AlertDialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bn">ল্যান্ডিং পেজ মুছবেন?</AlertDialogTitle>
            <AlertDialogDescription className="font-bn">
              "{toDelete?.headline}" স্থায়ীভাবে মুছে যাবে। এই কাজ পূর্বাবস্থায় ফেরানো যাবে না।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-bn">বাতিল</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="font-bn bg-destructive hover:bg-destructive/90">মুছুন</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
