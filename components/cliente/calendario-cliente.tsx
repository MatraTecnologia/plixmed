"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const diasSemanaMobile = ["D", "S", "T", "Q", "Q", "S", "S"]
const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

// Dados simulados de consultas
const consultasAgendadas = [
  {
    id: 1,
    data: "2024-01-15",
    hora: "14:30",
    profissional: "Dr. João Silva",
    especialidade: "Cardiologia",
    status: "confirmado",
  },
  {
    id: 2,
    data: "2024-01-22",
    hora: "09:00",
    profissional: "Dra. Maria Santos",
    especialidade: "Dermatologia",
    status: "pendente",
  },
  {
    id: 3,
    data: "2024-01-28",
    hora: "16:00",
    profissional: "Dr. Pedro Lima",
    especialidade: "Ortopedia",
    status: "confirmado",
  },
]

export function CalendarioCliente() {
  const [dataAtual, setDataAtual] = useState(new Date())
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const checkIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 640)
      }
    }

    checkIsMobile()

    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkIsMobile)
      return () => window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  const proximoMes = () => {
    setDataAtual(new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 1))
  }

  const mesAnterior = () => {
    setDataAtual(new Date(dataAtual.getFullYear(), dataAtual.getMonth() - 1, 1))
  }

  const getDiasDoMes = () => {
    const ano = dataAtual.getFullYear()
    const mes = dataAtual.getMonth()
    const primeiroDia = new Date(ano, mes, 1)
    const ultimoDia = new Date(ano, mes + 1, 0)
    const diasNoMes = ultimoDia.getDate()
    const diaDaSemanaInicio = primeiroDia.getDay()

    const dias = []

    // Dias do mês anterior (para preencher o início)
    for (let i = diaDaSemanaInicio - 1; i >= 0; i--) {
      const diaAnterior = new Date(ano, mes, -i)
      dias.push({
        dia: diaAnterior.getDate(),
        data: diaAnterior,
        mesAtual: false,
        consultas: [],
      })
    }

    // Dias do mês atual
    for (let dia = 1; dia <= diasNoMes; dia++) {
      const data = new Date(ano, mes, dia)
      const dataString = data.toISOString().split("T")[0]
      const consultasDoDia = consultasAgendadas.filter((c) => c.data === dataString)

      dias.push({
        dia,
        data,
        mesAtual: true,
        consultas: consultasDoDia,
      })
    }

    // Dias do próximo mês (para preencher o final)
    const diasRestantes = 42 - dias.length // 6 semanas * 7 dias
    for (let dia = 1; dia <= diasRestantes; dia++) {
      const proximaData = new Date(ano, mes + 1, dia)
      dias.push({
        dia,
        data: proximaData,
        mesAtual: false,
        consultas: [],
      })
    }

    return dias
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-emerald-500"
      case "pendente":
        return "bg-amber-500"
      default:
        return "bg-blue-500"
    }
  }

  const formatarData = (data: Date) => {
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const hoje = new Date()
  const dias = getDiasDoMes()

  // Não renderizar até que o componente seja hidratado no cliente
  if (!isClient) {
    return (
      <Card className="bg-white border-gray-200 shadow-lg dark:bg-gray-900 dark:border-gray-800">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Calendar className="h-5 w-5 text-blue-600" />
            Calendário de Consultas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white border-gray-200 shadow-lg dark:bg-gray-900 dark:border-gray-800">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Calendar className="h-5 w-5 text-blue-600" />
            Calendário de Consultas
          </CardTitle>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={mesAnterior}
              className="border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white min-w-[140px] text-center">
              {meses[dataAtual.getMonth()]} {dataAtual.getFullYear()}
            </h3>

            <Button
              variant="outline"
              size="sm"
              onClick={proximoMes}
              className="border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Cabeçalho dos dias da semana */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {(isMobile ? diasSemanaMobile : diasSemana).map((dia, index) => (
            <div key={index} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
              {dia}
            </div>
          ))}
        </div>

        {/* Grade do calendário */}
        <div className="grid grid-cols-7 gap-2">
          {dias.map((diaInfo, index) => {
            const isHoje = diaInfo.mesAtual && diaInfo.data.toDateString() === hoje.toDateString()

            return (
              <div
                key={index}
                className={`
                  relative min-h-[60px] p-2 rounded-lg border transition-all duration-200
                  ${
                    diaInfo.mesAtual
                      ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      : "bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-400 dark:text-gray-600"
                  }
                  ${isHoje ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950" : ""}
                `}
              >
                <div className={`text-sm font-medium ${isHoje ? "text-blue-600 dark:text-blue-400" : ""}`}>
                  {diaInfo.dia}
                </div>

                {/* Indicadores de consultas */}
                {diaInfo.consultas.length > 0 && (
                  <div className="mt-1 space-y-1">
                    {diaInfo.consultas.slice(0, 2).map((consulta) => (
                      <div
                        key={consulta.id}
                        className={`w-full h-1.5 rounded-full ${getStatusColor(consulta.status)}`}
                        title={`${consulta.hora} - ${consulta.profissional}`}
                      />
                    ))}
                    {diaInfo.consultas.length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">+{diaInfo.consultas.length - 2}</div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Legenda */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Confirmado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Pendente</span>
          </div>
        </div>

        {/* Lista de consultas do mês */}
        {consultasAgendadas.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Consultas deste mês</h4>
            <div className="space-y-2">
              {consultasAgendadas.map((consulta) => (
                <div
                  key={consulta.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(consulta.status)}`} />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatarData(new Date(consulta.data))}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {consulta.hora} - {consulta.profissional}
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      consulta.status === "confirmado"
                        ? "border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300"
                        : "border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-300"
                    }`}
                  >
                    {consulta.status === "confirmado" ? "Confirmado" : "Pendente"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
