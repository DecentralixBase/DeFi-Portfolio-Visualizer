import { ethers } from 'ethers'
import { Portfolio, Token, Chain, TokenType } from './types'

// Mock data for demonstration
const MOCK_TOKENS = {
  "vitalik.eth": {
    address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    totalValue: 845000,
    tokens: [
      {
        symbol: "ETH",
        name: "Ethereum",
        address: "0x0000000000000000000000000000000000000000",
        balance: "420.5",
        price: 1800,
        value: 756900,
        chain: Chain.Ethereum,
        type: TokenType.Native
      },
      {
        symbol: "USDC",
        name: "USD Coin",
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        balance: "50000",
        price: 1,
        value: 50000,
        chain: Chain.Ethereum,
        type: TokenType.Stablecoin
      },
      {
        symbol: "aWETH",
        name: "Aave WETH",
        address: "0x030ba81f1c18d280636f32af80b9aad02cf0854e",
        balance: "15.5",
        price: 1800,
        value: 27900,
        chain: Chain.Ethereum,
        protocol: "Aave",
        type: TokenType.Lending,
        apy: 3.2
      },
      {
        symbol: "MATIC",
        name: "Polygon",
        address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
        balance: "25000",
        price: 0.8,
        value: 20000,
        chain: Chain.Polygon,
        type: TokenType.Native
      }
    ]
  },
  "default": {
    address: "",
    totalValue: 125000,
    tokens: [
      {
        symbol: "ETH",
        name: "Ethereum",
        address: "0x0000000000000000000000000000000000000000",
        balance: "32.5",
        price: 2500,
        value: 81250,
        chain: Chain.Ethereum,
        type: TokenType.Native
      },
      {
        symbol: "USDC",
        name: "USD Coin",
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        balance: "25000",
        price: 1,
        value: 25000,
        chain: Chain.Ethereum,
        type: TokenType.Stablecoin
      },
      {
        symbol: "aWETH",
        name: "Aave WETH",
        address: "0x030ba81f1c18d280636f32af80b9aad02cf0854e",
        balance: "5.5",
        price: 2500,
        value: 13750,
        chain: Chain.Ethereum,
        protocol: "Aave",
        type: TokenType.Lending,
        apy: 3.5
      }
    ]
  }
}

export async function resolveAddress(addressOrENS: string): Promise<string> {
  // For demo, we'll just check if it's vitalik.eth
  if (addressOrENS.toLowerCase() === 'vitalik.eth') {
    return MOCK_TOKENS['vitalik.eth'].address
  }
  return addressOrENS
}

export async function fetchPortfolioData(address: string): Promise<Portfolio> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Get mock data based on address
  const mockData = address === MOCK_TOKENS['vitalik.eth'].address
    ? MOCK_TOKENS['vitalik.eth']
    : MOCK_TOKENS['default']

  // Calculate breakdowns
  const protocolBreakdown = calculateProtocolBreakdown(mockData.tokens)
  const chainBreakdown = calculateChainBreakdown(mockData.tokens)
  const typeBreakdown = calculateTypeBreakdown(mockData.tokens)

  return {
    address,
    totalValue: mockData.totalValue,
    tokens: mockData.tokens,
    protocolBreakdown,
    chainBreakdown,
    typeBreakdown,
    topPerformers: getTopPerformers(mockData.tokens),
    hiddenGems: getHiddenGems(mockData.tokens),
    riskScore: calculateRiskScore(mockData.tokens),
    change24h: generateRandom24hChange()
  }
}

function calculateProtocolBreakdown(tokens: Token[]): { protocol: string; value: number; percentage: number }[] {
  const protocols = new Map<string, number>()
  let total = 0

  tokens.forEach(token => {
    const protocol = token.protocol || 'Native'
    const current = protocols.get(protocol) || 0
    protocols.set(protocol, current + token.value)
    total += token.value
  })

  return Array.from(protocols.entries()).map(([protocol, value]) => ({
    protocol,
    value,
    percentage: (value / total) * 100
  }))
}

function calculateChainBreakdown(tokens: Token[]): { chain: Chain; value: number; percentage: number }[] {
  const chains = new Map<Chain, number>()
  let total = 0

  tokens.forEach(token => {
    const current = chains.get(token.chain) || 0
    chains.set(token.chain, current + token.value)
    total += token.value
  })

  return Array.from(chains.entries()).map(([chain, value]) => ({
    chain,
    value,
    percentage: (value / total) * 100
  }))
}

function calculateTypeBreakdown(tokens: Token[]): { type: TokenType; value: number; percentage: number }[] {
  const types = new Map<TokenType, number>()
  let total = 0

  tokens.forEach(token => {
    const current = types.get(token.type) || 0
    types.set(token.type, current + token.value)
    total += token.value
  })

  return Array.from(types.entries()).map(([type, value]) => ({
    type,
    value,
    percentage: (value / total) * 100
  }))
}

function getTopPerformers(tokens: Token[]): Token[] {
  return tokens
    .filter(token => token.value > 10000)
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
}

function getHiddenGems(tokens: Token[]): Token[] {
  return tokens
    .filter(token => token.price < 10 && (token.apy || 0) > 5)
    .slice(0, 3)
}

function calculateRiskScore(tokens: Token[]): number {
  // Simple risk score based on stablecoin ratio
  const totalValue = tokens.reduce((sum, token) => sum + token.value, 0)
  const stableValue = tokens
    .filter(token => token.type === TokenType.Stablecoin)
    .reduce((sum, token) => sum + token.value, 0)
  
  const stableRatio = stableValue / totalValue
  return Math.round((1 - stableRatio) * 100)
}

function generateRandom24hChange(): number {
  return Number((Math.random() * 10 - 5).toFixed(2))
}

export function getSearchHistory(): string[] {
  if (typeof window === 'undefined') return []
  const history = localStorage.getItem('searchHistory')
  return history ? JSON.parse(history) : []
}

export function addToSearchHistory(address: string): void {
  if (typeof window === 'undefined') return
  const history = getSearchHistory()
  const newHistory = [address, ...history.filter(a => a !== address)].slice(0, 5)
  localStorage.setItem('searchHistory', JSON.stringify(newHistory))
} 