import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";
import { cn } from "../../lib/utils";

const InputOTP = React.forwardRef(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    className={cn("flex gap-2", containerClassName)}
    inputClassName={cn(
      "w-12 rounded-md border border-input bg-background text-center text-lg font-medium outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex gap-2", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-12 w-12 items-center justify-center rounded-md border border-input bg-background text-lg font-medium outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
        className,
        isActive && "ring-2 ring-offset-2 ring-primary"
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <span className="absolute inset-y-0 left-0 w-0.5 animate-pulse bg-primary" />
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => (
  <div ref={ref} className="flex items-center" {...props} />
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
