import type React from "react"
import { HeaderCliente } from "@/components/cliente/header-cliente"

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <HeaderCliente />
      <main>{children}</main>
    </div>
  )
}
