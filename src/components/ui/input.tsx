import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    // A browser extension may be adding other props, causing a hydration error.
    // We explicitly only pass the props we expect.
    const sanitizedProps = {
      className: cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      type,
      ref,
      value: props.value,
      onChange: props.onChange,
      onKeyDown: props.onKeyDown,
      placeholder: props.placeholder,
      disabled: props.disabled,
      name: props.name,
      id: props.id,
      autoComplete: props.autoComplete
    };
    return (
      <input {...sanitizedProps} />
    )
  }
)
Input.displayName = "Input"

export { Input }
