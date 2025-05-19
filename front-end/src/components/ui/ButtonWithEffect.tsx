// ButtonWithEffect.tsx
import React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const ButtonWithEffect = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button"> & {
  hoverEffect?: "scale" | "glow";
}>(({ hoverEffect = "scale", className, children, ...props }, ref) => {
  const effectClass = hoverEffect === "scale"
    ? "transition-transform duration-200 hover:scale-105"
    : "transition-shadow duration-200 hover:shadow-lg hover:shadow-accent-500/50";

  return (
    <Button
      ref={ref}
      className={cn(effectClass, className)}
      {...props}
    >
      {children}
    </Button>
  );
});

ButtonWithEffect.displayName = "ButtonWithEffect";

export default ButtonWithEffect;
