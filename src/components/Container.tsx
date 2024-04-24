"use client";

import Link from "next/link";
import { NextSeo } from "next-seo";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { trpc } from "@/app/_trpc/client";

type NavItemProps = {
  href: string;
  label: string;
};

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

function NavItem({ href, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} legacyBehavior>
      <a
        className={cn(
          isActive
            ? "font-semibold text-gray-800 dark:text-gray-200"
            : "font-normal text-gray-600 dark:text-gray-400",
          "hidden rounded-lg p-1 transition-all hover:bg-gray-200 dark:hover:bg-gray-800 sm:px-3 sm:py-2 md:inline-block",
        )}
      >
        <span className="capsize">{label}</span>
      </a>
    </Link>
  );
}

export default function Container(props: ContainerProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const { children, ...customMeta } = props;
  const pathname = usePathname();
  const meta = {
    title: "Pokevote",
    description: "A voting app for the Pokemon",
    type: "website",
    ...customMeta,
  };

  return (
    <>
      <NextSeo
        title={meta.title}
        description={meta.description}
        noindex={false}
        canonical={`https://next-trpc-rendiriz.vercel.app${pathname}`}
        openGraph={{
          type: "website",
          url: `https://next-trpc-rendiriz.vercel.app${pathname}`,
          title: meta.title,
          description: meta.description,
        }}
      />
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col justify-center px-8">
          <nav className="relative mx-auto flex w-full max-w-4xl items-center justify-between border-gray-200 bg-gray-50 bg-opacity-60 pb-8 pt-8  text-gray-900 dark:border-gray-700  dark:bg-gray-900 dark:text-gray-100 sm:pb-16">
            <Link href="#skip" className="skip-nav" legacyBehavior>
              Skip to content
            </Link>
            <div className="ml-[-0.60rem]">
              <NavItem href="/" label="Home" />
              <NavItem href="/result" label="Result" />
            </div>
            <button
              aria-label="Toggle Dark Mode"
              type="button"
              className="ml-4 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200  ring-gray-300 transition-all  hover:ring-2 dark:bg-gray-600"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              {mounted && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-800 dark:text-gray-200"
                >
                  {resolvedTheme === "dark" ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  )}
                </svg>
              )}
            </button>
          </nav>
        </div>
        <main
          id="skip"
          className="flex flex-col justify-center bg-gray-50 px-8 dark:bg-gray-900"
        >
          {children}
        </main>
      </div>
    </>
  );
}
