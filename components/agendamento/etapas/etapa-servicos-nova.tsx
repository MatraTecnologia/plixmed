"use client"

import { cn } from "@/lib/utils"
import type { Servico } from "@/types/agendamento"
import { Clock, Star, Zap } from "lucide-react"
import { useState } from "react"

interface EtapaServicosNovaProps {
  servicos: Servico[]
  selectedServico: Servico | null
  onSelectServico: (servico: Servico) => void
  formatCurrency: (value: number) => string
}

export function EtapaServicosNova({
  servicos,
  selectedServico,
  onSelectServico,
  formatCurrency,
}: EtapaServicosNovaProps) {
  const [hoveredServico, setHoveredServico] = useState<string | null>(null)

  const getServicoIcon = (nome: string) => {
    if (nome.toLowerCase().includes("consulta")) return "🩺"
    if (nome.toLowerCase().includes("terapia")) return "🎯"
    if (nome.toLowerCase().includes("avaliação")) return "📋"
    if (nome.toLowerCase().includes("laser")) return "⚡"
    return "🔬"
  }

  const getServicoColor = (index: number) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-purple-500 to-purple-600",
      "from-emerald-500 to-emerald-600",
      "from-amber-500 to-amber-600",
      "from-rose-500 to-rose-600",
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Escolha o serviço que você precisa</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Selecione o tipo de atendimento que melhor atende às suas necessidades
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {servicos.map((servico, index) => {
          const isSelected = selectedServico?.id === servico.id
          const isHovered = hoveredServico === servico.id

          return (
            <div
              key={servico.id}
              className={cn(
                "relative group cursor-pointer transition-all duration-300 transform",
                isSelected ? "scale-105" : "hover:scale-102",
                isHovered && !isSelected && "scale-102",
              )}
              onClick={() => onSelectServico(servico)}
              onMouseEnter={() => setHoveredServico(servico.id)}
              onMouseLeave={() => setHoveredServico(null)}
            >
              {/* Card */}
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl border-2 transition-all duration-300 bg-white dark:bg-gray-800",
                  isSelected
                    ? "border-blue-500 shadow-xl shadow-blue-500/25"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg",
                )}
              >
                {/* Background Gradient */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 transition-opacity duration-300",
                    isSelected && "opacity-10",
                    `bg-gradient-to-br ${getServicoColor(index)}`,
                  )}
                />

                {/* Content */}
                <div className="relative p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300",
                          isSelected
                            ? `bg-gradient-to-br ${getServicoColor(index)} text-white shadow-lg`
                            : "bg-gray-100 dark:bg-gray-700",
                        )}
                      >
                        {getServicoIcon(servico.nome)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{servico.nome}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-500">{servico.duracao} min</span>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div
                        className={cn(
                          "text-2xl font-bold transition-colors duration-300",
                          isSelected ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white",
                        )}
                      >
                        {formatCurrency(servico.preco)}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-amber-400 fill-current" />
                        <span className="text-xs text-gray-500">4.9</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{servico.descricao}</p>

                  {/* Features */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      <span>Rápido</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      <span>Avaliado</span>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Effect */}
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none",
                  isHovered && !isSelected && "bg-gradient-to-br from-blue-500/5 to-purple-500/5",
                )}
              />
            </div>
          )
        })}
      </div>

      {/* Selected Service Summary */}
      {selectedServico && (
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">✓</div>
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">
                Serviço selecionado: {selectedServico.nome}
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Duração: {selectedServico.duracao} minutos • Valor: {formatCurrency(selectedServico.preco)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
