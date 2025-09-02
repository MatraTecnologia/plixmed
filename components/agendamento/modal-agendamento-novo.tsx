"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { X, ArrowRight, ArrowLeft, Check, Calendar, Clock, User, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { EtapaServicosNova } from "./etapas/etapa-servicos-nova"
import { EtapaProfissionaisNova } from "./etapas/etapa-profissionais-nova"
import { EtapaDataHoraNova } from "./etapas/etapa-data-hora-nova"
import { EtapaInformacoesNova } from "./etapas/etapa-informacoes-nova"
import type { Profissional, Servico } from "@/types/agendamento"

interface ModalAgendamentoNovoProps {
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

const stepIcons = [
  { icon: CreditCard, color: "bg-blue-500", label: "Serviço" },
  { icon: User, color: "bg-purple-500", label: "Profissional" },
  { icon: Calendar, color: "bg-emerald-500", label: "Data" },
  { icon: Clock, color: "bg-amber-500", label: "Confirmação" },
]

export function ModalAgendamentoNovo({
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
  temHorariosDisponiveis,
}: ModalAgendamentoNovoProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

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
      setIsAnimating(true)
      setTimeout(() => {
        handleNext()
        setIsAnimating(false)
      }, 300)
    }
  }

  const handleBackWithAnimation = () => {
    setIsAnimating(true)
    setTimeout(() => {
      handleBack()
      setIsAnimating(false)
    }, 300)
  }

  const renderStepContent = () => {
    const contentClass = cn(
      "transition-all duration-500 ease-out",
      isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0",
    )

    switch (currentStep) {
      case 1:
        return (
          <div className={contentClass}>
            <EtapaServicosNova
              servicos={servicos}
              selectedServico={selectedServico}
              onSelectServico={setSelectedServico}
              formatCurrency={formatCurrency}
            />
          </div>
        )
      case 2:
        return (
          <div className={contentClass}>
            <EtapaProfissionaisNova
              profissionais={profissionais}
              selectedProfissional={selectedProfissional}
              onSelectProfissional={setSelectedProfissional}
            />
          </div>
        )
      case 3:
        return (
          <div className={contentClass}>
            <EtapaDataHoraNova
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
          </div>
        )
      case 4:
        return (
          <div className={contentClass}>
            <EtapaInformacoesNova
              formData={formData}
              setFormData={setFormData}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              modalidade={modalidade}
              setModalidade={setModalidade}
              selectedServico={selectedServico}
              selectedProfissional={selectedProfissional}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              formatCurrency={formatCurrency}
            />
          </div>
        )
      default:
        return null
    }
  }

  // Mobile Layout (Drawer)
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[95vh] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg",
                  stepIcons[currentStep - 1].color,
                )}
              >
                {React.createElement(stepIcons[currentStep - 1].icon, { size: 20 })}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">{getStepTitle()}</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Etapa {currentStep} de 4</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="h-8 w-8 p-0 rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="px-4 py-3 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
            <div className="flex items-center justify-between mb-2">
              {stepIcons.map((step, index) => {
                const stepNumber = index + 1
                const isActive = stepNumber === currentStep
                const isCompleted = stepNumber < currentStep

                return (
                  <div key={index} className="flex items-center">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300",
                        isActive
                          ? `${step.color} text-white shadow-lg scale-110`
                          : isCompleted
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400",
                      )}
                    >
                      {isCompleted ? <Check size={14} /> : stepNumber}
                    </div>
                    {index < stepIcons.length - 1 && (
                      <div
                        className={cn(
                          "w-8 h-0.5 mx-2 transition-all duration-300",
                          stepNumber < currentStep ? "bg-emerald-500" : "bg-gray-200 dark:bg-gray-700",
                        )}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">{renderStepContent()}</div>

          {/* Footer */}
          <div className="p-4 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBackWithAnimation}
                  disabled={isAnimating}
                  className="flex-1 h-12 rounded-xl border-gray-300 dark:border-gray-600"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              )}
              <Button
                onClick={currentStep === 4 ? handleConfirm : handleNextWithAnimation}
                disabled={!isStepValid() || isAnimating}
                className={cn(
                  "h-12 rounded-xl text-white font-medium shadow-lg transition-all duration-300",
                  currentStep === 1 ? "flex-1" : "flex-1",
                  stepIcons[currentStep - 1].color,
                  "hover:shadow-xl hover:scale-105",
                )}
              >
                {currentStep === 4 ? "Confirmar Agendamento" : "Continuar"}
                {currentStep !== 4 && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  // Desktop Layout (Dialog)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 border-0 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl">
        <div className="flex h-full">
          {/* Left Sidebar - Progress & Navigation */}
          <div className="w-80 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-r border-gray-200 dark:border-gray-700 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Novo Agendamento</h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress Steps */}
            <div className="space-y-4 mb-8">
              {stepIcons.map((step, index) => {
                const stepNumber = index + 1
                const isActive = stepNumber === currentStep
                const isCompleted = stepNumber < currentStep
                const IconComponent = step.icon

                return (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-4 p-3 rounded-xl transition-all duration-300",
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                        : isCompleted
                          ? "bg-emerald-50 dark:bg-emerald-900/20"
                          : "opacity-50",
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md transition-all duration-300",
                        isActive
                          ? `${step.color} shadow-lg scale-110`
                          : isCompleted
                            ? "bg-emerald-500"
                            : "bg-gray-300 dark:bg-gray-600",
                      )}
                    >
                      {isCompleted ? <Check size={18} /> : <IconComponent size={18} />}
                    </div>
                    <div>
                      <p
                        className={cn(
                          "font-medium",
                          isActive ? "text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300",
                        )}
                      >
                        {step.label}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {isCompleted ? "Concluído" : isActive ? "Em andamento" : "Pendente"}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={currentStep === 4 ? handleConfirm : handleNextWithAnimation}
                disabled={!isStepValid() || isAnimating}
                className={cn(
                  "w-full h-12 rounded-xl text-white font-medium shadow-lg transition-all duration-300",
                  stepIcons[currentStep - 1].color,
                  "hover:shadow-xl hover:scale-105",
                )}
              >
                {currentStep === 4 ? "Confirmar Agendamento" : "Continuar"}
                {currentStep !== 4 && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>

              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBackWithAnimation}
                  disabled={isAnimating}
                  className="w-full h-10 rounded-xl border-gray-300 dark:border-gray-600"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              )}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Content Header */}
            <div className="p-6 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg",
                    stepIcons[currentStep - 1].color,
                  )}
                >
                  {React.createElement(stepIcons[currentStep - 1].icon, { size: 24 })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{getStepTitle()}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{getStepQuestion()}</p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">{renderStepContent()}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
