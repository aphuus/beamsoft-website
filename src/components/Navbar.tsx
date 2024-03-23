"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { Content, asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import WordMark from "@/components/WordMark";
import { Button } from "@/components/ui/button";
import DynamicSheet from "@/components/DynamicSheet";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavbarProps {
  settings: Content.SettingsDocument;
}

export default function Navbar({ settings }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="px-4 py-4 md:px-6 md:py-6" aria-label="main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-foreground md:flex-row md:items-center">
        <div
          suppressHydrationWarning={true}
          className="flex items-center justify-between"
        >
          <Link href="/">
            <WordMark />
            <span className="sr-only">Back to the home page</span>
          </Link>

          <DynamicSheet key="left">
            <SheetTrigger>
              <Button variant="link" className="pr-0 md:hidden">
                <MenuIcon />
                <div className="sr-only">Open the menu</div>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col justify-between">
              <div className="my-8">
                <ul className="flex flex-col gap-4">
                  <li>
                    <SheetClose asChild>
                      <Link href="/">
                        <Button
                          size="lg"
                          variant="link"
                          className="text-md pl-0"
                        >
                          Home
                        </Button>
                      </Link>
                    </SheetClose>
                  </li>
                  {settings.data.navigation.map((item) => {
                    if (item.cta_button) {
                      return (
                        <li key={item.label}>
                          <SheetClose asChild>
                            <PrismicNextLink
                              field={item.link}
                              key={item.label}
                              aria-current={
                                pathname.includes(asLink(item.link) as string)
                                  ? "page"
                                  : undefined
                              }
                            >
                              <Button
                                size="lg"
                                variant="default"
                                className="text-md w-full max-w-full"
                              >
                                {item.label}
                              </Button>
                            </PrismicNextLink>
                          </SheetClose>
                        </li>
                      );
                    }

                    return (
                      <li key={item.label}>
                        <SheetClose asChild>
                          <PrismicNextLink
                            field={item.link}
                            key={item.label}
                            aria-current={
                              pathname.includes(asLink(item.link) as string)
                                ? "page"
                                : undefined
                            }
                          >
                            <Button
                              variant="link"
                              size="lg"
                              className="text-md pl-0"
                            >
                              {item.label}
                            </Button>
                          </PrismicNextLink>
                        </SheetClose>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <SheetFooter className="flex items-end ">
                <ThemeToggleButton />
              </SheetFooter>
            </SheetContent>
          </DynamicSheet>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <ThemeToggleButton />
          <ul className="flex gap-6">
            {settings.data.navigation.map((item) => {
              if (item.cta_button) {
                return (
                  <li key={item.label}>
                    <Button variant="default">
                      <PrismicNextLink
                        field={item.link}
                        key={item.label}
                        aria-current={
                          pathname.includes(asLink(item.link) as string)
                            ? "page"
                            : undefined
                        }
                      >
                        {item.label}
                      </PrismicNextLink>
                    </Button>
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <Button variant="link">
                    <PrismicNextLink
                      className="inline-flex min-h-11 items-center"
                      field={item.link}
                      key={item.label}
                      aria-current={
                        pathname.includes(asLink(item.link) as string)
                          ? "page"
                          : undefined
                      }
                    >
                      {item.label}
                    </PrismicNextLink>
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
