'use client'

import Link from 'next/link'
import { useI18n } from '@/app/i18n'

export default function SiteFooter() {
  const { t } = useI18n()
  return (
    <footer className='w-full px-4 md:px-12 py-8 flex flex-col items-center gap-3 bg-zinc-50 border-t border-zinc-100'>
      <nav className='flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-zinc-500'>
        <Link href='/' className='hover:text-[#6E56CF] transition-colors'>
          {t('nav.home')}
        </Link>
        <Link href='/editor' className='hover:text-[#6E56CF] transition-colors'>
          {t('nav.editor')}
        </Link>
        <Link href='/privacy' className='hover:text-[#6E56CF] transition-colors'>
          {t('nav.privacy')}
        </Link>
        <Link href='/about' className='hover:text-[#6E56CF] transition-colors'>
          {t('nav.about')}
        </Link>
      </nav>
      <p className='text-[11px] text-zinc-400 select-none'>
        Based on{' '}
        <a
          target='_blank'
          href='https://github.com/weizwz/cover'
          className='underline decoration-zinc-300 hover:text-zinc-500 transition-colors'>
          weizwz/cover
        </a>{' '}
        · MIT License
      </p>
    </footer>
  )
}
