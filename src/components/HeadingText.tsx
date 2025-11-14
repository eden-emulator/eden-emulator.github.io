import { cn } from '@/utils/style.ts'

interface HeadingTextProps {
  title: string
  center?: boolean
  description?: string
}

function HeadingText(props: HeadingTextProps) {
  const textCenter = props.center ?? true
  return (
    <div className={cn(textCenter ? 'text-center' : 'text-left', props.description &&'mb-16')}>
      <h2 className="text-4xl md:text-6xl font-bold mb-6">
        <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
          {props.title}
        </span>
      </h2>
      {props.description && (
        <p className="text-xl text-cyan-100 max-w-3xl mx-auto font-light">{props.description}</p>
      )}
    </div>
  )
}

export default HeadingText
