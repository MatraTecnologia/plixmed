"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  CheckCircle,
  MapPin,
  MessageCircle,
  Instagram,
  User,
  Star,
  Clock,
  Shield,
  Heart,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { MedicoInfo } from "@/types/agendamento"

interface LandingPageProps {
  medicoInfo: MedicoInfo
  onAgendar: () => void
}

export function LandingPage({ medicoInfo, onAgendar }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300/15 rounded-full blur-lg"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-blue-100/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-blue-200/20 rounded-full blur-xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Plixmed</h1>
                <p className="text-sm text-blue-600">Agendamento Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/cliente/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Área do Cliente
              </Link>
              <Link
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Painel Profissional
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8 relative z-20">
            {/* Doctor Profile */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg relative z-20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-blue-200 shadow-lg">
                      <Image
                        src={medicoInfo.foto || "/placeholder.svg?height=80&width=80&text=Dr"}
                        alt={medicoInfo.nome}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{medicoInfo.nome}</h2>
                    <p className="text-blue-600 font-medium">{medicoInfo.especialidade}</p>
                    <p className="text-sm text-gray-500">{medicoInfo.crm}</p>
                    <div className="flex items-center space-x-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">4.9 (127 avaliações)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Title */}
            <div className="space-y-6 relative z-20">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Agende sua
                <br />
                <span className="text-blue-600 relative">
                  consulta
                  <svg
                    className="absolute -bottom-3 left-0 w-full h-4"
                    viewBox="0 0 300 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 13C75 3 150 3 297 13" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
                <br />
                online
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Escolha o melhor horário para você de forma rápida e segura. Atendimento humanizado e tecnologia de
                ponta.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 relative z-20">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2.5k+</div>
                <div className="text-sm text-gray-600">Pacientes Atendidos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">4.9</div>
                <div className="text-sm text-gray-600">Avaliação Média</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-600">Anos de Experiência</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 relative z-20">
              <Button
                onClick={onAgendar}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Consulta
              </Button>
              <Button
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 bg-white/80"
              >
                <User className="w-5 h-5 mr-2" />
                Área do Cliente
              </Button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative min-h-[500px] lg:min-h-[600px]">
            <div className="relative z-20">
              {/* Main Calendar Card */}
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-1 transition-transform duration-500 relative z-30">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-blue-400/30 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="h-4 bg-blue-400/40 rounded-full mb-2"></div>
                    <div className="h-3 bg-blue-400/30 rounded-full w-3/4"></div>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {[...Array(21)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-8 rounded-lg ${i === 10 ? "bg-white/30" : i === 15 ? "bg-blue-400/40" : "bg-blue-400/20"}`}
                    ></div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Dezembro 2024</span>
                  <Badge className="bg-white/20 text-white">12 disponíveis</Badge>
                </div>
              </Card>

              {/* Floating Cards - Ajustados para não sobrepor */}
              <Card className="absolute top-4 right-4 bg-white p-4 rounded-2xl shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-300 z-40 max-w-[200px]">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Hoje, 14:30</div>
                    <div className="text-xs text-green-600 flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Confirmado
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="absolute top-32 right-0 bg-white p-4 rounded-2xl shadow-xl transform rotate-12 hover:rotate-6 transition-transform duration-300 z-40 max-w-[200px]">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Amanhã, 10:00</div>
                    <div className="text-xs text-blue-600 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Agendado
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="absolute bottom-16 left-0 bg-white p-4 rounded-2xl shadow-xl transform -rotate-12 hover:-rotate-6 transition-transform duration-300 z-40 max-w-[200px]">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">100% Seguro</div>
                    <div className="text-xs text-gray-600">Dados protegidos</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Background Decorations - Reduzidas */}
            <div className="absolute inset-0 z-10">
              <div className="absolute top-8 right-8 w-20 h-20 bg-blue-200/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-12 left-12 w-24 h-24 bg-blue-300/15 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-400/20 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 relative z-20">
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Agendamento Rápido</h3>
              <p className="text-gray-600">Agende em menos de 2 minutos, escolha o melhor horário para você.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dados Seguros</h3>
              <p className="text-gray-600">Seus dados pessoais e médicos protegidos com criptografia avançada.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Suporte 24/7</h3>
              <p className="text-gray-600">Atendimento disponível a qualquer hora para esclarecer suas dúvidas.</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-3xl shadow-2xl overflow-hidden relative z-20">
          <CardContent className="p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Entre em Contato</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Telefone</div>
                      <div className="text-blue-100">{medicoInfo.whatsapp || "(11) 99999-9999"}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">E-mail</div>
                      <div className="text-blue-100">contato@plixmed.com.br</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Endereço</div>
                      <div className="text-blue-100">{medicoInfo.endereco || "Rua das Flores, 123 - Centro"}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <h3 className="text-2xl font-bold mb-4">Redes Sociais</h3>
                <div className="flex justify-center lg:justify-end space-x-4">
                  <a
                    href={`https://wa.me/${medicoInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-2xl flex items-center justify-center transition-colors shadow-lg hover:shadow-xl transform hover:scale-110 duration-300"
                  >
                    <MessageCircle className="w-7 h-7 text-white" />
                  </a>
                  <a
                    href={`https://instagram.com/${medicoInfo.instagram?.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-pink-500 hover:bg-pink-600 rounded-2xl flex items-center justify-center transition-colors shadow-lg hover:shadow-xl transform hover:scale-110 duration-300"
                  >
                    <Instagram className="w-7 h-7 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="relative z-20 bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">Plixmed</span>
          </div>
          <p className="text-gray-400 mb-4">Cuidando da sua saúde com tecnologia e humanização</p>
          <div className="text-sm text-gray-500">© 2024 Plixmed. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  )
}
