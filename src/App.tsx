import { Fragment, useEffect, useMemo, useState } from 'react'
import { getQuestText, questList, type QuestBase, type Time } from './data/quests'
import { detectLocale, energyLabels, locales, modeLabels, ui, type EnergyKey, type Locale, type ModeKey } from './i18n'
import { getStoredConsent, loadAnalytics } from './analytics'
import CookieConsent from './CookieConsent'

const readCompleted = () => {
  try {
    const value = Number(localStorage.getItem('sidequest-completed') ?? 0)
    return Number.isFinite(value) && value >= 0 ? value : 0
  } catch { return 0 }
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => detectLocale())
  const [time, setTime] = useState<Time>(15)
  const [energy, setEnergy] = useState<EnergyKey>('medium')
  const [mode, setMode] = useState<ModeKey>('home')
  const [quest, setQuest] = useState<QuestBase | null>(null)
  const [completed, setCompleted] = useState(readCompleted)
  const [celebrating, setCelebrating] = useState(false)

  const t = ui[locale]

  useEffect(() => {
    window.localStorage.setItem('sidequest-locale', locale)
    document.documentElement.setAttribute('lang', locale)
  }, [locale])

  useEffect(() => {
    if (getStoredConsent() === 'granted') loadAnalytics()
  }, [])

  const available = useMemo(
    () => questList.filter(item => item.time <= time && item.energy.includes(energy) && item.mode === mode),
    [time, energy, mode],
  )

  const generate = () => {
    const pool = available.length > 0 ? available : questList.filter(item => item.time <= time && item.energy.includes(energy))
    const alternatives = pool.filter(item => item.id !== quest?.id)
    const choices = alternatives.length > 0 ? alternatives : pool
    setQuest(choices[Math.floor(Math.random() * choices.length)] ?? questList[0])
    setCelebrating(false)
  }

  const complete = () => {
    const next = completed + 1
    setCompleted(next)
    setCelebrating(true)
    try { localStorage.setItem('sidequest-completed', String(next)) } catch { /* armazenamento opcional */ }
  }

  const questCopy = quest ? getQuestText(quest.id, locale) : null

  return <div className="app-shell">
    <header>
      <a className="brand" href="#top" aria-label={`${t.brand}, início`}><span>SQ</span><strong>{t.brand}</strong></a>
      <div className="header-right">
        <div className="locale-switch" role="group" aria-label="Language">
          {locales.map(item => (
            <button key={item.id} type="button" className={locale === item.id ? 'active' : ''} onClick={() => setLocale(item.id)}>{item.label}</button>
          ))}
        </div>
        <div className="level"><span>{t.levelLabel}</span><strong>{t.levelCount(completed.toString().padStart(2, '0'))}</strong></div>
      </div>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">{t.eyebrow}</span>
          <h1>{t.heroTitleBefore}<em>{t.heroTitleHighlight}</em></h1>
          <p>{t.heroBody}</p>
        </div>
        <div className="hero-sticker" aria-hidden="true">
          <span>?</span>
          <small>{t.stickerLabel.split('\n').map((line, index) => <Fragment key={index}>{index > 0 && <br />}{line}</Fragment>)}</small>
        </div>
      </section>

      <section className="quest-builder" aria-labelledby="builder-title">
        <div className="builder-heading"><span>{t.builderStep}</span><div><h2 id="builder-title">{t.builderTitle}</h2><p>{t.builderBody}</p></div></div>
        <div className="controls">
          <fieldset>
            <legend>{t.timeQuestion}</legend>
            <div className="button-group">{([5, 15, 30] as Time[]).map(value => <button type="button" key={value} className={time === value ? 'active' : ''} aria-pressed={time === value} onClick={() => setTime(value)}>{value} {t.minutesShort}</button>)}</div>
          </fieldset>
          <fieldset>
            <legend>{t.energyQuestion}</legend>
            <div className="button-group">{(['low', 'medium', 'high'] as EnergyKey[]).map(value => <button type="button" key={value} className={energy === value ? 'active' : ''} aria-pressed={energy === value} onClick={() => setEnergy(value)}>{energyLabels[locale][value]}</button>)}</div>
          </fieldset>
          <fieldset>
            <legend>{t.modeQuestion}</legend>
            <div className="button-group">{(['home', 'street', 'social'] as ModeKey[]).map(value => <button type="button" key={value} className={mode === value ? 'active' : ''} aria-pressed={mode === value} onClick={() => setMode(value)}>{modeLabels[locale][value]}</button>)}</div>
          </fieldset>
        </div>
        <button className="generate-button" type="button" onClick={generate}><span>{t.generateButton}</span><i>↗</i></button>
      </section>

      <section className={`quest-zone ${quest ? 'has-quest' : ''} ${celebrating ? 'is-complete' : ''}`} aria-live="polite">
        {quest && questCopy ? <article className="quest-card">
          <div className="quest-meta"><span>{t.questLabel} #{quest.id.toUpperCase().slice(0, 4)}</span><span>{quest.time} {t.minutesShort} · {modeLabels[locale][quest.mode]}</span></div>
          <div className="quest-icon" aria-hidden="true">{quest.icon}</div>
          <h2>{questCopy.title}</h2>
          <p>{questCopy.description}</p>
          <div className="reward"><span>{t.rewardLabel}</span><strong>{questCopy.reward}</strong></div>
          <div className="quest-actions">
            <button type="button" className="complete-button" onClick={complete} disabled={celebrating}>{celebrating ? t.completeButtonDone : t.completeButton}</button>
            <button type="button" className="reroll-button" onClick={generate}>{t.rerollButton}</button>
          </div>
        </article> : <div className="empty-quest"><span>✦</span><h2>{t.emptyTitle}</h2><p>{t.emptyBody}</p></div>}
      </section>
    </main>

    <footer>
      <span>{t.brand} © {new Date().getFullYear()}</span>
      <span>{t.footerTagline}</span>
      <a href="https://vibe-portfolio-one.vercel.app/" target="_blank" rel="noreferrer">Created by Bruno Rendeiro</a>
      <span className="powered-badge">⚡ Powered by AI</span>
    </footer>
    <CookieConsent locale={locale} />
  </div>
}
