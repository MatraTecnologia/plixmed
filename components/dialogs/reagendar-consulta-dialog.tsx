"use client"

import { useState } from "react"
import { Calendar, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"

interface ReagendarConsultaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  consulta: any
}

export function ReagendarConsultaDialog({ open, onOpenChange, consulta }: ReagendarConsultaDialogProps) {
  const [novaData, setNovaData] = useState<Date>()
  const [novoHorario, setNovoHorario] = useState("")
  const [loading, setLoading] = useState(false)

  // Horários disponíveis simulados
  const horariosDisponiveis = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ]

  const handleReagendar = async () => {
    if (!novaData || !novoHorario) return

    setLoading(true)

    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Reagendando consulta:", {
      consultaId: consulta?.id,
      novaData: novaData.toISOString(),
      novoHorario,
    })

    setLoading(false)
    onOpenChange(false)

    // Aqui você pode adicionar um toast de sucesso
    alert("Consulta reagendada com sucesso!")
  }

  // Desabilitar datas passadas e domingos
  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today || date.getDay() === 0
  }

  if (!consulta) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <DialogTitle className="text-gray-900 dark:text-gray-100 text-xl">Reagendar Consulta</DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Escolha uma nova data e horário para sua consulta
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Consulta atual */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Consulta atual:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Data:</span>
                <p className="text-gray-900 dark:text-gray-100">
                  {new Date(consulta.data).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Horário:</span>
                <p className="text-gray-900 dark:text-gray-100">{consulta.hora}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Profissional:</span>
                <p className="text-gray-900 dark:text-gray-100">{consulta.profissional}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Especialidade:</span>
                <p className="text-gray-900 dark:text-gray-100">{consulta.especialidade}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Seleção de data */}
            <div className="space-y-3">
              <Label className="text-gray-900 dark:text-gray-100 font-medium">Nova data:</Label>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800">
                <CalendarComponent
                  mode="single"
                  selected={novaData}
                  onSelect={setNovaData}
                  disabled={isDateDisabled}
                  className="w-full"
                />
              </div>
            </div>

            {/* Seleção de horário */}
            <div className="space-y-3">
              <Label className="text-gray-900 dark:text-gray-100 font-medium">Novo horário:</Label>
              {novaData ? (
                <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                  {horariosDisponiveis.map((horario) => (
                    <Button
                      key={horario}
                      variant={novoHorario === horario ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNovoHorario(horario)}
                      className={`justify-center ${
                        novoHorario === horario
                          ? "bg-blue-600 hover:bg-blue-700 text-white border-0"
                          : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      {horario}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Selecione uma data primeiro</p>
                </div>
              )}
            </div>
          </div>

          {/* Resumo da nova consulta */}
          {novaData && novoHorario && (
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4 rounded-lg">
              <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-3">Nova consulta:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="font-medium text-emerald-700 dark:text-emerald-400">Data:</span>
                  <p className="text-emerald-900 dark:text-emerald-200">{novaData.toLocaleDateString("pt-BR")}</p>
                </div>
                <div>
                  <span className="font-medium text-emerald-700 dark:text-emerald-400">Horário:</span>
                  <p className="text-emerald-900 dark:text-emerald-200">{novoHorario}</p>
                </div>
                <div>
                  <span className="font-medium text-emerald-700 dark:text-emerald-400">Profissional:</span>
                  <p className="text-emerald-900 dark:text-emerald-200">{consulta.profissional}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleReagendar}
            disabled={!novaData || !novoHorario || loading}
            className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:text-gray-500 dark:disabled:text-gray-400"
          >
            {loading ? "Reagendando..." : "Confirmar Reagendamento"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
