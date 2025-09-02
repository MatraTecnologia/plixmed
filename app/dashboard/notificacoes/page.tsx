"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Check, Clock, Filter, MoreVertical, Settings, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

export default function NotificacoesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Dados simulados de notificações
  const notificacoes = [
    {
      id: "1",
      tipo: "consulta",
      titulo: "Consulta Agendada",
      descricao: "Nova consulta agendada com Maria Silva para amanhã às 14:00.",
      horario: "Há 10 minutos",
      lida: false,
      prioridade: "alta",
    },
    {
      id: "2",
      tipo: "resultado",
      titulo: "Resultado de Exame",
      descricao: "O resultado do exame de João Pereira está disponível.",
      horario: "Há 30 minutos",
      lida: false,
      prioridade: "média",
    },
    {
      id: "3",
      tipo: "sistema",
      titulo: "Atualização do Sistema",
      descricao: "O sistema será atualizado hoje às 22:00. Pode haver instabilidade.",
      horario: "Há 2 horas",
      lida: true,
      prioridade: "baixa",
    },
    {
      id: "4",
      tipo: "financeiro",
      titulo: "Pagamento Recebido",
      descricao: "Pagamento de R$ 250,00 recebido de Ana Souza.",
      horario: "Há 3 horas",
      lida: true,
      prioridade: "média",
    },
    {
      id: "5",
      tipo: "consulta",
      titulo: "Consulta Cancelada",
      descricao: "Carlos Oliveira cancelou a consulta agendada para hoje às 16:00.",
      horario: "Há 5 horas",
      lida: false,
      prioridade: "alta",
    },
    {
      id: "6",
      tipo: "sistema",
      titulo: "Backup Concluído",
      descricao: "O backup diário do sistema foi concluído com sucesso.",
      horario: "Há 12 horas",
      lida: true,
      prioridade: "baixa",
    },
    {
      id: "7",
      tipo: "resultado",
      titulo: "Novo Resultado",
      descricao: "Novos resultados de exames de Lúcia Santos foram adicionados.",
      horario: "Ontem",
      lida: true,
      prioridade: "média",
    },
    {
      id: "8",
      tipo: "financeiro",
      titulo: "Fatura Gerada",
      descricao: "Nova fatura gerada para o convênio Unimed.",
      horario: "Ontem",
      lida: true,
      prioridade: "média",
    },
  ]

  // Filtrar notificações com base no termo de pesquisa
  const filteredNotificacoes = notificacoes.filter(
    (notificacao) =>
      notificacao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notificacao.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getIconForNotificationType = (tipo: string) => {
    switch (tipo) {
      case "consulta":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "resultado":
        return <Check className="h-5 w-5 text-green-500" />
      case "sistema":
        return <Settings className="h-5 w-5 text-orange-500" />
      case "financeiro":
        return <Bell className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getPriorityBadge = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return <Badge variant="destructive">Alta</Badge>
      case "média":
        return <Badge variant="outline">Média</Badge>
      case "baixa":
        return <Badge variant="secondary">Baixa</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Notificações</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Check className="mr-2 h-4 w-4" />
            Marcar todas como lidas
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Configurações</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Central de Notificações
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="Buscar notificações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filtrar</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="todas" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="todas">Todas</TabsTrigger>
                <TabsTrigger value="nao-lidas">Não Lidas</TabsTrigger>
                <TabsTrigger value="alta-prioridade">Alta Prioridade</TabsTrigger>
                <TabsTrigger value="arquivadas">Arquivadas</TabsTrigger>
              </TabsList>

              <TabsContent value="todas" className="m-0">
                <ScrollArea className="h-[500px]">
                  <div className="space-y-1">
                    {filteredNotificacoes.map((notificacao) => (
                      <div
                        key={notificacao.id}
                        className={`flex items-start gap-4 p-4 rounded-md transition-colors hover:bg-muted/50 ${
                          !notificacao.lida ? "bg-muted/30" : ""
                        }`}
                      >
                        <div className="mt-1">{getIconForNotificationType(notificacao.tipo)}</div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{notificacao.titulo}</h4>
                            <div className="flex items-center gap-2">
                              {getPriorityBadge(notificacao.prioridade)}
                              <span className="text-xs text-muted-foreground">{notificacao.horario}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{notificacao.descricao}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Ações</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Check className="mr-2 h-4 w-4" />
                              Marcar como lida
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Bell className="mr-2 h-4 w-4" />
                              Silenciar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="nao-lidas" className="m-0">
                <ScrollArea className="h-[500px]">
                  <div className="space-y-1">
                    {filteredNotificacoes
                      .filter((notificacao) => !notificacao.lida)
                      .map((notificacao) => (
                        <div
                          key={notificacao.id}
                          className="flex items-start gap-4 p-4 rounded-md transition-colors hover:bg-muted/50 bg-muted/30"
                        >
                          <div className="mt-1">{getIconForNotificationType(notificacao.tipo)}</div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{notificacao.titulo}</h4>
                              <div className="flex items-center gap-2">
                                {getPriorityBadge(notificacao.prioridade)}
                                <span className="text-xs text-muted-foreground">{notificacao.horario}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{notificacao.descricao}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Ações</span>
                          </Button>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="alta-prioridade" className="m-0">
                <ScrollArea className="h-[500px]">
                  <div className="space-y-1">
                    {filteredNotificacoes
                      .filter((notificacao) => notificacao.prioridade === "alta")
                      .map((notificacao) => (
                        <div
                          key={notificacao.id}
                          className={`flex items-start gap-4 p-4 rounded-md transition-colors hover:bg-muted/50 ${
                            !notificacao.lida ? "bg-muted/30" : ""
                          }`}
                        >
                          <div className="mt-1">{getIconForNotificationType(notificacao.tipo)}</div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{notificacao.titulo}</h4>
                              <div className="flex items-center gap-2">
                                {getPriorityBadge(notificacao.prioridade)}
                                <span className="text-xs text-muted-foreground">{notificacao.horario}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{notificacao.descricao}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Ações</span>
                          </Button>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="arquivadas" className="m-0">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Nenhuma notificação arquivada</h3>
                  <p className="text-muted-foreground max-w-md">
                    As notificações arquivadas aparecerão aqui. Você pode arquivar notificações para visualizá-las mais
                    tarde.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Configurações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Canais de Notificação</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notif" className="flex items-center gap-2">
                    Email
                    <Badge variant="outline" className="ml-2">
                      Recomendado
                    </Badge>
                  </Label>
                  <Switch id="email-notif" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="app-notif">Aplicativo</Label>
                  <Switch id="app-notif" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notif">SMS</Label>
                  <Switch id="sms-notif" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notif">Notificações Push</Label>
                  <Switch id="push-notif" defaultChecked />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Tipos de Notificação</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="consulta-notif">Consultas</Label>
                  <Switch id="consulta-notif" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="resultado-notif">Resultados de Exames</Label>
                  <Switch id="resultado-notif" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="financeiro-notif">Financeiro</Label>
                  <Switch id="financeiro-notif" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sistema-notif">Sistema</Label>
                  <Switch id="sistema-notif" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="marketing-notif">Marketing</Label>
                  <Switch id="marketing-notif" />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Preferências</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="som-notif">Som de Notificação</Label>
                  <Switch id="som-notif" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="resumo-diario">Resumo Diário</Label>
                  <Switch id="resumo-diario" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="nao-perturbe">Modo Não Perturbe</Label>
                  <Switch id="nao-perturbe" />
                </div>
              </div>
            </div>

            <Button className="w-full">Salvar Preferências</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
