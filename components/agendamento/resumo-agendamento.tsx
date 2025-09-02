"use client"

import type { Profissional, Servico } from "@/types/agendamento"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface ResumoAgendamentoProps {
  selectedServico: Servico | null
  selectedProfissional: Profissional | null
  selectedDate: Date | null
  selectedTime: string
  formatCurrency: (value: number) => string
}

export function ResumoAgendamento({
  selectedServico,
  selectedProfissional,
  selectedDate,
  selectedTime,
  formatCurrency,
}: ResumoAgendamentoProps) {
  return (
    <div className="w-full md:w-80 resumo-container">
      <h3 className="resumo-titulo">Resumo</h3>

      {selectedServico && (
        <div className="resumo-item">
          <div className="resumo-label">Serviço</div>
          <div className="resumo-valor">{selectedServico.nome}</div>
        </div>
      )}

      {selectedProfissional && (
        <div className="resumo-item">
          <div className="resumo-label">Profissional</div>
          <div className="resumo-valor">{selectedProfissional.nome}</div>
        </div>
      )}

      {selectedDate && (
        <div className="resumo-item">
          <div className="resumo-label">Data</div>
          <div className="resumo-valor">{format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}</div>
        </div>
      )}

      {selectedTime && (
        <div className="resumo-item">
          <div className="resumo-label">Hora</div>
          <div className="resumo-valor">{selectedTime}</div>
        </div>
      )}

      {selectedServico && (
        <div className="resumo-preco">
          <div className="resumo-label">Preço total</div>
          <div className="resumo-preco-valor">{formatCurrency(selectedServico.preco)}</div>
        </div>
      )}
    </div>
  )
}
