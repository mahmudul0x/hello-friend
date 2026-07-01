import { Mail, MapPin, Phone, StickyNote } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatBDT, toBnDigits } from "@/lib/format";
import { useOrderItems } from "@/hooks/useAdmin";
import type { OrderRow } from "@/lib/supabase/queries";
import type { OrderStatus } from "@/lib/supabase/mutations";

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

export function OrderDetailDialog({
  order,
  onOpenChange,
}: {
  order: OrderRow | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { data: items = [], isLoading } = useOrderItems(order?.id ?? null);

  return (
    <Dialog open={!!order} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        {order && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle>{order.order_number}</DialogTitle>
                <Badge className={`font-bn ${statusBadgeClass[order.status]}`}>{statusLabel[order.status]}</Badge>
              </div>
              <DialogDescription className="font-bn">
                {new Date(order.created_at).toLocaleDateString("bn-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border p-4">
                <h4 className="font-bn mb-3 text-sm font-semibold text-muted-foreground">গ্রাহকের তথ্য</h4>
                <div className="space-y-2 text-sm">
                  <div className="font-bn font-medium">{order.customer_name}</div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="size-3.5 shrink-0" />
                    <a href={`tel:${order.customer_phone}`} className="hover:text-primary">{order.customer_phone}</a>
                  </div>
                  {order.customer_email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="size-3.5 shrink-0" />
                      <a href={`mailto:${order.customer_email}`} className="truncate hover:text-primary">{order.customer_email}</a>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-border p-4">
                <h4 className="font-bn mb-3 text-sm font-semibold text-muted-foreground">ডেলিভারি ঠিকানা</h4>
                <div className="space-y-2 text-sm">
                  <div className="font-bn flex items-start gap-2">
                    <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                    <span>
                      {order.shipping_address}
                      {order.shipping_city && `, ${order.shipping_city}`}
                      {order.shipping_district && `, ${order.shipping_district}`}
                    </span>
                  </div>
                  {order.shipping_note && (
                    <div className="font-bn flex items-start gap-2 text-muted-foreground">
                      <StickyNote className="mt-0.5 size-3.5 shrink-0" />
                      <span>{order.shipping_note}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-bn mb-3 text-sm font-semibold text-muted-foreground">
                অর্ডারকৃত পণ্য {items.length > 0 && `(${toBnDigits(items.length)}টি)`}
              </h4>
              {isLoading ? (
                <p className="font-bn text-sm text-muted-foreground">লোড হচ্ছে…</p>
              ) : items.length === 0 ? (
                <p className="font-bn text-sm text-muted-foreground">কোনো পণ্যের তথ্য পাওয়া যায়নি।</p>
              ) : (
                <div className="divide-y rounded-xl border border-border">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3">
                      {item.product_image && (
                        <img src={item.product_image} alt="" className="size-12 shrink-0 rounded-lg object-cover" />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="font-bn truncate text-sm font-medium">{item.product_name}</div>
                        <div className="font-bn text-xs text-muted-foreground">
                          {formatBDT(item.unit_price)} × {toBnDigits(item.qty)}
                        </div>
                      </div>
                      <div className="font-bn text-sm font-semibold">{formatBDT(item.unit_price * item.qty)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            <div className="font-bn space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>সাবটোটাল</span>
                <span>{formatBDT(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>ডেলিভারি ফি</span>
                <span>{order.shipping_fee === 0 ? "ফ্রি" : formatBDT(order.shipping_fee)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-1.5 text-base font-semibold">
                <span>মোট</span>
                <span className="text-primary">{formatBDT(order.total)}</span>
              </div>
              <div className="pt-1 text-xs text-muted-foreground">
                পেমেন্ট পদ্ধতি: {order.payment_method === "cod" ? "ক্যাশ অন ডেলিভারি" : order.payment_method}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
