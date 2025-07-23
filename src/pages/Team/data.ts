import {
  Code2,
  Cpu,
  Shield,
  Wrench,
  Palette,
  Users,
  BookOpen,
  Heart,
  type LucideIcon,
} from 'lucide-react'

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
          'https://cdn.discordapp.com/avatars/393592530442387457/b0b256122e194280620cbb2055ba5fe3.png?size=1024',
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
        name: 'crueter',
        role: 'UI, UI Design, Vulkan, CI/Infrastructure Management',
        avatar:
          'https://cdn.discordapp.com/avatars/1278113100310249553/19ecafb68da801d3634448cb2c5e35a5.png?size=1024',
        specialties: ['UI/UX', 'Vulkan', 'CI/CD', 'Infrastructure'],
        icon: Palette,
        color: 'from-pink-500 to-red-500',
        socials: {
          github: 'crueter',
        },
      },
      {
        name: 'JRaichu',
        role: 'Vulkan and Services',
        avatar:
          'https://cdn.discordapp.com/avatars/1329598497519046828/60d5c7b793316118daba76dced66580e.png?size=1024',
        specialties: ['Vulkan', 'Graphics', 'Services'],
        icon: Palette,
        color: 'from-yellow-500 to-orange-500',
        socials: {
          github: 'JPikachu',
        },
      },
    ],
  },
  {
    title: 'CONTRIBUTORS',
    description: "Talented developers contributing to Eden's success",
    members: [
      {
        name: 'Gamer64',
        role: 'Frontend and Vulkan',
        avatar: 'https://avatars.githubusercontent.com/u/76565986?v=4', // https://cdn.discordapp.com/avatars/593911161226002442/39f31d2b045922931aee3135278f730b.webp?size=1024
        specialties: ['Frontend', 'Vulkan', 'Graphics'],
        icon: Code2,
        color: 'from-green-500 to-emerald-500',
        socials: {
          github: 'Gamer64ytb',
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
          'https://cdn.discordapp.com/avatars/844269232836575294/b55a24dffb204bf3a0e30ba4d060311f.png?size=1024',
        specialties: ['Applets', 'HLE', 'Services', 'CI/CD'],
        icon: Code2,
        color: 'from-teal-500 to-cyan-600',
        socials: {
          github: 'MaranBr',
        },
      },
      {
        name: 'Lizzie841',
        role: 'JIT and Low-Level',
        avatar:
          'https://cdn.discordapp.com/avatars/1221517882022694992/661db1d22085e607415795d9a6ddd909.webp?size=1024',
        specialties: ['JIT Compilation', 'Low-Level', 'Optimization'],
        icon: Cpu,
        color: 'from-pink-500 to-purple-600',
        socials: {
          github: 'Lizzie841',
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
          website: 'https://emuready.com',
        },
      },
    ],
  },
  {
    title: 'DESIGN & SUPPORT',
    description: "The creative minds behind Eden's visual identity and community",
    members: [
      {
        name: 'Antabaka',
        role: 'Graphic Designer',
        avatar:
          'https://i.ibb.co/5hLVqQQW/755d80ac15759b03bbf1ae188f2f8f6b4671a5025228f5f53151231b34494f37.png',
        specialties: ['Logo Design', 'Branding', 'Graphics', 'Mod'],
        icon: Palette,
        color: 'from-pink-500 to-purple-500',
        socials: {
          github: 'AntaBaka02',
        },
      },
      {
        name: 'Bix',
        role: 'Main Web Designer',
        avatar:
          'https://cdn.discordapp.com/avatars/707876199329824798/8ee1442551c6031f6de11c12c9bf282e.png?size=1024',
        specialties: ['Web Design', 'Frontend', 'UX', 'Mod'],
        icon: Users,
        color: 'from-cyan-500 to-teal-500',
        socials: {
          github: 'Bixbr',
          twitter: 'Bixbrit',
          website: 'https://bixed.xyz/',
        },
      },
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
        name: 'Gonaxd',
        role: 'Blog Designer',
        avatar:
          'https://cdn.discordapp.com/avatars/945361056937701466/1121fabd05c1a4434e80a4190e9e0b8d.webp?size=1024',
        specialties: ['Blog Design', 'Content Creation'],
        icon: BookOpen,
        color: 'from-green-500 to-teal-500',
        socials: {
          github: 'PenguinGona',
        },
      },
      {
        name: 'Nevergonna',
        role: 'Professional Gambling Addict',
        avatar:
          'https://cdn.discordapp.com/avatars/726799377535991828/3a5eb51a6013aa30520790e35779dad2.png?size=1024',
        specialties: ['Community Support', 'Testing', 'Memes'],
        icon: Heart,
        color: 'from-yellow-500 to-pink-500',
        socials: {
          discord: '726799377535991828',
        },
      },
    ],
  },
]

export interface PastMember {
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
]

// Calculate stats
const activeMembers = teamSections.reduce((total, section) => total + section.members.length, 0)
const totalContributors = activeMembers + pastMembers.length
const uniqueSpecialties = new Set(
  teamSections.flatMap((section) => section.members.flatMap((member) => member.specialties)),
).size

export const teamStats = [
  { label: 'ACTIVE MEMBERS', value: activeMembers.toString() },
  { label: 'TOTAL CONTRIBUTORS', value: totalContributors.toString() },
  { label: 'COMMITS', value: '27K+' },
  { label: 'UNIQUE SKILLS', value: uniqueSpecialties.toString() },
]
