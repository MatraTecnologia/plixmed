export interface MedicoInfo {
  id: string
  nome: string
  especialidade: string
  crm: string
  foto?: string
  endereco: string
  telefone: string
  email: string
  whatsapp: string
  instagram: string
}

export interface Servico {
  id: string
  nome: string
  descricao: string
  preco: number
  duracao: number
  icone: string
}

export interface Profissional {
  id: string
  nome: string
  especialidade: string
  foto: string
}
