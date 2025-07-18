type Platform = 'windows' | 'macos' | 'linux' | 'mobile' | 'unknown'

function getCurrentPlatform(): Platform {
  const ua = navigator.userAgent || ''

  if (/android/i.test(ua)) return 'mobile'
  if (/iphone|ipad|ipod/i.test(ua)) return 'mobile'

  if (/win/i.test(ua)) return 'windows'
  if (/mac/i.test(ua)) return 'macos'
  if (/linux/i.test(ua)) return 'linux'

  return 'unknown'
}

export default getCurrentPlatform
