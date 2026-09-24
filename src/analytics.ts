const GA_MEASUREMENT_ID = 'G-8PWRSDS62T'
const CONSENT_KEY = 'sidequest-analytics-consent'

declare global {
  interface Window {
    dataLayer: unknown[]
    adsbygoogle: unknown[]
  }
}

export type Consent = 'granted' | 'denied'

export function getStoredConsent(): Consent | null {
  const stored = window.localStorage.getItem(CONSENT_KEY)
  return stored === 'granted' || stored === 'denied' ? stored : null
}

export function loadAnalytics() {
  if (document.getElementById('ga4-script')) return
  const script = document.createElement('script')
  script.id = 'ga4-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag(..._args: unknown[]) {
    window.dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID)
}

export function loadAds() {
  if (document.getElementById('adsbygoogle-script')) return
  const script = document.createElement('script')
  script.id = 'adsbygoogle-script'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4561414438757131`
  document.head.appendChild(script)

  // Auto ads (enable_page_level_ads) ficam desligados: nesta app, o posicionamento
  // automático da Google acaba por colocar anúncios no ecrã do gerador de quests,
  // que tem pouco texto e foi a causa da rejeição original do AdSense. Preferimos
  // uma unidade de anúncio manual (ver AdSlot.tsx), colocada apenas onde há
  // conteúdo real (o cartão de resultado da quest).
  window.adsbygoogle = window.adsbygoogle || []
  window.adsbygoogle.push({ google_ad_client: 'ca-pub-4561414438757131' })
}

export function setConsent(value: Consent) {
  window.localStorage.setItem(CONSENT_KEY, value)
  if (value === 'granted') {
    loadAnalytics()
    loadAds()
  }
}
