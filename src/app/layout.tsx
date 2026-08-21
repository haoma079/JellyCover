import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import './assets/css/patterns.css'
import { CoverProvider } from './components/coverContext'
import { LanguageProvider } from './i18n'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jellycover.pages.dev'
const SITE_NAME = '水母封面'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - 免费在线封面生成器`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    '水母封面是一个简单、免费的在线封面生成器：标题副标题自由拖动缩放，图标可选可隐，一键导出公众号、小红书等多平台封面图。',
  keywords: [
    '水母封面',
    '封面生成器',
    '在线封面制作',
    '公众号封面',
    '小红书封面',
    '文章配图',
    '免费设计工具',
    'Cover Generator',
    'JellyCover',
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - 免费在线封面生成器`,
    description: '标题副标题自由拖动缩放，图标可选可隐，一键导出多平台封面图。',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - 免费在线封面生成器`,
    description: '标题副标题自由拖动缩放，图标可选可隐，一键导出多平台封面图。',
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: [{ url: '/favicon-180-precomposed.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#6E56CF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      '水母封面是一个简单、免费的在线封面生成器，支持标题副标题拖动缩放、图标可选、多平台尺寸导出。',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any',
    inLanguage: 'zh-CN',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY',
    },
  }

  return (
    <html lang='zh-CN' suppressHydrationWarning>
      <body className='antialiased' suppressHydrationWarning>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <CoverProvider>{children}</CoverProvider>
        </LanguageProvider>
        {/* cloudflare analytics：填了 NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN 才渲染；
            若用 CF Pages 后台「Web Analytics」开关自动注入，则留空即可，二者不冲突 */}
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN && (
          <Script
            defer
            src='https://static.cloudflareinsights.com/beacon.min.js'
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN}"}`}
          />
        )}
      </body>
    </html>
  )
}
