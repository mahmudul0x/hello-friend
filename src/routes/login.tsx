import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Lock, Mail } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container } from "@/components/common/Container";
import { toast } from "sonner";
import { signIn, getSession } from "@/lib/supabase/auth.server";
import { useInvalidateSession } from "@/hooks/useSession";
import { friendlyError } from "@/lib/errorMessage";
import logoIcon from "@/assets/logo-icon.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "অ্যাডমিন লগইন — অল ট্রি বিডি শপ" }, { name: "robots", content: "noindex" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const invalidateSession = useInvalidateSession();

  const mutation = useMutation({
    mutationFn: async () => {
      await signIn({ data: { email, password } });
      return getSession();
    },
    onSuccess: async (session) => {
      if (session?.role !== "admin") {
        toast.error("এই একাউন্টে অ্যাডমিন অ্যাক্সেস নেই।");
        return;
      }
      toast.success("লগইন সফল হয়েছে");
      invalidateSession();
      await router.invalidate();
      navigate({ to: "/admin" });
    },
    onError: (err: Error) => toast.error(friendlyError(err, "লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।")),
  });

  return (
    <PageLayout>
      <Container className="grid place-items-center py-16">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
          <div className="mx-auto mb-6 grid size-16 place-items-center"><img src={logoIcon} alt="Abid Nursery and Plants" className="size-16 object-contain" /></div>
          <h1 className="font-bn text-center font-display text-2xl font-bold">অ্যাডমিন লগইন</h1>
          <p className="font-bn mt-1 text-center text-sm text-muted-foreground">শুধুমাত্র অনুমোদিত অ্যাডমিনদের জন্য।</p>

          <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }} className="mt-8 space-y-4">
            <Field icon={<Mail className="size-4" />} type="email" placeholder="আপনার ইমেইল" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Field icon={<Lock className="size-4" />} type="password" placeholder="পাসওয়ার্ড" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" disabled={mutation.isPending} className="font-bn w-full rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft disabled:opacity-60">
              {mutation.isPending ? "লগইন হচ্ছে…" : "লগইন করুন"}
            </button>
          </form>
        </div>
      </Container>
    </PageLayout>
  );
}

function Field({ icon, ...props }: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
      <span className="text-muted-foreground">{icon}</span>
      <input {...props} required className="font-bn flex-1 bg-transparent text-sm focus:outline-none" />
    </div>
  );
}
