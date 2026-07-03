import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, fetchOrderItems, fetchCustomers, fetchLandingPages } from "@/lib/supabase/queries";
import { catalogKeys } from "./useCatalog";
import {
  upsertProduct,
  deleteProduct,
  upsertCategory,
  deleteCategory,
  updateOrderStatus,
  upsertLandingPage,
  deleteLandingPage,
  type ProductInput,
  type CategoryInput,
  type OrderStatus,
  type LandingPageInput,
} from "@/lib/supabase/mutations";

export const adminKeys = {
  orders: () => ["orders"] as const,
  orderItems: (orderId: string) => ["orders", orderId, "items"] as const,
  customers: () => ["customers"] as const,
  landingPages: () => ["landingPages"] as const,
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

export const useLandingPages = () => useQuery({ queryKey: adminKeys.landingPages(), queryFn: fetchLandingPages });

export function useUpsertLandingPage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: LandingPageInput) => upsertLandingPage(p),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.landingPages() }),
  });
}

export function useDeleteLandingPage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLandingPage(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.landingPages() }),
  });
}
