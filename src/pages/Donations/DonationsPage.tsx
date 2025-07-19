import { Heart } from 'lucide-react'
import HeadingText from '@/components/HeadingText'
import SEO from '@/components/SEO'
import PageWrapper from '@/components/PageWrapper'
import { donations } from './data'

function DonationsPage() {
  return (
    <>
      <SEO
        title="Support Eden Emulator - Donations"
        description="Support the development of Eden Emulator. Your donations help us maintain servers, improve performance, and keep the project free for everyone."
        keywords="Eden Emulator donations, support Eden, emulator donations, open source support"
        url="https://eden-emulator.github.io/donations"
      />
      <PageWrapper>
        <div className="h-24 md:h-34" />
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-subtle-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-float-delay-2" />
          <div className="absolute top-20 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float-delay-3" />
          <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-subtle-pulse-delay-2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeadingText
            title="SUPPORT EDEN"
            description="Help us keep Eden Emulator free and open source for everyone"
          />

          {/* General Donation Section */}
          <div className="mb-16">
            <div className="bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full shadow-lg">
                  <Heart className="w-12 h-12 text-black" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4">
                Support Eden Emulator
              </h2>

              <p className="text-cyan-100/80 text-lg mb-8 max-w-2xl mx-auto">
                Help us keep the project free and open source for everyone
              </p>

              <a
                href="https://liberapay.com/crueter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-bold text-lg tracking-wider transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:transform hover:scale-105"
              >
                <Heart className="w-6 h-6" />
                <span>DONATE NOW</span>
              </a>
            </div>
          </div>

          {/* Individual Developer Donations */}
          <div className="mb-16">
            <div className="bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center">
                Support Individual Developers
              </h2>
              <p className="text-cyan-100/70 text-center mb-8 max-w-2xl mx-auto">
                You can also support our team members directly through their personal donation pages
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {donations.map((donor, index) => (
                  <div
                    key={index}
                    className="group relative bg-black/80 backdrop-blur-md border border-purple-500/30 rounded-xl overflow-hidden transition-all duration-500 hover:border-cyan-400/50 hover:transform hover:scale-[1.02]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-20 rounded-xl blur-sm transition-all duration-500" />

                    <div className="relative p-6 text-center">
                      {/* Avatar */}
                      <div className="mb-4 flex justify-center">
                        {donor.avatar ? (
                          <img
                            src={donor.avatar}
                            alt={donor.name}
                            className="w-24 h-24 rounded-full border-3 border-purple-500/50 shadow-lg"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                            {donor.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 mb-2">
                        {donor.name}
                      </h3>

                      {/* Role/Description */}
                      <p className="text-pink-400 font-semibold text-sm h-8 lg:h-12">
                        {donor.role}
                      </p>

                      <p className="text-cyan-100/70 text-sm h-12">{donor.description}</p>

                      {/* Donation Link */}
                      {donor.donationLink && (
                        <a
                          href={donor.donationLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <Heart className="w-4 h-4" />
                          <span>
                            Support on{' '}
                            {donor.donationLink.platform === 'kofi'
                              ? 'Ko-fi'
                              : donor.donationLink.platform === 'liberapay'
                                ? 'Liberapay'
                                : donor.donationLink.platform}
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="relative py-16">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-purple-500/10 rounded-3xl blur-3xl" />
            </div>

            <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-pink-500/20 rounded-full">
                  <Heart className="w-16 h-16 text-pink-400 animate-pulse" />
                </div>
              </div>

              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-6">
                THANK YOU
              </h3>

              <p className="text-lg text-cyan-100/90 font-light max-w-2xl mx-auto">
                Your support helps us maintain servers, improve performance, and keep Eden Emulator
                free and open source for everyone. Every donation, no matter the size, makes a
                difference.
              </p>
            </div>
          </div>
        </div>

        <div className="h-16" />
      </PageWrapper>
    </>
  )
}

export default DonationsPage
