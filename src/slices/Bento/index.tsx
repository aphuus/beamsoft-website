import Bounded from "@/components/Bounded";
import { cn } from "@/lib/utils";
import { Content, asText } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `Bento`.
 */
export type BentoProps = SliceComponentProps<Content.BentoSlice>;

/**
 * Component for "Bento" Slices.
 */
const Bento = ({ slice }: BentoProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText
        components={{
          heading2: ({ children }) => (
            <h2 className="text-balance text-center text-5xl font-medium md:text-7xl">
              {children}
            </h2>
          ),
          em: ({ children }) => (
            <em className="bg-gradient-to-b from-yellow-300 to-yellow-700 bg-clip-text not-italic text-transparent dark:from-yellow-100 dark:to-yellow-500">
              {children}
            </em>
          ),
        }}
        field={slice.primary.heading}
      />

      <div className="max-auto mt-6 max-w-md text-balance text-center text-muted-foreground">
        <PrismicRichText field={slice.primary.body} />
      </div>

      <div className="mt-16 grid max-w-4xl grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10">
        {slice.items.map((item) => (
          <div
            key={asText(item.title)}
            className={cn(
              "glass-container row-span-3 grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-background to-white p-4 dark:to-black",
              item.wide ? "md:col-span-2" : "md:col-span-1",
            )}
          >
            <h3 className="text-2xl">
              <PrismicText field={item.title} />
            </h3>
            <div className="max-w-md text-balance text-foreground/60">
              <PrismicRichText field={item.description} />
            </div>
            <PrismicNextImage field={item.image} className="max-h-36 w-auto" />
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default Bento;
