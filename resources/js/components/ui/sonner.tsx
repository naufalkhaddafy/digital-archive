import { usePage } from "@inertiajs/react";
import { useTheme } from "next-themes"
import { useEffect } from "react";
import { Toaster as Sonner, toast, ToasterProps } from "sonner"
type FlashMessage = {
    message: string;
    type?: "success" | "error" | "info" | "warning";
    title: string;
  };
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  const { flash_message } = usePage().props as { flash_message?: FlashMessage };

  useEffect(() => {
    if (flash_message && flash_message.message) {
      switch (flash_message.type) {
        case "success":
          toast.success(flash_message.message);
          break;
        case "error":
          toast.error(flash_message.message);
          break;
        case "info":
          toast.info(flash_message.message);
          break;
        case "warning":
          toast.warning(flash_message.message);
          break;
        default:
          toast(flash_message.message);
      }
    }
  }, [flash_message]);

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
