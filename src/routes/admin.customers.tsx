import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Users } from "lucide-react";
import { formatBDT, toBnDigits } from "@/lib/format";
import { useCustomers } from "@/hooks/useAdmin";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function initials(name?: string | null) {
  if (!name) return "?";
  return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
}

export const Route = createFileRoute("/admin/customers")({
  component: AdminCustomers,
});

function AdminCustomers() {
  const { data: customers = [], isLoading } = useCustomers();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return customers;
    const query = q.toLowerCase();
    return customers.filter(
      (c) => c.name.toLowerCase().includes(query) || (c.phone ?? "").includes(q),
    );
  }, [customers, q]);

  return (
    <div className="space-y-6">
      <AdminPageHeader title="গ্রাহক" subtitle={`মোট ${toBnDigits(customers.length)}জন গ্রাহক`} />

      {!isLoading && customers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-24 text-center">
            <Users className="size-10 text-muted-foreground" />
            <p className="font-bn text-muted-foreground">এখনো কোনো গ্রাহক নেই — প্রথম অর্ডারের পর এখানে দেখা যাবে।</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="গ্রাহকের নাম বা ফোন নম্বর খুঁজুন…"
                  className="font-bn pl-9"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bn">গ্রাহক</TableHead>
                  <TableHead className="font-bn">শহর</TableHead>
                  <TableHead className="font-bn text-right">অর্ডার</TableHead>
                  <TableHead className="font-bn text-right">মোট খরচ</TableHead>
                  <TableHead className="font-bn text-right">প্রথম অর্ডার</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="font-bn h-32 text-center text-muted-foreground">
                      কোনো গ্রাহক পাওয়া যায়নি।
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((c) => (
                    <TableRow key={c.customer_key}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                              {initials(c.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="font-bn truncate font-medium">{c.name}</div>
                            {c.phone && <div className="truncate text-xs text-muted-foreground">{c.phone}</div>}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-bn text-muted-foreground">{c.city ?? "—"}</TableCell>
                      <TableCell className="font-bn text-right">{toBnDigits(c.order_count)}</TableCell>
                      <TableCell className="font-bn text-right font-semibold text-primary">
                        {formatBDT(c.total_spent)}
                      </TableCell>
                      <TableCell className="font-bn text-right text-muted-foreground">
                        {new Date(c.first_order_at).toLocaleDateString("bn-BD", { year: "numeric", month: "short" })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </>
      )}
    </div>
  );
}
