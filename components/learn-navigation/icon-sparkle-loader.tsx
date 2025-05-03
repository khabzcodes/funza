import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  isBlack?: boolean;
}

export const IconSparkleLoader = ({ className, isBlack = false }: Props) => {
  return (
    <Image
      src="/sparkle.svg"
      width={41}
      height={40}
      alt="loader"
      className={cn(
        isBlack ? "filter invert" : "",
        className
      )}
    />
  );
};