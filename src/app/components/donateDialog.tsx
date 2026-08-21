'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Heart } from 'lucide-react'
import { useI18n } from '@/app/i18n'

/**
 * 赞助弹窗单独拆成客户端组件，并用 ssr:false 动态导入，
 * 避免 Radix Dialog 的 useId 在 SSR/CSR 之间不一致导致的水合警告
 * （Next.js dev 模式左下角的红色报错）。
 */
export default function DonateDialog() {
  const { t } = useI18n()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='cursor-pointer gap-1.5 text-[#6E56CF] border-violet-200 hover:bg-violet-50 hover:text-violet-600'>
          <Heart className='w-4 h-4 fill-current' />
          <span className='hidden sm:inline'>{t('nav.supportAuthor')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>{t('donate.title')}</DialogTitle>
          <DialogDescription>{t('donate.desc')}</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col items-center gap-4 py-2'>
          <img src='/qrcode.jpg' alt={t('donate.qrAlt')} className='w-56 h-56 object-contain rounded-lg border' />
          <a
            href='https://mx.sfwz.cc'
            target='_blank'
            className='text-sm text-[#6E56CF] hover:underline'>
            {t('donate.blog')}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
