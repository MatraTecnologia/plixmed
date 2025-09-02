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
import { CalendarIcon, FileUp } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

export function NovoResultadoDialog() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fileName, setFileName] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setOpen(false)
      // Reset form or show success message
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FileUp className="mr-2 h-4 w-4" />
          Enviar Resultado
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Enviar Novo Resultado</DialogTitle>
            <DialogDescription>Preencha os dados e anexe o arquivo do resultado.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="paciente">Paciente</Label>
              <Select required>
                <SelectTrigger id="paciente">
                  <SelectValue placeholder="Selecione o paciente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maria-silva">Maria Silva</SelectItem>
                  <SelectItem value="joao-pereira">João Pereira</SelectItem>
                  <SelectItem value="ana-souza">Ana Souza</SelectItem>
                  <SelectItem value="carlos-oliveira">Carlos Oliveira</SelectItem>
                  <SelectItem value="lucia-santos">Lúcia Santos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tipo-exame">Tipo de Exame</Label>
              <Select required>
                <SelectTrigger id="tipo-exame">
                  <SelectValue placeholder="Selecione o tipo de exame" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hemograma">Hemograma</SelectItem>
                  <SelectItem value="raio-x">Raio-X</SelectItem>
                  <SelectItem value="eletrocardiograma">Eletrocardiograma</SelectItem>
                  <SelectItem value="tomografia">Tomografia</SelectItem>
                  <SelectItem value="ultrassonografia">Ultrassonografia</SelectItem>
                  <SelectItem value="ressonancia">Ressonância Magnética</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="data">Data do Exame</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ptBR }) : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="arquivo">Arquivo do Resultado</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="arquivo"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("arquivo")?.click()}
                  className="w-full justify-start"
                >
                  <FileUp className="mr-2 h-4 w-4" />
                  {fileName || "Selecionar arquivo"}
                </Button>
              </div>
              {fileName && <p className="text-sm text-muted-foreground mt-1">Arquivo selecionado: {fileName}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Resultado"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
