"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FormData {
  nome: string
  sobrenome: string
  telefone: string
  email: string
  senha: string
}

interface EtapaInformacoesProps {
  formData: FormData
  setFormData: (data: FormData) => void
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
  modalidade: "presencial" | "online"
  setModalidade: (modalidade: "presencial" | "online") => void
}

export function EtapaInformacoes({
  formData,
  setFormData,
  isLogin,
  setIsLogin,
  modalidade,
  setModalidade,
}: EtapaInformacoesProps) {
  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Tabs Login/Cadastro */}
      <Tabs value={isLogin ? "login" : "cadastro"} onValueChange={(value) => setIsLogin(value === "login")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cadastro">Cadastrar</TabsTrigger>
          <TabsTrigger value="login">Já tenho uma conta</TabsTrigger>
        </TabsList>

        <TabsContent value="cadastro" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Seu nome</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleFormChange("nome", e.target.value)}
                placeholder="Seu nome"
              />
            </div>
            <div>
              <Label htmlFor="sobrenome">Seu sobrenome</Label>
              <Input
                id="sobrenome"
                value={formData.sobrenome}
                onChange={(e) => handleFormChange("sobrenome", e.target.value)}
                placeholder="Seu sobrenome"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="telefone">Número de telefone</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) => handleFormChange("telefone", e.target.value)}
              placeholder="(11) 99999-9999"
            />
          </div>
        </TabsContent>

        <TabsContent value="login" className="space-y-4">
          <div>
            <Label htmlFor="telefone-login">Número de telefone</Label>
            <Input
              id="telefone-login"
              value={formData.telefone}
              onChange={(e) => handleFormChange("telefone", e.target.value)}
              placeholder="(11) 99999-9999"
            />
          </div>
          <div>
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              value={formData.senha}
              onChange={(e) => handleFormChange("senha", e.target.value)}
              placeholder="Sua senha"
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Modalidade */}
      <div>
        <Label>Presencial ou online</Label>
        <Select value={modalidade} onValueChange={(value: "presencial" | "online") => setModalidade(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="presencial">Presencial</SelectItem>
            <SelectItem value="online">Online</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
