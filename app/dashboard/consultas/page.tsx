"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  Filter,
  MoreVertical,
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { NovaConsultaDialog } from "@/components/dialogs/nova-consulta-dialog"
import { DetalhesConsultaDialog, type ConsultaDetalhes } from "@/components/dialogs/detalhes-consulta-dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ConsultasPage() {
  const [selectedConsulta, setSelectedConsulta] = useState<ConsultaDetalhes | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Dados simulados de consultas
  const consultas = [
    {
      id: 1,
      patientName: "Maria Silva",
      date: "12/05/2023",
      time: "09:00",
      duration: 30,
      tipo: "Retorno",
      status: "Concluída",
      day: 1,
      medico: "Dr. João Silva",
      especialidade: "Cardiologia",
      valor: 250.0,
      convenio: "Unimed",
      observacoes: "Paciente com hipertensão. Pressão arterial normalizada após tratamento.",
      prioridade: "Normal",
    },
    {
      id: 2,
      patientName: "João Pereira",
      date: "12/05/2023",
      time: "11:00",
      duration: 60,
      tipo: "Primeira Consulta",
      status: "Concluída",
      day: 2,
      medico: "Dra. Ana Oliveira",
      especialidade: "Pediatria",
      valor: 300.0,
      convenio: "Bradesco Saúde",
      observacoes: "Paciente com diabetes tipo 2. Iniciado tratamento com metformina.",
      prioridade: "Alta",
    },
    {
      id: 3,
      patientName: "Ana Souza",
      date: "13/05/2023",
      time: "14:00",
      duration: 30,
      tipo: "Retorno",
      status: "Agendada",
      day: 3,
      medico: "Dr. João Silva",
      especialidade: "Cardiologia",
      valor: 200.0,
      convenio: "SulAmérica",
      prioridade: "Normal",
    },
    {
      id: 4,
      patientName: "Carlos Oliveira",
      date: "13/05/2023",
      time: "16:30",
      duration: 30,
      tipo: "Primeira Consulta",
      status: "Confirmada",
      day: 4,
      medico: "Dra. Lúcia Ferreira",
      especialidade: "Ginecologia",
      valor: 280.0,
      convenio: "Amil",
      observacoes: "Paciente encaminhado pelo Dr. Roberto para avaliação cardiológica.",
      prioridade: "Normal",
    },
    {
      id: 5,
      patientName: "Lúcia Santos",
      date: "14/05/2023",
      time: "10:00",
      duration: 60,
      tipo: "Retorno",
      status: "Agendada",
      day: 5,
      medico: "Dr. João Silva",
      especialidade: "Cardiologia",
      valor: 250.0,
      convenio: "Particular",
      observacoes: "Avaliação pós-cirúrgica.",
      prioridade: "Alta",
    },
    {
      id: 6,
      patientName: "Roberto Almeida",
      date: "14/05/2023",
      time: "15:00",
      duration: 30,
      tipo: "Primeira Consulta",
      status: "Cancelada",
      day: 5,
      medico: "Dra. Ana Oliveira",
      especialidade: "Pediatria",
      valor: 300.0,
      convenio: "Unimed",
      prioridade: "Baixa",
    },
  ]

  // Estatísticas
  const stats = {
    total: consultas.length,
    hoje: consultas.filter((c) => c.date === "12/05/2023").length,
    agendadas: consultas.filter((c) => c.status === "Agendada").length,
    receita: consultas.filter((c) => c.status === "Concluída").reduce((acc, c) => acc + c.valor, 0),
  }

  const filteredConsultas = consultas.filter(
    (consulta) =>
      consulta.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consulta.medico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consulta.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consulta.especialidade.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewDetails = (consulta: ConsultaDetalhes) => {
    setSelectedConsulta(consulta)
    setDetailsOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Agendada":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Agendada</Badge>
      case "Confirmada":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Confirmada</Badge>
      case "Em Andamento":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Em Andamento</Badge>
      case "Concluída":
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Concluída</Badge>
      case "Cancelada":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelada</Badge>
      case "Não Compareceu":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Não Compareceu</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPrioridadeBadge = (prioridade: string) => {
    switch (prioridade) {
      case "Alta":
        return <Badge className="bg-red-500 text-white">Alta</Badge>
      case "Normal":
        return <Badge className="bg-blue-500 text-white">Normal</Badge>
      case "Baixa":
        return <Badge className="bg-gray-500 text-white">Baixa</Badge>
      default:
        return <Badge variant="outline">{prioridade}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Agendada":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "Confirmada":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Em Andamento":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "Concluída":
        return <CheckCircle className="h-4 w-4 text-emerald-600" />
      case "Cancelada":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Consultas</h1>
          <p className="text-muted-foreground">Gerencie todas as consultas da clínica</p>
        </div>
        <NovaConsultaDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total de Consultas</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-full">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Consultas Hoje</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.hoje}</p>
              </div>
              <div className="p-3 bg-green-500 rounded-full">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Agendadas</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.agendadas}</p>
              </div>
              <div className="p-3 bg-purple-500 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Receita</p>
                <p className="text-3xl font-bold text-amber-900 dark:text-amber-100">R$ {stats.receita.toFixed(0)}</p>
              </div>
              <div className="p-3 bg-amber-500 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
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
                  placeholder="Buscar consultas..."
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
            <div className="mt-6 p-4 bg-muted/30 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="filter-status">Status</Label>
                <Select>
                  <SelectTrigger id="filter-status" className="border-0 bg-background">
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os status</SelectItem>
                    <SelectItem value="agendada">Agendada</SelectItem>
                    <SelectItem value="confirmada">Confirmada</SelectItem>
                    <SelectItem value="concluida">Concluída</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filter-tipo">Tipo</Label>
                <Select>
                  <SelectTrigger id="filter-tipo" className="border-0 bg-background">
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os tipos</SelectItem>
                    <SelectItem value="primeira">Primeira Consulta</SelectItem>
                    <SelectItem value="retorno">Retorno</SelectItem>
                    <SelectItem value="emergencia">Emergência</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filter-medico">Médico</Label>
                <Select>
                  <SelectTrigger id="filter-medico" className="border-0 bg-background">
                    <SelectValue placeholder="Todos os médicos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os médicos</SelectItem>
                    <SelectItem value="joao">Dr. João Silva</SelectItem>
                    <SelectItem value="ana">Dra. Ana Oliveira</SelectItem>
                    <SelectItem value="lucia">Dra. Lúcia Ferreira</SelectItem>
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

      {/* Consultas Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConsultas.map((consulta) => (
            <Card
              key={consulta.id}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => handleViewDetails(consulta)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                      <AvatarImage
                        src={`/abstract-geometric-shapes.png?height=48&width=48&query=${consulta.patientName}`}
                        alt={consulta.patientName}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {consulta.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {consulta.patientName}
                      </h3>
                      <p className="text-sm text-muted-foreground">{consulta.especialidade}</p>
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
                      <DropdownMenuItem>Confirmar</DropdownMenuItem>
                      <DropdownMenuItem>Reagendar</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Cancelar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {getStatusBadge(consulta.status)}
                    {getPrioridadeBadge(consulta.prioridade)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{consulta.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {consulta.time} ({consulta.duration}min)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{consulta.medico}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/50">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-primary">R$ {consulta.valor.toFixed(0)}</p>
                        <p className="text-xs text-muted-foreground">Valor</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-green-600">{consulta.tipo}</p>
                        <p className="text-xs text-muted-foreground">Tipo</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm bg-muted/50 p-2 rounded-md">
                    {getStatusIcon(consulta.status)}
                    <span>{consulta.convenio}</span>
                  </div>

                  {consulta.observacoes && (
                    <div className="text-sm text-muted-foreground bg-muted/30 p-2 rounded-md">
                      <p className="line-clamp-2">{consulta.observacoes}</p>
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
              {filteredConsultas.map((consulta) => (
                <div
                  key={consulta.id}
                  className="p-6 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => handleViewDetails(consulta)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                        <AvatarImage
                          src={`/abstract-geometric-shapes.png?height=48&width=48&query=${consulta.patientName}`}
                          alt={consulta.patientName}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {consulta.patientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{consulta.patientName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {consulta.medico} • {consulta.especialidade}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusBadge(consulta.status)}
                          {getPrioridadeBadge(consulta.prioridade)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{consulta.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{consulta.time}</span>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">R$ {consulta.valor.toFixed(0)}</p>
                          <p className="text-xs">{consulta.tipo}</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">{consulta.duration}min</p>
                          <p className="text-xs">Duração</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <DetalhesConsultaDialog consulta={selectedConsulta} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </div>
  )
}
