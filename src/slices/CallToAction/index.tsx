import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import PlainLogo from "./PlainLogo";
import { PrismicNextLink } from "@prismicio/next";
import { Button } from "@/components/ui/button";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative py-32 text-center font-medium md:py-40"
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-sm rounded-full bg-blue-200/50 blur-[160px] filter dark:bg-blue-500/50" />
      <div className="glass-container rounded-lg bg-gradient-to-b from-background/80 to-background/90 p-4 md:rounded-xl">
        <PlainLogo />
      </div>

      <div className="mt-8 max-w-xl text-balance text-5xl">
        <PrismicText field={slice.primary.heading} />
      </div>

      <Button size="lg" className="mt-6">
        <PrismicNextLink field={slice.primary.button_link}>
          {slice.primary.button_text || "Learn More"}
        </PrismicNextLink>
      </Button>
    </Bounded>
  );
};

export default CallToAction;
