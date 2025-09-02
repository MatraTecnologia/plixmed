"use client"

import { Settings, Calendar, TrendingUp, Users, Target, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock data for demonstration
const servicosMaisProcurados = [
  { nome: "Limpeza de Pele", agendamentos: 32, cor: "bg-red-500" },
  { nome: "Massagem Relaxante", agendamentos: 28, cor: "bg-green-500" },
  { nome: "Tratamento Capilar", agendamentos: 22, cor: "bg-blue-500" },
  { nome: "Design de Sobrancelhas", agendamentos: 18, cor: "bg-yellow-500" },
]

const horariosMaisProcurados = [
  { periodo: "09:00 - 10:00", agendamentos: 45 },
  { periodo: "14:00 - 15:00", agendamentos: 38 },
  { periodo: "16:00 - 17:00", agendamentos: 32 },
  { periodo: "11:00 - 12:00", agendamentos: 25 },
]

const salvarConfiguracoes = () => {
  alert("Configurações salvas!")
}

export default function AgendamentosDashboard() {
  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-purple-900/20 rounded-xl p-6 mb-6 border border-blue-100 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Gerenciar Agendamentos</h1>
              <p className="text-slate-600 dark:text-slate-300">
                Configure sua agenda online e personalize a experiência dos pacientes
              </p>
            </div>
          </div>
          <Button
            onClick={salvarConfiguracoes}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
          >
            <Settings className="w-4 h-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">Agendamentos Hoje</p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">12</p>
                <p className="text-blue-600 dark:text-blue-400 text-xs">+2 desde ontem</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-700 dark:text-emerald-300 text-sm font-medium">Esta Semana</p>
                <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">45</p>
                <p className="text-emerald-600 dark:text-emerald-400 text-xs">+12% vs semana anterior</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 dark:text-purple-300 text-sm font-medium">Este Mês</p>
                <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">180</p>
                <p className="text-purple-600 dark:text-purple-400 text-xs">+8% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-700 dark:text-amber-300 text-sm font-medium">Taxa de Conversão</p>
                <p className="text-2xl font-bold text-amber-800 dark:text-amber-200">85%</p>
                <p className="text-amber-600 dark:text-amber-400 text-xs">+3% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seções de Serviços e Horários */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-b border-purple-200 dark:border-purple-800">
            <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
              <Clock className="w-5 h-5" />
              Serviços Mais Procurados
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {servicosMaisProcurados.map((servico, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${servico.cor}`}></div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{servico.nome}</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300"
                  >
                    {servico.agendamentos} agendamentos
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-b border-emerald-200 dark:border-emerald-800">
            <CardTitle className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
              <Clock className="w-5 h-5" />
              Horários Mais Procurados
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {horariosMaisProcurados.map((horario, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-300">{horario.periodo}</span>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                  >
                    {horario.agendamentos} agendamentos
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
