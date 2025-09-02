"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  Users,
  Award,
  Heart,
  CheckCircle,
  ArrowRight,
  Stethoscope,
  Shield,
  Zap,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AgendamentoPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const servicos = [
    {
      id: "1",
      nome: "Consulta Médica Geral",
      descricao: "Consulta completa com médico clínico geral para avaliação e diagnóstico",
      preco: 280,
      duracao: 45,
      icone: "🩺",
      popular: true,
    },
    {
      id: "2",
      nome: "Consulta Cardiológica",
      descricao: "Avaliação cardiovascular completa com eletrocardiograma",
      preco: 450,
      duracao: 60,
      icone: "❤️",
      popular: false,
    },
    {
      id: "3",
      nome: "Consulta Dermatológica",
      descricao: "Avaliação dermatológica e tratamento de problemas de pele",
      preco: 380,
      duracao: 30,
      icone: "✨",
      popular: false,
    },
    {
      id: "4",
      nome: "Exames Laboratoriais",
      descricao: "Coleta de sangue e exames laboratoriais diversos",
      preco: 150,
      duracao: 15,
      icone: "🔬",
      popular: true,
    },
  ]

  const profissionais = [
    {
      id: "1",
      nome: "Dr. Carlos Silva",
      especialidade: "Clínico Geral",
      crm: "CRM 12345-SP",
      rating: 4.9,
      avaliacoes: 127,
      foto: "/placeholder.svg?height=80&width=80&text=CS",
    },
    {
      id: "2",
      nome: "Dra. Ana Santos",
      especialidade: "Cardiologista",
      crm: "CRM 67890-SP",
      rating: 4.8,
      avaliacoes: 89,
      foto: "/placeholder.svg?height=80&width=80&text=AS",
    },
    {
      id: "3",
      nome: "Dr. Pedro Lima",
      especialidade: "Dermatologista",
      crm: "CRM 54321-SP",
      rating: 4.9,
      avaliacoes: 156,
      foto: "/placeholder.svg?height=80&width=80&text=PL",
    },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-b border-blue-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Plixmed</h1>
                <p className="text-xs text-blue-600 dark:text-blue-400">Cuidando da sua saúde</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  Entrar
                </Button>
              </Link>
              <Link href="/cliente/login">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Área do Cliente</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
              <Stethoscope className="w-4 h-4 mr-2" />
              Agendamento Online Disponível
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Agende sua{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                consulta médica
              </span>{" "}
              online
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Cuidados médicos de qualidade com profissionais especializados. Agende sua consulta de forma rápida e
              segura, no conforto da sua casa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Consulta
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                <Phone className="w-5 h-5 mr-2" />
                Falar com Atendente
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">2.5k+</div>
                <div className="text-gray-600 dark:text-gray-400">Pacientes Atendidos</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">4.9</div>
                <div className="text-gray-600 dark:text-gray-400">Avaliação Média</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">100%</div>
                <div className="text-gray-600 dark:text-gray-400">Seguro e Confiável</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Nossos Serviços</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Oferecemos uma ampla gama de serviços médicos com profissionais qualificados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicos.map((servico) => (
              <Card
                key={servico.id}
                className={`relative overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105 ${
                  selectedService === servico.id
                    ? "border-blue-500 shadow-lg shadow-blue-500/25"
                    : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                }`}
                onClick={() => setSelectedService(servico.id)}
              >
                {servico.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-blue-600 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}

                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{servico.icone}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{servico.nome}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{servico.descricao}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(servico.preco)}</div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {servico.duracao}min
                    </div>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Aqui você pode adicionar a lógica de agendamento
                    }}
                  >
                    Agendar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professionals Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Nossos Profissionais</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Equipe médica altamente qualificada e experiente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {profissionais.map((profissional) => (
              <Card
                key={profissional.id}
                className="text-center border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden ring-4 ring-blue-100 dark:ring-blue-900/30">
                      <Image
                        src={profissional.foto || "/placeholder.svg"}
                        alt={profissional.nome}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verificado
                      </Badge>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{profissional.nome}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">{profissional.especialidade}</p>
                  <p className="text-gray-500 text-sm mb-4">{profissional.crm}</p>

                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(profissional.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{profissional.rating}</span>
                    <span className="text-sm text-gray-500">({profissional.avaliacoes} avaliações)</span>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar com {profissional.nome.split(" ")[0]}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Por que escolher a Plixmed?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Tecnologia avançada e cuidado humanizado para sua saúde
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Agendamento Rápido</h3>
              <p className="text-blue-100">Agende sua consulta em poucos cliques, 24 horas por dia</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Segurança Total</h3>
              <p className="text-blue-100">Seus dados protegidos com criptografia de ponta</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Cuidado Personalizado</h3>
              <p className="text-blue-100">Atendimento humanizado focado nas suas necessidades</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Entre em Contato</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              Estamos aqui para cuidar da sua saúde. Fale conosco!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Telefone</h3>
                <p className="text-gray-600 dark:text-gray-400">(11) 99999-9999</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
                <p className="text-gray-600 dark:text-gray-400">contato@plixmed.com.br</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Endereço</h3>
                <p className="text-gray-600 dark:text-gray-400">Rua da Saúde, 123 - São Paulo</p>
              </div>
            </div>

            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 text-lg rounded-xl">
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Consulta Agora
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Plixmed</h3>
                <p className="text-sm text-gray-400">Cuidando da sua saúde</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">© 2024 Plixmed. Todos os direitos reservados.</p>
            <p className="text-sm text-gray-500">Plataforma médica segura e confiável para seus cuidados de saúde.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
