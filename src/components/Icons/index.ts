import { type SVGProps, type ReactNode } from 'react'

export * from './DiscordIcon'
export * from './GitHubIcon'
export * from './GitIcon'
export * from './TwitterIcon'

export type Icon = (props: SVGProps<SVGSVGElement>) => ReactNode
