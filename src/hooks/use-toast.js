import * as React from "react"

export const useToast = () => {
  const [toasts, setToasts] = React.useState([])

  const toast = ({ title, description, action, ...props }) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, title, description, action, ...props },
    ])
    return id
  }

  const dismiss = (toastId) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== toastId))
  }

  return {
    toast,
    dismiss,
    toasts,
  }
}
