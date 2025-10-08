import { type PropsWithChildren } from 'react'
import BackgroundEffect from './BackgroundEffect'
import { cn } from '@/utils/style'

interface PageWrapperProps extends PropsWithChildren {
  className?: string
}

function PageWrapper(props: PageWrapperProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-b from-black via-purple-900/10 to-black relative overflow-hidden min-h-screen',
        props.className,
      )}
    >
      <BackgroundEffect />
      <div className="relative">{props.children}</div>
    </div>
  )
}

export default PageWrapper
