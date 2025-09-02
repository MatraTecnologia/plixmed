"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format, addDays, isSameMonth, isToday, isBefore, isSameDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface EtapaDataHoraProps {
  currentMonth: Date
  setCurrentMonth: (date: Date) => void
  calendarDays: Date[]
  selectedDate: Date | null
  setSelectedDate: (date: Date | null) => void
  horariosDisponiveis: string[]
  selectedTime: string
  setSelectedTime: (time: string) => void
  temHorariosDisponiveis?: (date: Date) => boolean
}

export function EtapaDataHora({
  currentMonth,
  setCurrentMonth,
  calendarDays,
  selectedDate,
  setSelectedDate,
  horariosDisponiveis,
  selectedTime,
  setSelectedTime,
  temHorariosDisponiveis,
}: EtapaDataHoraProps) {
  return (
    <div className="space-y-6 fade-in">
      {/* Calendário */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy", { locale: ptBR })}</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentMonth(addDays(currentMonth, -30))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentMonth(addDays(currentMonth, 30))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Legenda */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Disponível</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Ocupado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span>Indisponível</span>
          </div>
        </div>

        {/* Dias da Semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Dias do Calendário */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const isSelected = selectedDate && isSameDay(day, selectedDate)
            const isPast = isBefore(day, new Date())
            const hasAvailableSlots = temHorariosDisponiveis ? temHorariosDisponiveis(day) : false
            const isAvailable = isCurrentMonth && !isPast && hasAvailableSlots

            return (
              <button
                key={index}
                onClick={() => isAvailable && setSelectedDate(day)}
                disabled={!isAvailable}
                className={cn(
                  "h-10 text-sm rounded-lg transition-all relative",
                  isSelected
                    ? "bg-blue-500 text-white font-semibold"
                    : isAvailable
                      ? "hover:bg-green-100 text-gray-900 border border-green-300"
                      : "text-gray-300 cursor-not-allowed",
                  !isCurrentMonth && "text-gray-300",
                  isToday(day) && !isSelected && "bg-blue-100 font-semibold",
                  isPast && "bg-gray-100",
                )}
              >
                {format(day, "d")}
                {/* Indicador de disponibilidade */}
                {isCurrentMonth && !isPast && (
                  <div
                    className={cn(
                      "absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full",
                      hasAvailableSlots ? "bg-green-500" : "bg-red-500",
                    )}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Horários */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Horários Disponíveis - {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
          </h3>
          {horariosDisponiveis.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {horariosDisponiveis.map((horario) => (
                <button
                  key={horario}
                  onClick={() => setSelectedTime(horario)}
                  className={cn(
                    "horario-item p-3 rounded-lg border transition-all",
                    selectedTime === horario
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50",
                  )}
                >
                  {horario}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">😔 Não há horários disponíveis nesta data</p>
              <p className="text-sm mt-2">Tente selecionar outra data</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
