"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Settings,
  Link,
  Calendar,
  Clock,
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  CheckCircle,
  Code,
  Check,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ConfiguracoesPage() {
  const { toast } = useToast()
  const [linkAtivo, setLinkAtivo] = useState(true)
  const [showLinkPreview, setShowLinkPreview] = useState(false)
  const [showEmbedCode, setShowEmbedCode] = useState(false)
  const [embedCopied, setEmbedCopied] = useState(false)
  const [embedSize, setEmbedSize] = useState("medium") // small, medium, large

  // Lista de serviços disponíveis
  const [servicosDisponiveisList] = useState([
    { id: 1, nome: "Consulta Cardiológica", preco: 300, duracao: 60, ativo: true, disponivel: true },
    { id: 2, nome: "Eletrocardiograma", preco: 150, duracao: 30, ativo: true, disponivel: true },
    { id: 3, nome: "Ecocardiograma", preco: 400, duracao: 45, ativo: true, disponivel: false },
    { id: 4, nome: "Teste Ergométrico", preco: 350, duracao: 90, ativo: true, disponivel: true },
    { id: 5, nome: "Holter 24h", preco: 250, duracao: 15, ativo: true, disponivel: false },
    { id: 6, nome: "Consulta de Retorno", preco: 200, duracao: 30, ativo: true, disponivel: true },
  ])

  // Configurações do agendamento online
  const [agendamentoConfig, setAgendamentoConfig] = useState({
    ativo: true,
    antecedenciaMinima: 24, // horas
    antecedenciaMaxima: 60, // dias
    intervaloPadrao: 30, // minutos
    horarioFuncionamento: {
      segunda: { ativo: true, inicio: "08:00", fim: "18:00" },
      terca: { ativo: true, inicio: "08:00", fim: "18:00" },
      quarta: { ativo: true, inicio: "08:00", fim: "18:00" },
      quinta: { ativo: true, inicio: "08:00", fim: "18:00" },
      sexta: { ativo: true, inicio: "08:00", fim: "17:00" },
      sabado: { ativo: true, inicio: "08:00", fim: "12:00" },
      domingo: { ativo: false, inicio: "00:00", fim: "00:00" },
    },
    mensagemPersonalizada: "Bem-vindo ao agendamento online! Escolha o melhor horário para sua consulta.",
  })

  // Gerar link de agendamento
  const linkAgendamento = `${typeof window !== "undefined" ? window.location.origin : "https://plixmed.com"}/agendamento/dr-joao-silva`

  // Gerar código de embed
  const embedCode = `<iframe 
  src="${linkAgendamento}/embed" 
  width="${embedSize === "small" ? "300" : embedSize === "medium" ? "400" : "500"}" 
  height="${embedSize === "small" ? "400" : embedSize === "medium" ? "500" : "600"}" 
  frameborder="0" 
  allowtransparency="true"
  style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
  title="Agendar consulta com Dr. João Silva">
</iframe>`

  const copyLink = () => {
    navigator.clipboard.writeText(linkAgendamento)
    toast({
      title: "Link copiado!",
      description: "O link de agendamento foi copiado para a área de transferência.",
    })
  }

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode)
    setEmbedCopied(true)
    setTimeout(() => setEmbedCopied(false), 2000)
    toast({
      title: "Código de embed copiado!",
      description: "O código para incorporar o agendamento foi copiado.",
    })
  }

  const abrirLink = () => {
    window.open(linkAgendamento, "_blank")
  }

  const handleHorarioChange = (dia: string, campo: string, valor: string | boolean) => {
    setAgendamentoConfig((prev) => ({
      ...prev,
      horarioFuncionamento: {
        ...prev.horarioFuncionamento,
        [dia]: {
          ...prev.horarioFuncionamento[dia as keyof typeof prev.horarioFuncionamento],
          [campo]: valor,
        },
      },
    }))
  }

  const toggleServicoDisponivel = (servicoId: number) => {
    // Aqui você atualizaria o estado dos serviços disponíveis
    toast({
      title: "Serviço atualizado!",
      description: "A disponibilidade do serviço foi alterada no link de agendamento.",
    })
  }

  const salvarConfiguracoes = () => {
    // Aqui salvaria as configurações na API
    toast({
      title: "Configurações salvas!",
      description: "Suas configurações foram atualizadas com sucesso.",
    })
  }

  const servicosDisponiveis = servicosDisponiveisList.filter((s) => s.disponivel).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
        <Button onClick={salvarConfiguracoes}>Salvar Configurações</Button>
      </div>

      <Tabs defaultValue="agendamento" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="agendamento">Agendamento Online</TabsTrigger>
          <TabsTrigger value="servicos">Serviços</TabsTrigger>
          <TabsTrigger value="horarios">Horários</TabsTrigger>
          <TabsTrigger value="geral">Configurações Gerais</TabsTrigger>
        </TabsList>

        <TabsContent value="agendamento" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5" />
                Link de Agendamento Online
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="link-ativo">Agendamento Online Ativo</Label>
                  <p className="text-sm text-muted-foreground">
                    Permite que pacientes agendem consultas através do link público
                  </p>
                </div>
                <Switch
                  id="link-ativo"
                  checked={agendamentoConfig.ativo}
                  onCheckedChange={(checked) => setAgendamentoConfig((prev) => ({ ...prev, ativo: checked }))}
                />
              </div>

              {agendamentoConfig.ativo && (
                <>
                  <Separator />

                  {/* Link de Agendamento Destacado */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Link className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100">Seu Link de Agendamento</h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300">Compartilhe com seus pacientes</p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-lg border p-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Input
                          value={linkAgendamento}
                          readOnly
                          className="font-mono text-sm bg-transparent border-0 p-0 focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button onClick={copyLink} size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar Link
                      </Button>
                      <Button onClick={abrirLink} variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Abrir Link
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setShowLinkPreview(!showLinkPreview)}>
                        {showLinkPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                        {showLinkPreview ? "Ocultar" : "Visualizar"} Preview
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setShowEmbedCode(!showEmbedCode)}>
                        <Code className="w-4 h-4 mr-2" />
                        {showEmbedCode ? "Ocultar" : "Mostrar"} Código Embed
                      </Button>
                    </div>
                  </div>

                  {showEmbedCode && (
                    <div className="border rounded-lg p-4 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-900/20">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <Code className="w-4 h-4" />
                          Código para Incorporar
                        </h4>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="embed-size" className="text-sm">
                            Tamanho:
                          </Label>
                          <select
                            id="embed-size"
                            value={embedSize}
                            onChange={(e) => setEmbedSize(e.target.value)}
                            className="text-sm border rounded px-2 py-1 bg-white dark:bg-slate-800"
                          >
                            <option value="small">Pequeno</option>
                            <option value="medium">Médio</option>
                            <option value="large">Grande</option>
                          </select>
                        </div>
                      </div>

                      <div className="relative">
                        <Textarea
                          value={embedCode}
                          readOnly
                          rows={5}
                          className="font-mono text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                        />
                        <Button
                          size="sm"
                          className={`absolute top-2 right-2 ${
                            embedCopied ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                          }`}
                          onClick={copyEmbed}
                        >
                          {embedCopied ? (
                            <>
                              <Check className="w-4 h-4 mr-1" />
                              Copiado!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-1" />
                              Copiar
                            </>
                          )}
                        </Button>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                        Cole este código HTML em seu site para incorporar o agendamento diretamente.
                      </p>

                      <div className="mt-4 p-4 bg-white dark:bg-slate-800 border rounded-lg">
                        <h5 className="font-medium text-sm mb-2">Preview do Embed</h5>
                        <div className="border border-dashed border-slate-300 dark:border-slate-600 rounded p-4 flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-medium text-slate-800 dark:text-white">Dr. João Silva</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Cardiologista</p>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Agendar Consulta
                            </Button>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                              {servicosDisponiveis} serviços disponíveis
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showLinkPreview && !showEmbedCode && (
                    <div className="border rounded-lg p-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20">
                      <h4 className="font-medium mb-2 text-slate-700 dark:text-slate-300">Preview do Link</h4>
                      <div className="bg-white dark:bg-slate-800 rounded-lg border shadow-sm p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <Calendar className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-xl text-slate-800 dark:text-white mb-1">Dr. João Silva</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">Cardiologista</p>
                        <Button
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200"
                          size="sm"
                        >
                          Agendar Consulta
                        </Button>
                        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {servicosDisponiveis} serviços disponíveis • Powered by Plixmed
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="antecedencia-minima">Antecedência Mínima (horas)</Label>
                      <Input
                        id="antecedencia-minima"
                        type="number"
                        value={agendamentoConfig.antecedenciaMinima}
                        onChange={(e) =>
                          setAgendamentoConfig((prev) => ({
                            ...prev,
                            antecedenciaMinima: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="antecedencia-maxima">Antecedência Máxima (dias)</Label>
                      <Input
                        id="antecedencia-maxima"
                        type="number"
                        value={agendamentoConfig.antecedenciaMaxima}
                        onChange={(e) =>
                          setAgendamentoConfig((prev) => ({
                            ...prev,
                            antecedenciaMaxima: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="mensagem-personalizada">Mensagem Personalizada</Label>
                    <Textarea
                      id="mensagem-personalizada"
                      value={agendamentoConfig.mensagemPersonalizada}
                      onChange={(e) =>
                        setAgendamentoConfig((prev) => ({
                          ...prev,
                          mensagemPersonalizada: e.target.value,
                        }))
                      }
                      placeholder="Digite uma mensagem de boas-vindas para seus pacientes"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="servicos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Serviços Disponíveis no Agendamento Online
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Selecione quais serviços os pacientes poderão agendar através do link público
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {servicosDisponiveisList.map((servico) => (
                  <div
                    key={servico.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={`servico-${servico.id}`}
                        checked={servico.disponivel}
                        onCheckedChange={() => toggleServicoDisponivel(servico.id)}
                      />
                      <div>
                        <Label htmlFor={`servico-${servico.id}`} className="font-medium cursor-pointer">
                          {servico.nome}
                        </Label>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{servico.duracao} min</span>
                          <span>R$ {servico.preco.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={servico.ativo ? "default" : "secondary"}>
                        {servico.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                      <Badge variant={servico.disponivel ? "default" : "outline"}>
                        {servico.disponivel ? "Disponível Online" : "Apenas Presencial"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">
                    {servicosDisponiveis} de {servicosDisponiveisList.length} serviços disponíveis online
                  </span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Os pacientes poderão escolher entre estes serviços ao agendar pelo link público.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="horarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Horários de Funcionamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(agendamentoConfig.horarioFuncionamento).map(([dia, config]) => (
                  <div key={dia} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-20">
                      <span className="font-medium capitalize">{dia}</span>
                    </div>

                    <Switch
                      checked={config.ativo}
                      onCheckedChange={(checked) => handleHorarioChange(dia, "ativo", checked)}
                    />

                    {config.ativo && (
                      <>
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">De:</Label>
                          <Input
                            type="time"
                            value={config.inicio}
                            onChange={(e) => handleHorarioChange(dia, "inicio", e.target.value)}
                            className="w-32"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Até:</Label>
                          <Input
                            type="time"
                            value={config.fim}
                            onChange={(e) => handleHorarioChange(dia, "fim", e.target.value)}
                            className="w-32"
                          />
                        </div>
                      </>
                    )}

                    {!config.ativo && <span className="text-muted-foreground text-sm">Fechado</span>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geral" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configurações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Informações do Médico</h4>
                  <div>
                    <Label htmlFor="nome-medico">Nome Completo</Label>
                    <Input id="nome-medico" defaultValue="Dr. João Silva" />
                  </div>
                  <div>
                    <Label htmlFor="especialidade">Especialidade</Label>
                    <Input id="especialidade" defaultValue="Cardiologista" />
                  </div>
                  <div>
                    <Label htmlFor="crm">CRM</Label>
                    <Input id="crm" defaultValue="CRM/SP 123456" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Contato</h4>
                  <div>
                    <Label htmlFor="telefone-config">Telefone</Label>
                    <Input id="telefone-config" defaultValue="(11) 99999-9999" />
                  </div>
                  <div>
                    <Label htmlFor="email-config">Email</Label>
                    <Input id="email-config" defaultValue="contato@drjoaosilva.com.br" />
                  </div>
                  <div>
                    <Label htmlFor="endereco-config">Endereço</Label>
                    <Textarea
                      id="endereco-config"
                      defaultValue="Rua das Flores, 123 - Centro, São Paulo - SP"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
