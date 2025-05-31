export interface Token {
  symbol: string
  name: string
  address: string
  balance: string
  price: number
  value: number
  chain: Chain
  protocol?: string
  type: TokenType
  apy?: number
}

export interface Portfolio {
  address: string
  totalValue: number
  tokens: Token[]
  protocolBreakdown: ProtocolBreakdown[]
  chainBreakdown: ChainBreakdown[]
  typeBreakdown: TypeBreakdown[]
  topPerformers: Token[]
  hiddenGems: Token[]
  riskScore: number
  change24h: number
}

export interface ProtocolBreakdown {
  protocol: string
  value: number
  percentage: number
}

export interface ChainBreakdown {
  chain: Chain
  value: number
  percentage: number
}

export interface TypeBreakdown {
  type: TokenType
  value: number
  percentage: number
}

export enum Chain {
  Ethereum = "ethereum",
  Polygon = "polygon",
  Arbitrum = "arbitrum",
  Optimism = "optimism"
}

export enum TokenType {
  Native = "native",
  ERC20 = "erc20",
  LP = "lp",
  Staked = "staked",
  Lending = "lending",
  Stablecoin = "stablecoin"
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string
    fill?: boolean
  }[]
}

export interface TimelineData {
  timestamp: number
  value: number
}

export interface SearchHistory {
  address: string
  timestamp: number
} 