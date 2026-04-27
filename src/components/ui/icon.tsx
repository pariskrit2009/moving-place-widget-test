import { type SVGProps } from "react";

import InfoIcon from "@/assets/info.svg?react";
import AdvantageIcon from "@/assets/advantage.svg?react";
import TrustPilotIcon from "@/assets/trustpilot.svg?react";
import StarIcon from "@/assets/star.svg?react";
import TagIcon from "@/assets/tag.svg?react";
import ShieldCheckIcon from "@/assets/shield-check.svg?react";
import { cn } from "@/lib/utils";

const icons = {
  info: InfoIcon,
  advantage: AdvantageIcon,
  trustpilot: TrustPilotIcon,
  shieldcheck: ShieldCheckIcon,
  star: StarIcon,
  tag: TagIcon,
} as const;

type IconName = keyof typeof icons;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({
  name,
  width,
  height,
  size = 16,
  className,
  ...props
}: IconProps) {
  const SvgIcon = icons[name];
  return (
    <SvgIcon
      width={width ?? size}
      height={height ?? size}
      className={cn("inline", className)}
      {...props}
    />
  );
}
