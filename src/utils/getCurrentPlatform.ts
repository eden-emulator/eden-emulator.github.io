export type PlatformType = 'windows' | 'macos' | 'linux' | 'mobile'

function getCurrentPlatform(): PlatformType {
  const ua = navigator.userAgent || ''

  if (/android/i.test(ua)) return 'mobile'
  if (/win/i.test(ua)) return 'windows'
  if (/mac/i.test(ua)) return 'macos'
  if (/linux/i.test(ua)) return 'linux'

  return 'windows'
}

export default getCurrentPlatform
