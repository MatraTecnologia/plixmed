"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format, addDays, isSameMonth, isToday, isBefore, isSameDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react"
import { useState } from "react"

interface EtapaDataHoraNovaProps {
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

export function EtapaDataHoraNova({
  currentMonth,
  setCurrentMonth,
  calendarDays,
  selectedDate,
  setSelectedDate,
  horariosDisponiveis,
  selectedTime,
  setSelectedTime,
  temHorariosDisponiveis,
}: EtapaDataHoraNovaProps) {
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

  const timeSlots = {
    morning: horariosDisponiveis.filter((time) => {
      const hour = Number.parseInt(time.split(":")[0])
      return hour >= 8 && hour < 12
    }),
    afternoon: horariosDisponiveis.filter((time) => {
      const hour = Number.parseInt(time.split(":")[0])
      return hour >= 12 && hour < 18
    }),
    evening: horariosDisponiveis.filter((time) => {
      const hour = Number.parseInt(time.split(":")[0])
      return hour >= 18
    }),
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Escolha a data e horário</h3>
        <p className="text-gray-600 dark:text-gray-400">Selecione quando você gostaria de ser atendido</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-500" />
              {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
            </h4>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
                className="h-8 w-8 p-0 rounded-lg"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
                className="h-8 w-8 p-0 rounded-lg"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const isCurrentMonth = isSameMonth(day, currentMonth)
              const isSelected = selectedDate && isSameDay(day, selectedDate)
              const isPast = isBefore(day, new Date())
              const hasAvailableSlots = temHorariosDisponiveis ? temHorariosDisponiveis(day) : false
              const isAvailable = isCurrentMonth && !isPast && hasAvailableSlots
              const isHovered = hoveredDate && isSameDay(day, hoveredDate)

              return (
                <button
                  key={index}
                  onClick={() => isAvailable && setSelectedDate(day)}
                  onMouseEnter={() => setHoveredDate(day)}
                  onMouseLeave={() => setHoveredDate(null)}
                  disabled={!isAvailable}
                  className={cn(
                    "relative h-12 text-sm rounded-xl transition-all duration-200 font-medium",
                    isSelected
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-110"
                      : isAvailable
                        ? "hover:bg-emerald-100 dark:hover:bg-emerald-900/20 text-gray-900 dark:text-white border border-emerald-200 dark:border-emerald-800"
                        : "text-gray-300 dark:text-gray-600 cursor-not-allowed",
                    !isCurrentMonth && "opacity-30",
                    isToday(day) &&
                      !isSelected &&
                      "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-bold",
                    isHovered && isAvailable && !isSelected && "scale-105 shadow-md",
                  )}
                >
                  {format(day, "d")}

                  {/* Availability Indicator */}
                  {isCurrentMonth && !isPast && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                      {hasAvailableSlots ? (
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      ) : (
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Disponível</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Ocupado</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Hoje</span>
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          {selectedDate ? (
            <>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
              </h4>

              {horariosDisponiveis.length > 0 ? (
                <div className="space-y-6">
                  {/* Morning */}
                  {timeSlots.morning.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        🌅 Manhã
                      </h5>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.morning.map((horario) => (
                          <button
                            key={horario}
                            onClick={() => setSelectedTime(horario)}
                            className={cn(
                              "p-3 rounded-xl border-2 transition-all duration-200 font-medium text-sm",
                              selectedTime === horario
                                ? "bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/25"
                                : "bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/20 hover:scale-105",
                            )}
                          >
                            {horario}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Afternoon */}
                  {timeSlots.afternoon.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        ☀️ Tarde
                      </h5>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.afternoon.map((horario) => (
                          <button
                            key={horario}
                            onClick={() => setSelectedTime(horario)}
                            className={cn(
                              "p-3 rounded-xl border-2 transition-all duration-200 font-medium text-sm",
                              selectedTime === horario
                                ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25"
                                : "bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:scale-105",
                            )}
                          >
                            {horario}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Evening */}
                  {timeSlots.evening.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        🌙 Noite
                      </h5>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.evening.map((horario) => (
                          <button
                            key={horario}
                            onClick={() => setSelectedTime(horario)}
                            className={cn(
                              "p-3 rounded-xl border-2 transition-all duration-200 font-medium text-sm",
                              selectedTime === horario
                                ? "bg-purple-500 text-white border-purple-500 shadow-lg shadow-purple-500/25"
                                : "bg-purple-50 dark:bg-purple-900/10 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/20 hover:scale-105",
                            )}
                          >
                            {horario}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">Nenhum horário disponível</p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">Tente selecionar outra data</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">Selecione uma data</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Escolha um dia no calendário para ver os horários disponíveis
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Selected Date & Time Summary */}
      {selectedDate && selectedTime && (
        <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">✓</div>
            <div>
              <p className="font-medium text-emerald-900 dark:text-emerald-100">Data e horário selecionados</p>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} às {selectedTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
