"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

export function ProntuarioForm({ pacienteId }: { pacienteId?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("anamnese")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Prontuário salvo",
        description: "As informações do prontuário foram salvas com sucesso.",
      })
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Prontuário Eletrônico</CardTitle>
          <CardDescription>Registre as informações do atendimento médico</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="anamnese">Anamnese</TabsTrigger>
              <TabsTrigger value="exame-fisico">Exame Físico</TabsTrigger>
              <TabsTrigger value="diagnostico">Diagnóstico</TabsTrigger>
              <TabsTrigger value="prescricao">Prescrição</TabsTrigger>
              <TabsTrigger value="evolucao">Evolução</TabsTrigger>
            </TabsList>

            <TabsContent value="anamnese" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="queixa-principal">Queixa Principal</Label>
                  <Textarea
                    id="queixa-principal"
                    placeholder="Descreva a queixa principal do paciente"
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <Label htmlFor="historia-doenca">História da Doença Atual</Label>
                  <Textarea
                    id="historia-doenca"
                    placeholder="Descreva a história da doença atual"
                    className="min-h-[150px]"
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Antecedentes Pessoais</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="diabetes" />
                      <label
                        htmlFor="diabetes"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Diabetes
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hipertensao" />
                      <label
                        htmlFor="hipertensao"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Hipertensão
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cardiopatia" />
                      <label
                        htmlFor="cardiopatia"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Cardiopatia
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cancer" />
                      <label
                        htmlFor="cancer"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Câncer
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="medicamentos">Medicamentos em Uso</Label>
                  <Textarea id="medicamentos" placeholder="Liste os medicamentos que o paciente utiliza atualmente" />
                </div>

                <div>
                  <Label htmlFor="alergias">Alergias</Label>
                  <Textarea id="alergias" placeholder="Liste as alergias do paciente" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="exame-fisico" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pressao-arterial">Pressão Arterial (mmHg)</Label>
                  <Input id="pressao-arterial" placeholder="Ex: 120/80" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequencia-cardiaca">Frequência Cardíaca (bpm)</Label>
                  <Input id="frequencia-cardiaca" placeholder="Ex: 72" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperatura">Temperatura (°C)</Label>
                  <Input id="temperatura" placeholder="Ex: 36.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequencia-respiratoria">Frequência Respiratória (irpm)</Label>
                  <Input id="frequencia-respiratoria" placeholder="Ex: 16" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input id="peso" placeholder="Ex: 70.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="altura">Altura (cm)</Label>
                  <Input id="altura" placeholder="Ex: 170" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Estado Geral</Label>
                <RadioGroup defaultValue="bom">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bom" id="estado-bom" />
                    <Label htmlFor="estado-bom">Bom</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="regular" id="estado-regular" />
                    <Label htmlFor="estado-regular">Regular</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grave" id="estado-grave" />
                    <Label htmlFor="estado-grave">Grave</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="exame-fisico">Observações do Exame Físico</Label>
                <Textarea
                  id="exame-fisico"
                  placeholder="Descreva os achados do exame físico"
                  className="min-h-[150px]"
                />
              </div>
            </TabsContent>

            <TabsContent value="diagnostico" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hipotese-diagnostica">Hipótese Diagnóstica</Label>
                  <Textarea
                    id="hipotese-diagnostica"
                    placeholder="Descreva a hipótese diagnóstica"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cid">CID</Label>
                  <div className="flex gap-2">
                    <Input id="cid" placeholder="Ex: I10" className="max-w-[100px]" />
                    <Input placeholder="Descrição do CID" className="flex-1" disabled />
                  </div>
                </div>

                <div>
                  <Label htmlFor="exames-solicitados">Exames Solicitados</Label>
                  <Textarea
                    id="exames-solicitados"
                    placeholder="Liste os exames solicitados"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="prescricao" className="space-y-6">
              <div className="space-y-4">
                <div className="border rounded-md p-4 space-y-4">
                  <h3 className="font-medium">Medicamento 1</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="medicamento">Medicamento</Label>
                      <Input id="medicamento" placeholder="Nome do medicamento" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="posologia">Posologia</Label>
                      <Input id="posologia" placeholder="Ex: 1 comprimido a cada 8 horas" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duracao">Duração</Label>
                      <Input id="duracao" placeholder="Ex: 7 dias" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="via">Via de Administração</Label>
                      <Select>
                        <SelectTrigger id="via">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oral">Oral</SelectItem>
                          <SelectItem value="topica">Tópica</SelectItem>
                          <SelectItem value="intravenosa">Intravenosa</SelectItem>
                          <SelectItem value="intramuscular">Intramuscular</SelectItem>
                          <SelectItem value="subcutanea">Subcutânea</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button type="button" variant="outline" className="w-full">
                  + Adicionar Medicamento
                </Button>

                <Separator />

                <div>
                  <Label htmlFor="orientacoes">Orientações Gerais</Label>
                  <Textarea
                    id="orientacoes"
                    placeholder="Descreva as orientações para o paciente"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="evolucao" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="evolucao">Evolução Clínica</Label>
                  <Textarea
                    id="evolucao"
                    placeholder="Descreva a evolução clínica do paciente"
                    className="min-h-[200px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conduta">Conduta</Label>
                  <Select>
                    <SelectTrigger id="conduta">
                      <SelectValue placeholder="Selecione a conduta" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="retorno">Retorno</SelectItem>
                      <SelectItem value="encaminhamento">Encaminhamento</SelectItem>
                      <SelectItem value="internacao">Internação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data-retorno">Data de Retorno</Label>
                  <Input id="data-retorno" type="date" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => setActiveTab(getPreviousTab(activeTab))}>
            Anterior
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" type="button">
              Salvar Rascunho
            </Button>
            {activeTab === "evolucao" ? (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Finalizar Atendimento"}
              </Button>
            ) : (
              <Button type="button" onClick={() => setActiveTab(getNextTab(activeTab))}>
                Próximo
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}

function getPreviousTab(currentTab: string): string {
  const tabs = ["anamnese", "exame-fisico", "diagnostico", "prescricao", "evolucao"]
  const currentIndex = tabs.indexOf(currentTab)
  return currentIndex > 0 ? tabs[currentIndex - 1] : currentTab
}

function getNextTab(currentTab: string): string {
  const tabs = ["anamnese", "exame-fisico", "diagnostico", "prescricao", "evolucao"]
  const currentIndex = tabs.indexOf(currentTab)
  return currentIndex < tabs.length - 1 ? tabs[currentIndex + 1] : currentTab
}
