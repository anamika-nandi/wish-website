"use client";
import React, { useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  BriefcaseBusiness,
  CircleUser,
  Menu,
  Users,
  LucideIcon,
} from "lucide-react";
import { BsFillCake2Fill } from "react-icons/bs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MenuItem {
  to: string;
  icon: LucideIcon;
  label: string;
  section: string;
  badge?: boolean;
}

const menuItems: MenuItem[] = [
  {
    to: "/",
    icon: BarChart2,
    label: "Dashboard",
    section: "Wish Card",
  },
  {
    to: "/card-editor",
    icon: BriefcaseBusiness,
    label: "Card Editor",
    section: "Wish Card",
    badge: true,
  },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps): JSX.Element {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [pendingOrdersCount, setPendingOrdersCount] = useState<number>(0);

  const pathnames = pathname.split("/").filter((x) => x);

  const handleMobileMenuItemClick = (): void => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[200px_1fr]">
      {/* Sidebar */}
      <div className="hidden pl-4 md:block">
        <div className="flex h-screen flex-col gap-2 fixed w-[200px] overflow-hidden">
          {/* Logo section */}
          <div className="flex items-center gap-2 mt-4 w-full justify-start">
            <BsFillCake2Fill className="h-10 w-10 text-primary bg-primary/10 rounded-lg p-2" />
            <span className="text-xl font-semibold">Wish</span>
          </div>
          {/* Scrollable content */}
          <ScrollArea className="flex-1">
            <nav className="grid items-start text-sm font-medium pr-2 gap-1">
              {menuItems.reduce((acc: JSX.Element[], item, index, array) => {
                if (index === 0 || item.section !== array[index - 1].section) {
                  acc.push(
                    <div
                      key={`section-${item.section}`}
                      className="text-zinc-500 font-medium text-sm text-opacity-1 py-3 mt-2"
                    >
                      {item.section}
                    </div>
                  );
                }
                acc.push(
                  <Link
                    key={item.to}
                    href={item.to}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                      pathname === item.to
                        ? "bg-zinc-200 text-primary"
                        : "text-muted-foreground hover:text-primary hover:bg-zinc-200"
                    )}
                  >
                    <div className="flex items-center gap-3 flex-grow">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </div>
                    {item.badge && pendingOrdersCount > 0 && (
                      <Badge className="ml-auto">{pendingOrdersCount}</Badge>
                    )}
                  </Link>
                );
                return acc;
              }, [])}
            </nav>
          </ScrollArea>
        </div>
      </div>
      {/* Header and Main Content */}
      <div className="flex flex-col m-2 rounded-lg border border-zinc-200">
        <header className="flex gap-4 bg-white pt-6 pb-2 px-6 rounded-tr-lg rounded-tl-lg">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                {menuItems.map((item) => (
                  <Link
                    key={item.to}
                    href={item.to}
                    onClick={handleMobileMenuItemClick}
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-left text-muted-foreground hover:text-primary hover:bg-zinc-100 hover:bg-opacity-1"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="flex-grow">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <Breadcrumb className="flex-col flex items-start gap-2">
              <h3 className="text-2xl font-semibold leading-none tracking-tight block capitalize">
                {pathnames[pathnames.length - 1] || "Dashboard"}
              </h3>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {pathnames.map((value, index) => {
                  const href = `/${pathnames.slice(0, index + 1).join("/")}`;
                  const isLast = index === pathnames.length - 1;
                  return (
                    <React.Fragment key={href}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{value}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={href}>{value}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {/* Main Content */}
        <main className="bg-white h-full">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
