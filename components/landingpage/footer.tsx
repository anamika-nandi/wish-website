import Link from "next/link";
import {
  ContainerInner,
  ContainerOuter,
} from "@/components/landingpage/container";
import { landingpageContent } from "@/constants/landingpage";

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
  // Filter the active links
  const activeLinks = landingpageContent.header.NavAndFooterLinks.filter(
    (link) => link.active
  );

  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-stone-100 pb-16 pt-10 dark:border-stone-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              {/* Conditionally render the links if there are any active links */}
              {activeLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-text-800 dark:text-text-200">
                  {activeLinks.map((link) => (
                    <NavLink key={link.text} href={link.href}>
                      {link.text}
                    </NavLink>
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-300 dark:text-gray-500">
                &copy; {new Date().getFullYear()}{" "}
                {landingpageContent.header.company.name}. All rights reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  );
}
