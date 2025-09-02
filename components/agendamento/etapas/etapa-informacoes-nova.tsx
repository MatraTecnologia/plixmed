"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { User, Phone, Mail, MapPin, CreditCard } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { Profissional, Servico } from "@/types/agendamento"

interface FormData {
  nome: string
  sobrenome: string
  telefone: string
  email: string
  senha: string
}

interface EtapaInformacoesNovaProps {
  formData: FormData
  setFormData: (data: FormData) => void
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
  modalidade: "presencial" | "online"
  setModalidade: (modalidade: "presencial" | "online") => void
  selectedServico: Servico | null
  selectedProfissional: Profissional | null
  selectedDate: Date | null
  selectedTime: string
  formatCurrency: (value: number) => string
}

export function EtapaInformacoesNova({
  formData,
  setFormData,
  isLogin,
  setIsLogin,
  modalidade,
  setModalidade,
  selectedServico,
  selectedProfissional,
  selectedDate,
  selectedTime,
  formatCurrency,
}: EtapaInformacoesNovaProps) {
  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="space-y-8 overflow-y-auto">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Finalize seu agendamento</h3>
        <p className="text-gray-600 dark:text-gray-400">Confirme seus dados e complete o agendamento</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          {/* Login/Register Tabs */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <Tabs value={isLogin ? "login" : "cadastro"} onValueChange={(value) => setIsLogin(value === "login")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="cadastro" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Novo Cliente
                  </TabsTrigger>
                  <TabsTrigger value="login" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Já sou cliente
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="cadastro" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome" className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-500" />
                        Nome *
                      </Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) => handleFormChange("nome", e.target.value)}
                        placeholder="Seu nome"
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sobrenome" className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-500" />
                        Sobrenome *
                      </Label>
                      <Input
                        id="sobrenome"
                        value={formData.sobrenome}
                        onChange={(e) => handleFormChange("sobrenome", e.target.value)}
                        placeholder="Seu sobrenome"
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="telefone" className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      Telefone *
                    </Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleFormChange("telefone", e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      E-mail (opcional)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFormChange("email", e.target.value)}
                      placeholder="seu@email.com"
                      className="h-12 rounded-xl"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="login" className="space-y-4">
                  <div>
                    <Label htmlFor="telefone-login" className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      Telefone *
                    </Label>
                    <Input
                      id="telefone-login"
                      value={formData.telefone}
                      onChange={(e) => handleFormChange("telefone", e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="senha" className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-4 h-4 text-gray-500" />
                      Senha *
                    </Label>
                    <Input
                      id="senha"
                      type="password"
                      value={formData.senha}
                      onChange={(e) => handleFormChange("senha", e.target.value)}
                      placeholder="Sua senha"
                      className="h-12 rounded-xl"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Modalidade */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <Label className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-gray-500" />
                Tipo de Atendimento
              </Label>
              <Select value={modalidade} onValueChange={(value: "presencial" | "online") => setModalidade(value)}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="presencial">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Presencial - Na clínica
                    </div>
                  </SelectItem>
                  <SelectItem value="online">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Online - Videochamada
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Summary Section */}
        <div>
          <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-500" />
                Resumo do Agendamento
              </h4>

              <div className="space-y-4">
                {/* Service */}
                {selectedServico && (
                  <div className="flex items-start gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white text-lg">
                      🩺
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{selectedServico.nome}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Duração: {selectedServico.duracao} minutos
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600 dark:text-blue-400">
                        {formatCurrency(selectedServico.preco)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Professional */}
                {selectedProfissional && (
                  <div className="flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white">
                      👩‍⚕️
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedProfissional.nome}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedProfissional.especialidade}</p>
                    </div>
                  </div>
                )}

                {/* Date & Time */}
                {selectedDate && selectedTime && (
                  <div className="flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
                      📅
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedTime} • {modalidade === "presencial" ? "Presencial" : "Online"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Total */}
                {selectedServico && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">Total a pagar:</span>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {formatCurrency(selectedServico.preco)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pagamento na consulta ou antecipado</p>
                  </div>
                )}
              </div>

              {/* Terms */}
              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-amber-800 dark:text-amber-200">
                  ⚠️ <strong>Importante:</strong> Cancelamentos devem ser feitos com pelo menos 24 horas de antecedência.
                  Reagendamentos são limitados a 2 vezes por consulta.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
