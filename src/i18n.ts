export type Locale = 'pt' | 'en' | 'de'

export const locales: { id: Locale; label: string }[] = [
  { id: 'pt', label: 'PT' },
  { id: 'en', label: 'EN' },
  { id: 'de', label: 'DE' },
]

export function detectLocale(): Locale {
  const stored = window.localStorage.getItem('sidequest-locale')
  if (stored === 'pt' || stored === 'en' || stored === 'de') return stored
  const browser = navigator.language.slice(0, 2).toLowerCase()
  if (browser === 'de') return 'de'
  if (browser === 'pt') return 'pt'
  return 'en'
}

export type EnergyKey = 'low' | 'medium' | 'high'
export type ModeKey = 'home' | 'street' | 'social'

export const energyLabels: Record<Locale, Record<EnergyKey, string>> = {
  pt: { low: 'baixa', medium: 'média', high: 'alta' },
  en: { low: 'low', medium: 'medium', high: 'high' },
  de: { low: 'niedrig', medium: 'mittel', high: 'hoch' },
}

export const modeLabels: Record<Locale, Record<ModeKey, string>> = {
  pt: { home: 'casa', street: 'rua', social: 'social' },
  en: { home: 'home', street: 'street', social: 'social' },
  de: { home: 'zuhause', street: 'unterwegs', social: 'sozial' },
}

type UiStrings = {
  brand: string
  levelLabel: string
  levelCount: (n: string) => string
  eyebrow: string
  heroTitleBefore: string
  heroTitleHighlight: string
  heroBody: string
  stickerLabel: string
  builderStep: string
  builderTitle: string
  builderBody: string
  timeQuestion: string
  minutesShort: string
  energyQuestion: string
  modeQuestion: string
  generateButton: string
  questLabel: string
  rewardLabel: string
  completeButton: string
  completeButtonDone: string
  rerollButton: string
  emptyTitle: string
  emptyBody: string
  footerTagline: string
  cookieBody: string
  cookieAccept: string
  cookieReject: string
}

export const ui: Record<Locale, UiStrings> = {
  pt: {
    brand: 'SideQuest',
    levelLabel: 'Nível local',
    levelCount: n => `${n} missões`,
    eyebrow: 'Antídoto para o piloto automático',
    heroTitleBefore: 'O teu dia precisa de uma ',
    heroTitleHighlight: 'side quest.',
    heroBody: 'Escolhe o tempo, a energia e o terreno. Nós tratamos da pequena aventura.',
    stickerLabel: 'missão\nsecreta',
    builderStep: '01',
    builderTitle: 'Configura a missão',
    builderBody: 'Não há escolhas erradas. Só níveis diferentes de caos.',
    timeQuestion: 'Quanto tempo tens?',
    minutesShort: 'min',
    energyQuestion: 'Energia disponível',
    modeQuestion: 'Terreno',
    generateButton: 'Gerar side quest',
    questLabel: 'Missão',
    rewardLabel: 'Recompensa',
    completeButton: 'Aceitar e concluir',
    completeButtonDone: 'Missão cumprida ✓',
    rerollButton: 'Outra missão',
    emptyTitle: 'A missão ainda está escondida.',
    emptyBody: 'Configura o teu nível de disponibilidade e carrega no botão.',
    footerTagline: 'Sem contas · sem produtividade tóxica · só curiosidade',
    cookieBody: 'Uso o Google Analytics para perceber quantas pessoas visitam este projeto. Aceitas cookies analíticos?',
    cookieAccept: 'Aceitar',
    cookieReject: 'Recusar',
  },
  en: {
    brand: 'SideQuest',
    levelLabel: 'Local level',
    levelCount: n => `${n} quests`,
    eyebrow: 'An antidote for autopilot',
    heroTitleBefore: 'Your day needs a ',
    heroTitleHighlight: 'side quest.',
    heroBody: 'Pick your time, energy, and terrain. We take care of the small adventure.',
    stickerLabel: 'secret\nmission',
    builderStep: '01',
    builderTitle: 'Set up the mission',
    builderBody: "There are no wrong choices. Just different levels of chaos.",
    timeQuestion: 'How much time do you have?',
    minutesShort: 'min',
    energyQuestion: 'Available energy',
    modeQuestion: 'Terrain',
    generateButton: 'Generate side quest',
    questLabel: 'Quest',
    rewardLabel: 'Reward',
    completeButton: 'Accept and complete',
    completeButtonDone: 'Quest complete ✓',
    rerollButton: 'Another quest',
    emptyTitle: 'The mission is still hidden.',
    emptyBody: 'Set your availability level and hit the button.',
    footerTagline: 'No accounts · no toxic productivity · just curiosity',
    cookieBody: 'I use Google Analytics to understand how many people visit this project. Do you accept analytics cookies?',
    cookieAccept: 'Accept',
    cookieReject: 'Reject',
  },
  de: {
    brand: 'SideQuest',
    levelLabel: 'Lokales Level',
    levelCount: n => `${n} Missionen`,
    eyebrow: 'Ein Gegenmittel für den Autopiloten',
    heroTitleBefore: 'Dein Tag braucht eine ',
    heroTitleHighlight: 'Side Quest.',
    heroBody: 'Wähle Zeit, Energie und Umgebung. Wir kümmern uns um das kleine Abenteuer.',
    stickerLabel: 'geheime\nMission',
    builderStep: '01',
    builderTitle: 'Mission einrichten',
    builderBody: 'Es gibt keine falschen Entscheidungen. Nur verschiedene Grade an Chaos.',
    timeQuestion: 'Wie viel Zeit hast du?',
    minutesShort: 'Min',
    energyQuestion: 'Verfügbare Energie',
    modeQuestion: 'Umgebung',
    generateButton: 'Side Quest generieren',
    questLabel: 'Mission',
    rewardLabel: 'Belohnung',
    completeButton: 'Annehmen und abschließen',
    completeButtonDone: 'Mission erfüllt ✓',
    rerollButton: 'Andere Mission',
    emptyTitle: 'Die Mission ist noch versteckt.',
    emptyBody: 'Stelle dein Verfügbarkeitslevel ein und drücke den Knopf.',
    footerTagline: 'Keine Konten · keine toxische Produktivität · nur Neugier',
    cookieBody: 'Ich verwende Google Analytics, um zu verstehen, wie viele Menschen dieses Projekt besuchen. Akzeptierst du Analyse-Cookies?',
    cookieAccept: 'Akzeptieren',
    cookieReject: 'Ablehnen',
  },
}
