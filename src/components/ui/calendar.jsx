import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../src/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "rotate-180",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
          "first:rounded-l-md last:rounded-r-md",
          "focus-within:shadow-ring focus-within:outline-none"
        ),
        day: cn(
          "h-9 w-9 rounded-md p-0 font-normal aria-selected:opacity-100",
          "aria-disabled:pointer-events-none aria-disabled:opacity-40",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:z-20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
        day_today:
          "bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground",
        day_outside: "text-muted-foreground opacity-50",
        ...classNames,
      }}
      components={{
        IconLeft: (props) => <ChevronLeft className="h-4 w-4" {...props} />,
        IconRight: (props) => <ChevronRight className="h-4 w-4" {...props} />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
