import { memo } from 'react'
import { Globe, Heart } from 'lucide-react'
import { GitHubIcon, TwitterIcon, DiscordIcon } from '@/components/Icons'
import HeadingText from '@/components/HeadingText'
import { teamSections, teamStats, pastMembers } from './data'
import { cn } from '@/utils/style'
import SEO from '@/components/SEO'
import PageWrapper from '@/components/PageWrapper'
import env from '@/utils/env'

function TeamPage() {
  return (
    <>
      <SEO
        title="Eden Team - Contribute Now"
        description="Meet the passionate developers and contributors behind Eden. Learn about our team members and how you can contribute to the project."
        keywords="Eden team, Eden developers, emulator contributors, open source team"
        url={`${env().APP_URL}/team`}
      />
      <PageWrapper>
        <div className="h-24 md:h-34" />
        {/* Background Effects */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-xl animate-float will-change-transform" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-500/8 rounded-full blur-xl animate-subtle-pulse-delay-2 will-change-transform" />
          <div className="absolute top-20 left-1/4 w-60 h-60 bg-pink-500/8 rounded-full blur-xl animate-float-delay-3 will-change-transform" />
          <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-cyan-500/8 rounded-full blur-xl animate-subtle-pulse will-change-transform" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeadingText
            title="Join The Team"
            description="The passionate developers and contributors behind Eden"
          />

          {/* Team Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {teamStats.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-black/60 backdrop-blur-xs border border-purple-500/30 rounded-xl p-6 text-center hover:border-cyan-400/50 transition-colors duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-r from-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-8 rounded-xl blur-sm transition-opacity duration-300 will-change-opacity" />
                <div className="relative">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-cyan-100/70 font-light uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Team Sections */}
          {teamSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-20">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-cyan-400 mb-4">
                  {section.title}
                </h3>
                <p className="text-lg text-cyan-100/80 font-light max-w-2xl mx-auto">
                  {section.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {section.members.map((member, memberIndex) => (
                  <div key={memberIndex} className="group relative">
                    {/* Glow Effect */}
                    <div
                      className={cn(
                        'absolute inset-0 bg-linear-to-r blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700 rounded-2xl',
                        member.color,
                      )}
                    />

                    {/* Card */}
                    <div className="relative bg-black/80 backdrop-blur-md border border-purple-500/30 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-cyan-400/50 group-hover:transform group-hover:scale-[1.02] h-full flex flex-col">
                      {/* Color Bar */}
                      <div className={cn('h-1 bg-linear-to-r', member.color)} />

                      <div className="p-8 flex-1 flex flex-col">
                        {/* Avatar/Icon Section */}
                        <div className="flex items-start gap-4 mb-6">
                          {member.avatar ? (
                            <div className="w-20 h-20 flex-shrink-0 rounded-xl border-2 border-purple-500/30 shadow-lg overflow-hidden bg-black/40">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div
                              className={cn(
                                'w-20 h-20 flex-shrink-0 rounded-xl bg-linear-to-r opacity-20 border-2 border-purple-500/30',
                                member.color,
                              )}
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-3 mb-1">
                              <h4 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-purple-300 break-all flex-1 min-w-0">
                                {member.name}
                              </h4>
                              <div
                                className={cn(
                                  'p-2 rounded-lg bg-linear-to-r shadow-md flex-shrink-0',
                                  member.color,
                                )}
                              >
                                <member.icon className="w-4 h-4 text-black" />
                              </div>
                            </div>
                            <p className="text-pink-400 font-semibold text-sm uppercase tracking-wider break-words">
                              {member.role}
                            </p>
                          </div>
                        </div>

                        {/* Bio */}
                        <p className="text-cyan-100/90 font-light mb-6 leading-relaxed flex-1">
                          {member.bio ||
                            `Contributing to Eden with expertise in ${member.specialties[0]?.toLowerCase() || 'development'}.`}
                        </p>

                        {/* Specialties */}
                        <div className="mb-6 mt-auto">
                          <p className="text-xs text-purple-300 font-semibold uppercase tracking-wider mb-3">
                            Specialties
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {member.specialties.map((specialty, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 text-xs bg-purple-500/20 border border-purple-500/30 rounded-full text-cyan-100"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Social Links */}
                        {member.socials && (
                          <div className="flex items-center gap-3">
                            {member.socials.github && (
                              <a
                                href={`https://github.com/${member.socials.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-black/60 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group/social"
                              >
                                <GitHubIcon className="w-4 h-4 text-purple-300 group-hover/social:text-purple-200" />
                              </a>
                            )}
                            {member.socials.twitter && (
                              <a
                                href={`https://twitter.com/${member.socials.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-black/60 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group/social"
                              >
                                <TwitterIcon className="w-4 h-4 text-cyan-300 group-hover/social:text-cyan-200" />
                              </a>
                            )}
                            {member.socials.discord && (
                              <a
                                href={`https://discord.com/users/${member.socials.discord}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-black/60 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 group/social"
                              >
                                <DiscordIcon className="w-4 h-4 text-indigo-300 group-hover/social:text-indigo-200" />
                              </a>
                            )}
                            {member.socials.website && (
                              <a
                                href={member.socials.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-black/60 border border-pink-500/30 rounded-lg hover:bg-pink-500/20 hover:border-pink-500/50 transition-all duration-300 group/social"
                              >
                                <Globe className="w-4 h-4 text-pink-300 group-hover/social:text-pink-200" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Join the Team CTA */}
          <div className="relative py-20">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-purple-500/10 rounded-3xl blur-3xl" />
            </div>

            <div className="relative bg-black/60 backdrop-blur-xs border border-purple-500/30 rounded-3xl p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-pink-500/20 rounded-full">
                  <Heart className="w-16 h-16 text-pink-400 animate-pulse" />
                </div>
              </div>

              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-cyan-400 mb-6">
                JOIN OUR TEAM
              </h3>

              <p className="text-lg text-cyan-100/90 font-light max-w-2xl mx-auto mb-8">
                Eden is always looking for passionate developers, designers, and contributors.
                Whether you're a seasoned emulation expert or just getting started, there's a place
                for you here.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://discord.gg/edenemu"
                  target="_blank"
                  aria-label="Join Eden Discord"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-bold tracking-wider transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70"
                >
                  Join Discord
                </a>
                <a
                  href="https://rvlt.gg/qKgFEAbH"
                  target="_blank"
                  aria-label="Join Eden Stoat"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-bold tracking-wider transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70"
                >
                  Join Stoat
                </a>
                <a
                  href="https://git.eden-emu.dev/eden-emu/eden/"
                  target="_blank"
                  aria-label="Contribute to Eden"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border-2 border-cyan-400 text-cyan-300 hover:text-white rounded-lg font-bold tracking-wider transition-all duration-300 hover:bg-cyan-400/10"
                >
                  CONTRIBUTE
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="h-16" />
      </PageWrapper>
    </>
  )
}

export default memo(TeamPage)
