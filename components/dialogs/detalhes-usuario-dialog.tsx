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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Edit, Mail, Phone, User, Briefcase } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface UsuarioDetalhes {
  id: number
  nome: string
  crm?: string
  cargo: string
  especialidade: string
  telefone: string
  email: string
  dataNascimento?: string
  status: string
  diasAtendimento: string
  biografia?: string
  horarios?: string[]
  pacientes?: number
  consultas?: {
    total: number
    mes: number
    semana: number
  }
  avaliacoes?: {
    media: number
    total: number
  }
}

interface DetalhesUsuarioDialogProps {
  usuario: UsuarioDetalhes | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DetalhesUsuarioDialog({ usuario, open, onOpenChange }: DetalhesUsuarioDialogProps) {
  const [isEditing, setIsEditing] = useState(false)

  if (!usuario) return null

  const handleEdit = () => {
    setIsEditing(true)
    // Simulação de edição
    setTimeout(() => {
      setIsEditing(false)
      // Aqui você poderia atualizar os dados do usuário
    }, 1000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge variant="default">Ativo</Badge>
      case "Inativo":
        return <Badge variant="outline">Inativo</Badge>
      case "Em férias":
        return <Badge variant="secondary">Em férias</Badge>
      case "Em licença":
        return <Badge variant="secondary">Em licença</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCargoBadge = (cargo: string) => {
    switch (cargo) {
      case "Médico":
        return (
          <Badge variant="default" className="bg-blue-500">
            Médico
          </Badge>
        )
      case "Enfermeiro":
        return (
          <Badge variant="default" className="bg-green-500">
            Enfermeiro
          </Badge>
        )
      case "Recepcionista":
        return (
          <Badge variant="default" className="bg-purple-500">
            Recepcionista
          </Badge>
        )
      case "Administrador":
        return (
          <Badge variant="default" className="bg-orange-500">
            Administrador
          </Badge>
        )
      default:
        return <Badge variant="outline">{cargo}</Badge>
    }
  }

  const isMedico = usuario.cargo === "Médico"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Detalhes do Usuário
          </DialogTitle>
          <DialogDescription>Informações detalhadas do profissional.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={`/abstract-geometric-shapes.png?height=64&width=64&query=${usuario.nome}`}
                alt={usuario.nome}
              />
              <AvatarFallback className="text-lg">
                {usuario.nome
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{usuario.nome}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{usuario.especialidade}</span>
                {usuario.crm && (
                  <>
                    <span>•</span>
                    <span>CRM: {usuario.crm}</span>
                  </>
                )}
                <span>•</span>
                {getCargoBadge(usuario.cargo)}
                <span>•</span>
                {getStatusBadge(usuario.status)}
              </div>
            </div>
          </div>

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
              <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{usuario.telefone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{usuario.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>Cargo: {usuario.cargo}</span>
                </div>
                {usuario.dataNascimento && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Nascimento: {usuario.dataNascimento}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Trabalho: {usuario.diasAtendimento}</span>
                </div>
              </div>

              {usuario.biografia && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Biografia/Experiência</h4>
                    <p className="text-sm">{usuario.biografia}</p>
                  </div>
                </>
              )}

              {usuario.horarios && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Horários de Trabalho</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {usuario.horarios.map((horario, index) => (
                        <div key={index} className="text-sm">
                          {horario}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="agenda" className="space-y-4 mt-4">
              {isMedico ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Próximas Consultas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">Agendadas para hoje</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Horário Disponível</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3h</div>
                        <p className="text-xs text-muted-foreground">Restantes hoje</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Taxa de Ocupação</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-muted-foreground">Nesta semana</p>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Agenda não aplicável para este cargo.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="estatisticas" className="space-y-4 mt-4">
              {isMedico ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Total de Consultas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{usuario.consultas?.total || 0}</div>
                      <p className="text-xs text-muted-foreground">Desde o início</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Pacientes Atendidos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{usuario.pacientes || 0}</div>
                      <p className="text-xs text-muted-foreground">Total de pacientes</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Avaliação</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{usuario.avaliacoes?.media || 0}/5</div>
                      <p className="text-xs text-muted-foreground">{usuario.avaliacoes?.total || 0} avaliações</p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Avaliação Geral</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{usuario.avaliacoes?.media || 0}/5</div>
                      <p className="text-xs text-muted-foreground">{usuario.avaliacoes?.total || 0} avaliações</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Tempo na Empresa</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2 anos</div>
                      <p className="text-xs text-muted-foreground">Desde a contratação</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={handleEdit} disabled={isEditing}>
            <Edit className="h-4 w-4 mr-1" />
            {isEditing ? "Editando..." : "Editar Usuário"}
          </Button>
          <Button variant="default" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
