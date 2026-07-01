import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Leaf,
  LogOut,
  ShoppingBag,
  Store,
  Tags,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const nav = [
  { to: "/admin", label: "ড্যাশবোর্ড", Icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "পণ্য", Icon: Leaf, exact: false },
  { to: "/admin/categories", label: "বিভাগ", Icon: Tags, exact: false },
  { to: "/admin/orders", label: "অর্ডার", Icon: ShoppingBag, exact: false },
  { to: "/admin/customers", label: "গ্রাহক", Icon: Users, exact: false },
] as const;

const crumbLabel: Record<string, string> = {
  "/admin": "ড্যাশবোর্ড",
  "/admin/products": "পণ্য",
  "/admin/categories": "বিভাগ",
  "/admin/orders": "অর্ডার",
  "/admin/customers": "গ্রাহক",
};

function initials(name?: string | null) {
  if (!name) return "A";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export function AdminShell({
  session,
  onLogout,
  children,
}: {
  session: { fullName: string | null; email: string | null };
  onLogout: () => void;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const currentLabel = crumbLabel[pathname] ?? "ড্যাশবোর্ড";

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" className="border-border">
        <SidebarHeader>
          <Link to="/admin" className="flex items-center gap-2.5 px-2 py-1.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-soft">
              <Leaf className="size-4" />
            </span>
            <div className="flex min-w-0 flex-col leading-tight group-data-[collapsible=icon]:hidden">
              <span className="font-display truncate text-sm font-bold">All Tree BD</span>
              <span className="text-[11px] text-muted-foreground">Admin Console</span>
            </div>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="font-bn">পরিচালনা</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map(({ to, label, Icon, exact }) => {
                  const active = exact ? pathname === to : pathname.startsWith(to);
                  return (
                    <SidebarMenuItem key={to}>
                      <SidebarMenuButton asChild isActive={active} tooltip={label} className="font-bn">
                        <Link to={to}>
                          <Icon />
                          <span>{label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="সাইট দেখুন" className="font-bn">
                <Link to="/">
                  <Store />
                  <span>সাইট দেখুন</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/95 px-4 backdrop-blur">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-1 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden sm:block">
                <BreadcrumbLink asChild className="font-bn">
                  <Link to="/admin">অ্যাডমিন</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden sm:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bn">{currentLabel}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1 pr-3 text-sm transition hover:bg-accent">
                  <Avatar className="size-7">
                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                      {initials(session.fullName || session.email)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-bn hidden max-w-35 truncate font-medium sm:inline">
                    {session.fullName || session.email}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-bn">
                  <div className="truncate">{session.fullName || "অ্যাডমিন"}</div>
                  <div className="truncate text-xs font-normal text-muted-foreground">{session.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="font-bn">
                  <Link to="/">
                    <Store className="mr-2 size-4" /> সাইট দেখুন
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-bn text-destructive focus:text-destructive" onClick={onLogout}>
                  <LogOut className="mr-2 size-4" /> লগআউট
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function AdminPageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="font-bn font-display text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="font-bn mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
