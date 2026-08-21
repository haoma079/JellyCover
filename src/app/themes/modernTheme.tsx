'use client'

import { useContext } from 'react'
import { CoverContext } from '../components/coverContext'
import { getBackgroundStyle, shouldShowPattern } from '../tools/backgroundUtils'
import { useDraggableText } from '../tools/useDraggableText'
import TextLayer from '../components/textLayer'

const iconifyHost = process.env.NEXT_PUBLIC_API_ICONIFY_URL

const ModernTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, subtitle, pattern, icon, font, customIcon, size, showIcon, titleStyle, subtitleStyle } = config
  const { coverSetting } = useContext(CoverContext)
  const iconDrag = useDraggableText('icon')

  const backgroundStyle = getBackgroundStyle(coverSetting.bg)
  const showPattern = shouldShowPattern(coverSetting.bg)

  return (
    <div className={`h-full w-full text-gray-800 relative`} data-cover-root style={backgroundStyle}>
      {showPattern && <div className={`absolute w-full h-full ${pattern.value} ${pattern.isOpacity ? 'opacity-40' : ''}`} />}
      <div className={`w-full h-full flex ${size.value.indexOf('vertical') !== -1 ? 'flex-col' : ''} justify-center items-center gap-8 p-16 relative z-10`}>
        {showIcon && (
          <div className='rounded-full w-32 h-32 bg-white flex items-center justify-center'>
            <img
              className='w-18 h-18'
              style={iconDrag.style}
              onPointerDown={iconDrag.onPointerDown}
              src={customIcon || `${iconifyHost}/${icon.value}.svg`}
              alt={`${icon.label} icon`}
            />
          </div>
        )}
        <div className={`h-full flex-1 max-h-[360px] max-w-[640px] bg-white p-12 flex flex-col justify-center rounded-2xl gap-8`}>
          <TextLayer
            field='title'
            html={title}
            style={titleStyle}
            fontFamily={font.fontFamily}
            className='text-5xl'
          />
          <TextLayer
            field='subtitle'
            html={subtitle}
            style={subtitleStyle}
            fontFamily={font.fontFamily}
            className={`text-2xl ${subtitle.trim() === '' && 'hidden'}`}
          />
        </div>
      </div>
    </div>
  )
}

export default ModernTheme
