import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Leaf, Lock, Mail, User } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container } from "@/components/common/Container";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [{ title: "একাউন্ট তৈরি — অল ট্রি বিডি শপ" }, { name: "robots", content: "noindex" }],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  return (
    <PageLayout>
      <Container className="grid place-items-center py-16">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
          <Link to="/" className="mx-auto mb-6 grid size-14 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-soft"><Leaf className="size-6" /></Link>
          <h1 className="font-bn text-center font-display text-2xl font-bold">আমাদের সাথে যুক্ত হোন</h1>
          <p className="font-bn mt-1 text-center text-sm text-muted-foreground">পছন্দ সংরক্ষণ ও অর্ডার ট্র্যাক করতে একাউন্ট তৈরি করুন।</p>

          <form onSubmit={(e) => { e.preventDefault(); toast.success("একাউন্ট তৈরি হয়েছে"); navigate({ to: "/account" }); }} className="mt-8 space-y-4">
            <Field icon={<User className="size-4" />} placeholder="পুরো নাম" />
            <Field icon={<Mail className="size-4" />} type="email" placeholder="আপনার ইমেইল" />
            <Field icon={<Lock className="size-4" />} type="password" placeholder="পাসওয়ার্ড" />
            <button type="submit" className="font-bn w-full rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft">একাউন্ট তৈরি করুন</button>
          </form>

          <p className="font-bn mt-6 text-center text-sm text-muted-foreground">
            ইতিমধ্যে একাউন্ট আছে? <Link to="/login" className="font-semibold text-primary hover:underline">লগইন করুন</Link>
          </p>
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
