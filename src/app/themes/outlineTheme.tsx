'use client'

import { useContext } from 'react'
import { CoverContext } from '../components/coverContext'
import { getBackgroundStyle, shouldShowPattern } from '../tools/backgroundUtils'
import { useDraggableText } from '../tools/useDraggableText'
import TextLayer from '../components/textLayer'

const iconifyHost = process.env.NEXT_PUBLIC_API_ICONIFY_URL

const OutlineTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, subtitle, pattern, icon, font, customIcon, showIcon, titleStyle, subtitleStyle } = config
  const { coverSetting } = useContext(CoverContext)
  const iconDrag = useDraggableText('icon')

  const backgroundStyle = getBackgroundStyle(coverSetting.bg)
  const showPattern = shouldShowPattern(coverSetting.bg)

  return (
    <div className={`w-full h-full text-white relative`} data-cover-root style={backgroundStyle}>
      {showPattern && <div className={`absolute w-full h-full ${pattern.value} ${pattern.isOpacity ? 'opacity-40' : ''}`} />}
      <div className={`w-full h-full p-24 pb-34 flex flex-col gap-6 justify-center relative z-10`}>
        {showIcon && (
          <div className='items-center flex'>
            <img
              className='w-18 h-18'
              style={iconDrag.style}
              onPointerDown={iconDrag.onPointerDown}
              src={customIcon || `${iconifyHost}/${icon.value}.svg?color=%23fff`}
              alt={`${icon.label} icon`}
            />
          </div>
        )}
        <div className='flex flex-col gap-6'>
          <TextLayer
            field='title'
            html={title}
            style={titleStyle}
            fontFamily={font.fontFamily}
            className='text-5xl text-shadow-lg text-shadow-black'
          />
          <TextLayer
            field='subtitle'
            html={subtitle}
            style={subtitleStyle}
            fontFamily={font.fontFamily}
            className={`text-2xl text-shadow-sm text-shadow-black ${subtitle.trim() === '' && 'hidden'}`}
          />
        </div>
      </div>
    </div>
  )
}

export default OutlineTheme
