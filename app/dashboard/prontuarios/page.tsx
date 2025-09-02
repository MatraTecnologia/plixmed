"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, FileDigit } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NovoProntuarioDialog } from "@/components/dialogs/novo-prontuario-dialog"
import { toast } from "@/components/ui/use-toast"

export default function ProntuariosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)

  // Dados simulados de prontuários
  const prontuarios = [
    {
      id: "1",
      paciente: "Maria Silva",
      dataNascimento: "15/03/1985",
      ultimaConsulta: "12/05/2023",
      medico: "Dr. João Silva",
      status: "Completo",
    },
    {
      id: "2",
      paciente: "João Pereira",
      dataNascimento: "22/07/1978",
      ultimaConsulta: "10/05/2023",
      medico: "Dra. Ana Oliveira",
      status: "Pendente",
    },
    {
      id: "3",
      paciente: "Ana Souza",
      dataNascimento: "10/11/1990",
      ultimaConsulta: "05/05/2023",
      medico: "Dr. João Silva",
      status: "Completo",
    },
    {
      id: "4",
      paciente: "Carlos Oliveira",
      dataNascimento: "05/06/1965",
      ultimaConsulta: "28/04/2023",
      medico: "Dra. Ana Oliveira",
      status: "Arquivado",
    },
    {
      id: "5",
      paciente: "Lúcia Santos",
      dataNascimento: "30/12/1982",
      ultimaConsulta: "25/04/2023",
      medico: "Dr. João Silva",
      status: "Completo",
    },
    {
      id: "6",
      paciente: "Roberto Almeida",
      dataNascimento: "18/09/1970",
      ultimaConsulta: "20/04/2023",
      medico: "Dra. Ana Oliveira",
      status: "Pendente",
    },
  ]

  // Filtrar prontuários com base no termo de pesquisa
  const filteredProntuarios = prontuarios.filter((prontuario) =>
    prontuario.paciente.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completo":
        return <Badge variant="default">{status}</Badge>
      case "Pendente":
        return <Badge variant="outline">{status}</Badge>
      case "Arquivado":
        return <Badge variant="secondary">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleArquivar = (id: string) => {
    toast({
      title: "Prontuário arquivado",
      description: `O prontuário foi arquivado com sucesso.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Prontuários</h2>
        <NovoProntuarioDialog />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <FileDigit className="mr-2 h-5 w-5" />
            Prontuários Eletrônicos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ativos" className="w-full">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <TabsList className="mb-0">
                <TabsTrigger value="ativos">Ativos</TabsTrigger>
                <TabsTrigger value="arquivados">Arquivados</TabsTrigger>
                <TabsTrigger value="todos">Todos</TabsTrigger>
              </TabsList>

              <div className="flex flex-1 items-center gap-2 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar prontuários..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setFilterOpen(!filterOpen)}
                  className={filterOpen ? "bg-muted" : ""}
                >
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filtrar</span>
                </Button>
              </div>
            </div>

            {filterOpen && (
              <div className="bg-muted/50 p-4 rounded-md mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="filter-medico">Médico</Label>
                  <Select>
                    <SelectTrigger id="filter-medico">
                      <SelectValue placeholder="Todos os médicos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os médicos</SelectItem>
                      <SelectItem value="dr-joao-silva">Dr. João Silva</SelectItem>
                      <SelectItem value="dra-ana-oliveira">Dra. Ana Oliveira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="filter-status">Status</Label>
                  <Select>
                    <SelectTrigger id="filter-status">
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os status</SelectItem>
                      <SelectItem value="completo">Completo</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="arquivado">Arquivado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="filter-data">Data</Label>
                  <Select>
                    <SelectTrigger id="filter-data">
                      <SelectValue placeholder="Qualquer data" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="qualquer">Qualquer data</SelectItem>
                      <SelectItem value="hoje">Hoje</SelectItem>
                      <SelectItem value="semana">Esta semana</SelectItem>
                      <SelectItem value="mes">Este mês</SelectItem>
                      <SelectItem value="ano">Este ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <Button variant="outline" size="sm" className="mr-2">
                    Limpar
                  </Button>
                  <Button size="sm">Aplicar Filtros</Button>
                </div>
              </div>
            )}

            <TabsContent value="ativos" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Data de Nascimento</TableHead>
                      <TableHead>Última Consulta</TableHead>
                      <TableHead>Médico</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProntuarios
                      .filter((prontuario) => prontuario.status !== "Arquivado")
                      .map((prontuario) => (
                        <TableRow key={prontuario.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={`/abstract-geometric-shapes.png?height=32&width=32&query=${prontuario.paciente}`}
                                  alt={prontuario.paciente}
                                />
                                <AvatarFallback>
                                  {prontuario.paciente
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{prontuario.paciente}</span>
                            </div>
                          </TableCell>
                          <TableCell>{prontuario.dataNascimento}</TableCell>
                          <TableCell>{prontuario.ultimaConsulta}</TableCell>
                          <TableCell>{prontuario.medico}</TableCell>
                          <TableCell>{getStatusBadge(prontuario.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/dashboard/prontuario/${prontuario.id}`}>Visualizar</Link>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleArquivar(prontuario.id)}>
                              Arquivar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="arquivados" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Data de Nascimento</TableHead>
                      <TableHead>Última Consulta</TableHead>
                      <TableHead>Médico</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProntuarios
                      .filter((prontuario) => prontuario.status === "Arquivado")
                      .map((prontuario) => (
                        <TableRow key={prontuario.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={`/abstract-geometric-shapes.png?height=32&width=32&query=${prontuario.paciente}`}
                                  alt={prontuario.paciente}
                                />
                                <AvatarFallback>
                                  {prontuario.paciente
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{prontuario.paciente}</span>
                            </div>
                          </TableCell>
                          <TableCell>{prontuario.dataNascimento}</TableCell>
                          <TableCell>{prontuario.ultimaConsulta}</TableCell>
                          <TableCell>{prontuario.medico}</TableCell>
                          <TableCell>{getStatusBadge(prontuario.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/dashboard/prontuario/${prontuario.id}`}>Visualizar</Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Prontuário restaurado",
                                  description: `O prontuário foi restaurado com sucesso.`,
                                })
                              }}
                            >
                              Restaurar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="todos" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Data de Nascimento</TableHead>
                      <TableHead>Última Consulta</TableHead>
                      <TableHead>Médico</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProntuarios.map((prontuario) => (
                      <TableRow key={prontuario.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={`/abstract-geometric-shapes.png?height=32&width=32&query=${prontuario.paciente}`}
                                alt={prontuario.paciente}
                              />
                              <AvatarFallback>
                                {prontuario.paciente
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{prontuario.paciente}</span>
                          </div>
                        </TableCell>
                        <TableCell>{prontuario.dataNascimento}</TableCell>
                        <TableCell>{prontuario.ultimaConsulta}</TableCell>
                        <TableCell>{prontuario.medico}</TableCell>
                        <TableCell>{getStatusBadge(prontuario.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/prontuario/${prontuario.id}`}>Visualizar</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
