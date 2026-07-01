import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PackageX, Search } from "lucide-react";
import { toast } from "sonner";
import { formatBDT, toBnDigits } from "@/lib/format";
import { useOrders, useUpdateOrderStatus } from "@/hooks/useAdmin";
import type { OrderStatus } from "@/lib/supabase/mutations";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const statusLabel: Record<OrderStatus, string> = {
  processing: "প্রসেসিং",
  shipped: "শিপড",
  delivered: "ডেলিভার্ড",
  cancelled: "বাতিল",
};

const statusBadgeClass: Record<OrderStatus, string> = {
  processing: "bg-gold/15 text-gold-foreground",
  shipped: "bg-primary/10 text-primary",
  delivered: "bg-primary text-primary-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

function AdminOrders() {
  const { data: orders = [], isLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  const filtered = useMemo(() => {
    let list = orders;
    if (statusFilter !== "all") list = list.filter((o) => o.status === statusFilter);
    if (q.trim()) {
      const query = q.toLowerCase();
      list = list.filter(
        (o) => o.order_number.toLowerCase().includes(query) || o.customer_name.toLowerCase().includes(query),
      );
    }
    return list;
  }, [orders, statusFilter, q]);

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ orderId, status });
      toast.success("অর্ডার স্ট্যাটাস আপডেট হয়েছে");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "আপডেট ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="অর্ডার" subtitle={`মোট ${toBnDigits(orders.length)}টি অর্ডার`} />

      <Card>
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="অর্ডার নম্বর বা গ্রাহকের নাম খুঁজুন…"
              className="font-bn pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as OrderStatus | "all")}>
            <SelectTrigger className="font-bn w-full sm:w-48">
              <SelectValue placeholder="স্ট্যাটাস" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="font-bn">সব স্ট্যাটাস</SelectItem>
              {(Object.keys(statusLabel) as OrderStatus[]).map((s) => (
                <SelectItem key={s} value={s} className="font-bn">{statusLabel[s]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {!isLoading && orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-24 text-center">
            <PackageX className="size-10 text-muted-foreground" />
            <p className="font-bn text-muted-foreground">এখনো কোনো অর্ডার আসেনি।</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bn">অর্ডার</TableHead>
                <TableHead className="font-bn">গ্রাহক</TableHead>
                <TableHead className="font-bn">শহর</TableHead>
                <TableHead className="font-bn text-right">মোট</TableHead>
                <TableHead className="font-bn">স্ট্যাটাস</TableHead>
                <TableHead className="font-bn text-right">তারিখ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="font-bn h-32 text-center text-muted-foreground">
                    কোনো অর্ডার পাওয়া যায়নি।
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-semibold">{o.order_number}</TableCell>
                    <TableCell className="font-bn">{o.customer_name}</TableCell>
                    <TableCell className="font-bn text-muted-foreground">{o.shipping_city ?? "—"}</TableCell>
                    <TableCell className="font-bn text-right font-semibold">{formatBDT(o.total)}</TableCell>
                    <TableCell>
                      <Select value={o.status} onValueChange={(v) => handleStatusChange(o.id, v as OrderStatus)}>
                        <SelectTrigger
                          className={`font-bn h-8 w-32 rounded-full border-0 px-3 text-xs font-medium ${statusBadgeClass[o.status]}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(statusLabel) as OrderStatus[]).map((s) => (
                            <SelectItem key={s} value={s} className="font-bn">{statusLabel[s]}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="font-bn text-right text-muted-foreground">
                      {new Date(o.created_at).toLocaleDateString("bn-BD", { day: "numeric", month: "short" })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
