
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonWithEffectProps extends ButtonProps {
  hoverEffect?: "scale" | "glow" | "underline" | "none";
}

const ButtonWithEffect = ({
  children,
  className,
  hoverEffect = "none",
  ...props
}: ButtonWithEffectProps) => {
  const getHoverEffectClass = () => {
    switch (hoverEffect) {
      case "scale":
        return "transition-transform hover:scale-105";
      case "glow":
        return "transition-shadow hover:shadow-lg hover:shadow-accent-500/50";
      case "underline":
        return "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform hover:after:origin-bottom-left hover:after:scale-x-100";
      default:
        return "";
    }
  };

  return (
    <Button
      className={cn(getHoverEffectClass(), className)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonWithEffect;
