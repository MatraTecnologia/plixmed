"use client"

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
import { Calendar, Clock, Edit, FileText, User, CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
import { format } from "date-fns"

export interface ConsultaDetalhes {
  id: number
  patientName: string
  time: string
  duration: number
  day: number
  date: string
  tipo: string
  status: string
  observacoes?: string
}

interface DetalhesConsultaDialogProps {
  consulta: ConsultaDetalhes | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DetalhesConsultaDialog({ consulta, open, onOpenChange }: DetalhesConsultaDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)

  if (!consulta) return null

  const handleEdit = () => {
    setIsEditing(true)
    // Aqui você poderia abrir um formulário de edição ou navegar para uma página de edição
    // Por enquanto, apenas simulamos a edição
    setTimeout(() => {
      setIsEditing(false)
      onOpenChange(false)
    }, 1000)
  }

  const handleDelete = () => {
    setIsDeleting(true)
    // Simulação de exclusão
    setTimeout(() => {
      setIsDeleting(false)
      onOpenChange(false)
    }, 1000)
  }

  const handleConfirm = () => {
    setIsConfirming(true)
    // Simulação de confirmação
    setTimeout(() => {
      setIsConfirming(false)
      onOpenChange(false)
    }, 1000)
  }

  const handleComplete = () => {
    setIsCompleting(true)
    // Simulação de conclusão
    setTimeout(() => {
      setIsCompleting(false)
      onOpenChange(false)
    }, 1000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Agendada":
        return <Badge variant="outline">{status}</Badge>
      case "Confirmada":
        return <Badge variant="secondary">{status}</Badge>
      case "Em Andamento":
        return (
          <Badge variant="default" className="bg-amber-500">
            {status}
          </Badge>
        )
      case "Concluída":
        return <Badge variant="default">{status}</Badge>
      case "Cancelada":
        return <Badge variant="destructive">{status}</Badge>
      case "Não Compareceu":
        return (
          <Badge variant="outline" className="border-rose-500 text-rose-500">
            {status}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatTimeRange = (time: string, duration: number) => {
    const [hours, minutes] = time.split(":").map(Number)
    const startTime = new Date()
    startTime.setHours(hours, minutes, 0)

    const endTime = new Date(startTime)
    endTime.setMinutes(endTime.getMinutes() + duration)

    return `${time} - ${format(endTime, "HH:mm")}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Detalhes da Consulta
          </DialogTitle>
          <DialogDescription>Informações detalhadas sobre a consulta agendada.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <div className="text-lg font-semibold">{consulta.patientName}</div>
            </div>
            {getStatusBadge(consulta.status)}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{consulta.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{formatTimeRange(consulta.time, consulta.duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>
              Tipo: <Badge variant="outline">{consulta.tipo}</Badge>
            </span>
          </div>

          {consulta.observacoes && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Observações</h4>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">{consulta.observacoes}</p>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <div className="flex gap-2 w-full sm:w-auto">
            {consulta.status === "Agendada" && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
                onClick={handleConfirm}
                disabled={isConfirming || isEditing || isDeleting || isCompleting}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                {isConfirming ? "Confirmando..." : "Confirmar"}
              </Button>
            )}

            {(consulta.status === "Agendada" ||
              consulta.status === "Confirmada" ||
              consulta.status === "Em Andamento") && (
              <Button
                variant="default"
                size="sm"
                className="flex-1 sm:flex-none"
                onClick={handleComplete}
                disabled={isConfirming || isEditing || isDeleting || isCompleting}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                {isCompleting ? "Concluindo..." : "Concluir"}
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={handleEdit}
              disabled={isConfirming || isEditing || isDeleting || isCompleting}
            >
              <Edit className="h-4 w-4 mr-1" />
              {isEditing ? "Editando..." : "Editar"}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1 sm:flex-none"
                  disabled={isConfirming || isEditing || isDeleting || isCompleting}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  {isDeleting ? "Cancelando..." : "Cancelar"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancelar Consulta</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja cancelar esta consulta? Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Voltar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Button variant="ghost" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
