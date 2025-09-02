"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import { Heart, Key, Shield, CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ClienteLoginPage() {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validação básica do token
    if (!token.trim()) {
      setError("Por favor, insira seu token de acesso")
      setIsLoading(false)
      return
    }

    if (token.length < 8) {
      setError("Token deve ter pelo menos 8 caracteres")
      setIsLoading(false)
      return
    }

    // Simular validação do token
    setTimeout(() => {
      // Tokens válidos simulados
      const validTokens = ["PLIXMED2024", "CLIENTE123", "ACCESS2024", "PORTAL123"]

      if (validTokens.includes(token.toUpperCase())) {
        // Token válido - redirecionar para dashboard
        router.push("/cliente")
      } else {
        setError("Token inválido. Verifique e tente novamente.")
        setIsLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo e Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <Shield className="h-3 w-3 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PLIXMED
            </h1>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Portal do Cliente</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Acesse sua área pessoal com segurança</p>
          </div>
        </div>

        {/* Card de Login */}
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/10">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="flex items-center justify-center gap-2 text-gray-900 dark:text-white">
              <Key className="h-5 w-5 text-blue-600" />
              Acesso Seguro
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Digite seu token de acesso para entrar na plataforma
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <AlertDescription className="text-red-700 dark:text-red-300">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Label htmlFor="token" className="text-gray-700 dark:text-gray-300 font-medium">
                  Token de Acesso
                </Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="token"
                    type="text"
                    placeholder="Digite seu token..."
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white dark:bg-gray-800 dark:border-gray-700 text-center font-mono tracking-wider"
                    required
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Seu token foi enviado por email ou fornecido pela clínica
                </p>
              </div>

              {/* Exemplos de tokens válidos (apenas para demonstração) */}
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 space-y-2">
                <p className="text-xs font-medium text-blue-700 dark:text-blue-300 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Tokens de exemplo para teste:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded border text-gray-700 dark:text-gray-300">
                    PLIXMED2024
                  </code>
                  <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded border text-gray-700 dark:text-gray-300">
                    CLIENTE123
                  </code>
                  <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded border text-gray-700 dark:text-gray-300">
                    ACCESS2024
                  </code>
                  <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded border text-gray-700 dark:text-gray-300">
                    PORTAL123
                  </code>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Validando token...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Acessar Portal
                  </div>
                )}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">Não possui um token de acesso?</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                  type="button"
                >
                  Solicitar acesso à clínica
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">Acesso seguro e criptografado</p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              SSL Seguro
            </span>
            <span>•</span>
            <span>Dados Protegidos</span>
            <span>•</span>
            <span>LGPD Compliant</span>
          </div>
        </div>
      </div>
    </div>
  )
}
