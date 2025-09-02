"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  Filter,
  Grid,
  List,
  Settings,
  FolderSyncIcon as Sync,
  CheckCircle,
  Clock,
  TrendingUp,
  CalendarIcon as CalendarLucide,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { NovaConsultaDialog } from "@/components/dialogs/nova-consulta-dialog"
import { DetalhesConsultaDialog, type ConsultaDetalhes } from "@/components/dialogs/detalhes-consulta-dialog"
import { format, addDays, isSameDay, startOfWeek, endOfWeek, addWeeks, subWeeks } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Tipos de consulta e suas cores
const appointmentTypes = {
  "Primeira Consulta": "bg-blue-500",
  Retorno: "bg-green-500",
  Emergência: "bg-red-500",
  Exame: "bg-purple-500",
  Procedimento: "bg-amber-500",
}

// Status de consulta e suas cores
const appointmentStatus = {
  Agendada: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
  Confirmada:
    "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
  "Em Andamento":
    "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800",
  Concluída:
    "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700",
  Cancelada: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
  "Não Compareceu":
    "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800",
}

export default function AgendaPage() {
  const { toast } = useToast()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedConsulta, setSelectedConsulta] = useState<ConsultaDetalhes | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"week" | "day" | "list">("week")
  const [filterType, setFilterType] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [googleCalendarConnected, setGoogleCalendarConnected] = useState(false)
  const [syncInProgress, setSyncInProgress] = useState(false)
  const [configOpen, setConfigOpen] = useState(false)
  const [autoSync, setAutoSync] = useState(true)
  const [syncBidirectional, setSyncBidirectional] = useState(false)

  // Dados simulados de consultas com mais detalhes
  const appointments = [
    {
      id: 1,
      patientName: "Maria Silva",
      time: "09:00",
      duration: 30,
      day: 1, // Segunda
      date: format(addDays(startOfWeek(currentDate, { weekStartsOn: 0 }), 1), "yyyy-MM-dd"),
      tipo: "Retorno",
      status: "Agendada",
      observacoes: "Paciente com hipertensão. Trazer exames anteriores.",
      syncedWithGoogle: true,
    },
    {
      id: 2,
      patientName: "João Pereira",
      time: "11:00",
      duration: 60,
      day: 2, // Terça
      date: format(addDays(startOfWeek(currentDate, { weekStartsOn: 0 }), 2), "yyyy-MM-dd"),
      tipo: "Primeira Consulta",
      status: "Confirmada",
      observacoes: "Paciente encaminhado pelo Dr. Roberto.",
      syncedWithGoogle: true,
    },
    {
      id: 3,
      patientName: "Ana Souza",
      time: "14:00",
      duration: 30,
      day: 3, // Quarta
      date: format(addDays(startOfWeek(currentDate, { weekStartsOn: 0 }), 3), "yyyy-MM-dd"),
      tipo: "Retorno",
      status: "Agendada",
      syncedWithGoogle: false,
    },
    {
      id: 4,
      patientName: "Carlos Oliveira",
      time: "16:30",
      duration: 30,
      day: 4, // Quinta
      date: format(addDays(startOfWeek(currentDate, { weekStartsOn: 0 }), 4), "yyyy-MM-dd"),
      tipo: "Primeira Consulta",
      status: "Em Andamento",
      syncedWithGoogle: true,
    },
    {
      id: 5,
      patientName: "Lúcia Santos",
      time: "10:00",
      duration: 60,
      day: 5, // Sexta
      date: format(addDays(startOfWeek(currentDate, { weekStartsOn: 0 }), 5), "yyyy-MM-dd"),
      tipo: "Procedimento",
      status: "Agendada",
      observacoes: "Avaliação pós-cirúrgica.",
      syncedWithGoogle: true,
    },
    {
      id: 6,
      patientName: "Roberto Almeida",
      time: "15:00",
      duration: 45,
      day: 1, // Segunda
      date: format(addDays(startOfWeek(currentDate, { weekStartsOn: 0 }), 1), "yyyy-MM-dd"),
      tipo: "Exame",
      status: "Confirmada",
      observacoes: "Exame de rotina.",
      syncedWithGoogle: false,
    },
    {
      id: 7,
      patientName: "Fernanda Lima",
      time: "13:30",
      duration: 30,
      day: 3, // Quarta
      date: format(addDays(startOfWeek(currentDate, { weekStartsOn: 0 }), 3), "yyyy-MM-dd"),
      tipo: "Emergência",
      status: "Concluída",
      observacoes: "Paciente com dor aguda.",
      syncedWithGoogle: true,
    },
    {
      id: 8,
      patientName: "Paulo Mendes",
      time: "09:30",
      duration: 30,
      day: 5, // Sexta
      date: format(addDays(startOfWeek(currentDate, { weekStartsOn: 0 }), 5), "yyyy-MM-dd"),
      tipo: "Retorno",
      status: "Cancelada",
      syncedWithGoogle: false,
    },
  ]

  // Filtrar consultas com base nos filtros selecionados
  const filteredAppointments = appointments.filter((app) => {
    if (filterType && app.tipo !== filterType) return false
    if (filterStatus && app.status !== filterStatus) return false
    return true
  })

  // Estatísticas da agenda
  const stats = {
    totalConsultas: appointments.length,
    consultasHoje: appointments.filter((app) => isSameDay(new Date(app.date), new Date())).length,
    consultasSincronizadas: appointments.filter((app) => app.syncedWithGoogle).length,
    taxaSincronizacao: Math.round(
      (appointments.filter((app) => app.syncedWithGoogle).length / appointments.length) * 100,
    ),
  }

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8) // 8:00 - 19:00

  const getWeekDates = () => {
    const dates = []
    const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 0 })

    for (let i = 0; i < 7; i++) {
      const date = addDays(startOfCurrentWeek, i)
      dates.push(date)
    }

    return dates
  }

  const weekDates = getWeekDates()

  const formatMonth = (date: Date) => {
    return format(date, "MMMM yyyy", { locale: ptBR })
  }

  const previousPeriod = () => {
    if (viewMode === "week") {
      setCurrentDate(subWeeks(currentDate, 1))
    } else {
      const newDate = new Date(currentDate)
      newDate.setDate(currentDate.getDate() - 1)
      setCurrentDate(newDate)
    }
  }

  const nextPeriod = () => {
    if (viewMode === "week") {
      setCurrentDate(addWeeks(currentDate, 1))
    } else {
      const newDate = new Date(currentDate)
      newDate.setDate(currentDate.getDate() + 1)
      setCurrentDate(newDate)
    }
  }

  const today = () => {
    setCurrentDate(new Date())
  }

  const getAppointmentsForTimeSlot = (time: number, day: number) => {
    const timeStr = `${time}:00`
    return filteredAppointments.filter((app) => {
      const appHour = Number.parseInt(app.time.split(":")[0])
      return appHour === time && app.day === day
    })
  }

  const getAppointmentsForDay = (date: Date) => {
    return filteredAppointments.filter((app) => {
      const appDate = new Date(app.date)
      return isSameDay(appDate, date)
    })
  }

  const handleAppointmentClick = (appointment: ConsultaDetalhes) => {
    setSelectedConsulta(appointment)
    setDetailsOpen(true)
  }

  const formatTimeRange = (time: string, duration: number) => {
    const [hours, minutes] = time.split(":").map(Number)
    const startTime = new Date()
    startTime.setHours(hours, minutes, 0)

    const endTime = new Date(startTime)
    endTime.setMinutes(endTime.getMinutes() + duration)

    return `${time} - ${format(endTime, "HH:mm")}`
  }

  const clearFilters = () => {
    setFilterType(null)
    setFilterStatus(null)
  }

  // Funções do Google Calendar
  const connectGoogleCalendar = async () => {
    setSyncInProgress(true)
    // Simulação da conexão com Google Calendar
    setTimeout(() => {
      setGoogleCalendarConnected(true)
      setSyncInProgress(false)
      toast({
        title: "Google Calendar conectado!",
        description: "Sua agenda agora está sincronizada com o Google Calendar.",
      })
    }, 2000)
  }

  const disconnectGoogleCalendar = () => {
    setGoogleCalendarConnected(false)
    toast({
      title: "Google Calendar desconectado",
      description: "A sincronização foi interrompida.",
    })
  }

  const syncWithGoogle = async () => {
    setSyncInProgress(true)
    // Simulação da sincronização
    setTimeout(() => {
      setSyncInProgress(false)
      toast({
        title: "Sincronização concluída!",
        description: "Todos os eventos foram sincronizados com sucesso.",
      })
    }, 3000)
  }

  // Renderiza a visualização semanal
  const renderWeekView = () => (
    <div className="grid grid-cols-8 gap-1 border rounded-lg overflow-hidden shadow-sm">
      {/* Cabeçalho com horários */}
      <div className="border-r bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-2 text-center text-sm font-medium">
        Hora
      </div>

      {/* Cabeçalho com dias da semana */}
      {weekDates.map((date, index) => (
        <div
          key={index}
          className={cn(
            "p-2 text-center border-b text-sm font-medium transition-colors",
            isSameDay(date, new Date())
              ? "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-700 dark:text-blue-300"
              : "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900",
          )}
        >
          <div>{daysOfWeek[index]}</div>
          <div className="text-lg font-semibold">{format(date, "dd")}</div>
        </div>
      ))}

      {/* Grade de horários */}
      {timeSlots.map((time) => (
        <React.Fragment key={`time-${time}`}>
          <div className="border-r border-t p-2 text-center text-sm bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 font-medium">
            {time}:00
          </div>

          {Array.from({ length: 7 }, (_, dayIndex) => {
            const appointments = getAppointmentsForTimeSlot(time, dayIndex)

            return (
              <div
                key={`slot-${time}-${dayIndex}`}
                className={cn(
                  "border-t p-1 min-h-[80px] transition-colors",
                  dayIndex < 6 && "border-r",
                  isSameDay(weekDates[dayIndex], new Date()) &&
                    "bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-800/10",
                )}
              >
                {appointments.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {appointments.map((appointment) => (
                      <TooltipProvider key={appointment.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "rounded-lg p-2 text-xs h-full cursor-pointer transition-all duration-300",
                                "hover:shadow-lg hover:scale-105 border backdrop-blur-sm",
                                appointmentStatus[appointment.status as keyof typeof appointmentStatus],
                                appointment.syncedWithGoogle && "ring-1 ring-green-400/50",
                              )}
                              onClick={() => handleAppointmentClick(appointment)}
                            >
                              <div className="flex items-center gap-1">
                                <div
                                  className={cn(
                                    "w-2 h-2 rounded-full shadow-sm",
                                    appointmentTypes[appointment.tipo as keyof typeof appointmentTypes],
                                  )}
                                />
                                <div className="font-medium truncate">{appointment.patientName}</div>
                                {appointment.syncedWithGoogle && (
                                  <CheckCircle className="w-3 h-3 text-green-500 ml-auto" />
                                )}
                              </div>
                              <div className="mt-1 text-muted-foreground">
                                {formatTimeRange(appointment.time, appointment.duration)}
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-[250px]">
                            <div className="space-y-1">
                              <div className="font-medium">{appointment.patientName}</div>
                              <div className="text-xs text-muted-foreground">
                                {formatTimeRange(appointment.time, appointment.duration)} ({appointment.duration} min)
                              </div>
                              <div className="flex items-center gap-1 text-xs">
                                <Badge variant="outline" className="text-xs">
                                  {appointment.tipo}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {appointment.status}
                                </Badge>
                              </div>
                              {appointment.syncedWithGoogle && (
                                <div className="flex items-center gap-1 text-xs text-green-600">
                                  <CheckCircle className="w-3 h-3" />
                                  Sincronizado com Google
                                </div>
                              )}
                              {appointment.observacoes && (
                                <div className="text-xs mt-1 text-muted-foreground">{appointment.observacoes}</div>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                ) : null}
              </div>
            )
          })}
        </React.Fragment>
      ))}
    </div>
  )

  // Renderiza a visualização diária
  const renderDayView = () => {
    const dayAppointments = getAppointmentsForDay(currentDate)

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {format(currentDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
          </h3>
        </div>

        <div className="border rounded-lg overflow-hidden shadow-sm">
          {timeSlots.map((time) => {
            const appointments = dayAppointments.filter((app) => {
              const appHour = Number.parseInt(app.time.split(":")[0])
              return appHour === time
            })

            return (
              <div
                key={`day-time-${time}`}
                className={cn(
                  "flex border-b last:border-b-0 transition-colors hover:bg-muted/50",
                  appointments.length > 0 ? "min-h-[80px]" : "min-h-[60px]",
                )}
              >
                <div className="w-20 p-2 border-r bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 flex items-start justify-center text-sm font-medium">
                  {time}:00
                </div>
                <div className="flex-1 p-2">
                  {appointments.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {appointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className={cn(
                            "rounded-lg p-3 cursor-pointer transition-all duration-300",
                            "hover:shadow-lg hover:scale-[1.02] border backdrop-blur-sm",
                            appointmentStatus[appointment.status as keyof typeof appointmentStatus],
                            appointment.syncedWithGoogle && "ring-1 ring-green-400/50",
                          )}
                          onClick={() => handleAppointmentClick(appointment)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  "w-3 h-3 rounded-full shadow-sm",
                                  appointmentTypes[appointment.tipo as keyof typeof appointmentTypes],
                                )}
                              />
                              <div className="font-medium">{appointment.patientName}</div>
                              {appointment.syncedWithGoogle && <CheckCircle className="w-4 h-4 text-green-500" />}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {appointment.tipo}
                            </Badge>
                          </div>
                          <div className="mt-2 flex items-center justify-between text-sm">
                            <div className="text-muted-foreground">
                              {formatTimeRange(appointment.time, appointment.duration)}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {appointment.status}
                            </Badge>
                          </div>
                          {appointment.observacoes && (
                            <div className="mt-2 text-sm text-muted-foreground border-t pt-2">
                              {appointment.observacoes}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Renderiza a visualização em lista
  const renderListView = () => {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {format(startOfWeek(currentDate, { weekStartsOn: 0 }), "dd/MM/yyyy", { locale: ptBR })} -{" "}
            {format(endOfWeek(currentDate, { weekStartsOn: 0 }), "dd/MM/yyyy", { locale: ptBR })}
          </h3>
        </div>

        <ScrollArea className="h-[600px] rounded-lg border shadow-sm">
          {filteredAppointments.length > 0 ? (
            <div className="p-4 space-y-4">
              {weekDates.map((date, dateIndex) => {
                const dayAppointments = getAppointmentsForDay(date)

                if (dayAppointments.length === 0) return null

                return (
                  <div key={`list-day-${dateIndex}`} className="space-y-2">
                    <div
                      className={cn(
                        "sticky top-0 bg-background z-10 py-2 font-semibold border-b backdrop-blur-sm",
                        isSameDay(date, new Date()) && "text-blue-600 dark:text-blue-400",
                      )}
                    >
                      {format(date, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                    </div>

                    {dayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className={cn(
                          "rounded-lg p-3 cursor-pointer transition-all duration-300",
                          "hover:shadow-lg hover:scale-[1.02] border backdrop-blur-sm",
                          appointmentStatus[appointment.status as keyof typeof appointmentStatus],
                          appointment.syncedWithGoogle && "ring-1 ring-green-400/50",
                        )}
                        onClick={() => handleAppointmentClick(appointment)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "w-3 h-3 rounded-full shadow-sm",
                                appointmentTypes[appointment.tipo as keyof typeof appointmentTypes],
                              )}
                            />
                            <div className="font-medium">{appointment.patientName}</div>
                            {appointment.syncedWithGoogle && <CheckCircle className="w-4 h-4 text-green-500" />}
                          </div>
                          <div className="text-muted-foreground font-medium">
                            {formatTimeRange(appointment.time, appointment.duration)}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {appointment.tipo}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {appointment.status}
                          </Badge>
                          {appointment.syncedWithGoogle && (
                            <Badge variant="outline" className="text-xs text-green-600 border-green-300">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Google
                            </Badge>
                          )}
                        </div>
                        {appointment.observacoes && (
                          <div className="mt-2 text-sm text-muted-foreground border-t pt-2">
                            {appointment.observacoes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-8 text-center text-muted-foreground">
              <div className="space-y-2">
                <CalendarLucide className="w-12 h-12 mx-auto opacity-50" />
                <p>Nenhuma consulta encontrada para os filtros selecionados.</p>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Agenda
          </h2>
          <p className="text-muted-foreground">Gerencie seus agendamentos e sincronize com o Google Calendar</p>
        </div>
        <div className="flex items-center gap-2">
          <NovaConsultaDialog />

          {/* Google Calendar Integration */}
          <Dialog open={configOpen} onOpenChange={setConfigOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Settings className="h-4 w-4" />
                {googleCalendarConnected && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CalendarLucide className="w-5 h-5" />
                  Configurações do Google Calendar
                </DialogTitle>
                <DialogDescription>
                  Configure a sincronização com o Google Calendar para manter seus agendamentos sempre atualizados.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CalendarLucide className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Google Calendar</span>
                      {googleCalendarConnected && (
                        <Badge variant="secondary" className="text-green-600 border-green-300">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Conectado
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {googleCalendarConnected
                        ? "Sua agenda está sincronizada com o Google Calendar"
                        : "Conecte sua conta do Google para sincronizar automaticamente"}
                    </p>
                  </div>

                  {!googleCalendarConnected ? (
                    <Button onClick={connectGoogleCalendar} disabled={syncInProgress}>
                      {syncInProgress ? (
                        <>
                          <Sync className="w-4 h-4 mr-2 animate-spin" />
                          Conectando...
                        </>
                      ) : (
                        "Conectar"
                      )}
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={syncWithGoogle} disabled={syncInProgress}>
                        {syncInProgress ? <Sync className="w-4 h-4 animate-spin" /> : <Sync className="w-4 h-4" />}
                      </Button>
                      <Button variant="outline" size="sm" onClick={disconnectGoogleCalendar}>
                        Desconectar
                      </Button>
                    </div>
                  )}
                </div>

                {googleCalendarConnected && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-sync">Sincronização Automática</Label>
                        <p className="text-sm text-muted-foreground">Sincronizar automaticamente novos agendamentos</p>
                      </div>
                      <Switch id="auto-sync" checked={autoSync} onCheckedChange={setAutoSync} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="bidirectional-sync">Sincronização Bidirecional</Label>
                        <p className="text-sm text-muted-foreground">
                          Importar eventos do Google Calendar para a agenda
                        </p>
                      </div>
                      <Switch
                        id="bidirectional-sync"
                        checked={syncBidirectional}
                        onCheckedChange={setSyncBidirectional}
                      />
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setConfigOpen(false)}>
                  Fechar
                </Button>
                {googleCalendarConnected && (
                  <Button onClick={syncWithGoogle} disabled={syncInProgress}>
                    {syncInProgress ? (
                      <>
                        <Sync className="w-4 h-4 mr-2 animate-spin" />
                        Sincronizando...
                      </>
                    ) : (
                      <>
                        <Sync className="w-4 h-4 mr-2" />
                        Sincronizar Agora
                      </>
                    )}
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2 text-sm font-medium">Filtrar por tipo</div>
              {Object.keys(appointmentTypes).map((type) => (
                <DropdownMenuItem
                  key={type}
                  className={cn(filterType === type && "bg-muted")}
                  onClick={() => setFilterType(type === filterType ? null : type)}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn("w-2 h-2 rounded-full", appointmentTypes[type as keyof typeof appointmentTypes])}
                    />
                    {type}
                  </div>
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />
              <div className="p-2 text-sm font-medium">Filtrar por status</div>
              {Object.keys(appointmentStatus).map((status) => (
                <DropdownMenuItem
                  key={status}
                  className={cn(filterStatus === status && "bg-muted")}
                  onClick={() => setFilterStatus(status === filterStatus ? null : status)}
                >
                  {status}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />
              <div className="p-2">
                <Button variant="ghost" size="sm" className="w-full" onClick={clearFilters}>
                  Limpar filtros
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-500/10 dark:to-blue-600/5" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Consultas</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <CalendarLucide className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalConsultas}</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-500/10 dark:to-green-600/5" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultas Hoje</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <Clock className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.consultasHoje}</div>
            <p className="text-xs text-muted-foreground">Agendadas para hoje</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-500/10 dark:to-purple-600/5" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sincronizadas</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Sync className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.consultasSincronizadas}</div>
            <p className="text-xs text-muted-foreground">Com Google Calendar</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-500/10 dark:to-amber-600/5" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Sincronização</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.taxaSincronizacao}%</div>
            <p className="text-xs text-muted-foreground">Eventos sincronizados</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Calendar Card */}
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4">
            {/* Título e controles principais */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-xl bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                {formatMonth(currentDate)}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={today}
                  className="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700"
                >
                  Hoje
                </Button>
                <Button variant="outline" size="icon" onClick={previousPeriod} className="hover:bg-slate-50">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextPeriod} className="hover:bg-slate-50">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tabs centralizados e proeminentes */}
            <div className="flex justify-center">
              <Tabs
                value={viewMode}
                onValueChange={(v) => setViewMode(v as "week" | "day" | "list")}
                className="w-full max-w-md"
              >
                <TabsList className="grid grid-cols-3 w-full h-12 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-1 rounded-xl shadow-lg">
                  <TabsTrigger
                    value="week"
                    className="flex items-center gap-2 text-sm font-medium h-10 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-md data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 transition-all duration-200"
                  >
                    <Grid className="h-4 w-4" />
                    <span>Semana</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="day"
                    className="flex items-center gap-2 text-sm font-medium h-10 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-md data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 transition-all duration-200"
                  >
                    <CalendarIcon className="h-4 w-4" />
                    <span>Dia</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="list"
                    className="flex items-center gap-2 text-sm font-medium h-10 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-md data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 transition-all duration-200"
                  >
                    <List className="h-4 w-4" />
                    <span>Lista</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Filtros */}
            {(filterType || filterStatus) && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Filtros:</span>
                {filterType && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        appointmentTypes[filterType as keyof typeof appointmentTypes],
                      )}
                    />
                    {filterType}
                    <button className="ml-1 hover:bg-muted rounded-full" onClick={() => setFilterType(null)}>
                      ×
                    </button>
                  </Badge>
                )}
                {filterStatus && (
                  <Badge variant="secondary">
                    {filterStatus}
                    <button className="ml-1 hover:bg-muted rounded-full" onClick={() => setFilterStatus(null)}>
                      ×
                    </button>
                  </Badge>
                )}
                <Button variant="ghost" size="sm" className="h-7 px-2" onClick={clearFilters}>
                  Limpar todos
                </Button>
              </div>
            )}

            {/* Status Google Calendar */}
            {googleCalendarConnected && (
              <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700 dark:text-green-300">Sincronizado com Google Calendar</span>
                {syncInProgress && (
                  <div className="flex items-center gap-1 ml-auto">
                    <Sync className="w-3 h-3 animate-spin text-green-600" />
                    <span className="text-xs text-green-600">Sincronizando...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "week" && renderWeekView()}
          {viewMode === "day" && renderDayView()}
          {viewMode === "list" && renderListView()}
        </CardContent>
      </Card>

      <DetalhesConsultaDialog consulta={selectedConsulta} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </div>
  )
}
