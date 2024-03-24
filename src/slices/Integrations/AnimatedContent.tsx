"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import {
  FaDigitalOcean,
  FaCloudflare,
  FaNpm,
  FaGithub,
  FaFigma,
  FaFly,
} from "react-icons/fa6";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { Content } from "@prismicio/client";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import StylizedLogoMark from "./StylizedLogoMark";

export default function AnimatedContent({
  slice,
}: {
  slice: Content.IntegrationsSlice;
}) {
  const icons = {
    cloudflare: <FaCloudflare />,
    digitalocean: <FaDigitalOcean />,
    npm: <FaNpm />,
    github: <FaGithub />,
    figma: <FaFigma />,
    fly: <FaFly />,
  };

  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { duration: 1, ease: "power2.inOut" },
      });

      tl.to(".pulsing-logo", {
        keyframes: [
          {
            filter: "brightness(1.5)",
            opacity: 1,
            duration: 0.4,
            ease: "power2.in",
          },
          {
            filter: "brightness(0.9)",
            opacity: 0.6,
            duration: 0.9,
          },
        ],
      });

      tl.to(
        ".signal-line",
        {
          keyframes: [
            {
              backgroundPosition: "0% 0%",
            },
            {
              backgroundPosition: "100% 100%",
              stagger: { from: "center", each: 0.3 },
              duration: 1,
            },
          ],
        },
        "-=1.5",
      );

      tl.to(
        ".pulsing-icon",
        {
          keyframes: [
            {
              opacity: 1,
              duration: 1,
              stagger: { from: "center", each: 0.3 },
            },
            {
              opacity: 0.4,
              duration: 1,
              stagger: { from: "center", each: 0.3 },
            },
          ],
        },
        "-=2",
      );
    },

    { scope: container },
  );

  return (
    <div
      ref={container}
      className="mt-20 flex flex-col items-center md:flex-row"
    >
      {slice.items.map((item, index) => (
        <React.Fragment key={index}>
          {index === Math.floor(slice.items.length / 2) && (
            <>
              <StylizedLogoMark />
              <div className="signal-line rotate-180 bg-gradient-to-t" />
            </>
          )}
          <div className="pulsing-icon flex aspect-square shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/25 p-3 text-3xl text-blue-100 opacity-40 md:text-4xl lg:text-5xl">
            {item.icon && icons[item.icon]}
          </div>
          {index !== slice.items.length - 1 && (
            <div
              className={cn(
                "signal-line",
                index >= Math.floor(slice.items.length / 2)
                  ? "rotate-180"
                  : "rotate-0",
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
