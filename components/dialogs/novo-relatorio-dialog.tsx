"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import type { DateRange } from "react-day-picker"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"

export function NovoRelatorioDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulando uma requisição
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Relatório gerado com sucesso",
      description: "O relatório foi gerado e está disponível para visualização.",
    })

    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Criar Novo Relatório</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Novo Relatório</DialogTitle>
            <DialogDescription>Configure e gere um novo relatório personalizado.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Relatório</Label>
              <Input id="nome" placeholder="Nome do relatório" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Relatório</Label>
              <Select required>
                <SelectTrigger id="tipo">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="atendimento">Atendimento</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                  <SelectItem value="pacientes">Pacientes</SelectItem>
                  <SelectItem value="medicos">Médicos</SelectItem>
                  <SelectItem value="procedimentos">Procedimentos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Período</Label>
              <DatePickerWithRange date={date} setDate={setDate} />
            </div>
            <div className="space-y-2">
              <Label>Dados a incluir</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="dados-pacientes" defaultChecked />
                  <Label htmlFor="dados-pacientes">Dados de Pacientes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dados-consultas" defaultChecked />
                  <Label htmlFor="dados-consultas">Consultas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dados-financeiros" defaultChecked />
                  <Label htmlFor="dados-financeiros">Dados Financeiros</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dados-procedimentos" />
                  <Label htmlFor="dados-procedimentos">Procedimentos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dados-medicos" />
                  <Label htmlFor="dados-medicos">Médicos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dados-graficos" defaultChecked />
                  <Label htmlFor="dados-graficos">Gráficos</Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="formato">Formato de Saída</Label>
              <Select defaultValue="pdf">
                <SelectTrigger id="formato">
                  <SelectValue placeholder="Selecione o formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Gerando..." : "Gerar Relatório"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
