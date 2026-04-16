import { type SVGProps } from "react";

import InfoIcon from "@/assets/info.svg?react";

const icons = {
  info: InfoIcon,
} as const;

type IconName = keyof typeof icons;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 16, className, ...props }: IconProps) {
  const SvgIcon = icons[name];
  return <SvgIcon width={size} height={size} className={className} {...props} />;
}
