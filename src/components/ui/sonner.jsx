import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

const Toaster = (props) => {
  const { theme = "system" } = useTheme()

  return <Sonner {...props} theme={theme} />
}

export { Toaster, toast }
