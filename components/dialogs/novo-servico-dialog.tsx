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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface NovoServicoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const profissionaisDisponiveis = [
  "Dr. João Silva",
  "Dra. Maria Santos",
  "Dr. Carlos Oliveira",
  "Dra. Ana Costa",
  "Dr. Pedro Lima",
  "Dr. Rafael Santos",
  "Dra. Lucia Ferreira",
]

const coresDisponiveis = [
  { nome: "Azul", valor: "bg-blue-500" },
  { nome: "Verde", valor: "bg-green-500" },
  { nome: "Vermelho", valor: "bg-red-500" },
  { nome: "Roxo", valor: "bg-purple-500" },
  { nome: "Laranja", valor: "bg-orange-500" },
  { nome: "Rosa", valor: "bg-pink-500" },
  { nome: "Índigo", valor: "bg-indigo-500" },
  { nome: "Teal", valor: "bg-teal-500" },
  { nome: "Amarelo", valor: "bg-yellow-500" },
]

export function NovoServicoDialog({ open, onOpenChange }: NovoServicoDialogProps) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    categoria: "",
    preco: "",
    duracao: "",
    cor: "bg-blue-500",
    profissionais: [] as string[],
    antecedencia: 24,
    maxReagendamentos: 2,
    disponivelOnline: true,
    permiteReagendamento: true,
    cobrancaNoShow: false,
    valorNoShow: 50,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Novo serviço:", formData)
    // Aqui você implementaria a lógica para salvar o serviço
    onOpenChange(false)
    // Reset form
    setFormData({
      nome: "",
      descricao: "",
      categoria: "",
      preco: "",
      duracao: "",
      cor: "bg-blue-500",
      profissionais: [],
      antecedencia: 24,
      maxReagendamentos: 2,
      disponivelOnline: true,
      permiteReagendamento: true,
      cobrancaNoShow: false,
      valorNoShow: 50,
    })
  }

  const toggleProfissional = (profissional: string) => {
    setFormData((prev) => ({
      ...prev,
      profissionais: prev.profissionais.includes(profissional)
        ? prev.profissionais.filter((p) => p !== profissional)
        : [...prev.profissionais, profissional],
    }))
  }

  const removeProfissional = (profissional: string) => {
    setFormData((prev) => ({
      ...prev,
      profissionais: prev.profissionais.filter((p) => p !== profissional),
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">Novo Serviço</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Cadastre um novo serviço para a clínica
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-gray-700 dark:text-gray-300">
                Nome do Serviço
              </Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))}
                placeholder="Ex: Consulta Cardiológica"
                required
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria" className="text-gray-700 dark:text-gray-300">
                Categoria
              </Label>
              <Select
                value={formData.categoria}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, categoria: value }))}
              >
                <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500/20">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectItem value="Consulta">Consulta</SelectItem>
                  <SelectItem value="Exame">Exame</SelectItem>
                  <SelectItem value="Procedimento">Procedimento</SelectItem>
                  <SelectItem value="Cirurgia">Cirurgia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao" className="text-gray-700 dark:text-gray-300">
              Descrição
            </Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData((prev) => ({ ...prev, descricao: e.target.value }))}
              placeholder="Descreva o serviço oferecido..."
              rows={3}
              className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preco" className="text-gray-700 dark:text-gray-300">
                Preço (R$)
              </Label>
              <Input
                id="preco"
                type="number"
                value={formData.preco}
                onChange={(e) => setFormData((prev) => ({ ...prev, preco: e.target.value }))}
                placeholder="150"
                min="0"
                step="0.01"
                required
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duracao" className="text-gray-700 dark:text-gray-300">
                Duração (min)
              </Label>
              <Input
                id="duracao"
                type="number"
                value={formData.duracao}
                onChange={(e) => setFormData((prev) => ({ ...prev, duracao: e.target.value }))}
                placeholder="30"
                min="5"
                step="5"
                required
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Cor</Label>
              <Select value={formData.cor} onValueChange={(value) => setFormData((prev) => ({ ...prev, cor: value }))}>
                <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500/20">
                  <SelectValue>
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${formData.cor}`} />
                      <span>{coresDisponiveis.find((c) => c.valor === formData.cor)?.nome}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  {coresDisponiveis.map((cor) => (
                    <SelectItem key={cor.valor} value={cor.valor}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full ${cor.valor}`} />
                        <span>{cor.nome}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="antecedencia" className="text-gray-700 dark:text-gray-300">
                Antecedência Mínima (horas)
              </Label>
              <Input
                id="antecedencia"
                type="number"
                value={formData.antecedencia || 24}
                onChange={(e) => setFormData((prev) => ({ ...prev, antecedencia: Number(e.target.value) }))}
                min="1"
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-reagendamentos" className="text-gray-700 dark:text-gray-300">
                Máx. Reagendamentos
              </Label>
              <Input
                id="max-reagendamentos"
                type="number"
                value={formData.maxReagendamentos || 2}
                onChange={(e) => setFormData((prev) => ({ ...prev, maxReagendamentos: Number(e.target.value) }))}
                min="0"
                max="5"
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-gray-700 dark:text-gray-300">Configurações Especiais</Label>

            <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="disponivel-online" className="text-sm font-medium">
                    Disponível para agendamento online
                  </Label>
                  <p className="text-xs text-gray-500">Pacientes podem agendar este serviço pelo link público</p>
                </div>
                <Switch
                  id="disponivel-online"
                  checked={formData.disponivelOnline || true}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, disponivelOnline: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="permite-reagendamento" className="text-sm font-medium">
                    Permite reagendamento
                  </Label>
                  <p className="text-xs text-gray-500">Pacientes podem reagendar este serviço</p>
                </div>
                <Switch
                  id="permite-reagendamento"
                  checked={formData.permiteReagendamento !== false}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, permiteReagendamento: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="cobranca-no-show" className="text-sm font-medium">
                    Cobrança por falta
                  </Label>
                  <p className="text-xs text-gray-500">Cobrar taxa quando paciente não comparecer</p>
                </div>
                <Switch
                  id="cobranca-no-show"
                  checked={formData.cobrancaNoShow || false}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, cobrancaNoShow: checked }))}
                />
              </div>

              {formData.cobrancaNoShow && (
                <div className="ml-4 space-y-2">
                  <Label htmlFor="valor-no-show" className="text-sm">
                    Valor da taxa (% do serviço)
                  </Label>
                  <Input
                    id="valor-no-show"
                    type="number"
                    value={formData.valorNoShow || 50}
                    onChange={(e) => setFormData((prev) => ({ ...prev, valorNoShow: Number(e.target.value) }))}
                    min="0"
                    max="100"
                    className="w-24"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-gray-700 dark:text-gray-300">Profissionais</Label>

            {formData.profissionais.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.profissionais.map((profissional) => (
                  <Badge
                    key={profissional}
                    variant="outline"
                    className="border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20"
                  >
                    {profissional}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-4 w-4 p-0 hover:bg-blue-100 dark:hover:bg-blue-800"
                      onClick={() => removeProfissional(profissional)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-md p-3 bg-gray-50 dark:bg-gray-700">
              {profissionaisDisponiveis.map((profissional) => (
                <div key={profissional} className="flex items-center space-x-2">
                  <Checkbox
                    id={profissional}
                    checked={formData.profissionais.includes(profissional)}
                    onCheckedChange={() => toggleProfissional(profissional)}
                    className="border-gray-300 dark:border-gray-500"
                  />
                  <Label htmlFor={profissional} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                    {profissional}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Criar Serviço
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
