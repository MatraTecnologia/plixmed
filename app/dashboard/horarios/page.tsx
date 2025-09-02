"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Coffee, Plane, Plus, Edit, Trash2, XCircle, CalendarX, CalendarCheck, Timer } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface HorarioFuncionamento {
  dia: string
  ativo: boolean
  inicio: string
  fim: string
  intervaloInicio?: string
  intervaloFim?: string
}

interface Folga {
  id: number
  titulo: string
  dataInicio: Date
  dataFim: Date
  tipo: "folga" | "ferias" | "feriado" | "bloqueio"
  motivo?: string
  recorrente?: boolean
  status: "ativa" | "pendente" | "cancelada"
}

interface HorarioEspecial {
  id: number
  data: Date
  inicio: string
  fim: string
  motivo: string
}

export default function HorariosPage() {
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [novaFolgaOpen, setNovaFolgaOpen] = useState(false)
  const [horarioEspecialOpen, setHorarioEspecialOpen] = useState(false)

  const [horariosFuncionamento, setHorariosFuncionamento] = useState<HorarioFuncionamento[]>([
    { dia: "Segunda", ativo: true, inicio: "08:00", fim: "18:00", intervaloInicio: "12:00", intervaloFim: "13:00" },
    { dia: "Terça", ativo: true, inicio: "08:00", fim: "18:00", intervaloInicio: "12:00", intervaloFim: "13:00" },
    { dia: "Quarta", ativo: true, inicio: "08:00", fim: "18:00", intervaloInicio: "12:00", intervaloFim: "13:00" },
    { dia: "Quinta", ativo: true, inicio: "08:00", fim: "18:00", intervaloInicio: "12:00", intervaloFim: "13:00" },
    { dia: "Sexta", ativo: true, inicio: "08:00", fim: "17:00", intervaloInicio: "12:00", intervaloFim: "13:00" },
    { dia: "Sábado", ativo: true, inicio: "08:00", fim: "12:00" },
    { dia: "Domingo", ativo: false, inicio: "00:00", fim: "00:00" },
  ])

  const [folgas, setFolgas] = useState<Folga[]>([
    {
      id: 1,
      titulo: "Férias de Verão",
      dataInicio: new Date(2024, 11, 20),
      dataFim: new Date(2025, 0, 5),
      tipo: "ferias",
      motivo: "Férias programadas",
      status: "ativa",
    },
    {
      id: 2,
      titulo: "Congresso Médico",
      dataInicio: new Date(2024, 11, 15),
      dataFim: new Date(2024, 11, 17),
      tipo: "folga",
      motivo: "Participação em evento científico",
      status: "ativa",
    },
    {
      id: 3,
      titulo: "Natal",
      dataInicio: new Date(2024, 11, 25),
      dataFim: new Date(2024, 11, 25),
      tipo: "feriado",
      recorrente: true,
      status: "ativa",
    },
  ])

  const [horariosEspeciais, setHorariosEspeciais] = useState<HorarioEspecial[]>([
    {
      id: 1,
      data: new Date(2024, 11, 14),
      inicio: "14:00",
      fim: "20:00",
      motivo: "Atendimento especial - plantão",
    },
  ])

  const [novaFolga, setNovaFolga] = useState({
    titulo: "",
    dataInicio: new Date(),
    dataFim: new Date(),
    tipo: "folga" as const,
    motivo: "",
    recorrente: false,
  })

  const [novoHorarioEspecial, setNovoHorarioEspecial] = useState({
    data: new Date(),
    inicio: "",
    fim: "",
    motivo: "",
  })

  // Estatísticas
  const totalHorasSemanais = horariosFuncionamento
    .filter((h) => h.ativo)
    .reduce((total, horario) => {
      const inicio = new Date(`2000-01-01T${horario.inicio}`)
      const fim = new Date(`2000-01-01T${horario.fim}`)
      const intervalo =
        horario.intervaloInicio && horario.intervaloFim
          ? (new Date(`2000-01-01T${horario.intervaloFim}`).getTime() -
              new Date(`2000-01-01T${horario.intervaloInicio}`).getTime()) /
            (1000 * 60 * 60)
          : 0
      return total + (fim.getTime() - inicio.getTime()) / (1000 * 60 * 60) - intervalo
    }, 0)

  const folgasAtivas = folgas.filter((f) => f.status === "ativa").length
  const proximaFolga = folgas
    .filter((f) => f.dataInicio > new Date() && f.status === "ativa")
    .sort((a, b) => a.dataInicio.getTime() - b.dataInicio.getTime())[0]

  const handleHorarioChange = (index: number, campo: keyof HorarioFuncionamento, valor: any) => {
    const novosHorarios = [...horariosFuncionamento]
    novosHorarios[index] = { ...novosHorarios[index], [campo]: valor }
    setHorariosFuncionamento(novosHorarios)
  }

  const adicionarFolga = () => {
    if (!novaFolga.titulo) return

    const novaId = Math.max(...folgas.map((f) => f.id)) + 1
    setFolgas([...folgas, { ...novaFolga, id: novaId, status: "ativa" }])
    setNovaFolga({
      titulo: "",
      dataInicio: new Date(),
      dataFim: new Date(),
      tipo: "folga",
      motivo: "",
      recorrente: false,
    })
    setNovaFolgaOpen(false)
    toast({
      title: "Folga adicionada!",
      description: "A folga foi cadastrada com sucesso.",
    })
  }

  const adicionarHorarioEspecial = () => {
    if (!novoHorarioEspecial.inicio || !novoHorarioEspecial.fim) return

    const novoId = Math.max(...horariosEspeciais.map((h) => h.id)) + 1
    setHorariosEspeciais([...horariosEspeciais, { ...novoHorarioEspecial, id: novoId }])
    setNovoHorarioEspecial({
      data: new Date(),
      inicio: "",
      fim: "",
      motivo: "",
    })
    setHorarioEspecialOpen(false)
    toast({
      title: "Horário especial adicionado!",
      description: "O horário especial foi cadastrado com sucesso.",
    })
  }

  const removerFolga = (id: number) => {
    setFolgas(folgas.filter((f) => f.id !== id))
    toast({
      title: "Folga removida!",
      description: "A folga foi removida com sucesso.",
    })
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "ferias":
        return <Plane className="w-4 h-4" />
      case "feriado":
        return <CalendarX className="w-4 h-4" />
      case "bloqueio":
        return <XCircle className="w-4 h-4" />
      default:
        return <Coffee className="w-4 h-4" />
    }
  }

  const getTipoBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "ferias":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "feriado":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "bloqueio":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    }
  }

  const salvarConfiguracoes = () => {
    toast({
      title: "Configurações salvas!",
      description: "Seus horários de atendimento foram atualizados.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Horários de Atendimento
        </h2>
        <Button
          onClick={salvarConfiguracoes}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Salvar Configurações
        </Button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Horas Semanais</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalHorasSemanais.toFixed(1)}h</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Folgas Ativas</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{folgasAtivas}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <CalendarX className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Próxima Folga</p>
                <p className="text-sm font-bold text-purple-900 dark:text-purple-100">
                  {proximaFolga ? proximaFolga.dataInicio.toLocaleDateString("pt-BR") : "Nenhuma"}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <CalendarCheck className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Horários Especiais</p>
                <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">{horariosEspeciais.length}</p>
              </div>
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <Timer className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="horarios" className="space-y-6">
        <div className="flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-3 h-12 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 shadow-lg">
            <TabsTrigger
              value="horarios"
              className="h-10 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md transition-all duration-200"
            >
              <Clock className="w-4 h-4 mr-2" />
              Horários
            </TabsTrigger>
            <TabsTrigger
              value="folgas"
              className="h-10 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md transition-all duration-200"
            >
              <CalendarX className="w-4 h-4 mr-2" />
              Folgas
            </TabsTrigger>
            <TabsTrigger
              value="especiais"
              className="h-10 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md transition-all duration-200"
            >
              <Timer className="w-4 h-4 mr-2" />
              Especiais
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="horarios" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Horários de Funcionamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {horariosFuncionamento.map((horario, index) => (
                  <div
                    key={horario.dia}
                    className="flex items-center gap-4 p-4 border rounded-lg bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-20">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{horario.dia}</span>
                    </div>

                    <Switch
                      checked={horario.ativo}
                      onCheckedChange={(checked) => handleHorarioChange(index, "ativo", checked)}
                    />

                    {horario.ativo && (
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm text-slate-600 dark:text-slate-400">De:</Label>
                          <Input
                            type="time"
                            value={horario.inicio}
                            onChange={(e) => handleHorarioChange(index, "inicio", e.target.value)}
                            className="w-32 bg-white dark:bg-slate-800"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <Label className="text-sm text-slate-600 dark:text-slate-400">Até:</Label>
                          <Input
                            type="time"
                            value={horario.fim}
                            onChange={(e) => handleHorarioChange(index, "fim", e.target.value)}
                            className="w-32 bg-white dark:bg-slate-800"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <Label className="text-sm text-slate-600 dark:text-slate-400">Intervalo:</Label>
                          <Input
                            type="time"
                            value={horario.intervaloInicio || ""}
                            onChange={(e) => handleHorarioChange(index, "intervaloInicio", e.target.value)}
                            className="w-32 bg-white dark:bg-slate-800"
                            placeholder="Início"
                          />
                          <span className="text-slate-400">-</span>
                          <Input
                            type="time"
                            value={horario.intervaloFim || ""}
                            onChange={(e) => handleHorarioChange(index, "intervaloFim", e.target.value)}
                            className="w-32 bg-white dark:bg-slate-800"
                            placeholder="Fim"
                          />
                        </div>
                      </div>
                    )}

                    {!horario.ativo && (
                      <span className="text-slate-500 dark:text-slate-400 text-sm flex-1">Fechado</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="folgas" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Gerenciar Folgas e Ausências</h3>
            <Dialog open={novaFolgaOpen} onOpenChange={setNovaFolgaOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Folga
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Cadastrar Nova Folga</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="titulo-folga">Título</Label>
                    <Input
                      id="titulo-folga"
                      value={novaFolga.titulo}
                      onChange={(e) => setNovaFolga({ ...novaFolga, titulo: e.target.value })}
                      placeholder="Ex: Férias, Congresso, etc."
                    />
                  </div>

                  <div>
                    <Label htmlFor="tipo-folga">Tipo</Label>
                    <Select
                      value={novaFolga.tipo}
                      onValueChange={(value: any) => setNovaFolga({ ...novaFolga, tipo: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="folga">Folga</SelectItem>
                        <SelectItem value="ferias">Férias</SelectItem>
                        <SelectItem value="feriado">Feriado</SelectItem>
                        <SelectItem value="bloqueio">Bloqueio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Data Início</Label>
                      <Input
                        type="date"
                        value={novaFolga.dataInicio.toISOString().split("T")[0]}
                        onChange={(e) => setNovaFolga({ ...novaFolga, dataInicio: new Date(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label>Data Fim</Label>
                      <Input
                        type="date"
                        value={novaFolga.dataFim.toISOString().split("T")[0]}
                        onChange={(e) => setNovaFolga({ ...novaFolga, dataFim: new Date(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="motivo-folga">Motivo (opcional)</Label>
                    <Textarea
                      id="motivo-folga"
                      value={novaFolga.motivo}
                      onChange={(e) => setNovaFolga({ ...novaFolga, motivo: e.target.value })}
                      placeholder="Descreva o motivo da folga..."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="recorrente"
                      checked={novaFolga.recorrente}
                      onCheckedChange={(checked) => setNovaFolga({ ...novaFolga, recorrente: checked })}
                    />
                    <Label htmlFor="recorrente">Recorrente (anualmente)</Label>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={adicionarFolga} className="flex-1">
                      Cadastrar Folga
                    </Button>
                    <Button variant="outline" onClick={() => setNovaFolgaOpen(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Folgas Cadastradas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {folgas.map((folga) => (
                    <div
                      key={folga.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          {getTipoIcon(folga.tipo)}
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800 dark:text-slate-200">{folga.titulo}</h4>
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <span>{folga.dataInicio.toLocaleDateString("pt-BR")}</span>
                            {folga.dataInicio.getTime() !== folga.dataFim.getTime() && (
                              <>
                                <span>-</span>
                                <span>{folga.dataFim.toLocaleDateString("pt-BR")}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className={getTipoBadgeColor(folga.tipo)}>{folga.tipo}</Badge>
                        <Button variant="ghost" size="icon" onClick={() => removerFolga(folga.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Calendário de Folgas</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={{
                    folga: folgas.map((f) => f.dataInicio),
                    ferias: folgas.filter((f) => f.tipo === "ferias").map((f) => f.dataInicio),
                  }}
                  modifiersStyles={{
                    folga: { backgroundColor: "#fef3c7", color: "#92400e" },
                    ferias: { backgroundColor: "#dbeafe", color: "#1e40af" },
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="especiais" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Horários Especiais</h3>
            <Dialog open={horarioEspecialOpen} onOpenChange={setHorarioEspecialOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Horário Especial
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Cadastrar Horário Especial</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Data</Label>
                    <Input
                      type="date"
                      value={novoHorarioEspecial.data.toISOString().split("T")[0]}
                      onChange={(e) =>
                        setNovoHorarioEspecial({ ...novoHorarioEspecial, data: new Date(e.target.value) })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Horário Início</Label>
                      <Input
                        type="time"
                        value={novoHorarioEspecial.inicio}
                        onChange={(e) => setNovoHorarioEspecial({ ...novoHorarioEspecial, inicio: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Horário Fim</Label>
                      <Input
                        type="time"
                        value={novoHorarioEspecial.fim}
                        onChange={(e) => setNovoHorarioEspecial({ ...novoHorarioEspecial, fim: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="motivo-especial">Motivo</Label>
                    <Textarea
                      id="motivo-especial"
                      value={novoHorarioEspecial.motivo}
                      onChange={(e) => setNovoHorarioEspecial({ ...novoHorarioEspecial, motivo: e.target.value })}
                      placeholder="Ex: Plantão especial, atendimento de urgência..."
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={adicionarHorarioEspecial} className="flex-1">
                      Cadastrar
                    </Button>
                    <Button variant="outline" onClick={() => setHorarioEspecialOpen(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Horários Especiais Cadastrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {horariosEspeciais.map((horario) => (
                  <div
                    key={horario.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Timer className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800 dark:text-slate-200">
                          {horario.data.toLocaleDateString("pt-BR")}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {horario.inicio} - {horario.fim}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-500">{horario.motivo}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        Especial
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
