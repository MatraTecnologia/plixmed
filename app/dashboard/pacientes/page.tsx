"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, MoreVertical, Calendar, Phone, Mail, MapPin, Users, TrendingUp, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { NovoPacienteDialog } from "@/components/dialogs/novo-paciente-dialog"
import { DetalhesPacienteDialog, type PacienteDetalhes } from "@/components/dialogs/detalhes-paciente-dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function PacientesPage() {
  const [selectedPaciente, setSelectedPaciente] = useState<PacienteDetalhes | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Dados simulados de pacientes
  const pacientes = [
    {
      id: 1,
      nome: "Maria Silva",
      telefone: "(11) 98765-4321",
      email: "maria.silva@email.com",
      ultimaConsulta: "12/05/2023",
      proximaConsulta: "20/06/2023",
      status: "Ativo",
      dataNascimento: "15/03/1985",
      genero: "Feminino",
      endereco: "Av. Paulista, 1000, Apto 123 - Bela Vista, São Paulo - SP",
      convenio: "Unimed",
      idade: 38,
      totalConsultas: 15,
      medicoResponsavel: "Dr. João Silva",
      prioridade: "Normal",
      historico: [
        {
          id: 1,
          data: "12/05/2023",
          tipo: "Retorno",
          medico: "Dr. João Silva",
          observacoes: "Paciente apresentou melhora significativa.",
        },
        {
          id: 2,
          data: "10/04/2023",
          tipo: "Primeira Consulta",
          medico: "Dr. João Silva",
          observacoes: "Paciente com queixa de dores no peito.",
        },
      ],
      exames: [
        { id: 1, tipo: "Hemograma", data: "15/04/2023", status: "Disponível" },
        { id: 2, tipo: "Eletrocardiograma", data: "16/04/2023", status: "Disponível" },
      ],
    },
    {
      id: 2,
      nome: "João Pereira",
      telefone: "(11) 91234-5678",
      email: "joao.pereira@email.com",
      ultimaConsulta: "10/05/2023",
      proximaConsulta: "18/06/2023",
      status: "Ativo",
      dataNascimento: "22/07/1978",
      genero: "Masculino",
      endereco: "Rua Augusta, 500 - Consolação, São Paulo - SP",
      convenio: "Bradesco Saúde",
      idade: 45,
      totalConsultas: 8,
      medicoResponsavel: "Dra. Ana Oliveira",
      prioridade: "Alta",
      historico: [
        {
          id: 3,
          data: "10/05/2023",
          tipo: "Retorno",
          medico: "Dra. Ana Oliveira",
          observacoes: "Paciente com diabetes controlada.",
        },
      ],
      exames: [{ id: 3, tipo: "Glicemia", data: "05/05/2023", status: "Disponível" }],
    },
    {
      id: 3,
      nome: "Ana Souza",
      telefone: "(11) 99876-5432",
      email: "ana.souza@email.com",
      ultimaConsulta: "05/05/2023",
      proximaConsulta: "25/06/2023",
      status: "Ativo",
      dataNascimento: "10/11/1990",
      genero: "Feminino",
      endereco: "Rua Oscar Freire, 200 - Jardins, São Paulo - SP",
      convenio: "SulAmérica",
      idade: 33,
      totalConsultas: 12,
      medicoResponsavel: "Dr. João Silva",
      prioridade: "Normal",
      historico: [{ id: 4, data: "05/05/2023", tipo: "Retorno", medico: "Dr. João Silva" }],
      exames: [],
    },
    {
      id: 4,
      nome: "Carlos Oliveira",
      telefone: "(11) 98765-1234",
      email: "carlos.oliveira@email.com",
      ultimaConsulta: "28/04/2023",
      proximaConsulta: null,
      status: "Inativo",
      dataNascimento: "05/06/1965",
      genero: "Masculino",
      endereco: "Av. Rebouças, 1500 - Pinheiros, São Paulo - SP",
      convenio: "Amil",
      idade: 58,
      totalConsultas: 25,
      medicoResponsavel: "Dra. Lúcia Ferreira",
      prioridade: "Baixa",
    },
    {
      id: 5,
      nome: "Lúcia Santos",
      telefone: "(11) 97654-3210",
      email: "lucia.santos@email.com",
      ultimaConsulta: "25/04/2023",
      proximaConsulta: "15/06/2023",
      status: "Ativo",
      dataNascimento: "30/12/1982",
      genero: "Feminino",
      endereco: "Rua Haddock Lobo, 350 - Cerqueira César, São Paulo - SP",
      convenio: "Particular",
      idade: 41,
      totalConsultas: 18,
      medicoResponsavel: "Dr. João Silva",
      prioridade: "Normal",
    },
    {
      id: 6,
      nome: "Roberto Almeida",
      telefone: "(11) 96543-2109",
      email: "roberto.almeida@email.com",
      ultimaConsulta: "20/04/2023",
      proximaConsulta: "22/06/2023",
      status: "Ativo",
      dataNascimento: "18/09/1970",
      genero: "Masculino",
      endereco: "Rua da Consolação, 1000 - Consolação, São Paulo - SP",
      convenio: "Unimed",
      idade: 53,
      totalConsultas: 22,
      medicoResponsavel: "Dra. Ana Oliveira",
      prioridade: "Normal",
    },
  ]

  // Estatísticas
  const stats = {
    total: pacientes.length,
    ativos: pacientes.filter((p) => p.status === "Ativo").length,
    consultasHoje: 8,
    idadeMedia: Math.round(pacientes.reduce((acc, p) => acc + p.idade, 0) / pacientes.length),
  }

  const filteredPacientes = pacientes.filter(
    (paciente) =>
      paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paciente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paciente.telefone.includes(searchTerm) ||
      paciente.convenio.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewDetails = (paciente: PacienteDetalhes) => {
    setSelectedPaciente(paciente)
    setDetailsOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Ativo</Badge>
      case "Inativo":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Inativo</Badge>
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

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pacientes</h1>
          <p className="text-muted-foreground">Gerencie todos os pacientes da clínica</p>
        </div>
        <NovoPacienteDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total de Pacientes</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Pacientes Ativos</p>
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
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Consultas Hoje</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.consultasHoje}</p>
              </div>
              <div className="p-3 bg-purple-500 rounded-full">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Idade Média</p>
                <p className="text-3xl font-bold text-amber-900 dark:text-amber-100">{stats.idadeMedia} anos</p>
              </div>
              <div className="p-3 bg-amber-500 rounded-full">
                <Heart className="h-6 w-6 text-white" />
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
                  placeholder="Buscar pacientes..."
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
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filter-convenio">Convênio</Label>
                <Select>
                  <SelectTrigger id="filter-convenio" className="border-0 bg-background">
                    <SelectValue placeholder="Todos os convênios" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os convênios</SelectItem>
                    <SelectItem value="unimed">Unimed</SelectItem>
                    <SelectItem value="bradesco">Bradesco Saúde</SelectItem>
                    <SelectItem value="sulamerica">SulAmérica</SelectItem>
                    <SelectItem value="particular">Particular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filter-prioridade">Prioridade</Label>
                <Select>
                  <SelectTrigger id="filter-prioridade" className="border-0 bg-background">
                    <SelectValue placeholder="Todas as prioridades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as prioridades</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="baixa">Baixa</SelectItem>
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

      {/* Patients Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPacientes.map((paciente) => (
            <Card
              key={paciente.id}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => handleViewDetails(paciente)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                      <AvatarImage
                        src={`/abstract-geometric-shapes.png?height=48&width=48&query=${paciente.nome}`}
                        alt={paciente.nome}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {paciente.nome
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {paciente.nome}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {paciente.idade} anos • {paciente.genero}
                      </p>
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
                      <DropdownMenuItem>Nova Consulta</DropdownMenuItem>
                      <DropdownMenuItem>Ver Histórico</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Desativar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {getStatusBadge(paciente.status)}
                    {getPrioridadeBadge(paciente.prioridade)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{paciente.telefone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{paciente.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{paciente.convenio}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/50">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-primary">{paciente.totalConsultas}</p>
                        <p className="text-xs text-muted-foreground">Consultas</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{paciente.ultimaConsulta}</p>
                        <p className="text-xs text-muted-foreground">Última consulta</p>
                      </div>
                    </div>
                  </div>

                  {paciente.proximaConsulta && (
                    <div className="flex items-center gap-2 text-sm bg-primary/5 text-primary p-2 rounded-md">
                      <Calendar className="h-4 w-4" />
                      <span>Próxima: {paciente.proximaConsulta}</span>
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Médico:</span> {paciente.medicoResponsavel}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-md">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filteredPacientes.map((paciente) => (
                <div
                  key={paciente.id}
                  className="p-6 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => handleViewDetails(paciente)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                        <AvatarImage
                          src={`/abstract-geometric-shapes.png?height=48&width=48&query=${paciente.nome}`}
                          alt={paciente.nome}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {paciente.nome
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{paciente.nome}</h3>
                        <p className="text-sm text-muted-foreground">
                          {paciente.idade} anos • {paciente.genero} • {paciente.convenio}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusBadge(paciente.status)}
                          {getPrioridadeBadge(paciente.prioridade)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          <span>{paciente.telefone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          <span>{paciente.email}</span>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">{paciente.totalConsultas}</p>
                          <p className="text-xs">Consultas</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">{paciente.ultimaConsulta}</p>
                          <p className="text-xs">Última consulta</p>
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

      <DetalhesPacienteDialog paciente={selectedPaciente} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </div>
  )
}
