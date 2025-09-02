"use client"

import { useState, useEffect } from "react"
import { addDays, startOfMonth, endOfMonth, eachDayOfInterval, format, isBefore } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { LandingPage } from "@/components/agendamento/landing-page"
import { ModalAgendamentoNovo } from "@/components/agendamento/modal-agendamento-novo"
import type { MedicoInfo, Profissional, Servico } from "@/types/agendamento"
import "@/styles/agendamento.css"

// Simulação de dados reais de agendamentos existentes
const agendamentosExistentes = [
  { data: "2024-12-16", horarios: ["09:00", "10:00", "14:00", "15:00"] },
  { data: "2024-12-17", horarios: ["08:00", "11:00", "16:00"] },
  { data: "2024-12-18", horarios: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
  { data: "2024-12-19", horarios: ["08:00", "09:00", "15:00", "17:00"] },
  { data: "2024-12-20", horarios: ["10:00", "11:00", "14:00"] },
  { data: "2024-12-23", horarios: ["09:00", "14:00", "15:00", "16:00"] },
  { data: "2024-12-24", horarios: [] },
  { data: "2024-12-25", horarios: [] },
  { data: "2024-12-26", horarios: ["14:00", "15:00"] },
  { data: "2024-12-30", horarios: ["09:00", "10:00"] },
  { data: "2024-12-31", horarios: [] },
]

// Horários de funcionamento padrão
const horariosFuncionamento = {
  segunda: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
  terca: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
  quarta: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
  quinta: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
  sexta: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
  sabado: ["08:00", "09:00", "10:00", "11:00"],
  domingo: [],
}

export default function AgendamentoPublico({ params }: { params: { medicoId: string } }) {
  const { toast } = useToast()
  const [showAgendamento, setShowAgendamento] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null)
  const [selectedProfissional, setSelectedProfissional] = useState<Profissional | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isLogin, setIsLogin] = useState(false)
  const [modalidade, setModalidade] = useState<"presencial" | "online">("presencial")
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([])

  // Dados do profissional/clínica
  const medicoInfo: MedicoInfo = {
    id: params.medicoId,
    nome: "Dra. Valéria Leal",
    especialidade: "Fonoaudióloga",
    crm: "CRFa 2-12345",
    foto: "/placeholder.svg?height=120&width=120&text=Dra.Valéria",
    endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
    telefone: "(11) 99999-9999",
    email: "contato@dravalerial.com.br",
    whatsapp: "5511999999999",
    instagram: "@dravalerial",
  }

  const servicos: Servico[] = [
    {
      id: "1",
      nome: "Consulta Fonoaudiológica",
      descricao:
        "Avaliação completa da comunicação, voz e deglutição. Inclui orientações e plano terapêutico personalizado.",
      preco: 380,
      duracao: 60,
      icone: "/placeholder.svg?height=40&width=40&text=🗣️",
    },
    {
      id: "2",
      nome: "Terapia da Fala",
      descricao: "Sessão de terapia fonoaudiológica para reabilitação da fala, voz e linguagem.",
      preco: 280,
      duracao: 45,
      icone: "/placeholder.svg?height=40&width=40&text=🎯",
    },
    {
      id: "3",
      nome: "Avaliação de Voz",
      descricao: "Análise completa da qualidade vocal, com orientações para profissionais da voz.",
      preco: 450,
      duracao: 90,
      icone: "/placeholder.svg?height=40&width=40&text=🎤",
    },
    {
      id: "4",
      nome: "Laserterapia",
      descricao: "Tratamento com laser de baixa potência para reabilitação vocal e deglutição.",
      preco: 200,
      duracao: 30,
      icone: "/placeholder.svg?height=40&width=40&text=⚡",
    },
  ]

  const profissionais: Profissional[] = [
    {
      id: "1",
      nome: "Dra. Valéria Leal",
      especialidade: "Fonoaudióloga",
      foto: "/placeholder.svg?height=60&width=60&text=VL",
    },
  ]

  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    telefone: "",
    email: "",
    senha: "",
  })

  // Função para verificar se um dia tem horários disponíveis
  const temHorariosDisponiveis = (date: Date): boolean => {
    const dateStr = format(date, "yyyy-MM-dd")
    const dayOfWeek = date.getDay()
    const dayNames = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"]
    const dayName = dayNames[dayOfWeek] as keyof typeof horariosFuncionamento

    const horariosDodia = horariosFuncionamento[dayName]
    if (horariosDodia.length === 0) return false

    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    if (isBefore(date, hoje)) return false

    const agendamentoDoDia = agendamentosExistentes.find((ag) => ag.data === dateStr)
    const horariosOcupados = agendamentoDoDia?.horarios || []

    return horariosDodia.some((horario) => !horariosOcupados.includes(horario))
  }

  // Função para obter horários disponíveis de uma data específica
  const obterHorariosDisponiveis = (date: Date): string[] => {
    const dateStr = format(date, "yyyy-MM-dd")
    const dayOfWeek = date.getDay()
    const dayNames = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"]
    const dayName = dayNames[dayOfWeek] as keyof typeof horariosFuncionamento

    const horariosDodia = horariosFuncionamento[dayName]
    if (horariosDodia.length === 0) return []

    const agendamentoDoDia = agendamentosExistentes.find((ag) => ag.data === dateStr)
    const horariosOcupados = agendamentoDoDia?.horarios || []

    return horariosDodia.filter((horario) => !horariosOcupados.includes(horario))
  }

  // Atualiza horários disponíveis quando uma data é selecionada
  useEffect(() => {
    if (selectedDate) {
      const horarios = obterHorariosDisponiveis(selectedDate)
      setHorariosDisponiveis(horarios)
      if (selectedTime && !horarios.includes(selectedTime)) {
        setSelectedTime("")
      }
    }
  }, [selectedDate, selectedTime])

  // Gerar dias do calendário
  const generateCalendarDays = () => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    const days = eachDayOfInterval({ start, end })

    const startWeekday = start.getDay()
    const previousMonthDays = []
    for (let i = startWeekday - 1; i >= 0; i--) {
      previousMonthDays.push(addDays(start, -i - 1))
    }

    const endWeekday = end.getDay()
    const nextMonthDays = []
    for (let i = 1; i <= 6 - endWeekday; i++) {
      nextMonthDays.push(addDays(end, i))
    }

    return [...previousMonthDays, ...days, ...nextMonthDays]
  }

  const calendarDays = generateCalendarDays()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleConfirm = async () => {
    toast({
      title: "🎉 Agendamento confirmado com sucesso!",
      description: `Seu agendamento para ${format(selectedDate!, "dd/MM/yyyy")} às ${selectedTime} foi confirmado. Você receberá uma confirmação por WhatsApp em breve.`,
    })

    const dateStr = format(selectedDate!, "yyyy-MM-dd")
    const agendamentoExistente = agendamentosExistentes.find((ag) => ag.data === dateStr)
    if (agendamentoExistente) {
      agendamentoExistente.horarios.push(selectedTime)
    } else {
      agendamentosExistentes.push({
        data: dateStr,
        horarios: [selectedTime],
      })
    }

    // Reset do formulário
    setShowAgendamento(false)
    setCurrentStep(1)
    setSelectedServico(null)
    setSelectedProfissional(null)
    setSelectedDate(null)
    setSelectedTime("")
    setFormData({
      nome: "",
      sobrenome: "",
      telefone: "",
      email: "",
      senha: "",
    })
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return selectedServico !== null
      case 2:
        return selectedProfissional !== null
      case 3:
        return selectedDate !== null && selectedTime !== ""
      case 4:
        if (isLogin) {
          return formData.telefone && formData.senha
        } else {
          return formData.nome && formData.sobrenome && formData.telefone
        }
      default:
        return false
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Escolha um serviço"
      case 2:
        return "Escolha um profissional"
      case 3:
        return "Escolha uma data e horário"
      case 4:
        return "Seus dados para contato"
      default:
        return ""
    }
  }

  const getStepQuestion = () => {
    switch (currentStep) {
      case 1:
        return "Qual serviço você gostaria de agendar?"
      case 2:
        return "Com qual profissional você gostaria de ser atendido?"
      case 3:
        return "Quando você gostaria de ser atendido?"
      case 4:
        return "Para finalizar, precisamos de seus dados para confirmação"
      default:
        return ""
    }
  }

  const getStepIcon = () => {
    switch (currentStep) {
      case 1:
        return "🩺"
      case 2:
        return "👩‍⚕️"
      case 3:
        return "📅"
      case 4:
        return "📝"
      default:
        return ""
    }
  }

  return (
    <>
      <LandingPage medicoInfo={medicoInfo} onAgendar={() => setShowAgendamento(true)} />

      <ModalAgendamentoNovo
        open={showAgendamento}
        onOpenChange={setShowAgendamento}
        currentStep={currentStep}
        servicos={servicos}
        profissionais={profissionais}
        selectedServico={selectedServico}
        setSelectedServico={setSelectedServico}
        selectedProfissional={selectedProfissional}
        setSelectedProfissional={setSelectedProfissional}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        calendarDays={calendarDays}
        horariosDisponiveis={horariosDisponiveis}
        formData={formData}
        setFormData={setFormData}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        modalidade={modalidade}
        setModalidade={setModalidade}
        formatCurrency={formatCurrency}
        handleBack={handleBack}
        handleNext={handleNext}
        handleConfirm={handleConfirm}
        isStepValid={isStepValid}
        getStepTitle={getStepTitle}
        getStepQuestion={getStepQuestion}
        getStepIcon={getStepIcon}
        temHorariosDisponiveis={temHorariosDisponiveis}
      />
    </>
  )
}
