"use client"

import { cn } from "@/lib/utils"
import type { Profissional } from "@/types/agendamento"
import { Star, Award, Calendar } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface EtapaProfissionaisNovaProps {
  profissionais: Profissional[]
  selectedProfissional: Profissional | null
  onSelectProfissional: (profissional: Profissional) => void
}

export function EtapaProfissionaisNova({
  profissionais,
  selectedProfissional,
  onSelectProfissional,
}: EtapaProfissionaisNovaProps) {
  const [hoveredProfissional, setHoveredProfissional] = useState<string | null>(null)

  // Dados simulados para enriquecer o perfil
  const getProfissionalData = (id: string) => {
    const data = {
      "1": {
        rating: 4.9,
        reviews: 127,
        experience: "8 anos",
        nextAvailable: "Hoje às 14:00",
        specialties: ["Voz", "Fala", "Deglutição"],
        education: "USP - Fonoaudiologia",
      },
    }
    return data[id as keyof typeof data] || data["1"]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Escolha seu profissional</h3>
        <p className="text-gray-600 dark:text-gray-400">Selecione o profissional que irá realizar seu atendimento</p>
      </div>

      {/* Professionals List */}
      <div className="space-y-4">
        {profissionais.map((profissional) => {
          const isSelected = selectedProfissional?.id === profissional.id
          const isHovered = hoveredProfissional === profissional.id
          const data = getProfissionalData(profissional.id)

          return (
            <div
              key={profissional.id}
              className={cn(
                "relative group cursor-pointer transition-all duration-300 transform",
                isSelected ? "scale-102" : "hover:scale-101",
              )}
              onClick={() => onSelectProfissional(profissional)}
              onMouseEnter={() => setHoveredProfissional(profissional.id)}
              onMouseLeave={() => setHoveredProfissional(null)}
            >
              {/* Card */}
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl border-2 transition-all duration-300 bg-white dark:bg-gray-800 p-6",
                  isSelected
                    ? "border-purple-500 shadow-xl shadow-purple-500/25 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg",
                )}
              >
                <div className="flex items-start gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div
                      className={cn(
                        "w-20 h-20 rounded-2xl overflow-hidden ring-4 transition-all duration-300",
                        isSelected ? "ring-purple-500 shadow-lg" : "ring-gray-200 dark:ring-gray-700",
                      )}
                    >
                      <Image
                        src={profissional.foto || "/placeholder.svg"}
                        alt={profissional.nome}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Online Status */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{profissional.nome}</h4>
                        <p className="text-purple-600 dark:text-purple-400 font-medium">{profissional.especialidade}</p>
                      </div>

                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-4 h-4",
                                i < Math.floor(data.rating)
                                  ? "text-amber-400 fill-current"
                                  : "text-gray-300 dark:text-gray-600",
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{data.rating}</span>
                        <span className="text-sm text-gray-500">({data.reviews} avaliações)</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {data.experience} de experiência
                        </span>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {data.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    {/* Next Available */}
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        Próximo horário: {data.nextAvailable}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none",
                    isHovered && !isSelected && "bg-gradient-to-r from-purple-500/5 to-blue-500/5",
                  )}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Professional Summary */}
      {selectedProfissional && (
        <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white">✓</div>
            <div>
              <p className="font-medium text-purple-900 dark:text-purple-100">
                Profissional selecionado: {selectedProfissional.nome}
              </p>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                {selectedProfissional.especialidade} • {getProfissionalData(selectedProfissional.id).rating} ⭐ •{" "}
                {getProfissionalData(selectedProfissional.id).experience}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
