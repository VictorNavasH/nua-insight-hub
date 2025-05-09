
// Simplified toast hook
import { useState } from "react"

type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = ({
    title,
    description,
    action,
    variant,
  }: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((toasts) => [...toasts, { id, title, description, action, variant }])
    
    // Auto dismiss
    setTimeout(() => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id))
    }, 5000)
    
    return id
  }

  const dismiss = (id: string) => {
    setToasts((toasts) => toasts.filter((t) => t.id !== id))
  }

  return {
    toast,
    dismiss,
    toasts,
  }
}

export { toast } from "./use-toast-primitive"
