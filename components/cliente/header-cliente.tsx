"use client"

import { useState } from "react"
import { Bell, User, LogOut, Menu, X, Settings, Calendar, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"

export function HeaderCliente() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Dados simulados do cliente
  const cliente = {
    nome: "José Guilherme",
    email: "joséguilherme@email.com",
    avatar: "/placeholder.svg?height=32&width=32&text=MS",
  }

  const notificacoes = [
    {
      id: 1,
      titulo: "Consulta confirmada",
      descricao: "Sua consulta com Dr. João Silva foi confirmada para 15/01",
      lida: false,
      tipo: "success",
    },
    {
      id: 2,
      titulo: "Lembrete",
      descricao: "Sua consulta é amanhã às 14:30",
      lida: false,
      tipo: "warning",
    },
    {
      id: 3,
      titulo: "Resultado disponível",
      descricao: "Resultado do seu exame já está disponível",
      lida: true,
      tipo: "info",
    },
  ]

  const notificacaosPendentes = notificacoes.filter((n) => !n.lida).length

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-600">Plixmed</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Portal do Cliente</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notificações */}
            <DropdownMenu>
              
              <DropdownMenuContent
                align="end"
                className="w-80 bg-white border-gray-200 shadow-xl dark:bg-gray-900 dark:border-gray-800"
              >
                <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Notificações</h3>
                  {notificacaosPendentes > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {notificacaosPendentes} não lida{notificacaosPendentes > 1 ? "s" : ""}
                    </p>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notificacoes.map((notificacao) => (
                    <DropdownMenuItem
                      key={notificacao.id}
                      className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 border-l-4 border-transparent hover:border-blue-500"
                    >
                      <div className="space-y-1 w-full">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm text-gray-900 dark:text-white">{notificacao.titulo}</p>
                          {!notificacao.lida && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{notificacao.descricao}</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />
                <DropdownMenuItem className="p-3 text-center text-blue-600 dark:text-blue-400 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950 font-medium">
                  Ver todas as notificações
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Menu do usuário */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl px-3 py-2"
                >
                  <Avatar className="h-8 w-8 ring-2 ring-blue-500/20">
                    <AvatarImage src={cliente.avatar || "/placeholder.svg"} alt={cliente.nome} />
                    <AvatarFallback className="bg-blue-500 text-white font-semibold">
                      {cliente.nome
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{cliente.nome}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Cliente</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white border-gray-200 shadow-xl dark:bg-gray-900 dark:border-gray-800"
              >
                <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                  <p className="font-medium text-gray-900 dark:text-white">{cliente.nome}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{cliente.email}</p>
                </div>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-3">
                  <User className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">Meu Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-3">
                  <Calendar className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">Meus Agendamentos</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-3">
                  <Settings className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />
                <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950 p-3">
                  <LogOut className="mr-3 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4 bg-white dark:bg-gray-900">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 px-4">
                <Avatar className="h-10 w-10 ring-2 ring-blue-500/20">
                  <AvatarImage src={cliente.avatar || "/placeholder.svg"} alt={cliente.nome} />
                  <AvatarFallback className="bg-blue-500 text-white font-semibold">
                    {cliente.nome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{cliente.nome}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{cliente.email}</p>
                </div>
              </div>

              <div className="space-y-2 px-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl"
                >
                  <User className="mr-3 h-4 w-4 text-gray-500" />
                  Meu Perfil
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl"
                >
                  <Calendar className="mr-3 h-4 w-4 text-gray-500" />
                  Meus Agendamentos
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl"
                >
                  <Bell className="mr-3 h-4 w-4 text-gray-500" />
                  Notificações
                  {notificacaosPendentes > 0 && (
                    <Badge className="ml-auto bg-red-500 text-white border-0 shadow-lg">{notificacaosPendentes}</Badge>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl"
                >
                  <Settings className="mr-3 h-4 w-4 text-gray-500" />
                  Configurações
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950 rounded-xl"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
