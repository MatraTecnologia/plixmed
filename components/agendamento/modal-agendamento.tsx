"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer"
import { X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { EtapaServicos } from "./etapas/etapa-servicos"
import { EtapaProfissionais } from "./etapas/etapa-profissionais"
import { EtapaDataHora } from "./etapas/etapa-data-hora"
import { EtapaInformacoes } from "./etapas/etapa-informacoes"
import { ResumoAgendamento } from "./resumo-agendamento"
import type { Profissional, Servico } from "@/types/agendamento"

interface ModalAgendamentoProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentStep: number
  servicos: Servico[]
  profissionais: Profissional[]
  selectedServico: Servico | null
  setSelectedServico: (servico: Servico) => void
  selectedProfissional: Profissional | null
  setSelectedProfissional: (profissional: Profissional) => void
  selectedDate: Date | null
  setSelectedDate: (date: Date | null) => void
  selectedTime: string
  setSelectedTime: (time: string) => void
  currentMonth: Date
  setCurrentMonth: (date: Date) => void
  calendarDays: Date[]
  horariosDisponiveis: string[]
  formData: {
    nome: string
    sobrenome: string
    telefone: string
    email: string
    senha: string
  }
  setFormData: (data: any) => void
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
  modalidade: "presencial" | "online"
  setModalidade: (modalidade: "presencial" | "online") => void
  formatCurrency: (value: number) => string
  handleBack: () => void
  handleNext: () => void
  handleConfirm: () => void
  isStepValid: () => boolean
  getStepTitle: () => string
  getStepQuestion: () => string
  getStepIcon: () => string
  temHorariosDisponiveis?: (date: Date) => boolean
}

export function ModalAgendamento({
  open,
  onOpenChange,
  currentStep,
  servicos,
  profissionais,
  selectedServico,
  setSelectedServico,
  selectedProfissional,
  setSelectedProfissional,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  currentMonth,
  setCurrentMonth,
  calendarDays,
  horariosDisponiveis,
  formData,
  setFormData,
  isLogin,
  setIsLogin,
  modalidade,
  setModalidade,
  formatCurrency,
  handleBack,
  handleNext,
  handleConfirm,
  isStepValid,
  getStepTitle,
  getStepQuestion,
  getStepIcon,
  temHorariosDisponiveis,
}: ModalAgendamentoProps) {
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right")
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const handleNextWithAnimation = () => {
    if (isStepValid()) {
      setSlideDirection("right")
      setIsAnimating(true)
      setTimeout(() => {
        handleNext()
        setIsAnimating(false)
      }, 200)
    }
  }

  const handleBackWithAnimation = () => {
    setSlideDirection("left")
    setIsAnimating(true)
    setTimeout(() => {
      handleBack()
      setIsAnimating(false)
    }, 200)
  }

  const handleConfirmWithAnimation = () => {
    if (isStepValid()) {
      handleConfirm()
    }
  }

  const renderContent = () => (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out",
        isAnimating && slideDirection === "right" && "transform translate-x-full opacity-0",
        isAnimating && slideDirection === "left" && "transform -translate-x-full opacity-0",
        !isAnimating && "transform translate-x-0 opacity-100",
      )}
    >
      {/* ETAPA 1: Escolher Serviço */}
      {currentStep === 1 && (
        <EtapaServicos
          servicos={servicos}
          selectedServico={selectedServico}
          onSelectServico={setSelectedServico}
          formatCurrency={formatCurrency}
        />
      )}

      {/* ETAPA 2: Escolher Profissional */}
      {currentStep === 2 && (
        <EtapaProfissionais
          profissionais={profissionais}
          selectedProfissional={selectedProfissional}
          onSelectProfissional={setSelectedProfissional}
        />
      )}

      {/* ETAPA 3: Escolher Data e Horário */}
      {currentStep === 3 && (
        <EtapaDataHora
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          calendarDays={calendarDays}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          horariosDisponiveis={horariosDisponiveis}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          temHorariosDisponiveis={temHorariosDisponiveis}
        />
      )}

      {/* ETAPA 4: Informações do Cliente */}
      {currentStep === 4 && (
        <EtapaInformacoes
          formData={formData}
          setFormData={setFormData}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          modalidade={modalidade}
          setModalidade={setModalidade}
        />
      )}
    </div>
  )

  // Renderização para Mobile (Drawer)
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[95vh] bg-white text-gray-900 border-gray-200">
          {/* Header do Drawer */}
          <DrawerHeader className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-sm">
                  {getStepIcon()}
                </div>
                <div>
                  <DrawerTitle className="text-left text-gray-900">{getStepTitle()}</DrawerTitle>
                  <p className="text-xs text-gray-500">Etapa {currentStep} de 4</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Indicadores de Progresso */}
            <div className="flex justify-center mt-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={cn(
                    "w-2 h-2 rounded-full mx-1 transition-all duration-300",
                    step === currentStep ? "bg-red-500" : step < currentStep ? "bg-red-300" : "bg-gray-300",
                  )}
                />
              ))}
            </div>
          </DrawerHeader>

          {/* Conteúdo do Drawer */}
          <div className="flex-1 overflow-y-auto p-4">{renderContent()}</div>

          {/* Resumo Colapsível */}
          <div className="border-t border-gray-200">
            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900">Ver Resumo do Agendamento</span>
                <span className="transform group-open:rotate-180 transition-transform text-gray-600">▼</span>
              </summary>
              <div className="px-4 pb-4 border-t border-gray-200">
                <ResumoAgendamento
                  selectedServico={selectedServico}
                  selectedProfissional={selectedProfissional}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  formatCurrency={formatCurrency}
                />
              </div>
            </details>
          </div>

          {/* Footer com Botões */}
          <DrawerFooter className="border-t border-gray-200 bg-white">
            <div className="flex gap-3">
              {currentStep > 1 && (
                <button
                  onClick={handleBackWithAnimation}
                  disabled={isAnimating}
                  className="botao-voltar flex-1 justify-center py-3"
                >
                  ← Voltar
                </button>
              )}

              <button
                onClick={currentStep === 4 ? handleConfirmWithAnimation : handleNextWithAnimation}
                disabled={!isStepValid() || isAnimating}
                className={cn("botao-proximo justify-center py-3", currentStep === 1 ? "flex-1" : "flex-1")}
              >
                {currentStep === 4 ? "Confirmar" : "Próximo"} <ArrowRight size={16} />
              </button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  // Renderização para Desktop (Dialog)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-[90vw] h-[90vh] p-0 border-0 overflow-hidden">
        <div className="flex h-full flex-row">
          {/* Lado Esquerdo - Progresso e Pergunta */}
          <div className="w-2/5 painel-lateral">
            {/* Indicadores de Progresso */}
            <div className="flex justify-center mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={cn(
                    "indicador-progresso",
                    step === currentStep
                      ? "indicador-ativo"
                      : step < currentStep
                        ? "indicador-completo"
                        : "indicador-inativo",
                  )}
                />
              ))}
            </div>

            {/* Ícone e Pergunta */}
            <div className="text-center">
              <div className="icone-etapa">{getStepIcon()}</div>
              <p className="text-gray-600 text-lg leading-relaxed">{getStepQuestion()}</p>
            </div>
          </div>

          {/* Lado Direito - Conteúdo */}
          <div className="flex-1 flex flex-col bg-white text-gray-900 relative">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{getStepTitle()}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Conteúdo Principal */}
            <div className="flex-1 flex flex-row relative overflow-hidden">
              {/* Área de Conteúdo com Scroll */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">{renderContent()}</div>
              </div>

              {/* Resumo Lateral com Botões - Desktop */}
              <div className="flex flex-col w-80 border-l border-gray-200">
                {/* Resumo */}
                <div className="flex-1 overflow-y-auto">
                  <ResumoAgendamento
                    selectedServico={selectedServico}
                    selectedProfissional={selectedProfissional}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    formatCurrency={formatCurrency}
                  />
                </div>

                {/* Botões de Navegação - Desktop */}
                <div className="p-6 border-t border-gray-200 bg-white">
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={currentStep === 4 ? handleConfirmWithAnimation : handleNextWithAnimation}
                      disabled={!isStepValid() || isAnimating}
                      className="botao-proximo w-full justify-center"
                    >
                      {currentStep === 4 ? "Confirmar Agendamento" : "Próximo"} <ArrowRight size={16} />
                    </button>

                    {currentStep > 1 && (
                      <button
                        onClick={handleBackWithAnimation}
                        disabled={isAnimating}
                        className="botao-voltar w-full justify-center"
                      >
                        ← Voltar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
