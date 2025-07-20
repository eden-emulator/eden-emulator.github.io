import { useState, useEffect, useRef, useCallback } from 'react'
import { X } from 'lucide-react'
import edenLogo from '@/assets/logo.png'
import './SynthwaveHero.css'

interface Note {
  id: string
  lane: number // 0-4 for 5 lanes
  position: number // 0-100 representing position on track
  hit: boolean
  missed: boolean
}

interface GameState {
  isPlaying: boolean
  isPaused: boolean
  score: number
  combo: number
  maxCombo: number
  multiplier: number
  accuracy: number
  totalNotes: number
  hitNotes: number
}

const LANES = 5
const NOTE_SPEED = 0.8 // Units per frame (slower for testing)
const HIT_WINDOW = 8 // Position tolerance for hitting notes
const HIT_ZONE_POSITION = 90 // Where notes should be hit (90% from top = 10% from bottom)
const LANE_KEYS = ['a', 's', 'd', 'f', 'g'] // Keyboard controls
const LANE_COLORS = [
  'var(--synthwave-hot-pink)',
  'var(--synthwave-yellow)',
  'var(--synthwave-cyan)',
  'var(--synthwave-purple)',
  'var(--synthwave-sunset-orange)',
]

export default function SynthwaveHero({ onClose }: { onClose: () => void }) {
  console.log('SynthwaveHero component mounted')

  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isPaused: false,
    score: 0,
    combo: 0,
    maxCombo: 0,
    multiplier: 1,
    accuracy: 100,
    totalNotes: 0,
    hitNotes: 0,
  })

  const [notes, setNotes] = useState<Note[]>([])
  const [activeLanes, setActiveLanes] = useState<boolean[]>(new Array(LANES).fill(false))
  const [gameEnded, setGameEnded] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60) // 60 second game
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const gameLoopRef = useRef<number>(null)
  const noteIdRef = useRef(0)
  const gameTimerRef = useRef<number>(null)

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  // Debug component lifecycle
  useEffect(() => {
    console.log('SynthwaveHero mounted')
    return () => {
      console.log('SynthwaveHero unmounting!')
    }
  }, [])

  // Generate new note
  const generateNote = useCallback(() => {
    const lane = Math.floor(Math.random() * LANES)
    const newNote: Note = {
      id: `note-${noteIdRef.current++}`,
      lane,
      position: 100, // Start from far away (top)
      hit: false,
      missed: false,
    }
    setNotes((prev) => [...prev, newNote])
    setGameState((prev) => ({ ...prev, totalNotes: prev.totalNotes + 1 }))
  }, [])

  // Handle key press
  const handleKeyPress = useCallback(
    (lane: number) => {
      if (!gameState.isPlaying || gameState.isPaused) return

      // Visual feedback
      setActiveLanes((prev) => {
        const newLanes = [...prev]
        newLanes[lane] = true
        return newLanes
      })

      // Check for hit
      const hitNote = notes.find(
        (note) =>
          note.lane === lane &&
          note.position >= HIT_ZONE_POSITION - HIT_WINDOW &&
          note.position <= HIT_ZONE_POSITION + HIT_WINDOW &&
          !note.hit &&
          !note.missed,
      )

      if (hitNote) {
        // Hit!
        setNotes((prev) =>
          prev.map((note) => (note.id === hitNote.id ? { ...note, hit: true } : note)),
        )

        setGameState((prev) => ({
          ...prev,
          score: prev.score + 100 * prev.multiplier,
          combo: prev.combo + 1,
          maxCombo: Math.max(prev.maxCombo, prev.combo + 1),
          multiplier: Math.min(4, Math.floor((prev.combo + 1) / 10) + 1),
          hitNotes: prev.hitNotes + 1,
          accuracy: ((prev.hitNotes + 1) / prev.totalNotes) * 100,
        }))
      } else {
        // Miss - break combo
        setGameState((prev) => ({
          ...prev,
          combo: 0,
          multiplier: 1,
        }))
      }

      // Release key visual
      setTimeout(() => {
        setActiveLanes((prev) => {
          const newLanes = [...prev]
          newLanes[lane] = false
          return newLanes
        })
      }, 100)
    },
    [notes, gameState.isPlaying, gameState.isPaused],
  )

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const laneIndex = LANE_KEYS.indexOf(e.key.toLowerCase())
      if (laneIndex !== -1) {
        handleKeyPress(laneIndex)
      } else if (e.key === 'Escape') {
        setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyPress])

  // Game loop
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isPaused) {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
      return
    }

    let lastNoteTime = 0
    const noteInterval = 1000 // Generate note every second
    let isActive = true

    const gameLoop = (timestamp: number) => {
      if (!isActive) return
      // Move notes towards player (decrease position)
      setNotes((prev) => {
        const missedNotes: string[] = []

        const updatedNotes = prev
          .map((note) => ({
            ...note,
            position: note.position - NOTE_SPEED,
          }))
          .filter((note) => {
            // Check if note passed the hit zone without being hit
            if (note.position < HIT_ZONE_POSITION - HIT_WINDOW && !note.hit && !note.missed) {
              missedNotes.push(note.id)
              return false
            }
            // Keep notes that are still visible
            return note.position >= -10
          })

        // Update stats for missed notes
        if (missedNotes.length > 0) {
          setGameState((prev) => ({
            ...prev,
            combo: 0,
            multiplier: 1,
            accuracy: prev.totalNotes > 0 ? (prev.hitNotes / prev.totalNotes) * 100 : 100,
          }))
        }

        return updatedNotes
      })

      // Generate new notes
      if (timestamp - lastNoteTime > noteInterval) {
        generateNote()
        lastNoteTime = timestamp
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)

    return () => {
      isActive = false
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState.isPlaying, gameState.isPaused, generateNote])

  // Game timer
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isPaused && !gameEnded) {
      gameTimerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current)
      }
    }

    return () => {
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current)
      }
    }
  }, [gameState.isPlaying, gameState.isPaused, gameEnded])

  const startGame = () => {
    setGameState({
      isPlaying: true,
      isPaused: false,
      score: 0,
      combo: 0,
      maxCombo: 0,
      multiplier: 1,
      accuracy: 100,
      totalNotes: 0,
      hitNotes: 0,
    })
    setNotes([])
    setTimeLeft(60)
    setGameEnded(false)
    noteIdRef.current = 0
  }

  const endGame = () => {
    setGameState((prev) => ({ ...prev, isPlaying: false }))
    setGameEnded(true)
  }

  const handleTouchStart = (lane: number) => {
    handleKeyPress(lane)
  }

  return (
    <div className="synthwave-hero-container">
      {/* DEBUG INFO */}
      <div
        style={{
          position: 'absolute',
          top: '100px',
          left: '20px',
          color: 'white',
          background: 'black',
          padding: '10px',
          zIndex: 1000,
          fontSize: '14px',
        }}
      >
        DEBUG: isPlaying={gameState.isPlaying.toString()}, gameEnded={gameEnded.toString()}
        <br />
        Notes: {notes.length}
        <br />
        Should show start: {(!gameState.isPlaying && !gameEnded).toString()}
      </div>

      {/* Close button */}
      <button onClick={onClose} className="synthwave-hero-close" aria-label="Close game">
        <X />
      </button>

      {/* Game UI */}
      <div className="synthwave-hero-ui">
        <div className="synthwave-hero-score">
          <div className="score-label">SCORE</div>
          <div className="score-value">{gameState.score.toLocaleString()}</div>
        </div>

        <div className="synthwave-hero-combo">
          <div className="combo-label">COMBO</div>
          <div className="combo-value">{gameState.combo}</div>
          <div className="multiplier">x{gameState.multiplier}</div>
        </div>

        <div className="synthwave-hero-accuracy">
          <div className="accuracy-label">ACCURACY</div>
          <div className="accuracy-value">{gameState.accuracy.toFixed(1)}%</div>
        </div>

        {gameState.isPlaying && (
          <div className="synthwave-hero-timer">
            <div className="timer-label">TIME</div>
            <div className="timer-value">{timeLeft}s</div>
          </div>
        )}
      </div>

      {/* Game track */}
      <div className="synthwave-hero-track">
        <div className="track-perspective">
          {/* Track lanes */}
          {Array.from({ length: LANES }).map((_, lane) => (
            <div key={lane} className="track-lane">
              {/* Notes */}
              {notes
                .filter((note) => note.lane === lane)
                .map((note) => (
                  <div
                    key={note.id}
                    className={`game-note ${note.hit ? 'note-hit' : ''}`}
                    style={
                      {
                        '--note-position': `${note.position}%`,
                        '--note-color': LANE_COLORS[lane],
                      } as React.CSSProperties
                    }
                  />
                ))}
            </div>
          ))}

          {/* Hit zones */}
          <div className="hit-zones">
            {Array.from({ length: LANES }).map((_, lane) => (
              <div
                key={lane}
                className={`hit-zone ${activeLanes[lane] ? 'active' : ''}`}
                style={{ '--zone-color': LANE_COLORS[lane] } as React.CSSProperties}
                onTouchStart={(e) => {
                  e.preventDefault()
                  handleTouchStart(lane)
                }}
                onMouseDown={() => handleTouchStart(lane)}
              >
                {!isTouchDevice && (
                  <span className="key-hint">{LANE_KEYS[lane].toUpperCase()}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Start screen */}
      {!gameState.isPlaying && !gameEnded && (
        <div className="synthwave-hero-menu">
          <div className="eden-logo-container">
            <div className="eden-logo-bg-blur"></div>
            <img src={edenLogo} alt="Eden Logo" className="eden-logo-game" />
          </div>
          <h2 className="game-title">SYNTHWAVE HERO</h2>
          <p className="game-instructions">
            {isTouchDevice
              ? 'Tap the lanes to hit the notes!'
              : 'Press A, S, D, F, G to hit the notes!'}
          </p>
          <button onClick={startGame} className="start-button">
            START GAME
          </button>
        </div>
      )}

      {/* Pause screen */}
      {gameState.isPaused && (
        <div className="synthwave-hero-pause">
          <h2>PAUSED</h2>
          <p>Press ESC to resume</p>
        </div>
      )}

      {/* Game Over screen */}
      {gameEnded && (
        <div className="synthwave-hero-game-over">
          <h2 className="game-over-title">GAME OVER</h2>

          <div className="score-breakdown">
            <div className="final-score">
              <div className="score-label">FINAL SCORE</div>
              <div className="score-value">{gameState.score.toLocaleString()}</div>
            </div>

            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-label">NOTES HIT</div>
                <div className="stat-value">{gameState.hitNotes}</div>
              </div>

              <div className="stat-item">
                <div className="stat-label">NOTES MISSED</div>
                <div className="stat-value">{gameState.totalNotes - gameState.hitNotes}</div>
              </div>

              <div className="stat-item">
                <div className="stat-label">ACCURACY</div>
                <div className="stat-value">{gameState.accuracy.toFixed(1)}%</div>
              </div>

              <div className="stat-item">
                <div className="stat-label">MAX COMBO</div>
                <div className="stat-value">{gameState.maxCombo}</div>
              </div>
            </div>

            <div className="performance-rating">
              <div className="rating-label">PERFORMANCE</div>
              <div className="rating-value">
                {gameState.accuracy >= 95
                  ? 'PERFECT!'
                  : gameState.accuracy >= 85
                    ? 'EXCELLENT!'
                    : gameState.accuracy >= 70
                      ? 'GOOD!'
                      : gameState.accuracy >= 50
                        ? 'OK'
                        : 'NEEDS PRACTICE'}
              </div>
            </div>
          </div>

          <div className="game-over-buttons">
            <button onClick={startGame} className="play-again-button">
              PLAY AGAIN
            </button>
            <button onClick={onClose} className="exit-button">
              EXIT
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
