import React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'DeFi Portfolio Visualizer',
  description: 'A futuristic DeFi portfolio visualization tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} font-sans antialiased circuit-background min-h-screen`}>
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Animated Background Elements */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
          <div className="absolute inset-0 data-stream" />
        </div>
      </body>
    </html>
  )
} 