import React from 'react'
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer
} from 'recharts'
import { motion } from 'framer-motion'
import { Portfolio, ProtocolBreakdown, ChainBreakdown, TypeBreakdown } from '@/lib/types'
import { formatUSD, formatPercent, getRandomColor } from '@/lib/utils'

interface PortfolioChartsProps {
  portfolio: Portfolio
}

export function PortfolioCharts({ portfolio }: PortfolioChartsProps) {
  const pieChartData = [
    ...portfolio.protocolBreakdown.map(item => ({
      name: item.protocol,
      value: item.value
    }))
  ]

  const barChartData = portfolio.tokens
    .filter(token => token.apy)
    .map(token => ({
      name: token.symbol,
      apy: token.apy
    }))
    .sort((a, b) => (b.apy || 0) - (a.apy || 0))
    .slice(0, 5)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Protocol Distribution */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glassmorphism p-6"
      >
        <h3 className="text-xl font-bold mb-6">Protocol Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={60}
                dataKey="value"
                animationDuration={1000}
                label={({ name, percent }) => `${name} (${formatPercent(percent ? percent * 100 : 0)})`}
                labelLine={{ stroke: 'rgba(255, 255, 255, 0.5)' }}
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getRandomColor(index)}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const value = payload[0].value as number
                    return (
                      <div className="glassmorphism p-2">
                        <p className="text-sm">{payload[0].name}</p>
                        <p className="text-sm font-bold">
                          {formatUSD(value)}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* APY Distribution */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glassmorphism p-6"
      >
        <h3 className="text-xl font-bold mb-6">Top APY Rates</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <XAxis
                dataKey="name"
                stroke="rgba(255, 255, 255, 0.5)"
                tick={{ fill: 'rgba(255, 255, 255, 0.8)' }}
              />
              <YAxis
                stroke="rgba(255, 255, 255, 0.5)"
                tick={{ fill: 'rgba(255, 255, 255, 0.8)' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const value = payload[0].value as number
                    return (
                      <div className="glassmorphism p-2">
                        <p className="text-sm">{label}</p>
                        <p className="text-sm font-bold">
                          APY: {value}%
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar
                dataKey="apy"
                fill="rgba(0, 243, 255, 0.8)"
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
} 