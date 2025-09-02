"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, User, Phone, MapPin, Search, Download, Star, TrendingUp, Activity, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CancelarConsultaDialog } from "@/components/dialogs/cancelar-consulta-dialog"
import { ReagendarConsultaDialog } from "@/components/dialogs/reagendar-consulta-dialog"
import { CalendarioCliente } from "@/components/cliente/calendario-cliente"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { BannerAvaliacao } from "@/components/cliente/banner-avaliacao"

// Dados simulados para gráficos
const consultasPorMes = [
  { mes: "Jan", consultas: 2, valor: 400 },
  { mes: "Fev", consultas: 1, valor: 200 },
  { mes: "Mar", consultas: 3, valor: 600 },
  { mes: "Abr", consultas: 2, valor: 400 },
  { mes: "Mai", consultas: 4, valor: 800 },
  { mes: "Jun", consultas: 1, valor: 200 },
]

const especialidadesData = [
  { name: "Cardiologia", value: 5, color: "#3b82f6" },
  { name: "Dermatologia", value: 3, color: "#8b5cf6" },
  { name: "Clínico Geral", value: 2, color: "#06b6d4" },
  { name: "Ortopedia", value: 2, color: "#10b981" },
]

// Dados simulados
const proximosAgendamentos = [
  {
    id: 1,
    data: "2024-01-15",
    hora: "14:30",
    profissional: "Dr. João Silva",
    especialidade: "Cardiologia",
    servico: "Consulta Cardiológica",
    status: "confirmado",
    endereco: "Rua das Flores, 123 - Centro",
    telefone: "(11) 99999-9999",
    valor: "R$ 200,00",
  },
  {
    id: 2,
    data: "2024-01-22",
    hora: "09:00",
    profissional: "Dra. Maria Santos",
    especialidade: "Dermatologia",
    servico: "Consulta Dermatológica",
    status: "pendente",
    endereco: "Av. Principal, 456 - Jardins",
    telefone: "(11) 88888-8888",
    valor: "R$ 180,00",
  },
]

const historicoConsultas = [
  {
    id: 3,
    data: "2023-12-10",
    hora: "15:00",
    profissional: "Dr. João Silva",
    especialidade: "Cardiologia",
    servico: "Consulta Cardiológica",
    status: "realizada",
    valor: "R$ 200,00",
    avaliacao: 5,
  },
  {
    id: 4,
    data: "2023-11-15",
    hora: "10:30",
    profissional: "Dra. Ana Costa",
    especialidade: "Clínico Geral",
    servico: "Consulta Geral",
    status: "realizada",
    valor: "R$ 150,00",
    avaliacao: 4,
  },
  {
    id: 5,
    data: "2023-10-20",
    hora: "16:00",
    profissional: "Dr. Pedro Lima",
    especialidade: "Ortopedia",
    servico: "Consulta Ortopédica",
    status: "cancelada",
    valor: "R$ 220,00",
    avaliacao: null,
  },
]

export default function ClienteDashboard() {
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [busca, setBusca] = useState("")
  const [consultaSelecionada, setConsultaSelecionada] = useState<any>(null)
  const [dialogCancelar, setDialogCancelar] = useState(false)
  const [dialogReagendar, setDialogReagendar] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
      case "pendente":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
      case "realizada":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
      case "cancelada":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800"
    }
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const historicoFiltrado = historicoConsultas.filter((consulta) => {
    const matchStatus = filtroStatus === "todos" || consulta.status === filtroStatus
    const matchBusca =
      consulta.profissional.toLowerCase().includes(busca.toLowerCase()) ||
      consulta.especialidade.toLowerCase().includes(busca.toLowerCase())
    return matchStatus && matchBusca
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden bg-blue-600 rounded-2xl shadow-xl">
          <div className="p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Olá, José! 👋</h1>
                <p className="text-blue-100 text-lg">Bem-vinda à sua área pessoal</p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">12</div>
                  <div className="text-sm text-blue-100">Consultas</div>
                </div>
                <div className="w-px h-12 bg-blue-300/30"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">4.8</div>
                  <div className="text-sm text-blue-100">Avaliação</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner de Avaliação */}
        <BannerAvaliacao />

        {/* Estatísticas Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-900 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Próxima Consulta</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">15 Jan</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">14:30 - Cardiologia</p>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-900 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Consultas</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">+2 este mês</p>
                </div>
                <div className="p-3 bg-emerald-500 rounded-xl shadow-lg">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-900 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Gasto Total</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">R$ 2.400</p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Últimos 6 meses</p>
                </div>
                <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-900 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Satisfação</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < 5 ? "text-amber-400 fill-current" : "text-gray-300"}`} />
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-amber-500 rounded-xl shadow-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs para Agendamentos e Calendário */}
        <Tabs defaultValue="calendario" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border-gray-200 shadow-lg dark:bg-gray-900 dark:border-gray-800">
            <TabsTrigger value="calendario" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Calendário
            </TabsTrigger>
            <TabsTrigger value="proximos" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Próximos
            </TabsTrigger>
            <TabsTrigger value="historico" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Histórico
            </TabsTrigger>
          </TabsList>

          {/* Calendário */}
          <TabsContent value="calendario">
            <CalendarioCliente />
          </TabsContent>

          {/* Próximos Agendamentos */}
          <TabsContent value="proximos">
            <Card className="bg-white border-gray-200 shadow-lg dark:bg-gray-900 dark:border-gray-800">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Próximos Agendamentos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {proximosAgendamentos.map((agendamento) => (
                  <div
                    key={agendamento.id}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <Badge className={`${getStatusColor(agendamento.status)} border font-medium px-3 py-1`}>
                            {agendamento.status.charAt(0).toUpperCase() + agendamento.status.slice(1)}
                          </Badge>
                          <span className="font-semibold text-lg text-gray-900 dark:text-white">
                            {formatarData(agendamento.data)} às {agendamento.hora}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span>
                              {agendamento.profissional} - {agendamento.especialidade}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>{agendamento.endereco}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span>{agendamento.telefone}</span>
                          </div>
                          <div className="font-semibold text-emerald-600 dark:text-emerald-400">
                            {agendamento.valor}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            setConsultaSelecionada(agendamento)
                            setDialogReagendar(true)
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Reagendar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setConsultaSelecionada(agendamento)
                            setDialogCancelar(true)
                          }}
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Histórico de Consultas */}
          <TabsContent value="historico">
            <Card className="bg-white border-gray-200 shadow-lg dark:bg-gray-900 dark:border-gray-800">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Histórico de Consultas
                  </CardTitle>

                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar por médico ou especialidade..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="pl-10 w-64 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white dark:bg-gray-800 dark:border-gray-700"
                      />
                    </div>

                    <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                      <SelectTrigger className="w-40 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white dark:bg-gray-800 dark:border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="todos" className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          Todos
                        </SelectItem>
                        <SelectItem value="realizada" className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          Realizadas
                        </SelectItem>
                        <SelectItem value="cancelada" className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          Canceladas
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {historicoFiltrado.map((consulta) => (
                    <div
                      key={consulta.id}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <Badge className={`${getStatusColor(consulta.status)} border font-medium px-3 py-1`}>
                              {consulta.status.charAt(0).toUpperCase() + consulta.status.slice(1)}
                            </Badge>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {formatarData(consulta.data)} às {consulta.hora}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span>{consulta.profissional}</span>
                            </div>
                            <div>
                              <span>{consulta.especialidade}</span>
                            </div>
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">{consulta.valor}</div>
                          </div>

                          {consulta.avaliacao && (
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < consulta.avaliacao ? "text-amber-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                                Avaliação: {consulta.avaliacao}/5
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Comprovante
                          </Button>
                          {consulta.status === "realizada" && !consulta.avaliacao && (
                            <Button
                              size="sm"
                              className="bg-amber-500 hover:bg-amber-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <Star className="h-4 w-4 mr-2" />
                              Avaliar
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Consultas por Mês */}
          <Card className="bg-white border-gray-200 shadow-lg dark:bg-gray-900 dark:border-gray-800">
            <CardHeader className="border-b border-gray-100 dark:border-gray-800">
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Consultas por Mês
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={consultasPorMes}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="mes" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="consultas"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: "#3b82f6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico de Especialidades */}
          <Card className="bg-white border-gray-200 shadow-lg dark:bg-gray-900 dark:border-gray-800">
            <CardHeader className="border-b border-gray-100 dark:border-gray-800">
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Activity className="h-5 w-5 text-purple-600" />
                Consultas por Especialidade
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={especialidadesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {especialidadesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {especialidadesData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialogs */}
      <CancelarConsultaDialog open={dialogCancelar} onOpenChange={setDialogCancelar} consulta={consultaSelecionada} />

      <ReagendarConsultaDialog
        open={dialogReagendar}
        onOpenChange={setDialogReagendar}
        consulta={consultaSelecionada}
      />
    </div>
  )
}
