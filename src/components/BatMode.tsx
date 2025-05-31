import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

interface BatModeProps {
  isActive: boolean
  onClose: () => void
}

export function BatMode({ isActive, onClose }: BatModeProps) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isActive, onClose])

  if (!isActive) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
    >
      {/* Bat Signal Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="relative w-64 h-64"
        >
          <div className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse" />
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full text-yellow-400"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
          </svg>
        </motion.div>
      </div>

      {/* Batman-style Interface Elements */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-0 left-0 right-0 p-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {/* System Status */}
            <div className="glassmorphism p-4 border-yellow-400/20 border">
              <h3 className="text-yellow-400 text-sm mb-2">SYSTEM STATUS</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-yellow-400/70">ENCRYPTION</span>
                  <span className="text-xs text-yellow-400">ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-yellow-400/70">SECURITY</span>
                  <span className="text-xs text-yellow-400">MAXIMUM</span>
                </div>
              </div>
            </div>

            {/* Network Status */}
            <div className="glassmorphism p-4 border-yellow-400/20 border">
              <h3 className="text-yellow-400 text-sm mb-2">NETWORK STATUS</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-yellow-400/70">MAINNET</span>
                  <span className="text-xs text-yellow-400">CONNECTED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-yellow-400/70">NODES</span>
                  <span className="text-xs text-yellow-400">16 ACTIVE</span>
                </div>
              </div>
            </div>

            {/* System Controls */}
            <div className="glassmorphism p-4 border-yellow-400/20 border">
              <h3 className="text-yellow-400 text-sm mb-2">SYSTEM CONTROLS</h3>
              <button
                onClick={onClose}
                className="w-full text-xs text-yellow-400 border border-yellow-400/20 
                         py-1 px-2 hover:bg-yellow-400/10 transition-colors"
              >
                DEACTIVATE BAT-MODE
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scanning Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/5 to-transparent 
                      animate-scan" />
      </div>
    </motion.div>
  )
} 