"use client"

import { Activity, Calendar, ClipboardList, Users, Clock, AlertCircle, Heart } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  // Dados simulados para o dashboard
  const statsData = [
    {
      title: "Consultas Hoje",
      value: "12",
      change: "+2 comparado a ontem",
      icon: ClipboardList,
      trend: "up" as const,
      iconColor: "text-blue-500",
    },
    {
      title: "Pacientes Ativos",
      value: "245",
      change: "+5 na última semana",
      icon: Users,
      trend: "up" as const,
      iconColor: "text-indigo-500",
    },
    {
      title: "Próxima Consulta",
      value: "14:30",
      change: "Maria Silva - Retorno",
      icon: Calendar,
      iconColor: "text-emerald-500",
    },
    {
      title: "Taxa de Ocupação",
      value: "85%",
      change: "+10% comparado ao mês anterior",
      icon: Activity,
      trend: "up" as const,
      iconColor: "text-amber-500",
    },
  ]

  const proximasConsultas = [
    { paciente: "Maria Silva", horario: "14:30", tipo: "Retorno", status: "confirmado" },
    { paciente: "João Santos", horario: "15:00", tipo: "Primeira consulta", status: "pendente" },
    { paciente: "Ana Costa", horario: "15:30", tipo: "Exame", status: "confirmado" },
    { paciente: "Pedro Lima", horario: "16:00", tipo: "Retorno", status: "confirmado" },
  ]

  const especialidadesStats = [
    { nome: "Cardiologia", consultas: 35, porcentagem: 35, color: "bg-blue-500" },
    { nome: "Ortopedia", consultas: 25, porcentagem: 25, color: "bg-indigo-500" },
    { nome: "Pediatria", consultas: 20, porcentagem: 20, color: "bg-emerald-500" },
    { nome: "Dermatologia", consultas: 15, porcentagem: 15, color: "bg-amber-500" },
    { nome: "Neurologia", consultas: 5, porcentagem: 5, color: "bg-rose-500" },
  ]

  const alertas = [
    { tipo: "urgente", mensagem: "3 consultas aguardando confirmação", icon: AlertCircle, color: "text-amber-500" },
    { tipo: "info", mensagem: "2 resultados de exames disponíveis", icon: Heart, color: "text-blue-500" },
    { tipo: "aviso", mensagem: "Agenda da próxima semana 90% ocupada", icon: Calendar, color: "text-emerald-500" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Bem-vindo, Dr. João</h2>
        <div className="text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleDateString()} às {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            trend={stat.trend}
            className="border-none shadow-sm bg-card"
            iconClassName={stat.iconColor}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Próximas Consultas */}
        <Card className="col-span-1 md:col-span-2 border-none shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="h-5 w-5 text-blue-500" />
              Próximas Consultas
            </CardTitle>
            <CardDescription>Agenda para hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {proximasConsultas.map((consulta, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{consulta.paciente}</p>
                    <p className="text-sm text-muted-foreground">{consulta.tipo}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="font-medium">{consulta.horario}</p>
                    <Badge
                      variant={consulta.status === "confirmado" ? "default" : "secondary"}
                      className={cn(
                        "rounded-md px-2 py-0.5",
                        consulta.status === "confirmado"
                          ? "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30"
                          : "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30",
                      )}
                    >
                      {consulta.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertas e Notificações */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Alertas
            </CardTitle>
            <CardDescription>Itens que precisam de atenção</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertas.map((alerta, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-card hover:bg-muted/50 transition-colors"
                >
                  <alerta.icon className={`h-5 w-5 mt-0.5 ${alerta.color}`} />
                  <p className="text-sm">{alerta.mensagem}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Distribuição por Especialidade */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Activity className="h-5 w-5 text-blue-500" />
              Consultas por Especialidade
            </CardTitle>
            <CardDescription>Distribuição do mês atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {especialidadesStats.map((especialidade, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{especialidade.nome}</span>
                    <span className="text-muted-foreground">{especialidade.consultas} consultas</span>
                  </div>
                  <Progress
                    value={especialidade.porcentagem}
                    className="h-2"
                    indicatorClassName={especialidade.color}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resumo Financeiro */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Activity className="h-5 w-5 text-emerald-500" />
              Resumo Financeiro
            </CardTitle>
            <CardDescription>Performance do mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-emerald-500/10 dark:bg-emerald-950/20">
                <div>
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Receita Total</p>
                  <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">R$ 32.450</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-emerald-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-card hover:bg-muted/50 transition-colors">
                  <p className="text-sm text-muted-foreground">Consultas Faturadas</p>
                  <p className="text-xl font-bold">156</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-card hover:bg-muted/50 transition-colors">
                  <p className="text-sm text-muted-foreground">Ticket Médio</p>
                  <p className="text-xl font-bold">R$ 208</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
