'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useI18n } from '@/app/i18n'

// 赞助弹窗仅在客户端渲染，避免 Radix Dialog 的 useId 在 SSR/CSR 间不一致触发水合警告
const DonateDialog = dynamic(() => import('./donateDialog'), { ssr: false })

export default function Head({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n()

  return (
    <header className='h-14 fixed border-b top-0 z-40 w-full bg-white/80 backdrop-blur-sm shadow-xs'>
      <div className={`h-full px-4 md:px-8 flex justify-between items-center ${className}`}>
        <Link className='h-full flex items-center cursor-pointer' href='/'>
          <img src='/logo.svg' alt={t('nav.logoAlt')} className='w-7 h-7' />
          <div className='text-xl ml-2 font-bold font-mono text-[#6E56CF]'>{t('nav.logoAlt')}</div>
        </Link>

        <div className='flex items-center gap-2'>
          <div className='flex items-center rounded-full border border-zinc-200 p-0.5 text-xs'>
            <button
              onClick={() => setLang('zh')}
              className={`cursor-pointer px-2.5 py-1 rounded-full transition-colors ${
                lang === 'zh' ? 'bg-[#6E56CF] text-white' : 'text-zinc-500 hover:text-zinc-800'
              }`}>
              中
            </button>
            <button
              onClick={() => setLang('en')}
              className={`cursor-pointer px-2.5 py-1 rounded-full transition-colors ${
                lang === 'en' ? 'bg-[#6E56CF] text-white' : 'text-zinc-500 hover:text-zinc-800'
              }`}>
              EN
            </button>
          </div>

          <DonateDialog />
        </div>
      </div>
    </header>
  )
}
