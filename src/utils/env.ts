interface Env {
  IS_DEV: boolean
  APP_URL: string
  DISCORD_URL: string
  DOWNLOAD_URL: string
  DOWNLOAD_VERSION: string
  EMUREADY_API_BASE_URL: string
}

function env(): Env {
  return {
    IS_DEV: import.meta.env.DEV,
    APP_URL: import.meta.env.VITE_APP_URL || 'https://eden-emu.dev',
    DISCORD_URL: import.meta.env.VITE_DISCORD_URL || 'https://discord.gg/4RtpRVWXcy',
    DOWNLOAD_URL:
      import.meta.env.VITE_DOWNLOAD_URL ||
      'https://github.com/eden-emulator/Releases/releases/tag/v0.1.0',
    DOWNLOAD_VERSION: import.meta.env.VITE_DOWNLOAD_VERSION || 'v0.1.0',
    EMUREADY_API_BASE_URL: import.meta.env.DEV
      ? '/api/mobile/trpc'
      : import.meta.env.VITE_EMUREADY_API_BASE_URL || 'https://www.emuready.com/api/mobile/trpc',
  }
}

export default env
