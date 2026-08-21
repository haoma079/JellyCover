'use client'

import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { CoverContext } from '../components/coverContext'
import { getBackgroundStyle, hasBackgroundImage, shouldShowPattern } from '../tools/backgroundUtils'
import { useDraggableText } from '../tools/useDraggableText'
import TextLayer from '../components/textLayer'

const iconifyHost = process.env.NEXT_PUBLIC_API_ICONIFY_URL

const BackgroundTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, subtitle, icon, font, customIcon, showIcon, titleStyle, subtitleStyle } = config
  const { coverSetting, setCoverSetting } = useContext(CoverContext)
  const iconDrag = useDraggableText('icon')

  const backgroundStyle = getBackgroundStyle(coverSetting.bg)
  const hasImage = hasBackgroundImage(coverSetting.bg)
  const showPattern = shouldShowPattern(coverSetting.bg)

  return (
    <div className='overflow-hidden flex w-full h-full' data-cover-root style={backgroundStyle}>
      {hasImage ? (
        <div className='w-full h-full relative flex group'>
          <div className='h-full absolute top-0 right-0 left-0 p-12'>
            {coverSetting.bg.type === 'unsplash' && (
              <Button
                className='ignore hidden cursor-pointer absolute top-4 right-4 rounded-full text-center group-hover:flex'
                variant='outline'
                size='icon'
                onClick={() =>
                  setCoverSetting({
                    ...coverSetting,
                    bg: { ...coverSetting.bg, type: 'color', unsplashUrl: undefined }
                  })
                }>
                <X />
              </Button>
            )}

            <div className={`h-full flex flex-col justify-center gap-6 pb-10 text-center text-white`}>
              {showIcon && (
                <div className='flex items-center justify-center'>
                  <img
                    className='w-18 h-18'
                    style={iconDrag.style}
                    onPointerDown={iconDrag.onPointerDown}
                    src={customIcon || `${iconifyHost}/${icon.value}.svg?color=%23fff`}
                    alt={`${icon.label} icon`}
                  />
                </div>
              )}
              <TextLayer
                field='title'
                html={title}
                style={titleStyle}
                fontFamily={font.fontFamily}
                className='text-5xl font-bold text-shadow-lg text-shadow-black'
              />
              <TextLayer
                field='subtitle'
                html={subtitle}
                style={subtitleStyle}
                fontFamily={font.fontFamily}
                className={`text-2xl font-semibold text-shadow-sm text-shadow-black ${subtitle.trim() === '' && 'hidden'}`}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={`realtive w-full h-full flex flex-col justify-center gap-6 p-12 pb-22 text-center text-white`}>
          {showPattern && <div className={`absolute top-0 left-0 w-full h-full z-1 ${coverSetting.pattern.value} ${coverSetting.pattern.isOpacity ? 'opacity-40' : ''}`} />}
          {showIcon && (
            <div className='flex items-center justify-center'>
              <img
                className='w-18 h-18'
                style={iconDrag.style}
                onPointerDown={iconDrag.onPointerDown}
                src={customIcon || `${iconifyHost}/${icon.value}.svg?color=%23fff`}
                alt={`${icon.label} icon`}
              />
            </div>
          )}
          <TextLayer
            field='title'
            html={title}
            style={titleStyle}
            fontFamily={font.fontFamily}
            className='text-5xl font-bold text-shadow-lg text-shadow-black'
          />
          <TextLayer
            field='subtitle'
            html={subtitle}
            style={subtitleStyle}
            fontFamily={font.fontFamily}
            className={`text-2xl font-semibold text-shadow-sm text-shadow-black ${subtitle.trim() === '' && 'hidden'}`}
          />
        </div>
      )}
    </div>
  )
}

export default BackgroundTheme
