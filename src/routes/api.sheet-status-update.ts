import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { z } from "zod";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/serviceRole.server";

const statusValues = ["processing", "shipped", "delivered", "cancelled"] as const;

const updateStatusSchema = z.object({
  secret: z.string(),
  orderNumber: z.string().min(1),
  status: z.enum(statusValues),
});

export const Route = createFileRoute("/api/sheet-status-update")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const json = (await request.json().catch(() => null)) as unknown;
        const parsed = updateStatusSchema.safeParse(json);
        if (!parsed.success) {
          return new Response(JSON.stringify({ ok: false, error: "Invalid payload" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const expectedSecret = process.env.GOOGLE_SHEET_SYNC_SECRET;
        if (!expectedSecret || parsed.data.secret !== expectedSecret) {
          return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        const supabase = getSupabaseServiceRoleClient();
        const { error, data: updated } = await supabase
          .from("orders")
          .update({ status: parsed.data.status })
          .eq("order_number", parsed.data.orderNumber)
          .select("id");

        if (error) {
          return new Response(JSON.stringify({ ok: false, error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (!updated || updated.length === 0) {
          return new Response(JSON.stringify({ ok: false, error: "Order not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ ok: true }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
