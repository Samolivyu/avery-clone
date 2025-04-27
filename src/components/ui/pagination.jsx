import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../src/components/ui/button";

const Pagination = ({ className, ...props }) => (
  <nav
    className={cn("flex items-center justify-center space-x-2", className)}
    aria-label="Pagination"
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("inline-flex items-center space-x-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

export { Pagination, PaginationContent };
