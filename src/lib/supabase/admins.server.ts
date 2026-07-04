import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSession } from "./auth.server";
import { getSupabaseServiceRoleClient } from "./serviceRole.server";

export type AdminUser = {
  id: string;
  email: string | null;
  fullName: string | null;
  createdAt: string;
};

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") throw new Error("এই কাজটি করার অনুমতি আপনার নেই।");
  return session;
}

export const listAdmins = createServerFn({ method: "GET" }).handler(
  async (): Promise<AdminUser[]> => {
    await requireAdmin();
    const supabase = getSupabaseServiceRoleClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, created_at")
      .eq("role", "admin")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return data.map((row) => ({
      id: row.id,
      email: row.email,
      fullName: row.full_name,
      createdAt: row.created_at,
    }));
  },
);

const createAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().optional(),
});

export const createAdmin = createServerFn({ method: "POST" })
  .validator(createAdminSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    const supabase = getSupabaseServiceRoleClient();

    const { data: created, error } = await supabase.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: data.fullName ? { full_name: data.fullName } : undefined,
    });
    if (error) throw new Error(error.message);

    const { error: roleError } = await supabase
      .from("profiles")
      .update({ role: "admin" })
      .eq("id", created.user.id);
    if (roleError) throw new Error(roleError.message);

    return { ok: true };
  });

const updatePasswordSchema = z.object({
  userId: z.string().uuid(),
  password: z.string().min(6),
});

export const updateAdminPassword = createServerFn({ method: "POST" })
  .validator(updatePasswordSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    const supabase = getSupabaseServiceRoleClient();
    const { error } = await supabase.auth.admin.updateUserById(data.userId, {
      password: data.password,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const removeAdminSchema = z.object({ userId: z.string().uuid() });

export const removeAdmin = createServerFn({ method: "POST" })
  .validator(removeAdminSchema)
  .handler(async ({ data }) => {
    const session = await requireAdmin();
    if (session.id === data.userId) throw new Error("নিজেকে অ্যাডমিন থেকে সরানো যাবে না।");

    const supabase = getSupabaseServiceRoleClient();
    const { error } = await supabase
      .from("profiles")
      .update({ role: "customer" })
      .eq("id", data.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
