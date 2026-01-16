import { Code2, Cpu, Shield, Wrench, Palette, Users, BookOpen, type LucideIcon } from 'lucide-react'

export interface TeamMember {
  name: string
  role: string
  avatar?: string
  bio?: string
  specialties: string[]
  socials?: {
    github?: string
    discord?: string
    twitter?: string
    website?: string
  }
  icon: LucideIcon
  color: string
}

export interface TeamSection {
  title: string
  description: string
  members: TeamMember[]
}

export const teamSections: TeamSection[] = [
  {
    title: 'DEVELOPERS',
    description: 'The core team building Eden',
    members: [
      {
        name: 'Camille LaVey',
        role: 'Project Lead',
        avatar:
          'https://cdn.discordapp.com/avatars/393592530442387457/386e8bf8fc18934bcd0afb0957eb357e.png',
        specialties: ['Project Management', 'Architecture', 'Core Systems'],
        icon: Shield,
        color: 'from-purple-500 to-pink-500',
        socials: {
          github: 'CamilleLaVey',
        },
      },
      {
        name: 'Mr. Purple',
        role: 'Drivers and Low-Level',
        avatar:
          'https://cdn.discordapp.com/avatars/407698909608149003/6ee44e9762624b2b7358d5de23a3a2ce.png?size=1024',
        specialties: ['Drivers', 'Low-Level Systems', 'Kernel'],
        icon: Cpu,
        color: 'from-violet-500 to-purple-600',
        socials: {
          github: 'MrPurple666',
        },
      },
      {
        name: 'PavelBARABANOV',
        role: 'Applets, HLE and Services',
        avatar:
          'https://cdn.discordapp.com/avatars/1072839988921778208/5445ffd7ffb201a98393cbdf684ea4b1.png?size=1024',
        specialties: ['Applets', 'HLE', 'Services'],
        icon: Code2,
        color: 'from-cyan-500 to-blue-500',
        socials: {
          github: 'pavelbarabanov',
        },
      },
      {
        name: 'JRaichu',
        role: 'Vulkan and Services',
        avatar:
          'https://cdn.discordapp.com/avatars/1329598497519046828/60d5c7b793316118daba76dced66580e.png?size=1024',
        specialties: ['Vulkan', 'Graphics', 'Services'],
        icon: Code2,
        color: 'from-yellow-500 to-orange-500',
        socials: {
          github: 'JPikachu',
        },
      },
      {
        name: 'Bix',
        role: 'Main Web Designer',
        bio: 'Good Soldiers follow orders',
        avatar:
          'https://github.com/Bixbr/Bixbr.github.io/blob/main/pfp-emu-community.png?raw=true',
        specialties: ['Web Design', 'Frontend', 'UX', 'Admin'],
        icon: Users,
        color: 'from-cyan-500 to-teal-500',
        socials: {
          github: 'Bixbr',
          twitter: 'Bixbrit',
          website: 'https://bixed.xyz/',
        },
      },
      {
        name: 'Gamer64',
        role: 'Frontend and Vulkan',
        avatar: 'https://avatars.githubusercontent.com/u/76565986?v=4',
        specialties: ['Frontend', 'Vulkan', 'Graphics'],
        icon: Code2,
        color: 'from-green-500 to-emerald-500',
        socials: {
          github: 'Gamer64ytb',
        },
      },
      {
        name: 'WildCard',
        role: 'Drivers and Android',
        avatar:
          'https://cdn.discordapp.com/avatars/472042778340229151/0fe62ff4a5135c0ef9add65057d94867.png?size=1024',
        specialties: ['Driver Support', 'Vulkan', 'Device Support'],
        icon: Cpu,
        color: 'from-pink-500 to-purple-600',
        socials: {
          github: 'Lizzie841',
        },
      },
      {
        name: 'Aleksandr Popovich',
        role: 'Android, GPU, UI',
        avatar:
          'https://cdn.discordapp.com/avatars/1369128214211072122/f47d6f7ef323cc7f90c3c49372e86b6f.png?size=1024',
        specialties: ['Android', 'GPU', 'UI'],
        icon: Wrench,
        color: 'from-indigo-500 to-blue-600',
        socials: {},
      },
      {
        name: 'MaranBr',
        role: 'Applets, HLE, Services, CI/Build Systems',
        avatar:
          'https://cdn.discordapp.com/avatars/844269232836575294/f9a71750e5e801ae4ed54bc959f5e7c8.png?size=1024',
        specialties: ['Applets', 'HLE', 'Services', 'CI/CD'],
        icon: Code2,
        color: 'from-teal-500 to-cyan-600',
        socials: {
          github: 'MaranBr',
        },
      },
      {
        name: 'Maufeat',
        role: 'Applets, HLE and Services',
        avatar: 'https://avatars.githubusercontent.com/u/3602392',
        specialties: ['Applets', 'HLE', 'Services'],
        icon: Code2,
        color: 'from-purple-500 to-indigo-600',
        socials: {
          github: 'Maufeat',
        },
      },
      {
        name: 'allisonbzk',
        role: 'Android',
        avatar:
          'https://cdn.discordapp.com/avatars/268281915348353024/a006f9d671720a7bfabc4f32e7573e56.webp?size=1024',
        specialties: ['Android', 'Mobile Development'],
        icon: Wrench,
        color: 'from-orange-500 to-red-500',
        socials: {
          github: 'allisonbzk',
        },
      },
      {
        name: 'Producdevity',
        role: 'Web Developer & EmuReady Creator',
        bio: 'I like to think that I helped.',
        avatar: 'https://github.com/Producdevity.png',
        specialties: ['Web Development', 'Android', 'EmuReady', 'UI/UX'],
        icon: Code2,
        color: 'from-blue-500 to-purple-600',
        socials: {
          github: 'Producdevity',
          twitter: 'Producdevity',
          website: 'https://www.emuready.com',
        },
      },
            {
        name: 'DraVee',
        role: 'Building & Linux',
        bio: 'Breaking and fixing things for fun also part of translating Eden to Brazilian Portuguese',
        avatar:
          'https://cdn.discordapp.com/avatars/464275051307335700/20748ae06642cb7ee24bc0fbc6db2532.webp?size=512',
        specialties: ['CI', 'Scripts', 'Kasane Teto Fan'],
        icon: Palette,
        color: 'from-pink-500 to-purple-500',
        socials: {
          github: 'caio99br',
        },
      },
    ],
  },
  {
    title: 'CONTRIBUTORS',
    description: "Talented developers contributing to Eden's success",
    members: [
      {
        name: 'Feles Noctis',
        role: 'Asst. Web Designer & Compatibility',
        avatar:
          'https://cdn.discordapp.com/avatars/95971386161393664/525e8d82e60881768d7ea40d6ef2bc31.png?size=1024',
        specialties: ['Web Design', 'Compatibility Testing'],
        icon: BookOpen,
        color: 'from-indigo-500 to-purple-500',
        socials: {
          github: 'FelesNoctis',
        },
      },
      {
        name: 'Antabaka',
        role: 'Graphic Designer',
        avatar:
          'https://i.ibb.co/5hLVqQQW/755d80ac15759b03bbf1ae188f2f8f6b4671a5025228f5f53151231b34494f37.png',
        specialties: ['Logo Design', 'Branding', 'Graphics', 'Admin'],
        icon: Palette,
        color: 'from-pink-500 to-purple-500',
        socials: {
          github: 'AntaBaka02',
        },
      },
      {
        name: 'Calchan',
        role: 'Android',
        avatar:
          'https://cdn.discordapp.com/avatars/616445066466033678/669b2ba778abc6a93836bd3710594ce3.png?size=1024',
        specialties: ['Android'],
        icon: Cpu,
        color: 'from-pink-500 to-purple-500',
        socials: {
          github: 'tbc',
        },
      },
      {
        name: 'Alyx',
        role: 'Backend',
        avatar:
          'https://cdn.discordapp.com/avatars/1190791785237200957/d21b58de396367a2dd6369f3c24fd4ac.png?size=1024',
        specialties: ['Backend'],
        icon: Code2,
        color: 'from-pink-500 to-purple-500',
        socials: {
          github: 'tbc',
        },
      },
      {
        name: 'Forrest Mark X',
        role: 'Vulkan',
        avatar:
          'https://cdn.discordapp.com/avatars/247434024132280336/b344b417bc7d5d5f8d291bfa406e497e.png',
        specialties: ['Debugging', 'General'],
        icon: Cpu,
        color: 'from-pink-500 to-purple-500',
        socials: {
          github: 'tbc',
        },
      },
      {
        name: 'John',
        role: 'Testing & Building',
        avatar:
          'https://cdn.discordapp.com/avatars/351946283835195392/cfe81d9cd77134abe11c06b023747543.png?size=1024',
        specialties: ['Testing', 'Building'],
        icon: Cpu,
        color: 'from-pink-500 to-purple-500',
        socials: {
          github: 'JohnQ89',
        },
      },
      {
        name: 'Gidoly',
        role: 'Testing',
        avatar:
          'https://cdn.discordapp.com/avatars/482000349297639434/f14669da7c4d4d8b84a606c31ba57997.png',
        specialties: ['Performance Profling', 'Testing'],
        icon: Code2,
        color: 'from-pink-500 to-purple-500',
        socials: {
          github: 'tbc',
        },
      },
      {
        name: 'Shinemegumi',
        role: 'Project Management',
        avatar:
          'https://cdn.discordapp.com/avatars/160084856058019841/0a9cabe6d122996ebc1504432f99bc4b.png?size=1024',
        specialties: ['Management'],
        icon: Shield,
        color: 'from-pink-500 to-purple-500',
        socials: {
          github: 'Shinmegumi',
        },
      },
    ],
  },
]

/* export interface PastMember {
  name: string
  role: string
  avatar?: string
  specialties?: string[]
  socials?: { github?: string }
}

export const pastMembers: PastMember[] = [
  {
    name: 'Briar',
    role: 'Ex-Developer',
    specialties: ['Development'],
  },
  {
    name: 'deathmaul',
    role: 'Ex-Member',
    avatar:
      'https://cdn.discordapp.com/avatars/1098308248773349406/99cc7ab79950f5dd22be250a9e2a0921.webp?size=128',
    specialties: ['Development'],
    socials: {
      github: '#',
    },
  },
] */

const activeMembers = teamSections.reduce((total, section) => total + section.members.length, 0)
const totalContributors = activeMembers
const uniqueSpecialties = new Set(
  teamSections.flatMap((section) => section.members.flatMap((member) => member.specialties)),
).size

export const teamStats = [
  { label: 'ACTIVE MEMBERS', value: activeMembers.toString() },
  { label: 'TOTAL CONTRIBUTORS', value: totalContributors.toString() },
  { label: 'COMMITS', value: '27K+' },
  { label: 'UNIQUE SKILLS', value: uniqueSpecialties.toString() },
]
