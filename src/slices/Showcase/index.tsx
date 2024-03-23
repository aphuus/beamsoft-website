import { RefreshCcw, Settings } from "lucide-react";

import Bounded from "@/components/Bounded";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

const icons = {
  settings: <Settings className="h-6 w-6" />,
  refresh: <RefreshCcw className="h-6 w-6" />,
};

/**
 * Props for `Showcase`.
 */
export type ShowcaseProps = SliceComponentProps<Content.ShowcaseSlice>;

/**
 * Component for "Showcase" Slices.
 */
const Showcase = ({ slice }: ShowcaseProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-blue-400/30 blur-3xl filter dark:bg-blue-400/20" />

      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading2: ({ children }) => (
            <h2 className="text-balance text-5xl font-medium md:text-7xl">
              {children}
            </h2>
          ),
        }}
      />
      <div className="mt-16 grid items-center gap-8 rounded-xl border border-muted-foreground/20 bg-gradient-to-b from-muted-foreground/15 to-foreground/5 px-8 py-8 backdrop-blur-sm dark:border-blue-50/20 lg:grid-cols-3 lg:gap-0 lg:py-12">
        <div>
          <div className="w-fit rounded-lg bg-blue-500/30 p-4 text-3xl">
            <>{slice.primary.icon && icons[slice.primary.icon]}</>
          </div>

          <div className="mt-6 text-2xl font-medium">
            <PrismicRichText field={slice.primary.subheading} />
          </div>

          <div className="prose mt-4 dark:prose-invert">
            <PrismicRichText field={slice.primary.body} />
          </div>

          <PrismicNextLink field={slice.primary.button_link}>
            <Button className="mt-6">
              {slice.primary.button_label || "Learn More"}
            </Button>
          </PrismicNextLink>
        </div>

        <PrismicNextImage
          field={slice.primary.image}
          className={cn(
            "opacity-90 shadow-2xl lg:col-span-2 lg:pt-0",
            slice.variation === "reverse"
              ? "lg:order-1 lg:translate-x-[15%]"
              : "lg:-order-1 lg:translate-x-[-15%]",
          )}
        />
      </div>
    </Bounded>
  );
};

export default Showcase;
