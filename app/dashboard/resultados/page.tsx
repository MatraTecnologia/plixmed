import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { NovoResultadoDialog } from "@/components/dialogs/novo-resultado-dialog"

export default function ResultadosPage() {
  // Dados simulados de resultados
  const resultados = [
    {
      id: 1,
      paciente: "Maria Silva",
      tipo: "Hemograma",
      data: "10/05/2023",
      status: "Disponível",
    },
    {
      id: 2,
      paciente: "João Pereira",
      tipo: "Raio-X",
      data: "08/05/2023",
      status: "Disponível",
    },
    {
      id: 3,
      paciente: "Ana Souza",
      tipo: "Eletrocardiograma",
      data: "05/05/2023",
      status: "Pendente",
    },
    {
      id: 4,
      paciente: "Carlos Oliveira",
      tipo: "Tomografia",
      data: "03/05/2023",
      status: "Disponível",
    },
    {
      id: 5,
      paciente: "Lúcia Santos",
      tipo: "Ultrassonografia",
      data: "01/05/2023",
      status: "Pendente",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Resultados</h2>
        <NovoResultadoDialog />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Resultados de Exames</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar resultados..." className="pl-8" />
            </div>
            <Select defaultValue="todos">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="disponivel">Disponível</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Tipo de Exame</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resultados.map((resultado) => (
                  <TableRow key={resultado.id}>
                    <TableCell className="font-medium">{resultado.paciente}</TableCell>
                    <TableCell>{resultado.tipo}</TableCell>
                    <TableCell>{resultado.data}</TableCell>
                    <TableCell>
                      <Badge variant={resultado.status === "Disponível" ? "default" : "outline"}>
                        {resultado.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Visualizar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
