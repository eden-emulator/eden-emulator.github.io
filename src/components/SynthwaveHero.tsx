import { useState, useEffect, useRef, useCallback } from 'react'
import { X, Volume2, VolumeX } from 'lucide-react'

interface Note {
  id: number
  lane: number
  time: number
  hit?: boolean
  missed?: boolean
}

interface GameProps {
  onClose: () => void
}

const LANES = 4
const HIT_WINDOW = 150
const SPAWN_INTERVAL = 600

const SynthwaveHero: React.FC<GameProps> = ({ onClose }) => {
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [, setNotes] = useState<Note[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [muted, setMuted] = useState(false)
  const [hitFeedback, setHitFeedback] = useState<{ [key: number]: boolean }>({})
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const lastSpawnTime = useRef(0)
  const keysPressed = useRef<Set<string>>(new Set())

  // Lane colors matching synthwave theme
  const laneColors = useRef([
    'var(--synthwave-hot-pink)',
    'var(--synthwave-cyan)',
    'var(--synthwave-yellow)',
    'var(--synthwave-purple)'
  ]).current

  // Key bindings
  const laneKeys = useRef(['a', 's', 'd', 'f']).current

  // Generate random note pattern
  const spawnNote = useCallback(() => {
    const now = Date.now()
    if (now - lastSpawnTime.current > SPAWN_INTERVAL) {
      const newNote: Note = {
        id: Math.random(),
        lane: Math.floor(Math.random() * LANES),
        time: now
      }
      setNotes(prev => [...prev, newNote])
      lastSpawnTime.current = now
    }
  }, [])

  // Check for hits
  const checkHit = useCallback((lane: number) => {
    const now = Date.now()
    setNotes(prev => {
      const updatedNotes = [...prev]
      let hit = false
      
      for (const note of updatedNotes) {
        if (note.lane === lane && !note.hit && !note.missed) {
          const timeDiff = Math.abs(now - (note.time + 3000)) // 3 seconds to reach bottom
          
          if (timeDiff < HIT_WINDOW) {
            note.hit = true
            hit = true
            
            // Score calculation
            const accuracy = 1 - (timeDiff / HIT_WINDOW)
            const points = Math.floor(100 * accuracy)
            
            setScore(s => s + points + (combo * 10))
            setCombo(c => {
              const newCombo = c + 1
              setMaxCombo(m => Math.max(m, newCombo))
              return newCombo
            })
            
            // Visual feedback
            setHitFeedback(prev => ({ ...prev, [lane]: true }))
            setTimeout(() => {
              setHitFeedback(prev => ({ ...prev, [lane]: false }))
            }, 200)
            
            break
          }
        }
      }
      
      if (!hit) {
        setCombo(0)
      }
      
      return updatedNotes
    })
  }, [combo])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (laneKeys.includes(key) && !keysPressed.current.has(key)) {
        keysPressed.current.add(key)
        const lane = laneKeys.indexOf(key)
        checkHit(lane)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase())
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [checkHit, laneKeys])

  // Game loop
  useEffect(() => {
    if (!gameStarted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const render = () => {
      // Clear canvas
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw lanes
      const laneWidth = canvas.width / LANES
      for (let i = 0; i < LANES; i++) {
        ctx.strokeStyle = laneColors[i]
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.3
        ctx.beginPath()
        ctx.moveTo(i * laneWidth + laneWidth / 2, 0)
        ctx.lineTo(i * laneWidth + laneWidth / 2, canvas.height)
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      // Draw hit zone
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.fillRect(0, canvas.height - 100, canvas.width, 50)

      // Update and draw notes
      const now = Date.now()
      setNotes(prev => {
        const activeNotes = prev.filter(note => {
          const progress = (now - note.time) / 3000 // 3 seconds to fall
          
          if (progress > 1.1 && !note.hit) {
            note.missed = true
            setCombo(0)
          }
          
          return progress < 1.2
        })

        // Draw notes
        activeNotes.forEach(note => {
          const progress = (now - note.time) / 3000
          const y = progress * canvas.height
          const x = note.lane * laneWidth + laneWidth / 2

          if (!note.hit && !note.missed) {
            // Note glow
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30)
            gradient.addColorStop(0, laneColors[note.lane])
            gradient.addColorStop(1, 'transparent')
            ctx.fillStyle = gradient
            ctx.fillRect(x - 30, y - 30, 60, 60)

            // Note body
            ctx.fillStyle = laneColors[note.lane]
            ctx.fillRect(x - 20, y - 20, 40, 40)
          }
        })

        return activeNotes
      })

      // Draw hit feedback
      Object.entries(hitFeedback).forEach(([lane, active]) => {
        if (active) {
          const x = parseInt(lane) * laneWidth + laneWidth / 2
          ctx.fillStyle = laneColors[parseInt(lane)]
          ctx.globalAlpha = 0.5
          ctx.fillRect(x - 40, canvas.height - 120, 80, 80)
          ctx.globalAlpha = 1
        }
      })

      // Spawn new notes
      spawnNote()
      
      animationRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameStarted, spawnNote, hitFeedback, laneColors])

  return (
    <div className="fixed inset-0 bg-black z-[10000] flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <div className="flex gap-8 text-white font-orbitron">
          <div>
            Score: <span className="text-synthwave-cyan">{score}</span>
          </div>
          <div>
            Combo: <span className="text-synthwave-hot-pink">{combo}</span>
          </div>
          <div>
            Max: <span className="text-synthwave-yellow">{maxCombo}</span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => setMuted(!muted)}
            className="p-2 text-white hover:text-synthwave-cyan transition-colors"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX /> : <Volume2 />}
          </button>
          <button
            onClick={onClose}
            className="p-2 text-white hover:text-synthwave-hot-pink transition-colors"
            aria-label="Close game"
          >
            <X />
          </button>
        </div>
      </div>

      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="mx-auto my-auto border border-synthwave-purple/50"
        style={{
          boxShadow: '0 0 50px var(--synthwave-purple)',
          imageRendering: 'pixelated'
        }}
      />

      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <div className="text-white font-audiowide mb-2">
          Press <span className="text-synthwave-cyan">A</span>, <span className="text-synthwave-hot-pink">S</span>, <span className="text-synthwave-yellow">D</span>, <span className="text-synthwave-purple">F</span> to play
        </div>
        {!gameStarted && (
          <button
            onClick={() => setGameStarted(true)}
            className="px-8 py-3 bg-gradient-to-r from-synthwave-hot-pink to-synthwave-cyan text-black font-bold rounded-lg hover:scale-105 transition-transform"
          >
            START GAME
          </button>
        )}
      </div>
    </div>
  )
}

export default SynthwaveHero