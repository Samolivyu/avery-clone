import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";

const Breadcrumb = React.forwardRef(({ className, children, separator = <ChevronRight className="h-4 w-4" />, ...props }, ref) => (
  <nav
    ref={ref}
    aria-label="Breadcrumb"
    className={cn("flex items-center space-x-2", className)}
    {...props}
  >
    <ol className="flex items-center space-x-2">
      {React.Children.map(children, (child, index) => (
        <li key={index} className="flex items-center space-x-2">
          {child}
          {index < React.Children.count(children) - 1 && (
            <span className="text-muted-foreground">{separator}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
));
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef(({ className, children, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn("flex items-center space-x-2", className)}
    {...props}
  >
    {children}
  </ol>
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("flex items-center", className)}
    {...props}
  >
    {children}
  </li>
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn("text-sm font-medium text-primary hover:underline", className)}
    {...props}
  />
));
BreadcrumbLink.displayName = "BreadcrumbLink";

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink };
