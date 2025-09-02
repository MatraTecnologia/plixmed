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
import { Calendar, Edit, Mail, Phone, User } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface PacienteDetalhes {
  id: number
  nome: string
  telefone: string
  email: string
  ultimaConsulta: string
  status: string
  dataNascimento?: string
  genero?: string
  endereco?: string
  convenio?: string
  historico?: HistoricoConsulta[]
  exames?: Exame[]
}

interface HistoricoConsulta {
  id: number
  data: string
  tipo: string
  medico: string
  observacoes?: string
}

interface Exame {
  id: number
  tipo: string
  data: string
  status: string
}

interface DetalhesPacienteDialogProps {
  paciente: PacienteDetalhes | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DetalhesPacienteDialog({ paciente, open, onOpenChange }: DetalhesPacienteDialogProps) {
  const [isEditing, setIsEditing] = useState(false)

  if (!paciente) return null

  const handleEdit = () => {
    setIsEditing(true)
    // Simulação de edição
    setTimeout(() => {
      setIsEditing(false)
      // Aqui você poderia atualizar os dados do paciente
    }, 1000)
  }

  // Calcular idade a partir da data de nascimento
  const calcularIdade = (dataNascimento?: string) => {
    if (!dataNascimento) return "N/A"

    const hoje = new Date()
    const nascimento = new Date(dataNascimento.split("/").reverse().join("-"))
    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const m = hoje.getMonth() - nascimento.getMonth()

    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--
    }

    return idade
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Detalhes do Paciente
          </DialogTitle>
          <DialogDescription>Informações detalhadas do paciente.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={`/abstract-geometric-shapes.png?height=64&width=64&query=${paciente.nome}`}
                alt={paciente.nome}
              />
              <AvatarFallback className="text-lg">
                {paciente.nome
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{paciente.nome}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant={paciente.status === "Ativo" ? "default" : "outline"}>{paciente.status}</Badge>
                {paciente.dataNascimento && (
                  <span className="text-sm text-muted-foreground">{calcularIdade(paciente.dataNascimento)} anos</span>
                )}
              </div>
            </div>
          </div>

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="historico">Histórico</TabsTrigger>
              <TabsTrigger value="exames">Exames</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{paciente.telefone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{paciente.email}</span>
                </div>
                {paciente.dataNascimento && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Nascimento: {paciente.dataNascimento}</span>
                  </div>
                )}
                {paciente.genero && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Gênero: {paciente.genero}</span>
                  </div>
                )}
              </div>

              {paciente.endereco && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Endereço</h4>
                    <p className="text-sm">{paciente.endereco}</p>
                  </div>
                </>
              )}

              {paciente.convenio && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Convênio</h4>
                    <p className="text-sm">{paciente.convenio}</p>
                  </div>
                </>
              )}

              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Última Consulta</h4>
                <p className="text-sm">{paciente.ultimaConsulta}</p>
              </div>
            </TabsContent>

            <TabsContent value="historico" className="space-y-4 mt-4">
              {paciente.historico && paciente.historico.length > 0 ? (
                <div className="space-y-3">
                  {paciente.historico.map((consulta) => (
                    <Card key={consulta.id}>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">{consulta.data}</CardTitle>
                          <Badge variant="outline">{consulta.tipo}</Badge>
                        </div>
                        <CardDescription>Dr(a). {consulta.medico}</CardDescription>
                      </CardHeader>
                      {consulta.observacoes && (
                        <CardContent className="p-4 pt-2">
                          <p className="text-sm">{consulta.observacoes}</p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum histórico de consulta disponível.</p>
              )}
            </TabsContent>

            <TabsContent value="exames" className="space-y-4 mt-4">
              {paciente.exames && paciente.exames.length > 0 ? (
                <div className="space-y-3">
                  {paciente.exames.map((exame) => (
                    <Card key={exame.id}>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">{exame.tipo}</CardTitle>
                          <Badge variant={exame.status === "Disponível" ? "default" : "outline"}>{exame.status}</Badge>
                        </div>
                        <CardDescription>{exame.data}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum exame disponível.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={handleEdit} disabled={isEditing}>
            <Edit className="h-4 w-4 mr-1" />
            {isEditing ? "Editando..." : "Editar Paciente"}
          </Button>
          <Button variant="default" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
