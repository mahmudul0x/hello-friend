import { createFileRoute, Outlet, redirect, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { getSession, signOut } from "@/lib/supabase/auth.server";
import { useInvalidateSession } from "@/hooks/useSession";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) throw redirect({ to: "/login" });
    if (session.role !== "admin") throw redirect({ to: "/account" });
    return { session };
  },
  head: () => ({
    meta: [{ title: "অ্যাডমিন — অল ট্রি বিডি শপ" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { session } = Route.useRouteContext();
  const router = useRouter();
  const invalidateSession = useInvalidateSession();

  const handleLogout = async () => {
    await signOut();
    invalidateSession();
    await router.invalidate();
    toast.success("লগআউট হয়েছে");
    router.navigate({ to: "/" });
  };

  return (
    <AdminShell session={session} onLogout={handleLogout}>
      <Outlet />
    </AdminShell>
  );
}
