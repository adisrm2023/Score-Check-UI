"use client"

import { useState } from "react"

type ToastProps = {
  title?: string
  description?: string
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = ({ title, description, duration = 3000 }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { title, description, duration }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast !== { title, description, duration }))
    }, duration)

    return id
  }

  return {
    toast,
    toasts,
  }
}

