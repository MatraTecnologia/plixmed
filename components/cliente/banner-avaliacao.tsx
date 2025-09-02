"use client"

import { useState, useEffect } from "react"
import { Star, X, ThumbsUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function BannerAvaliacao() {
  const [mostrarBanner, setMostrarBanner] = useState(false)
  const [avaliacao, setAvaliacao] = useState(0)
  const [comentario, setComentario] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Simular verificação se há consulta para avaliar
    const temConsultaParaAvaliar = true // Aqui viria a lógica real
    setMostrarBanner(temConsultaParaAvaliar)
  }, [])

  const handleAvaliar = async () => {
    if (avaliacao === 0) return

    setEnviando(true)

    // Simular envio da avaliação
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setEnviando(false)
    setMostrarBanner(false)

    // Aqui você faria a chamada real para a API
    console.log("Avaliação enviada:", { avaliacao, comentario })
  }

  const fecharBanner = () => {
    setMostrarBanner(false)
  }

  // Não renderizar até que o componente seja hidratado no cliente
  if (!isClient || !mostrarBanner) {
    return null
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg dark:from-blue-950 dark:to-purple-950 dark:border-blue-800">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500 rounded-full">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Como foi sua última consulta?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Consulta com Dr. João Silva em 10/12/2023</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Estrelas de avaliação */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sua avaliação:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((estrela) => (
                    <button
                      key={estrela}
                      onClick={() => setAvaliacao(estrela)}
                      className="transition-colors duration-200"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          estrela <= avaliacao ? "text-amber-400 fill-current" : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {avaliacao > 0 && <span className="text-sm text-gray-600 dark:text-gray-400">({avaliacao}/5)</span>}
              </div>

              {/* Comentário opcional */}
              {avaliacao > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Comentário (opcional):</label>
                  <Textarea
                    placeholder="Conte-nos sobre sua experiência..."
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white dark:bg-gray-800 dark:border-gray-600"
                  />
                </div>
              )}

              {/* Botões de ação */}
              <div className="flex gap-3">
                <Button
                  onClick={handleAvaliar}
                  disabled={avaliacao === 0 || enviando}
                  className="bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {enviando ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Enviar Avaliação
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={fecharBanner}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Avaliar depois
                </Button>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={fecharBanner}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
