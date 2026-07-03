import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, fetchOrderItems, fetchCustomers } from "@/lib/supabase/queries";
import { catalogKeys } from "./useCatalog";
import {
  upsertProduct,
  deleteProduct,
  upsertCategory,
  deleteCategory,
  updateOrderStatus,
  type ProductInput,
  type CategoryInput,
  type OrderStatus,
} from "@/lib/supabase/mutations";

export const adminKeys = {
  orders: () => ["orders"] as const,
  orderItems: (orderId: string) => ["orders", orderId, "items"] as const,
  customers: () => ["customers"] as const,
};

export const useOrders = () => useQuery({ queryKey: adminKeys.orders(), queryFn: fetchOrders });

export const useOrderItems = (orderId: string | null) =>
  useQuery({
    queryKey: adminKeys.orderItems(orderId ?? ""),
    queryFn: () => fetchOrderItems(orderId!),
    enabled: !!orderId,
  });

export const useCustomers = () => useQuery({ queryKey: adminKeys.customers(), queryFn: fetchCustomers });

export function useUpsertProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: ProductInput) => upsertProduct(p),
    onSuccess: () => qc.invalidateQueries({ queryKey: catalogKeys.products() }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => deleteProduct(slug),
    onSuccess: () => qc.invalidateQueries({ queryKey: catalogKeys.products() }),
  });
}

export function useUpsertCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (c: CategoryInput) => upsertCategory(c),
    onSuccess: () => qc.invalidateQueries({ queryKey: catalogKeys.categories() }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => deleteCategory(slug),
    onSuccess: () => qc.invalidateQueries({ queryKey: catalogKeys.categories() }),
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, status, orderNumber }: { orderId: string; status: OrderStatus; orderNumber: string }) =>
      updateOrderStatus(orderId, status, orderNumber),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.orders() }),
  });
}
