import { createClient } from "@/prismicio";
import WordMark from "@/components/WordMark";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <footer className="flex flex-col items-center justify-between gap-6 border-t border-muted px-8 py-7 md:flex-row">
      <div className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
        <Link href="/">
          <span className="sr-only">Back to the home page</span>
          <WordMark />
        </Link>
        <span className="text-muted-foreground">
          &copy; {new Date().getFullYear()} Beamsoft
        </span>
      </div>
      <nav aria-label="footer">
        <ul className="flex gap-6">
          {settings.data.navigation.map((item) => (
            <li key={item.label}>
              <Button variant="link">
                <PrismicNextLink
                  className="inline-flex min-h-11 items-center"
                  field={item.link}
                >
                  {item.label}
                </PrismicNextLink>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
