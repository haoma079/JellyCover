import type { Metadata } from 'next'
import Head from '@/app/components/head'
import SiteFooter from '@/app/components/siteFooter'
import PrivacyContent from './privacyContent'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jellycover.pages.dev'

export const metadata: Metadata = {
  title: '隐私政策',
  description:
    '水母封面（JellyCover）隐私政策：说明我们如何收集、使用与保护您的信息，包含 Cookie、本地存储、第三方服务与广告相关说明。',
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <div className='min-h-screen flex flex-col bg-white'>
      <Head />
      <main className='flex-1 pt-14 px-4 md:px-8 py-10'>
        <PrivacyContent />
      </main>
      <SiteFooter />
    </div>
  )
}
