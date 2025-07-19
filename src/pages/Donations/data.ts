interface Donor {
  name: string
  role: string
  avatar: string | null
  description: string
  donationLink?: {
    url: string
    platform: 'kofi' | 'liberapay' | 'patreon' | 'paypal'
  }
}

export const donations: Donor[] = [
  {
    name: 'Mr. Purple',
    role: 'Driver & Low-Level Developer',
    avatar:
      'https://cdn.discordapp.com/avatars/407698909608149003/6ee44e9762624b2b7358d5de23a3a2ce.png?size=1024',
    description: 'Core emulation and system-level programming',
    donationLink: {
      url: 'https://ko-fi.com/mrpurple666/',
      platform: 'kofi',
    },
  },
  {
    name: 'crueter',
    role: 'UI Developer/Designer, Vulkan Developer',
    avatar:
      'https://cdn.discordapp.com/avatars/1278113100310249553/19ecafb68da801d3634448cb2c5e35a5.png?size=1024',
    description: 'CI/Infrastructure Management',
    donationLink: {
      url: 'https://liberapay.com/crueter',
      platform: 'liberapay',
    },
  },
  {
    name: 'Antabaka',
    role: 'Graphic Designer',
    avatar:
      'https://i.ibb.co/5hLVqQQW/755d80ac15759b03bbf1ae188f2f8f6b4671a5025228f5f53151231b34494f37.png',
    description: 'Visual identity and user experience design',
    donationLink: {
      url: 'https://ko-fi.com/antabaka02',
      platform: 'kofi',
    },
  },
]
