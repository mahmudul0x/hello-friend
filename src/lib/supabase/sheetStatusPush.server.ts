import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const pushStatusSchema = z.object({
  orderNumber: z.string().min(1),
  status: z.enum(["processing", "shipped", "delivered", "cancelled"]),
});

export const pushStatusToSheet = createServerFn({ method: "POST" })
  .validator(pushStatusSchema)
  .handler(async ({ data }) => {
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!webhookUrl) return { ok: true };

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "updateStatus",
          orderNumber: data.orderNumber,
          status: data.status,
        }),
      });
    } catch (err) {
      console.error("Dashboard-to-Sheet status push failed:", err);
    }

    return { ok: true };
  });
