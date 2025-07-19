import { ExternalLink } from 'lucide-react'
import type { DocSection } from '../data'
import { cn } from '@/utils/style'
interface DocumentationSectionProps {
  section: DocSection
}

function DocumentationSection(props: DocumentationSectionProps) {
  return (
    <div className="group relative bg-black/60 backdrop-blur-xs border border-blue-500/30 rounded-xl p-8 hover:border-purple-400/50 transition-all duration-500">
      {/* Glow Effect */}
      <div
        className={cn(
          'absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-10 rounded-xl blur-sm transition-all duration-500',
          props.section.color
        )}
      />

      <div className="relative">
        <div className="flex items-center mb-6">
          <div
            className={cn(
              'p-4 bg-linear-to-r rounded-lg mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300',
              props.section.color
            )}
          >
            <props.section.icon className="w-8 h-8 text-black" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-300 tracking-wider">
              {props.section.title}
            </h3>
            <p className="text-blue-200 text-sm">{props.section.description}</p>
          </div>
        </div>

        <ul className="space-y-3">
          {props.section.links.map((link, linkIndex) => (
            <li key={linkIndex}>
              <a
                href="#"
                className="group/link flex items-center justify-between text-blue-200 hover:text-purple-300 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-purple-500/10 border border-transparent hover:border-purple-500/30"
              >
                <span>{link}</span>
                <ExternalLink className="w-4 h-4 opacity-50 group-hover/link:opacity-100 transition-opacity duration-300" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DocumentationSection
