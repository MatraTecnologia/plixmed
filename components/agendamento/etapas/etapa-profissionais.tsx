"use client"

import { cn } from "@/lib/utils"
import type { Profissional } from "@/types/agendamento"
import Image from "next/image"

interface EtapaProfissionaisProps {
  profissionais: Profissional[]
  selectedProfissional: Profissional | null
  onSelectProfissional: (profissional: Profissional) => void
}

export function EtapaProfissionais({
  profissionais,
  selectedProfissional,
  onSelectProfissional,
}: EtapaProfissionaisProps) {
  return (
    <div className="space-y-4 fade-in">
      {profissionais.map((profissional) => (
        <div
          key={profissional.id}
          className={cn(
            "profissional-item",
            selectedProfissional?.id === profissional.id && "profissional-selecionado",
          )}
          onClick={() => onSelectProfissional(profissional)}
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={profissional.foto || "/placeholder.svg"}
                alt={profissional.nome}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{profissional.nome}</h3>
              <p className="text-gray-600">{profissional.especialidade}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
