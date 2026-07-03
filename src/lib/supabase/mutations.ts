import { getSupabaseBrowserClient } from "./browser";
import type { Product } from "@/data/products";
import type { Category } from "@/data/categories";

export type ProductInput = Omit<Product, "reviews" | "rating"> & {
  rating?: number;
  reviews?: number;
};

function toProductRow(p: ProductInput) {
  return {
    slug: p.slug,
    name: p.name,
    name_bn: p.nameBn,
    category: p.category,
    price: p.price,
    old_price: p.oldPrice ?? null,
    rating: p.rating ?? 4.5,
    reviews: p.reviews ?? 0,
    image: p.image,
    gallery: p.gallery,
    badges: p.badges ?? [],
    short_description: p.shortDescription,
    description: p.description,
    height: p.height,
    age: p.age,
    pot_included: p.potIncluded,
    in_stock: p.inStock,
    care_level: p.careLevel,
    sunlight: p.sunlight,
    water: p.water,
  };
}

export async function upsertProduct(p: ProductInput) {
  const { error } = await getSupabaseBrowserClient().from("products").upsert(toProductRow(p), { onConflict: "slug" });
  if (error) throw error;
}

export async function deleteProduct(slug: string) {
  const { error } = await getSupabaseBrowserClient().from("products").delete().eq("slug", slug);
  if (error) throw error;
}

export type CategoryInput = Omit<Category, "count">;

function toCategoryRow(c: CategoryInput) {
  return {
    slug: c.slug,
    name: c.name,
    name_bn: c.nameBn,
    description: c.description,
    image: c.image,
    accent: c.accent,
  };
}

export async function upsertCategory(c: CategoryInput) {
  const { error } = await getSupabaseBrowserClient().from("categories").upsert(toCategoryRow(c), { onConflict: "slug" });
  if (error) throw error;
}

export async function deleteCategory(slug: string) {
  const { error } = await getSupabaseBrowserClient().from("categories").delete().eq("slug", slug);
  if (error) throw error;
}

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const { error } = await getSupabaseBrowserClient().from("orders").update({ status }).eq("id", orderId);
  if (error) throw error;
}

