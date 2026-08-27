'use client'

import React, { useState, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, CirclePlus } from 'lucide-react'
import pcBg from '../assets/images/pc.webp'
import { CoverContext } from '../components/coverContext'
import { getBackgroundStyle, shouldShowPattern } from '../tools/backgroundUtils'
import TextLayer from '../components/textLayer'
import { useT } from '@/app/i18n'

const PreviewTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, subtitle, font, size, theme, titleStyle, subtitleStyle } = config
  const { coverSetting } = useContext(CoverContext)
  const t = useT()
  const [image, setImage] = useState<string | undefined>(undefined)

  const backgroundStyle = getBackgroundStyle(coverSetting.bg)
  const showPattern = shouldShowPattern(coverSetting.bg)

  return (
    <div className={`w-full h-full flex flex-col overflow-hidden relative`} data-cover-root style={backgroundStyle}>
      {showPattern && <div className={`absolute top-0 left-0 w-full h-full z-1 ${coverSetting.pattern.value} ${coverSetting.pattern.isOpacity ? 'opacity-40' : ''}`} />}
      <div
        className={`h-full flex flex-col items-center ${
          size.value.indexOf('vertical') >= 0 ? 'justify-center' : ''
        } relative z-10 p-16 text-center`}>
        <TextLayer
          field='subtitle'
          html={subtitle}
          style={subtitleStyle}
          fontFamily={font.fontFamily}
          className={`text-2xl mb-2 font-semibold text-white text-shadow-sm text-shadow-black ${subtitle.trim() === '' && 'hidden'}`}
        />
        <TextLayer
          field='title'
          html={title}
          style={titleStyle}
          fontFamily={font.fontFamily}
            className='text-5xl font-bold text-white text-shadow-lg text-shadow-black'
            autoFit
          />

        <div className='w-full aspect-[1.5382] group flex flex-col relative'>
          <img src={pcBg.src} className='absolute top-0 left-0 w-full z-10' alt='background' />

          {image ? (
            // 图片宽高比1.5382 显示区域宽高比1.5397  显示区域宽占总内容区域比0.7667
            <div className='relative w-full h-full flex'>
              <div className='absolute inset-y-[11.64%] inset-x-[11.62%] w-[76.76%] aspect-[1.5397] overflow-hidden'>
                <img src={image} className={`w-full object-cover object-top`} alt='preview' style={{height: theme.stretchY ? '100%' : ''}}/>
              </div>
              <Button
                className='ignore hidden cursor-pointer absolute z-10 top-4 right-4 rounded-full text-center group-hover:flex'
                variant='outline'
                size='icon'
                onClick={() => setImage(undefined)}>
                <X />
              </Button>
            </div>
          ) : (
            <div className='ignore absolute z-10 inset-y-[11.58%] inset-x-[11.66%] w-[76.68%] aspect-[1.5397] px-4 py-12 flex flex-col items-center'>
              <div className='w-fit rounded-md overflow-hidden mb-4 relative'>
                <Input
                  type='file'
                  accept='image/png, image/jpeg, image/webp'
                  className='cursor-pointer bg-white/80'
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(URL.createObjectURL(e.target.files[0]))
                    }
                  }}
                />
                <div className='absolute top-0 right-0 w-full h-full px-4 flex items-center justify-between bg-white pointer-events-none'>
                  <p className='text-gray-800 whitespace-nowrap'>{t('theme.chooseFile')}</p>
                  <CirclePlus className='w-5 h-5' />
                </div>
              </div>
              <div className='p-4 text-gray-800 text-sm bg-white/80 rounded-lg shadow-md'>
                <p className='text-left'>{t('theme.tipTitle')}</p>
                <p className='text-gray-600'>{t('theme.tipText')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PreviewTheme
