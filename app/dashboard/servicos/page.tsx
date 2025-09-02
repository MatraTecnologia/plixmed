"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  ToggleRight,
  Briefcase,
  Clock,
  DollarSign,
  Users,
  MoreVertical,
  Star,
  TrendingUp,
  Activity,
} from "lucide-react"
import { NovoServicoDialog } from "@/components/dialogs/novo-servico-dialog"
import { DetalhesServicoDialog } from "@/components/dialogs/detalhes-servico-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Servico {
  id: string
  nome: string
  descricao: string
  categoria: string
  preco: number
  duracao: number
  ativo: boolean
  profissionais: string[]
  cor: string
  agendamentos: number
  avaliacao: number
  totalAvaliacoes: number
}

const servicosData: Servico[] = [
  {
    id: "1",
    nome: "Consulta Clínica Geral",
    descricao: "Consulta médica de rotina com avaliação geral do paciente",
    categoria: "Consulta",
    preco: 150,
    duracao: 30,
    ativo: true,
    profissionais: ["Dr. João Silva", "Dra. Maria Santos"],
    cor: "bg-blue-500",
    agendamentos: 45,
    avaliacao: 4.8,
    totalAvaliacoes: 156,
  },
  {
    id: "2",
    nome: "Consulta Cardiológica",
    descricao: "Avaliação especializada do sistema cardiovascular",
    categoria: "Consulta",
    preco: 250,
    duracao: 45,
    ativo: true,
    profissionais: ["Dr. Carlos Oliveira"],
    cor: "bg-red-500",
    agendamentos: 32,
    avaliacao: 4.9,
    totalAvaliacoes: 89,
  },
  {
    id: "3",
    nome: "Exame de Sangue Completo",
    descricao: "Hemograma completo com análise detalhada",
    categoria: "Exame",
    preco: 80,
    duracao: 15,
    ativo: true,
    profissionais: ["Dra. Ana Costa", "Dr. Pedro Lima"],
    cor: "bg-green-500",
    agendamentos: 78,
    avaliacao: 4.7,
    totalAvaliacoes: 234,
  },
  {
    id: "4",
    nome: "Ultrassom Abdominal",
    descricao: "Exame de imagem para avaliação dos órgãos abdominais",
    categoria: "Exame",
    preco: 180,
    duracao: 30,
    ativo: true,
    profissionais: ["Dr. Rafael Santos"],
    cor: "bg-purple-500",
    agendamentos: 28,
    avaliacao: 4.6,
    totalAvaliacoes: 67,
  },
  {
    id: "5",
    nome: "Eletrocardiograma",
    descricao: "Exame para avaliação da atividade elétrica do coração",
    categoria: "Exame",
    preco: 120,
    duracao: 20,
    ativo: true,
    profissionais: ["Dr. Carlos Oliveira", "Dra. Maria Santos"],
    cor: "bg-orange-500",
    agendamentos: 56,
    avaliacao: 4.8,
    totalAvaliacoes: 123,
  },
  {
    id: "6",
    nome: "Consulta Dermatológica",
    descricao: "Avaliação especializada da pele e anexos",
    categoria: "Consulta",
    preco: 200,
    duracao: 40,
    ativo: true,
    profissionais: ["Dra. Lucia Ferreira"],
    cor: "bg-pink-500",
    agendamentos: 34,
    avaliacao: 4.9,
    totalAvaliacoes: 98,
  },
  {
    id: "7",
    nome: "Procedimento Cirúrgico Menor",
    descricao: "Pequenos procedimentos cirúrgicos ambulatoriais",
    categoria: "Procedimento",
    preco: 800,
    duracao: 120,
    ativo: true,
    profissionais: ["Dr. João Silva", "Dr. Rafael Santos"],
    cor: "bg-indigo-500",
    agendamentos: 12,
    avaliacao: 4.7,
    totalAvaliacoes: 45,
  },
  {
    id: "8",
    nome: "Consulta Ginecológica",
    descricao: "Consulta especializada em saúde da mulher",
    categoria: "Consulta",
    preco: 220,
    duracao: 50,
    ativo: true,
    profissionais: ["Dra. Maria Santos"],
    cor: "bg-teal-500",
    agendamentos: 41,
    avaliacao: 4.8,
    totalAvaliacoes: 134,
  },
  {
    id: "9",
    nome: "Raio-X Tórax",
    descricao: "Exame radiológico do tórax",
    categoria: "Exame",
    preco: 100,
    duracao: 15,
    ativo: false,
    profissionais: ["Dr. Pedro Lima"],
    cor: "bg-gray-500",
    agendamentos: 8,
    avaliacao: 4.5,
    totalAvaliacoes: 23,
  },
  {
    id: "10",
    nome: "Consulta Pediátrica",
    descricao: "Consulta especializada para crianças e adolescentes",
    categoria: "Consulta",
    preco: 180,
    duracao: 35,
    ativo: true,
    profissionais: ["Dra. Ana Costa"],
    cor: "bg-yellow-500",
    agendamentos: 67,
    avaliacao: 4.9,
    totalAvaliacoes: 187,
  },
]

export default function ServicosPage() {
  const [servicos, setServicos] = useState<Servico[]>(servicosData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [novoServicoOpen, setNovoServicoOpen] = useState(false)
  const [detalhesServicoOpen, setDetalhesServicoOpen] = useState(false)
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredServicos = servicos.filter((servico) => {
    const matchesSearch =
      servico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servico.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || servico.categoria === selectedCategory
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "ativo" && servico.ativo) ||
      (selectedStatus === "inativo" && !servico.ativo)

    return matchesSearch && matchesCategory && matchesStatus
  })

  const toggleServicoStatus = (id: string) => {
    setServicos((prev) => prev.map((servico) => (servico.id === id ? { ...servico, ativo: !servico.ativo } : servico)))
  }

  const handleDetalhes = (servico: Servico) => {
    setSelectedServico(servico)
    setDetalhesServicoOpen(true)
  }

  const totalServicos = servicos.length
  const servicosAtivos = servicos.filter((s) => s.ativo).length
  const categorias = [...new Set(servicos.map((s) => s.categoria))].length
  const precoMedio = servicos.reduce((acc, s) => acc + s.preco, 0) / servicos.length
  const totalAgendamentos = servicos.reduce((acc, s) => acc + s.agendamentos, 0)
  const avaliacaoMedia = servicos.reduce((acc, s) => acc + s.avaliacao, 0) / servicos.length

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Serviços</h1>
          <p className="text-gray-500 dark:text-gray-400">Gerencie os serviços oferecidos pela clínica</p>
        </div>
        <Button onClick={() => setNovoServicoOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
          <Plus className="mr-2 h-4 w-4" />
          Novo Serviço
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total de Serviços</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{totalServicos}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Serviços cadastrados</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-full shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Serviços Ativos</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">{servicosAtivos}</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">Disponíveis para agendamento</p>
              </div>
              <div className="p-3 bg-green-500 rounded-full shadow-lg">
                <ToggleRight className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Agendamentos</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{totalAgendamentos}</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Este mês</p>
              </div>
              <div className="p-3 bg-purple-500 rounded-full shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Avaliação Média</p>
                <p className="text-3xl font-bold text-amber-900 dark:text-amber-100">{avaliacaoMedia.toFixed(1)}</p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">Satisfação dos pacientes</p>
              </div>
              <div className="p-3 bg-amber-500 rounded-full shadow-lg">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                <Input
                  placeholder="Buscar serviços..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-0 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 border-0 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="Consulta">Consulta</SelectItem>
                <SelectItem value="Exame">Exame</SelectItem>
                <SelectItem value="Procedimento">Procedimento</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48 border-0 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
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
        </CardContent>
      </Card>

      {/* Lista de Serviços */}
      {viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServicos.map((servico) => (
            <Card
              key={servico.id}
              className="border-0 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => handleDetalhes(servico)}
            >
              <CardHeader className="pb-3 relative">
                <div className="absolute top-4 right-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Duplicar</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => toggleServicoStatus(servico.id)}
                        className={servico.ativo ? "text-red-600" : "text-green-600"}
                      >
                        {servico.ativo ? "Desativar" : "Ativar"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${servico.cor} shadow-lg`} />
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {servico.nome}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className={`${
                          servico.categoria === "Consulta"
                            ? "border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20"
                            : servico.categoria === "Exame"
                              ? "border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20"
                              : "border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20"
                        }`}
                      >
                        {servico.categoria}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          servico.ativo
                            ? "border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20"
                            : "border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20"
                        }
                      >
                        {servico.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                  {servico.descricao}
                </CardDescription>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">R$ {servico.preco}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Preço</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{servico.duracao}min</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Duração</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {servico.profissionais.length} profissional(is)
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{servico.avaliacao}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">({servico.totalAvaliacoes})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {servico.agendamentos} agendamentos
                    </span>
                  </div>
                  <div className="flex -space-x-2">
                    {servico.profissionais.slice(0, 3).map((profissional, index) => (
                      <Avatar key={index} className="h-6 w-6 border-2 border-white dark:border-gray-800">
                        <AvatarImage
                          src={`/abstract-geometric-shapes.png?height=24&width=24&query=${profissional}`}
                          alt={profissional}
                        />
                        <AvatarFallback className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                          {profissional
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {servico.profissionais.length > 3 && (
                      <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          +{servico.profissionais.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredServicos.map((servico) => (
                <div
                  key={servico.id}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
                  onClick={() => handleDetalhes(servico)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${servico.cor}`} />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {servico.nome}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{servico.descricao}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant="outline"
                            className={`${
                              servico.categoria === "Consulta"
                                ? "border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20"
                                : servico.categoria === "Exame"
                                  ? "border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20"
                                  : "border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20"
                            }`}
                          >
                            {servico.categoria}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              servico.ativo
                                ? "border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20"
                                : "border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20"
                            }
                          >
                            {servico.ativo ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8 text-sm text-gray-600 dark:text-gray-300">
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 dark:text-white">R$ {servico.preco}</p>
                        <p className="text-xs">Preço</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 dark:text-white">{servico.duracao}min</p>
                        <p className="text-xs">Duração</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-gray-900 dark:text-white">{servico.avaliacao}</span>
                        </div>
                        <p className="text-xs">{servico.totalAvaliacoes} avaliações</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 dark:text-white">{servico.agendamentos}</p>
                        <p className="text-xs">Agendamentos</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Duplicar</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toggleServicoStatus(servico.id)}
                            className={servico.ativo ? "text-red-600" : "text-green-600"}
                          >
                            {servico.ativo ? "Desativar" : "Ativar"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredServicos.length === 0 && (
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
              <Briefcase className="h-12 w-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Nenhum serviço encontrado</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md">
              Não encontramos serviços que correspondam aos filtros selecionados. Tente ajustar os critérios de busca.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedStatus("all")
              }}
              variant="outline"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Limpar filtros
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Dialogs */}
      <NovoServicoDialog open={novoServicoOpen} onOpenChange={setNovoServicoOpen} />

      {selectedServico && (
        <DetalhesServicoDialog
          open={detalhesServicoOpen}
          onOpenChange={setDetalhesServicoOpen}
          servico={selectedServico}
        />
      )}
    </div>
  )
}
