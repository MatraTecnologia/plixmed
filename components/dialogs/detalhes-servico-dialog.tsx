"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, DollarSign, Users, Edit, ToggleLeft, ToggleRight, Calendar, TrendingUp } from "lucide-react"

interface Servico {
  id: string
  nome: string
  descricao: string
  categoria: string
  preco: number
  duracao: number
  ativo: boolean
  profissionais: string[]
  cor: string
}

interface DetalhesServicoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  servico: Servico
}

export function DetalhesServicoDialog({ open, onOpenChange, servico }: DetalhesServicoDialogProps) {
  // Dados simulados de estatísticas
  const estatisticas = {
    agendamentosEstesMes: Math.floor(Math.random() * 50) + 10,
    agendamentosProximoMes: Math.floor(Math.random() * 30) + 5,
    receitaEstesMes: servico.preco * (Math.floor(Math.random() * 50) + 10),
    avaliacaoMedia: (Math.random() * 2 + 3).toFixed(1), // Entre 3.0 e 5.0
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full ${servico.cor}`} />
            <div>
              <DialogTitle className="text-xl text-gray-900 dark:text-white">{servico.nome}</DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-300">
                Detalhes completos do serviço
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status e Categoria */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className={`${
                  servico.categoria === "Consulta"
                    ? "border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20"
                    : servico.categoria === "Exame"
                      ? "border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20"
                      : "border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20"
                }`}
              >
                {servico.categoria}
              </Badge>
              <Badge
                variant="outline"
                className={
                  servico.ativo
                    ? "border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20"
                    : "border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20"
                }
              >
                {servico.ativo ? "Ativo" : "Inativo"}
              </Badge>
            </div>
            {servico.ativo ? (
              <ToggleRight className="h-6 w-6 text-green-600" />
            ) : (
              <ToggleLeft className="h-6 w-6 text-gray-400" />
            )}
          </div>

          {/* Descrição */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Descrição</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{servico.descricao}</p>
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-600" />

          {/* Informações Básicas */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Preço</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">R$ {servico.preco.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Duração</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{servico.duracao} minutos</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Profissionais</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{servico.profissionais.length}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avaliação</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {estatisticas.avaliacaoMedia} ⭐
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-600" />

          {/* Profissionais */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Profissionais Vinculados</h3>
            <div className="grid grid-cols-2 gap-2">
              {servico.profissionais.map((profissional, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {profissional
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{profissional}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-600" />

          {/* Estatísticas */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Estatísticas</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-blue-700 dark:text-blue-300 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Este Mês
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {estatisticas.agendamentosEstesMes}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">agendamentos</p>
                </CardContent>
              </Card>

              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-green-700 dark:text-green-300 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Receita
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                    R$ {estatisticas.receitaEstesMes.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">este mês</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Fechar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Edit className="h-4 w-4 mr-2" />
            Editar Serviço
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
