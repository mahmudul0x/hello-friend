import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "@/components/ui/sonner";
import { PageLayout } from "@/components/layout/PageLayout";

function NotFoundComponent() {
  return (
    <PageLayout>
      <div className="gradient-radial-leaf flex min-h-[70vh] items-center justify-center px-4 py-20">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 grid size-24 place-items-center rounded-3xl gradient-primary text-primary-foreground shadow-elegant">
            <span className="font-display text-4xl font-bold">৪০৪</span>
          </div>
          <h1 className="font-bn text-3xl font-bold text-foreground sm:text-4xl">পেইজটি খুঁজে পাওয়া যায়নি</h1>
          <p className="font-bn mt-3 text-muted-foreground">
            এই পথটি আমাদের বাগানে নেই। চলুন সবুজে ফিরে যাই।
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="font-bn inline-flex items-center justify-center rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-elegant"
            >
              হোমে ফিরে যান
            </Link>
            <Link
              to="/shop"
              className="font-bn inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent"
            >
              গাছ দেখুন
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-bn text-xl font-semibold tracking-tight text-foreground">পেইজটি লোড হয়নি</h1>
        <p className="font-bn mt-2 text-sm text-muted-foreground">
          সাময়িক সমস্যা হয়েছে। আবার চেষ্টা করুন বা হোমে ফিরে যান।
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="font-bn inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            আবার চেষ্টা করুন
          </button>
          <a href="/" className="font-bn inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
            হোমে যান
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "অল ট্রি বিডি শপ — বাংলাদেশের প্রিমিয়াম অনলাইন নার্সারি" },
      { name: "description", content: "বাংলাদেশের প্রিমিয়াম অনলাইন নার্সারি। গ্রাফটিং ফল গাছ, ইনডোর গ্রিন ও দুর্লভ চারা — ৬৪ জেলায় ক্যাশ অন ডেলিভারি।" },
      { name: "author", content: "All Tree BD Shop" },
      { name: "theme-color", content: "#2E7D32" },
      { property: "og:site_name", content: "All Tree BD Shop" },
      { property: "og:title", content: "অল ট্রি বিডি শপ — প্রিমিয়াম অনলাইন নার্সারি" },
      { property: "og:description", content: "গ্রাফটিং ফল গাছ, ইনডোর গ্রিন ও দুর্লভ চারা — সারা বাংলাদেশে ডেলিভারি।" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "bn_BD" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "অল ট্রি বিডি শপ — প্রিমিয়াম অনলাইন নার্সারি" },
      { name: "twitter:description", content: "গ্রাফটিং ফল গাছ, ইনডোর গ্রিন ও দুর্লভ চারা — সারা বাংলাদেশে ডেলিভারি।" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "format-detection", content: "telephone=yes" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://images.unsplash.com", crossOrigin: "" },
      { rel: "dns-prefetch", href: "https://images.unsplash.com" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "All Tree BD Shop",
          alternateName: "অল ট্রি বিডি শপ",
          description: "বাংলাদেশের প্রিমিয়াম অনলাইন নার্সারি — গ্রাফটিং ফল গাছ, ইনডোর গ্রিন ও দুর্লভ চারা, ৬৪ জেলায় ক্যাশ অন ডেলিভারি।",
          email: "ibrahimhossain362840@gmail.com",
          telephone: "+8801839208687",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Puran Bogra",
            addressLocality: "Rajshahi",
            addressCountry: "BD",
          },
          sameAs: ["https://facebook.com/Alltreebd1Shop"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="bn">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <WishlistProvider>
            <Outlet />
            <Toaster position="top-center" richColors closeButton />
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
