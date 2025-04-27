import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"
import { cn } from "../../lib/utils"

const ResizablePanelGroup = ({ className, ...props }) => (
  <ResizablePrimitive.PanelGroup className={cn(className)} {...props} />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({ withHandle, className, ...props }) => (
  <ResizablePrimitive.ResizeHandle
    className={cn("flex items-center justify-center", className)}
    {...props}
  >
    {withHandle && <GripVertical />}
  </ResizablePrimitive.ResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
