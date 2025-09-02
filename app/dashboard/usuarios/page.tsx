"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  Filter,
  MoreVertical,
  Star,
  Calendar,
  Phone,
  Mail,
  MapPin,
  UsersIcon,
  TrendingUp,
  Award,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { NovoUsuarioDialog } from "@/components/dialogs/novo-usuario-dialog"
import { DetalhesUsuarioDialog, type UsuarioDetalhes } from "@/components/dialogs/detalhes-usuario-dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function UsuariosPage() {
  const [selectedUsuario, setSelectedUsuario] = useState<UsuarioDetalhes | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Dados simulados de usuários
  const usuarios = [
    {
      id: 1,
      nome: "Dr. João Silva",
      crm: "123456/SP",
      cargo: "Médico",
      especialidade: "Cardiologia",
      telefone: "(11) 98765-4321",
      email: "joao.silva@plixmed.com",
      dataNascimento: "15/05/1975",
      status: "Ativo",
      diasAtendimento: "Segunda a Sexta",
      biografia:
        "Cardiologista com mais de 15 anos de experiência. Especialista em cardiologia intervencionista e doenças coronarianas.",
      horarios: ["08:00 - 12:00", "14:00 - 18:00"],
      pacientes: 245,
      consultas: { total: 1250, mes: 85, semana: 22 },
      avaliacoes: { media: 4.8, total: 156 },
      proximaConsulta: "14:30",
      localizacao: "Sala 101",
    },
    {
      id: 2,
      nome: "Dra. Ana Oliveira",
      crm: "234567/SP",
      cargo: "Médico",
      especialidade: "Pediatria",
      telefone: "(11) 97654-3210",
      email: "ana.oliveira@plixmed.com",
      dataNascimento: "22/08/1980",
      status: "Ativo",
      diasAtendimento: "Segunda, Quarta e Sexta",
      biografia: "Pediatra especializada em desenvolvimento infantil e neonatologia.",
      horarios: ["09:00 - 13:00", "15:00 - 18:00"],
      pacientes: 180,
      consultas: { total: 980, mes: 65, semana: 18 },
      avaliacoes: { media: 4.9, total: 120 },
      proximaConsulta: "15:00",
      localizacao: "Sala 203",
    },
    {
      id: 3,
      nome: "Carlos Santos",
      crm: "",
      cargo: "Enfermeiro",
      especialidade: "Enfermagem Geral",
      telefone: "(11) 96543-2109",
      email: "carlos.santos@plixmed.com",
      dataNascimento: "10/03/1985",
      status: "Ativo",
      diasAtendimento: "Segunda a Sexta",
      biografia: "Enfermeiro com especialização em cuidados intensivos.",
      horarios: ["07:00 - 19:00"],
      pacientes: 0,
      consultas: { total: 0, mes: 0, semana: 0 },
      avaliacoes: { media: 4.7, total: 45 },
      proximaConsulta: "16:00",
      localizacao: "UTI",
    },
    {
      id: 4,
      nome: "Maria Costa",
      crm: "",
      cargo: "Recepcionista",
      especialidade: "Atendimento ao Cliente",
      telefone: "(11) 95432-1098",
      email: "maria.costa@plixmed.com",
      dataNascimento: "05/11/1990",
      status: "Ativo",
      diasAtendimento: "Segunda a Sexta",
      biografia: "Recepcionista com experiência em atendimento ao público.",
      horarios: ["08:00 - 18:00"],
      pacientes: 0,
      consultas: { total: 0, mes: 0, semana: 0 },
      avaliacoes: { media: 4.9, total: 78 },
      proximaConsulta: null,
      localizacao: "Recepção",
    },
    {
      id: 5,
      nome: "Roberto Almeida",
      crm: "",
      cargo: "Administrador",
      especialidade: "Gestão Clínica",
      telefone: "(11) 94321-0987",
      email: "roberto.almeida@plixmed.com",
      dataNascimento: "18/07/1975",
      status: "Ativo",
      diasAtendimento: "Segunda a Sexta",
      biografia: "Administrador responsável pela gestão operacional da clínica.",
      horarios: ["08:00 - 17:00"],
      pacientes: 0,
      consultas: { total: 0, mes: 0, semana: 0 },
      avaliacoes: { media: 4.6, total: 32 },
      proximaConsulta: null,
      localizacao: "Administração",
    },
    {
      id: 6,
      nome: "Dra. Lúcia Ferreira",
      crm: "678901/SP",
      cargo: "Médico",
      especialidade: "Ginecologia",
      telefone: "(11) 93210-9876",
      email: "lucia.ferreira@plixmed.com",
      dataNascimento: "30/09/1976",
      status: "Ativo",
      diasAtendimento: "Segunda, Quarta e Sexta",
      biografia: "Ginecologista e obstetra com especialização em reprodução humana.",
      horarios: ["08:30 - 12:30", "14:00 - 18:00"],
      pacientes: 230,
      consultas: { total: 1100, mes: 80, semana: 21 },
      avaliacoes: { media: 4.9, total: 145 },
      proximaConsulta: "09:30",
      localizacao: "Sala 105",
    },
  ]

  // Estatísticas gerais
  const stats = {
    total: usuarios.length,
    ativos: usuarios.filter((u) => u.status === "Ativo").length,
    medicos: usuarios.filter((u) => u.cargo === "Médico").length,
    avaliacaoMedia: 4.8,
  }

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.especialidade.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewDetails = (usuario: UsuarioDetalhes) => {
    setSelectedUsuario(usuario)
    setDetailsOpen(true)
  }

  const getCargoBadge = (cargo: string) => {
    const styles = {
      Médico: "bg-blue-500 hover:bg-blue-600",
      Enfermeiro: "bg-green-500 hover:bg-green-600",
      Recepcionista: "bg-purple-500 hover:bg-purple-600",
      Administrador: "bg-orange-500 hover:bg-orange-600",
      Técnico: "bg-cyan-500 hover:bg-cyan-600",
      Auxiliar: "bg-gray-500 hover:bg-gray-600",
    }
    return (
      <Badge className={`${styles[cargo as keyof typeof styles] || "bg-gray-500"} text-white border-0`}>{cargo}</Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Ativo</Badge>
      case "Inativo":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Inativo</Badge>
      case "Em férias":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Em férias</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
          <p className="text-muted-foreground">Gerencie todos os profissionais da clínica</p>
        </div>
        <NovoUsuarioDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total de Usuários</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-full">
                <UsersIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Usuários Ativos</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.ativos}</p>
              </div>
              <div className="p-3 bg-green-500 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Médicos</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.medicos}</p>
              </div>
              <div className="p-3 bg-purple-500 rounded-full">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Avaliação Média</p>
                <p className="text-3xl font-bold text-amber-900 dark:text-amber-100">{stats.avaliacaoMedia}</p>
              </div>
              <div className="p-3 bg-amber-500 rounded-full">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar usuários..."
                  className="pl-10 border-0 bg-muted/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFilterOpen(!filterOpen)}
                className={`border-0 ${filterOpen ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="border-0"
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="border-0"
              >
                Lista
              </Button>
            </div>
          </div>

          {filterOpen && (
            <div className="mt-6 p-4 bg-muted/30 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="filter-cargo">Cargo</Label>
                <Select>
                  <SelectTrigger id="filter-cargo" className="border-0 bg-background">
                    <SelectValue placeholder="Todos os cargos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os cargos</SelectItem>
                    <SelectItem value="medico">Médico</SelectItem>
                    <SelectItem value="enfermeiro">Enfermeiro</SelectItem>
                    <SelectItem value="recepcionista">Recepcionista</SelectItem>
                    <SelectItem value="administrador">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filter-status">Status</Label>
                <Select>
                  <SelectTrigger id="filter-status" className="border-0 bg-background">
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os status</SelectItem>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                    <SelectItem value="ferias">Em férias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full border-0">
                  Limpar Filtros
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Users Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsuarios.map((usuario) => (
            <Card
              key={usuario.id}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => handleViewDetails(usuario)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                      <AvatarImage
                        src={`/abstract-geometric-shapes.png?height=48&width=48&query=${usuario.nome}`}
                        alt={usuario.nome}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {usuario.nome
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {usuario.nome}
                      </h3>
                      <p className="text-sm text-muted-foreground">{usuario.especialidade}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Desativar</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {getCargoBadge(usuario.cargo)}
                    {getStatusBadge(usuario.status)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{usuario.telefone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{usuario.email}</span>
                    </div>
                    {usuario.localizacao && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{usuario.localizacao}</span>
                      </div>
                    )}
                  </div>

                  {usuario.cargo === "Médico" && (
                    <div className="pt-3 border-t border-border/50">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-primary">{usuario.pacientes}</p>
                          <p className="text-xs text-muted-foreground">Pacientes</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-2xl font-bold">{usuario.avaliacoes?.media}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{usuario.avaliacoes?.total} avaliações</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {usuario.proximaConsulta && (
                    <div className="flex items-center gap-2 text-sm bg-primary/5 text-primary p-2 rounded-md">
                      <Calendar className="h-4 w-4" />
                      <span>Próxima: {usuario.proximaConsulta}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-md">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filteredUsuarios.map((usuario) => (
                <div
                  key={usuario.id}
                  className="p-6 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => handleViewDetails(usuario)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                        <AvatarImage
                          src={`/abstract-geometric-shapes.png?height=48&width=48&query=${usuario.nome}`}
                          alt={usuario.nome}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {usuario.nome
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{usuario.nome}</h3>
                        <p className="text-sm text-muted-foreground">{usuario.especialidade}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {getCargoBadge(usuario.cargo)}
                          {getStatusBadge(usuario.status)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          <span>{usuario.telefone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          <span>{usuario.email}</span>
                        </div>
                        {usuario.cargo === "Médico" && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{usuario.avaliacoes?.media}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <DetalhesUsuarioDialog usuario={selectedUsuario} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </div>
  )
}
