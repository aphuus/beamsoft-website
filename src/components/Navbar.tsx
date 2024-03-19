"use client";

import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import WordMark from "@/components/WordMark";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { Button } from "./ui/button";

interface NavbarProps {
  settings: Content.SettingsDocument;
}

export default function Navbar({ settings }: NavbarProps) {
  return (
    <nav className="px-4 py-4 md:px-6 md:py-6" aria-label="main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-foreground md:flex-row md:items-center">
        <Link href="/">
          <span className="sr-only">Back to the home page</span>
          <WordMark />
        </Link>

        <div className="flex items-center gap-6">
          <ThemeToggleButton />
          <ul className="flex gap-6">
            {settings.data.navigation.map((item) => {
              if (item.cta_button) {
                return (
                  <li key={item.label}>
                    <PrismicNextLink field={item.link}>
                      <Button variant="default">{item.label}</Button>
                    </PrismicNextLink>
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <PrismicNextLink
                    className="inline-flex min-h-11 items-center"
                    field={item.link}
                  >
                    <Button variant="link">{item.label}</Button>
                  </PrismicNextLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
