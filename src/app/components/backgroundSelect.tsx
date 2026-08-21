'use client'

import React, { useContext, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Globe, Palette } from 'lucide-react'
import { CoverContext } from './coverContext'
import UnsplashSearch from './unsplashSearch'
import GradientSelect from './gradientSelect'
import { useI18n } from '@/app/i18n'

const BackgroundSelect = () => {
  const { coverSetting, setCoverSetting } = useContext(CoverContext)
  const { t } = useI18n()
  const backgroundInputRef = useRef<HTMLInputElement>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [gradientDialogOpen, setGradientDialogOpen] = useState(false)

  // 处理背景图片上传
  const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = URL.createObjectURL(e.target.files[0])
      setCoverSetting({
        ...coverSetting,
        bg: {
          ...coverSetting.bg,
          image,
          type: 'local',
          unsplashUrl: undefined
        }
      })
    }
  }

  // 处理颜色选择
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoverSetting({
      ...coverSetting,
      bg: {
        color: e.target.value,
        image: undefined,
        type: 'color',
        unsplashUrl: undefined,
        gradient: undefined
      }
    })
  }

  // 处理在线图片选择
  const handleUnsplashSelect = () => {
    setDialogOpen(false)
  }

  // 处理渐变色选择
  const handleGradientSelect = () => {
    setGradientDialogOpen(false)
  }

  return (
    <div className='flex-1 flex items-stretch gap-2 overflow-hidden'>
      <Input
        type='color'
        className='w-12 md:w-14 h-9 p-1 rounded-md border cursor-pointer shrink-0'
        value={coverSetting.bg.color}
        onChange={handleColorChange}
      />

      <div className='flex-1 flex flex-wrap items-center gap-1.5 min-w-0'>
        {/* 渐变色按钮 */}
        <Dialog open={gradientDialogOpen} onOpenChange={setGradientDialogOpen}>
          <DialogTrigger asChild>
            <Button className='cursor-pointer h-9 px-2 flex-1 min-w-[52px]'>{t('bg.gradient')}</Button>
          </DialogTrigger>
          <DialogContent className='max-w-4xl! w-[90vw] max-h-[90vh] flex flex-col overflow-hidden bg-linear-to-br from-white to-gray-50'>
            <DialogHeader className='border-b border-gray-100 pb-4'>
              <DialogTitle className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
                <div className='w-8 h-8 bg-linear-to-r from-pink-500 to-violet-600 rounded-lg flex items-center justify-center'>
                  <Palette className='w-4 h-4 text-white' />
                </div>
                {t('bg.gradientTitle')}
              </DialogTitle>
              <p className='text-sm text-gray-600 mt-2'>{t('bg.gradientDesc')}</p>
            </DialogHeader>
            <GradientSelect onGradientSelect={handleGradientSelect} />
          </DialogContent>
        </Dialog>

        {/* 在线图片按钮 */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className='cursor-pointer h-9 px-2 flex-1 min-w-[52px]'>{t('bg.online')}</Button>
          </DialogTrigger>
          <DialogContent className='max-w-4xl! w-[90vw] max-h-[90vh] flex flex-col overflow-hidden bg-linear-to-br from-white to-gray-50'>
            <DialogHeader className='border-b border-gray-100 pb-4'>
              <DialogTitle className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
                <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                  <Globe className='w-4 h-4 text-white' />
                </div>
                {t('bg.onlineTitle')}
              </DialogTitle>
              <p className='text-sm text-gray-600 mt-2'>
                {t('bg.onlineDesc')}{' '}
                <a className='text-primary' href='https://unsplash.com/' target='_blank'>
                  Unsplash
                </a>
              </p>
            </DialogHeader>
            <UnsplashSearch largeImgPreview={true} onImageSelect={handleUnsplashSelect} />
          </DialogContent>
        </Dialog>

        {/* 本地上传按钮 */}
        <div className='relative h-9 flex-1 min-w-[52px]'>
          <Input
            ref={backgroundInputRef}
            type='file'
            accept='image/png, image/jpeg, image/webp, image/jpg'
            className='absolute inset-0 opacity-0 cursor-pointer z-10'
            onChange={handleBackgroundImageChange}
          />
          <Button className='cursor-pointer h-9 px-2 w-full'>{t('bg.upload')}</Button>
        </div>
      </div>
    </div>
  )
}

export default BackgroundSelect
