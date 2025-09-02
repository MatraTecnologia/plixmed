"use client"

import { useParams } from "next/navigation"
import { ProntuarioForm } from "@/components/prontuario/prontuario-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProntuarioPage() {
  const params = useParams()
  const pacienteId = params.id as string

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/pacientes">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Prontuário Eletrônico</h2>
        </div>
      </div>

      <ProntuarioForm pacienteId={pacienteId} />
    </div>
  )
}
