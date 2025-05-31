import React, { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface Connection {
  start: Node
  end: Node
  alpha: number
}

const NUM_NODES = 30
const NODE_RADIUS = 2
const CONNECTION_DISTANCE = 150
const SPEED = 0.5

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initNodes = () => {
      nodesRef.current = Array.from({ length: NUM_NODES }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        radius: NODE_RADIUS
      }))
    }

    const updateNodes = () => {
      nodesRef.current.forEach(node => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1
      })
    }

    const updateConnections = () => {
      connectionsRef.current = []
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const start = nodesRef.current[i]
          const end = nodesRef.current[j]
          const dx = end.x - start.x
          const dy = end.y - start.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < CONNECTION_DISTANCE) {
            connectionsRef.current.push({
              start,
              end,
              alpha: 1 - (distance / CONNECTION_DISTANCE)
            })
          }
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      connectionsRef.current.forEach(connection => {
        ctx.beginPath()
        ctx.moveTo(connection.start.x, connection.start.y)
        ctx.lineTo(connection.end.x, connection.end.y)
        ctx.strokeStyle = `rgba(0, 243, 255, ${connection.alpha * 0.2})`
        ctx.stroke()
      })

      // Draw nodes
      nodesRef.current.forEach(node => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 243, 255, 0.5)'
        ctx.fill()
      })
    }

    const animate = () => {
      updateNodes()
      updateConnections()
      draw()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    initNodes()
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-30"
    />
  )
} 