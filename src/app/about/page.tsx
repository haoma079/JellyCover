import type { Metadata } from 'next'
import Head from '@/app/components/head'
import SiteFooter from '@/app/components/siteFooter'
import AboutContent from './aboutContent'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jellycover.pages.dev'

export const metadata: Metadata = {
  title: '关于',
  description:
    '关于水母封面（JellyCover）：一个简单、免费的在线封面生成器，基于 weizwz/cover 开源项目（MIT 许可），主打多平台尺寸与实时预览。',
  alternates: { canonical: `${SITE_URL}/about` },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <div className='min-h-screen flex flex-col bg-white'>
      <Head />
      <main className='flex-1 pt-14 px-4 md:px-8 py-10'>
        <AboutContent />
      </main>
      <SiteFooter />
    </div>
  )
}
