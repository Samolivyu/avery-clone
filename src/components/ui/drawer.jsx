import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "../../lib/utils";

const Drawer = ({ shouldScaleBackground = true, ...props }) => (
  <DrawerPrimitive.Root {...props} />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity",
      className
    )}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DrawerPrimitive.Content
    ref={ref}
    className={cn(
      "fixed bottom-0 left-0 right-0 top-0 z-50 grid w-full gap-4 bg-background p-6 shadow-lg sm:max-w-sm sm:rounded-tl-lg sm:rounded-tr-lg",
      className
    )}
    {...props}
  >
    {children}
  </DrawerPrimitive.Content>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 text-center", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 text-center", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
