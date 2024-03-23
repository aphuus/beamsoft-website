import dynamic from "next/dynamic";

const DynamicSheet = dynamic(
  () => import("@/components/ui/sheet").then((mod) => mod.Sheet),
  { ssr: false },
);

export default DynamicSheet;
