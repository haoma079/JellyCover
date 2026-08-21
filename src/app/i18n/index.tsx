'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { dicts, type Lang } from './dict'

type Vars = Record<string, string | number>

interface I18nCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string, vars?: Vars) => string
}

const Ctx = createContext<I18nCtx | null>(null)

function detect(): Lang {
  if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('zh')) return 'zh'
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const saved = (localStorage.getItem('lang') as Lang | null) ?? detect()
    setLangState(saved === 'zh' || saved === 'en' ? saved : 'en')
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  const t = (key: string, vars?: Vars) => {
    let s = dicts[lang][key] ?? dicts.en[key] ?? dicts.zh[key] ?? key
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        s = s.replace(`{${k}}`, String(v))
      }
    }
    return s
  }

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    }
  }, [lang])

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>
}

export function useI18n(): I18nCtx {
  const c = useContext(Ctx)
  if (!c) throw new Error('useI18n must be used within LanguageProvider')
  return c
}

export const useT = () => useI18n().t
export const useLang = () => useI18n().lang
