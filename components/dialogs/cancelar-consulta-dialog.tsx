"use client"

import { useState } from "react"
import { AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface CancelarConsultaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  consulta: any
}

export function CancelarConsultaDialog({ open, onOpenChange, consulta }: CancelarConsultaDialogProps) {
  const [motivo, setMotivo] = useState("")
  const [motivoPersonalizado, setMotivoPersonalizado] = useState("")
  const [loading, setLoading] = useState(false)

  const motivosCancelamento = [
    "Conflito de horário",
    "Problema de saúde",
    "Viagem imprevista",
    "Questões financeiras",
    "Outro motivo",
  ]

  const handleCancelar = async () => {
    setLoading(true)

    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Cancelando consulta:", {
      consultaId: consulta?.id,
      motivo: motivo === "Outro motivo" ? motivoPersonalizado : motivo,
    })

    setLoading(false)
    onOpenChange(false)

    // Aqui você pode adicionar um toast de sucesso
    alert("Consulta cancelada com sucesso!")
  }

  if (!consulta) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-gray-200">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-gray-900">Cancelar Consulta</DialogTitle>
              <DialogDescription className="text-gray-600">
                Tem certeza que deseja cancelar esta consulta?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Detalhes da consulta */}
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-lg space-y-2">
            <h4 className="font-medium text-gray-900">Detalhes da consulta:</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong className="text-gray-900">Data:</strong> {new Date(consulta.data).toLocaleDateString("pt-BR")}
              </p>
              <p>
                <strong className="text-gray-900">Horário:</strong> {consulta.hora}
              </p>
              <p>
                <strong className="text-gray-900">Profissional:</strong> {consulta.profissional}
              </p>
              <p>
                <strong className="text-gray-900">Especialidade:</strong> {consulta.especialidade}
              </p>
            </div>
          </div>

          {/* Motivo do cancelamento */}
          <div className="space-y-3">
            <Label className="text-gray-900">Motivo do cancelamento:</Label>
            <RadioGroup value={motivo} onValueChange={setMotivo}>
              {motivosCancelamento.map((motivoItem) => (
                <div key={motivoItem} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={motivoItem}
                    id={motivoItem}
                    className="border-gray-300 text-blue-600 focus:ring-blue-500/20"
                  />
                  <Label htmlFor={motivoItem} className="text-sm text-gray-700">
                    {motivoItem}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Campo para motivo personalizado */}
          {motivo === "Outro motivo" && (
            <div className="space-y-2">
              <Label htmlFor="motivo-personalizado" className="text-gray-900">
                Descreva o motivo:
              </Label>
              <Textarea
                id="motivo-personalizado"
                placeholder="Digite o motivo do cancelamento..."
                value={motivoPersonalizado}
                onChange={(e) => setMotivoPersonalizado(e.target.value)}
                rows={3}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              />
            </div>
          )}

          {/* Aviso sobre política de cancelamento */}
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Política de Cancelamento:</strong> Cancelamentos com menos de 24h de antecedência podem estar
              sujeitos a taxas. Entre em contato conosco se tiver dúvidas.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
          >
            Manter Consulta
          </Button>
          <Button
            onClick={handleCancelar}
            disabled={!motivo || loading || (motivo === "Outro motivo" && !motivoPersonalizado.trim())}
            className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-sm disabled:bg-gray-300 disabled:text-gray-500"
          >
            {loading ? "Cancelando..." : "Confirmar Cancelamento"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
