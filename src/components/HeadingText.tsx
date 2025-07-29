interface HeadingTextProps {
  title: string
  description: string
}

function HeadingText(props: HeadingTextProps) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-6xl font-bold mb-6">
        <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
          {props.title}
        </span>
      </h2>
      <p className="text-xl text-cyan-100 max-w-3xl mx-auto font-light">{props.description}</p>
    </div>
  )
}

export default HeadingText
