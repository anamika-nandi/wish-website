import Link from "next/link";

import {
  ContainerInner,
  ContainerOuter,
} from "@/components/landingpage/container";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="transition hover:text-accent dark:hover:text-accent-400"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-stone-100 pb-16 pt-10 dark:border-stone-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-text-800 dark:text-text-200">
                <NavLink href="/">For Shops</NavLink>
                <NavLink href="/marketplace">Marketplace</NavLink>
                <NavLink href="/about">About</NavLink>
              </div>
              <p className="text-sm text-text-300 dark:text-text-500">
                &copy; {new Date().getFullYear()} Local Boards. All rights
                reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  );
}
