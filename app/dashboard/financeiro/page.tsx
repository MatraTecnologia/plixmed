"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, DollarSign, Download, TrendingDown, TrendingUp, Calendar, Filter, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsCard } from "@/components/dashboard/stats-card"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import type { DateRange } from "react-day-picker"
import { NovaTransacaoDialog } from "@/components/dialogs/nova-transacao-dialog"
import { NovaContaReceberDialog } from "@/components/dialogs/nova-conta-receber-dialog"
import { NovaContaPagarDialog } from "@/components/dialogs/nova-conta-pagar-dialog"
import { DetalhesTransacaoDialog } from "@/components/dialogs/detalhes-transacao-dialog"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { subDays } from "date-fns"

export default function FinanceiroPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [activeFilter, setActiveFilter] = useState<"7dias" | "30dias" | "personalizado">("30dias")

  // Função para aplicar filtros rápidos
  const applyQuickFilter = (days: number) => {
    const to = new Date()
    const from = subDays(to, days)
    setDate({ from, to })
    setActiveFilter(days === 7 ? "7dias" : "30dias")
  }

  // Atualiza o filtro ativo quando o date range muda manualmente
  useEffect(() => {
    if (date?.from && date?.to) {
      const diffTime = Math.abs(date.to.getTime() - date.from.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 7) {
        setActiveFilter("7dias")
      } else if (diffDays === 30) {
        setActiveFilter("30dias")
      } else {
        setActiveFilter("personalizado")
      }
    }
  }, [date])

  // Dados simulados para o dashboard financeiro
  const statsData = [
    {
      title: "Receita Total",
      value: activeFilter === "7dias" ? "R$ 12.450,00" : "R$ 45.231,00",
      change: "+12% em relação ao período anterior",
      icon: DollarSign,
      trend: "up" as const,
    },
    {
      title: "Despesas",
      value: activeFilter === "7dias" ? "R$ 3.250,00" : "R$ 12.543,00",
      change: "-3% em relação ao período anterior",
      icon: TrendingDown,
      trend: "down" as const,
    },
    {
      title: "Lucro Líquido",
      value: activeFilter === "7dias" ? "R$ 9.200,00" : "R$ 32.688,00",
      change: "+18% em relação ao período anterior",
      icon: TrendingUp,
      trend: "up" as const,
    },
    {
      title: "Consultas Faturadas",
      value: activeFilter === "7dias" ? "52" : "187",
      change: "+5% em relação ao período anterior",
      icon: Calendar,
      trend: "up" as const,
    },
  ]

  // Dados simulados de transações
  const transacoes = [
    {
      id: "1",
      data: "15/05/2023",
      descricao: "Consulta - Maria Silva",
      categoria: "Consulta",
      valor: 250.0,
      status: "Pago",
      metodo: "Cartão de Crédito",
    },
    {
      id: "2",
      data: "14/05/2023",
      descricao: "Consulta - João Pereira",
      categoria: "Consulta",
      valor: 250.0,
      status: "Pago",
      metodo: "Dinheiro",
    },
    {
      id: "3",
      data: "14/05/2023",
      descricao: "Exame - Ana Souza",
      categoria: "Exame",
      valor: 350.0,
      status: "Pendente",
      metodo: "Convênio",
    },
    {
      id: "4",
      descricao: "Aluguel da Clínica",
      data: "10/05/2023",
      categoria: "Despesa Fixa",
      valor: -3500.0,
      status: "Pago",
      metodo: "Transferência",
    },
    {
      id: "5",
      data: "08/05/2023",
      descricao: "Salário - Recepcionista",
      categoria: "Folha de Pagamento",
      valor: -2200.0,
      status: "Pago",
      metodo: "Transferência",
    },
    {
      id: "6",
      data: "05/05/2023",
      descricao: "Consulta - Carlos Oliveira",
      categoria: "Consulta",
      valor: 250.0,
      status: "Pago",
      metodo: "Pix",
    },
    {
      id: "7",
      data: "03/05/2023",
      descricao: "Material de Escritório",
      categoria: "Despesa Variável",
      valor: -180.0,
      status: "Pago",
      metodo: "Cartão de Débito",
    },
  ]

  // Dados simulados de contas a receber
  const contasReceber = [
    {
      id: "1",
      paciente: "Ana Souza",
      descricao: "Exame Cardiológico",
      vencimento: "20/05/2023",
      valor: 350.0,
      status: "Pendente",
    },
    {
      id: "2",
      paciente: "Roberto Almeida",
      descricao: "Consulta de Retorno",
      vencimento: "25/05/2023",
      valor: 200.0,
      status: "Pendente",
    },
    {
      id: "3",
      paciente: "Lúcia Santos",
      descricao: "Exame de Sangue",
      vencimento: "18/05/2023",
      valor: 150.0,
      status: "Atrasado",
    },
  ]

  // Dados simulados de contas a pagar
  const contasPagar = [
    {
      id: "1",
      fornecedor: "Empresa de Energia",
      descricao: "Conta de Energia",
      vencimento: "20/05/2023",
      valor: 850.0,
      status: "Pendente",
    },
    {
      id: "2",
      fornecedor: "Empresa de Água",
      descricao: "Conta de Água",
      vencimento: "22/05/2023",
      valor: 320.0,
      status: "Pendente",
    },
    {
      id: "3",
      fornecedor: "Fornecedor de Material",
      descricao: "Material Médico",
      vencimento: "15/05/2023",
      valor: 1200.0,
      status: "Atrasado",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pago":
        return <Badge variant="default">{status}</Badge>
      case "Pendente":
        return <Badge variant="outline">{status}</Badge>
      case "Atrasado":
        return <Badge variant="destructive">{status}</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "Os dados estão sendo exportados. O download começará em breve.",
    })
  }

  const handleReceberConta = (id: string) => {
    toast({
      title: "Conta recebida",
      description: "A conta foi marcada como recebida com sucesso.",
    })
  }

  const handlePagarConta = (id: string) => {
    toast({
      title: "Conta paga",
      description: "A conta foi marcada como paga com sucesso.",
    })
  }

  // Filtrar transações com base no termo de pesquisa
  const filteredTransacoes = transacoes.filter((transacao) =>
    transacao.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Ordenar transações por valor
  const sortedTransacoes = [...filteredTransacoes].sort((a, b) => {
    if (sortDirection === "asc") {
      return a.valor - b.valor
    } else {
      return b.valor - a.valor
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Financeiro</h2>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant={activeFilter === "7dias" ? "default" : "outline"}
              size="sm"
              onClick={() => applyQuickFilter(7)}
            >
              <Calendar className="mr-2 h-4 w-4" />7 dias
            </Button>
            <Button
              variant={activeFilter === "30dias" ? "default" : "outline"}
              size="sm"
              onClick={() => applyQuickFilter(30)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              30 dias
            </Button>
          </div>
          <DatePickerWithRange date={date} setDate={setDate} />
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Gestão Financeira
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transacoes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="transacoes">Transações</TabsTrigger>
              <TabsTrigger value="receber">Contas a Receber</TabsTrigger>
              <TabsTrigger value="pagar">Contas a Pagar</TabsTrigger>
            </TabsList>

            <TabsContent value="transacoes" className="m-0">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 w-full max-w-md">
                  <Input
                    type="search"
                    placeholder="Buscar transações..."
                    className="flex-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
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
                <NovaTransacaoDialog />
              </div>

              {filterOpen && (
                <div className="bg-muted/50 p-4 rounded-md mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="filter-categoria">Categoria</Label>
                    <Select>
                      <SelectTrigger id="filter-categoria">
                        <SelectValue placeholder="Todas as categorias" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todas as categorias</SelectItem>
                        <SelectItem value="consulta">Consulta</SelectItem>
                        <SelectItem value="exame">Exame</SelectItem>
                        <SelectItem value="despesa-fixa">Despesa Fixa</SelectItem>
                        <SelectItem value="folha-pagamento">Folha de Pagamento</SelectItem>
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
                        <SelectItem value="pago">Pago</SelectItem>
                        <SelectItem value="pendente">Pendente</SelectItem>
                        <SelectItem value="atrasado">Atrasado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="filter-tipo">Tipo</Label>
                    <Select>
                      <SelectTrigger id="filter-tipo">
                        <SelectValue placeholder="Todos os tipos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos os tipos</SelectItem>
                        <SelectItem value="receita">Receita</SelectItem>
                        <SelectItem value="despesa">Despesa</SelectItem>
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

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={handleSort}>
                          Valor
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedTransacoes.map((transacao) => (
                      <TableRow key={transacao.id}>
                        <TableCell>{transacao.data}</TableCell>
                        <TableCell className="font-medium">{transacao.descricao}</TableCell>
                        <TableCell>{transacao.categoria}</TableCell>
                        <TableCell
                          className={
                            transacao.valor < 0 ? "text-destructive font-medium" : "text-emerald-600 font-medium"
                          }
                        >
                          {transacao.valor.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                        <TableCell>{getStatusBadge(transacao.status)}</TableCell>
                        <TableCell>{transacao.metodo}</TableCell>
                        <TableCell className="text-right">
                          <DetalhesTransacaoDialog transacao={transacao} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="receber" className="m-0">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 w-full max-w-md">
                  <Input type="search" placeholder="Buscar contas a receber..." className="flex-1" />
                  <Select defaultValue="todos">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="atrasado">Atrasado</SelectItem>
                      <SelectItem value="pago">Pago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <NovaContaReceberDialog />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contasReceber.map((conta) => (
                      <TableRow key={conta.id}>
                        <TableCell className="font-medium">{conta.paciente}</TableCell>
                        <TableCell>{conta.descricao}</TableCell>
                        <TableCell>{conta.vencimento}</TableCell>
                        <TableCell className="text-emerald-600 font-medium">
                          {conta.valor.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                        <TableCell>{getStatusBadge(conta.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleReceberConta(conta.id)}>
                            Receber
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="pagar" className="m-0">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 w-full max-w-md">
                  <Input type="search" placeholder="Buscar contas a pagar..." className="flex-1" />
                  <Select defaultValue="todos">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="atrasado">Atrasado</SelectItem>
                      <SelectItem value="pago">Pago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <NovaContaPagarDialog />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contasPagar.map((conta) => (
                      <TableRow key={conta.id}>
                        <TableCell className="font-medium">{conta.fornecedor}</TableCell>
                        <TableCell>{conta.descricao}</TableCell>
                        <TableCell>{conta.vencimento}</TableCell>
                        <TableCell className="text-destructive font-medium">
                          {conta.valor.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                        <TableCell>{getStatusBadge(conta.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handlePagarConta(conta.id)}>
                            Pagar
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
