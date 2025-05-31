'use client'

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { resolveAddress, fetchPortfolioData, addToSearchHistory } from '@/lib/api'
import { Portfolio } from '@/lib/types'
import { formatUSD, formatAddress } from '@/lib/utils'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { PortfolioCharts } from '@/components/PortfolioCharts'
import { BatMode } from '@/components/BatMode'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'

export default function Home() {
  const [address, setAddress] = useState('')
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isBatMode, setIsBatMode] = useState(false)

  const toggleBatMode = useCallback(() => {
    setIsBatMode(prev => !prev)
  }, [])

  useKeyboardShortcut({
    'b': toggleBatMode,
    'escape': () => setIsBatMode(false)
  })

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const resolvedAddress = await resolveAddress(address)
      const data = await fetchPortfolioData(resolvedAddress)
      setPortfolio(data)
      addToSearchHistory(resolvedAddress)
    } catch (err) {
      setError('Failed to fetch portfolio data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-center neon-text mb-4">
            DeFi Portfolio Visualizer
          </h1>
          <p className="text-center text-gray-400 max-w-2xl mx-auto">
            Enter any Ethereum address or ENS name to visualize their DeFi portfolio
          </p>
          <p className="text-center text-gray-500 text-sm mt-2">
            Press 'B' to activate BATMODE
          </p>
        </motion.div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="glassmorphism p-2 flex gap-2">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address (0x...) or ENS"
              className="flex-1 bg-transparent border-none focus:outline-none text-white px-4 py-2"
            />
            <button
              type="submit"
              disabled={loading || !address}
              className={`px-6 py-2 rounded-lg bg-blue-600 text-white font-medium 
                hover:bg-blue-500 transition-colors disabled:opacity-50 
                disabled:cursor-not-allowed neon-glow`}
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>
          {error && (
            <p className="text-red-500 mt-2 text-center">{error}</p>
          )}
        </form>

        {/* Portfolio Display */}
        {portfolio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            {/* Portfolio Header */}
            <div className="glassmorphism p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">
                  Portfolio Overview
                </h2>
                <p className="text-gray-400">
                  {formatAddress(portfolio.address)}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-400 mb-1">Total Value</p>
                  <p className="text-3xl font-bold neon-text">
                    {formatUSD(portfolio.totalValue)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">24h Change</p>
                  <p className={`text-3xl font-bold ${
                    portfolio.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {portfolio.change24h > 0 ? '+' : ''}{portfolio.change24h}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Risk Score</p>
                  <p className="text-3xl font-bold text-yellow-400">
                    {portfolio.riskScore}/100
                  </p>
                </div>
              </div>
            </div>

            {/* Charts */}
            <PortfolioCharts portfolio={portfolio} />

            {/* Token List */}
            <div className="glassmorphism p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Assets</h3>
              <div className="space-y-4">
                {portfolio.tokens.map((token) => (
                  <div
                    key={token.address}
                    className="flex items-center justify-between p-4 rounded-lg bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{token.symbol}</p>
                      <p className="text-sm text-gray-400">{token.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatUSD(token.value)}</p>
                      <p className="text-sm text-gray-400">
                        {token.balance} {token.symbol}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Bat Mode */}
      <BatMode isActive={isBatMode} onClose={() => setIsBatMode(false)} />
    </>
  )
} 