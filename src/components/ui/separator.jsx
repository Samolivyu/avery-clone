import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "../../lib/utils"

const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    className={cn(
      orientation === "vertical" ? "w-px" : "h-px",
      className
    )}
    orientation={orientation}
    decorative={decorative}
    {...props}
  />
))

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
