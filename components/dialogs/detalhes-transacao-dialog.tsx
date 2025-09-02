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
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DetalhesTransacaoDialogProps {
  transacao?: {
    id: string
    data: string
    descricao: string
    categoria: string
    valor: number
    status: string
    metodo: string
  }
  trigger?: React.ReactNode
}

export function DetalhesTransacaoDialog({ transacao, trigger }: DetalhesTransacaoDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)

    // Simulando uma requisição
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Transação excluída com sucesso",
      description: "A transação foi excluída do sistema.",
    })

    setLoading(false)
    setOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pago":
        return <Badge variant="default">{status}</Badge>
      case "Pendente":
        return <Badge variant="outline">{status}</Badge>
      case "Atrasado":
        return <Badge variant="destructive">{status}</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (!transacao) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            Detalhes
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalhes da Transação</DialogTitle>
          <DialogDescription>Informações detalhadas sobre a transação.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-muted-foreground">ID da Transação</Label>
              <span className="font-mono text-sm">{transacao.id}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <Label className="text-muted-foreground">Data</Label>
              <span>{transacao.data}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <Label className="text-muted-foreground">Descrição</Label>
              <span className="font-medium">{transacao.descricao}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <Label className="text-muted-foreground">Categoria</Label>
              <span>{transacao.categoria}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <Label className="text-muted-foreground">Valor</Label>
              <span className={transacao.valor < 0 ? "text-destructive font-medium" : "text-emerald-600 font-medium"}>
                {transacao.valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <Label className="text-muted-foreground">Status</Label>
              {getStatusBadge(transacao.status)}
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <Label className="text-muted-foreground">Método de Pagamento</Label>
              <span>{transacao.metodo}</span>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Excluir</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isso excluirá permanentemente esta transação do sistema.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={loading}>
                  {loading ? "Excluindo..." : "Excluir"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div>
            <Button variant="outline" className="mr-2" onClick={() => setOpen(false)}>
              Fechar
            </Button>
            <Button>Editar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
