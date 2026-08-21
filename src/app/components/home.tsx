'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CircleArrowRight } from 'lucide-react'
import { useI18n } from '@/app/i18n'

export default function Main() {
  const { lang, t } = useI18n()
  const lines = (k: string) =>
    t(k)
      .split('\n')
      .map((l, i, arr) => (
        <span key={i}>
          {l}
          {i < arr.length - 1 && <br />}
        </span>
      ))

  return (
    <div className='pt-14 w-full flex flex-col items-center overflow-x-hidden'>
      {/* Hero */}
      <section className='relative w-full px-4 md:px-12 py-20 md:py-28 flex flex-col items-center gap-8 overflow-hidden'>
        {/* 高级浅紫底 + 极淡光晕 */}
        <div className='absolute inset-0 -z-10 bg-gradient-to-br from-white via-[#FAF9FF] to-[#F4F1FB]' />
        <div className='absolute top-10 left-[8%] w-72 h-72 rounded-full bg-[#8B5CF6]/15 blur-3xl' />
        <div className='absolute bottom-12 right-[10%] w-80 h-80 rounded-full bg-[#6E56CF]/10 blur-3xl' />

        <div className='font-bold text-center relative z-10'>
          <h1 className='text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-[#6E56CF] via-[#7C6FF0] to-[#A78BFA] bg-clip-text text-transparent mb-4'>
            {t('home.heroTitle')}
          </h1>
          <h2 className='text-2xl md:text-4xl font-bold mt-4 text-zinc-700'>
            {lang === 'zh' ? (
              <>
                一个<span className='text-[#6E56CF]'>{t('home.heroSub_simple')}</span>、<span className='text-[#7C6FF0]'>{t('home.heroSub_free')}</span>的
                <span className='text-[#A78BFA]'>{t('home.heroSub_gen')}</span>
              </>
            ) : (
              <span className='text-[#A78BFA]'>{`${t('home.heroSub_simple')}, ${t('home.heroSub_free')} ${t('home.heroSub_gen')}`}</span>
            )}
          </h2>
          <p className='mt-4 text-zinc-500 max-w-xl mx-auto text-base md:text-lg'>{t('home.heroDesc')}</p>
        </div>
        <Link href='/editor' className='flex justify-center mt-2 relative z-10'>
          <Button className='cursor-pointer md:py-6 md:px-16 md:text-lg font-bold rounded-full shadow-lg shadow-[#6E56CF]/20 bg-gradient-to-r from-[#6E56CF] to-[#8B5CF6] hover:opacity-90 transition-opacity'>
            {t('home.ctaStart')}
          </Button>
        </Link>
      </section>

      <section className='w-full px-4 md:px-12 py-12 flex flex-col items-center bg-[#FAFAFB] gap-4 relative'>
        <h2 className='text-2xl md:text-3xl font-bold text-[#6E56CF]'>{t('home.featuresTitle')}</h2>
        <div className='flex justify-center items-center flex-wrap gap-4'>
          <Badge className='px-3 py-1 rounded-full bg-violet-500/10 border-violet-500/20 text-violet-600' variant='secondary'>
            {t('home.badge.theme')}
          </Badge>
          <Badge className='px-3 py-1 rounded-full bg-violet-500/10 border-violet-500/20 text-violet-600' variant='secondary'>
            {t('home.badge.icon')}
          </Badge>
          <Badge className='px-3 py-1 rounded-full bg-violet-500/10 border-violet-500/20 text-violet-600' variant='secondary'>
            {t('home.badge.textDrag')}
          </Badge>
          <Badge className='px-3 py-1 rounded-full bg-violet-500/10 border-violet-500/20 text-violet-600' variant='secondary'>
            {t('home.badge.preview')}
          </Badge>
          <Badge className='px-3 py-1 rounded-full bg-violet-500/10 border-violet-500/20 text-violet-600' variant='secondary'>
            {t('home.badge.responsive')}
          </Badge>
          <Badge className='px-3 py-1 rounded-full bg-violet-500/10 border-violet-500/20 text-violet-600' variant='secondary'>
            {t('home.badge.multiSize')}
          </Badge>
        </div>
        <div className='w-full max-w-360 flex justify-center flex-wrap'>
          <div className='w-full md:w-1/2 xl:w-1/4 p-4 box-border'>
            <Card className='w-full h-full border-violet-100 bg-white/80 backdrop-blur-sm'>
              <CardHeader className='gap-2'>
                <CardTitle className='text-lg text-violet-700'>{t('home.card1Title')}</CardTitle>
                <CardDescription className='text-md text-zinc-700'>{lines('home.card1Desc')}</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/4 p-4 box-border'>
            <Card className='w-full h-full border-violet-100 bg-white/80 backdrop-blur-sm'>
              <CardHeader className='gap-2'>
                <CardTitle className='text-lg text-violet-700'>{t('home.card2Title')}</CardTitle>
                <CardDescription className='text-md text-zinc-700'>{lines('home.card2Desc')}</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/4 p-4 box-border'>
            <Card className='w-full h-full border-violet-100 bg-white/80 backdrop-blur-sm'>
              <CardHeader className='gap-2'>
                <CardTitle className='text-lg text-violet-700'>{t('home.card3Title')}</CardTitle>
                <CardDescription className='text-md text-zinc-700'>{lines('home.card3Desc')}</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/4 p-4 box-border'>
            <Card className='w-full h-full border-violet-100 bg-white/80 backdrop-blur-sm'>
              <CardHeader className='gap-2'>
                <CardTitle className='text-lg text-violet-700'>{t('home.card4Title')}</CardTitle>
                <CardDescription className='text-md text-zinc-700'>{lines('home.card4Desc')}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className='w-full px-4 md:px-12 py-12 flex flex-col items-center gap-4 relative'>
        <h2 className='text-2xl md:text-3xl font-bold'>{t('home.faqTitle')}</h2>
        <div className='w-full max-w-360 flex justify-center flex-wrap px-4'>
          <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='text-md'>{t('home.faq.q1')}</AccordionTrigger>
              <AccordionContent>{lines('home.faq.a1')}</AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger className='text-md'>{t('home.faq.q2')}</AccordionTrigger>
              <AccordionContent>
                {lang === 'zh' ? (
                  <>
                    1. 搜索时请使用英文 <br />
                    2.当前使用的是{' '}
                    <a className='text-[#6E56CF] underline' href='https://icon-sets.iconify.design/' target='_blank'>
                      {t('home.faq.iconify')}
                    </a>
                    ，可以在此平台上找到想要的图标后，再来根据对应的名称进行搜索
                  </>
                ) : (
                  <>
                    1. Search in English <br />
                    2. We use{' '}
                    <a className='text-[#6E56CF] underline' href='https://icon-sets.iconify.design/' target='_blank'>
                      {t('home.faq.iconify')}
                    </a>
                    , find the icon on their site, then search by its name here.
                  </>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-4'>
              <AccordionTrigger className='text-md'>{t('home.faq.q4')}</AccordionTrigger>
              <AccordionContent>{lines('home.faq.a4')}</AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-5'>
              <AccordionTrigger className='text-md'>{t('home.faq.q5')}</AccordionTrigger>
              <AccordionContent>{lines('home.faq.a5')}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className='w-full px-4 md:px-12 py-16 flex flex-col items-center gap-6 bg-gradient-to-r from-[#6E56CF]/5 via-[#8B5CF6]/5 to-[#A78BFA]/5 relative overflow-hidden'>
        <h2 className='text-2xl md:text-3xl font-bold text-[#6E56CF] relative z-10'>{t('home.ctaTitle')}</h2>
        <Link href='/editor' className='flex justify-center pb-4 relative z-10'>
          <Button className='cursor-pointer md:py-6 md:px-16 md:text-lg font-bold rounded-full bg-gradient-to-r from-[#6E56CF] to-[#8B5CF6] hover:opacity-90 transition-opacity shadow-lg'>
            <CircleArrowRight size={24} className='size-6' /> {t('home.ctaTry')}
          </Button>
        </Link>
      </section>

      <footer className='w-full px-4 md:px-12 py-12 flex flex-col items-center gap-4 bg-zinc-50'>
        <div className='flex items-center gap-2'>
          <img src='/logo.svg' alt={t('home.heroTitle')} className='w-6 h-6' />
          <p>
            Copyright © 2025{new Date().getFullYear() === 2025 ? '' : '-' + new Date().getFullYear()}
            <span className='font-bold text-[#6E56CF] ml-2'>{t('home.heroTitle')}</span>
          </p>
        </div>
        <div className='flex flex-wrap items-center justify-center gap-2'>
          <a target='_blank' href='https://nextjs.org/' title={t('footer.nextjs')}>
            <img alt='Next.js' src='https://img.shields.io/badge/Frame-Next.js-000?logo=nextdotjs&amp;logoColor=fff' />
          </a>
          <a target='_blank' href='https://react.dev/' title={t('footer.react')}>
            <img alt='React' src='https://img.shields.io/badge/Language-React-61DAFB?logo=react&amp;logoColor=fff' />
          </a>
          <a target='_blank' href='https://lucide.dev/' title={t('footer.lucide')}>
            <img alt='Lucide' src='https://img.shields.io/badge/Icon-Lucide-F56565?logo=lucide&amp;logoColor=fff' />
          </a>
          <a target='_blank' href='https://tailwindcss.com/' title={t('footer.tailwind')}>
            <img alt='Tailwind CSS' src='https://img.shields.io/badge/CSS-Tailwind CSS-16BCFF?logo=tailwindcss&amp;logoColor=fff' />
          </a>
          <a target='_blank' href='https://ui.shadcn.com/' title={t('footer.shadcn')}>
            <img alt='shadcn/ui' src='https://img.shields.io/badge/UI-shadcnui-000?logo=shadcnui&amp;logoColor=fff' />
          </a>
        </div>
        <p className='text-[11px] text-zinc-400 mt-2 select-none'>
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
    </div>
  )
}
