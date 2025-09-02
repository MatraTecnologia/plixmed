"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  ClipboardList,
  FileText,
  Home,
  Settings,
  Users,
  LogOut,
  FileDigit,
  Bell,
  Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    router.push("/login")
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Agenda",
      href: "/dashboard/agenda",
      icon: Calendar,
    },
    {
      name: "Editar Link Agendamento",
      href: "/dashboard/agendamentos",
      icon: Settings,
    },
    {
      name: "Consultas",
      href: "/dashboard/consultas",
      icon: ClipboardList,
      badge: "3",
    },
    {
      name: "Pacientes",
      href: "/dashboard/pacientes",
      icon: Users,
    },
    {
      name: "Usuários",
      href: "/dashboard/usuarios",
      icon: Users,
    },
    {
      name: "Serviços",
      href: "/dashboard/servicos",
      icon: Briefcase,
    },
    {
      name: "Prontuários",
      href: "/dashboard/prontuarios",
      icon: FileDigit,
    },
    {
      name: "Resultados",
      href: "/dashboard/resultados",
      icon: FileText,
      badge: "2",
    },
    {
      name: "Configurações",
      href: "/dashboard/configuracoes",
      icon: Settings,
    },
  ]

  return (
    <div className={cn("flex flex-col h-screen border-r bg-card", className)}>
      <div className="p-6">
        <div className="flex items-center gap-2 font-semibold text-xl">
          <div className="p-1 rounded-md bg-primary/10 text-primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 10V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M5 10H19C20.1046 10 21 10.8954 21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V12C3 10.8954 3.89543 10 5 10Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="12" cy="15" r="2" stroke="currentColor" strokeWidth="2" />
              <path d="M12 17V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span>PLIXMED</span>
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-2">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2 text-sm rounded-md group transition-colors",
                pathname === item.href ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
              )}
            >
              <div className="flex items-center">
                <item.icon className="mr-3 h-5 w-5 shrink-0" />
                {item.name}
              </div>
              {item.badge && (
                <Badge
                  variant={pathname === item.href ? "outline" : "default"}
                  className={cn("ml-auto", pathname === item.href ? "bg-primary-foreground text-primary" : "")}
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Sair</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
