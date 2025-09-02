"use client"

import { cn } from "@/lib/utils"
import type { Servico } from "@/types/agendamento"
import Image from "next/image"

interface EtapaServicosProps {
  servicos: Servico[]
  selectedServico: Servico | null
  onSelectServico: (servico: Servico) => void
  formatCurrency: (value: number) => string
}

export function EtapaServicos({ servicos, selectedServico, onSelectServico, formatCurrency }: EtapaServicosProps) {
  return (
    <div className="space-y-4 fade-in">
      {servicos.map((servico) => (
        <div
          key={servico.id}
          className={cn("servico-item", selectedServico?.id === servico.id && "servico-selecionado")}
          onClick={() => onSelectServico(servico)}
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
              <Image
                src={servico.icone || "/placeholder.svg"}
                alt={servico.nome}
                width={24}
                height={24}
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{servico.nome}</h3>
                <span className="text-lg font-bold">{formatCurrency(servico.preco)}</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{servico.descricao}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
