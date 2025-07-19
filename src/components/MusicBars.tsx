import { memo, useMemo } from 'react'

function MusicBars() {
  const bars = useMemo(
    () =>
      [...Array(25)].map((_, i) => ({
        height: 20 + Math.sin(i * 0.3) * 30,
        delay: i * 0.08,
        opacity: 0.6 - Math.abs(i - 12) * 0.025,
      })),
    [],
  )

  return (
    <div className="music-bars">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="music-bar will-change-transform"
          style={{
            height: `${bar.height}px`,
            animationDelay: `${bar.delay}s`,
            opacity: bar.opacity,
          }}
        />
      ))}
    </div>
  )
}

export default memo(MusicBars)
