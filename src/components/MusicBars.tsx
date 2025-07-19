function MusicBars() {
  return (
    <div className="music-bars">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="music-bar"
          style={{
            height: `${20 + Math.sin(i * 0.3) * 30}px`,
            animationDelay: `${i * 0.05}s`,
            opacity: 0.6 - Math.abs(i - 20) * 0.02,
          }}
        />
      ))}
    </div>
  )
}

export default MusicBars
