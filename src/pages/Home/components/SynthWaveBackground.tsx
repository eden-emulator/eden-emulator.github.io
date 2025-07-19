import { memo } from 'react'
import MusicBars from '@/components/MusicBars'

function SynthWaveBackground() {
  return (
    <>
      {/* Subtle Animated Synthwave Background */}
      <div className="synthwave-animated-bg" aria-hidden="true">
        <div className="synthwave-gradient-animated" />
        <div className="synthwave-horizon" />
        <div className="synthwave-lines" />
      </div>

      {/* Music Bars positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <MusicBars />
      </div>

      {/* Optimized Synthwave Neon Glow Effects - Reduced blur and combined elements */}
      <div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-xl animate-subtle-pulse-neon will-change-transform"
        style={{
          background: 'radial-gradient(circle, var(--synthwave-hot-pink) 0%, transparent 70%)',
          opacity: 0.12,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-64 right-10 w-60 h-48 rounded-full blur-xl animate-subtle-pulse-neon-delay-2 will-change-transform"
        style={{
          background: 'radial-gradient(circle, var(--synthwave-yellow) 0%, transparent 70%)',
          opacity: 0.12,
        }}
        aria-hidden="true"
      />

      <div
        className="absolute bottom-20 right-10 w-72 h-72 rounded-full blur-xl animate-pulse-neon will-change-transform"
        style={{
          background: 'radial-gradient(circle, var(--synthwave-cyan) 0%, transparent 90%)',
          opacity: 0.12,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-xl will-change-transform"
        style={{
          background: 'radial-gradient(ellipse, var(--synthwave-purple) 0%, transparent 60%)',
          opacity: 0.08,
        }}
        aria-hidden="true"
      />
    </>
  )
}
export default memo(SynthWaveBackground)
