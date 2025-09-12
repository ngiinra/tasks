import useTheme from "@/hooks/useTheme";
import { BeatLoader } from "react-spinners";

export default function BeatLoading({ className }: { className?: string }) {
  const theme = useTheme();
  const finalClass = className ?? theme.loadingColor;

  return (
    <div className={`flex w-full items-center justify-center ${finalClass}`}>
      <BeatLoader size="12px" />
    </div>
  );
}
