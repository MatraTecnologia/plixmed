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
import { Textarea } from "@/components/ui/textarea"

export function NovoUsuarioDialog() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCargo, setSelectedCargo] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setOpen(false)
      toast({
        title: "Usuário cadastrado com sucesso",
        description: "O usuário foi adicionado à lista de profissionais.",
      })
    }, 1000)
  }

  const cargos = [
    { value: "medico", label: "Médico" },
    { value: "enfermeiro", label: "Enfermeiro" },
    { value: "recepcionista", label: "Recepcionista" },
    { value: "administrador", label: "Administrador" },
    { value: "tecnico", label: "Técnico" },
    { value: "auxiliar", label: "Auxiliar" },
  ]

  const especialidadesPorCargo = {
    medico: [
      "Cardiologia",
      "Dermatologia",
      "Neurologia",
      "Ortopedia",
      "Pediatria",
      "Psiquiatria",
      "Ginecologia",
      "Clínica Geral",
    ],
    enfermeiro: ["Enfermagem Geral", "UTI", "Emergência", "Pediatria", "Obstetrícia", "Cirúrgica"],
    recepcionista: ["Atendimento ao Cliente", "Agendamento", "Faturamento"],
    administrador: ["Gestão Clínica", "Recursos Humanos", "Financeiro", "Operacional"],
    tecnico: ["Radiologia", "Laboratório", "Farmácia", "Informática"],
    auxiliar: ["Auxiliar de Enfermagem", "Auxiliar Administrativo", "Limpeza"],
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <span className="mr-2">+</span>
          Novo Usuário
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Usuário</DialogTitle>
            <DialogDescription>Preencha os dados para cadastrar um novo usuário na clínica.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" placeholder="Nome completo do usuário" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cargo">Cargo</Label>
                <Select required onValueChange={setSelectedCargo}>
                  <SelectTrigger id="cargo">
                    <SelectValue placeholder="Selecione o cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    {cargos.map((cargo) => (
                      <SelectItem key={cargo.value} value={cargo.value}>
                        {cargo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="especialidade">Especialidade/Área</Label>
                <Select required disabled={!selectedCargo}>
                  <SelectTrigger id="especialidade">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCargo &&
                      especialidadesPorCargo[selectedCargo as keyof typeof especialidadesPorCargo]?.map((esp) => (
                        <SelectItem key={esp} value={esp.toLowerCase().replace(/\s+/g, "-")}>
                          {esp}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedCargo === "medico" && (
              <div className="grid gap-2">
                <Label htmlFor="crm">CRM</Label>
                <Input id="crm" placeholder="Ex: 123456/SP" required />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" placeholder="(00) 00000-0000" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@exemplo.com" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="data-nascimento">Data de Nascimento</Label>
                <Input id="data-nascimento" type="date" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="ativo">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                    <SelectItem value="ferias">Em férias</SelectItem>
                    <SelectItem value="licenca">Em licença</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dias-trabalho">Dias de Trabalho</Label>
              <Select>
                <SelectTrigger id="dias-trabalho">
                  <SelectValue placeholder="Selecione os dias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seg-sex">Segunda a Sexta</SelectItem>
                  <SelectItem value="seg-qua-sex">Segunda, Quarta e Sexta</SelectItem>
                  <SelectItem value="ter-qui">Terça e Quinta</SelectItem>
                  <SelectItem value="sab">Sábados</SelectItem>
                  <SelectItem value="personalizado">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="biografia">Biografia/Experiência</Label>
              <Textarea
                id="biografia"
                placeholder="Informações sobre formação, experiência e áreas de atuação"
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Cadastrando..." : "Cadastrar Usuário"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
