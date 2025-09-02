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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function NovaTransacaoDialog() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>()
  const [loading, setLoading] = useState(false)
  const [tipoTransacao, setTipoTransacao] = useState("receita")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulando uma requisição
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Transação registrada com sucesso",
      description: "A transação foi registrada no sistema.",
    })

    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Nova Transação</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nova Transação</DialogTitle>
            <DialogDescription>Registre uma nova transação financeira no sistema.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Tipo de Transação</Label>
              <RadioGroup
                defaultValue="receita"
                className="flex space-x-4"
                onValueChange={setTipoTransacao}
                value={tipoTransacao}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="receita" id="receita" />
                  <Label htmlFor="receita" className="cursor-pointer">
                    Receita
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="despesa" id="despesa" />
                  <Label htmlFor="despesa" className="cursor-pointer">
                    Despesa
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input id="descricao" placeholder="Descrição da transação" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor">Valor (R$)</Label>
                <Input id="valor" type="number" step="0.01" min="0.01" placeholder="0,00" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="data">Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={ptBR} />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Select required>
                  <SelectTrigger id="categoria">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {tipoTransacao === "receita" ? (
                      <>
                        <SelectItem value="consulta">Consulta</SelectItem>
                        <SelectItem value="exame">Exame</SelectItem>
                        <SelectItem value="procedimento">Procedimento</SelectItem>
                        <SelectItem value="convenio">Convênio</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="aluguel">Aluguel</SelectItem>
                        <SelectItem value="salario">Salário</SelectItem>
                        <SelectItem value="material">Material</SelectItem>
                        <SelectItem value="servico">Serviço</SelectItem>
                        <SelectItem value="imposto">Imposto</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="metodo">Método de Pagamento</Label>
                <Select required>
                  <SelectTrigger id="metodo">
                    <SelectValue placeholder="Selecione o método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="cartao-credito">Cartão de Crédito</SelectItem>
                    <SelectItem value="cartao-debito">Cartão de Débito</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="transferencia">Transferência</SelectItem>
                    <SelectItem value="boleto">Boleto</SelectItem>
                    <SelectItem value="convenio">Convênio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select required>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pago">Pago</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="atrasado">Atrasado</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Input id="observacoes" placeholder="Observações adicionais" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Registrar Transação"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
