'use client'

import { useContext } from 'react'
import { CoverContext } from '../components/coverContext'
import { getBackgroundStyle, shouldShowPattern } from '../tools/backgroundUtils'
import { useDraggableText } from '../tools/useDraggableText'
import TextLayer from '../components/textLayer'

const iconifyHost = process.env.NEXT_PUBLIC_API_ICONIFY_URL

const BasicTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, subtitle, pattern, icon, font, customIcon, showIcon, titleStyle, subtitleStyle } = config
  const { coverSetting } = useContext(CoverContext)
  const iconDrag = useDraggableText('icon')

  const backgroundStyle = getBackgroundStyle(coverSetting.bg)
  const showPattern = shouldShowPattern(coverSetting.bg)

  return (
    <div className={`flex text-gray-800 justify-center items-center h-full p-16 relative`} data-cover-root style={backgroundStyle}>
      {showPattern && <div className={`absolute w-full h-full ${pattern.value} ${pattern.isOpacity ? 'opacity-40' : ''}`} />}
      <div
        className={`w-full h-full max-h-[360px] max-w-[640px] flex flex-col justify-center items-center gap-6 p-12 bg-white rounded-2xl relative z-10`}>
        <TextLayer
          field='title'
          html={title}
          style={titleStyle}
          fontFamily={font.fontFamily}
          className='text-5xl'
          autoFit
        />
        <div className='w-full flex justify-center items-center gap-4'>
          {showIcon && (
            <img
              className='w-10 h-10'
              style={iconDrag.style}
              onPointerDown={iconDrag.onPointerDown}
              src={customIcon || `${iconifyHost}/${icon.value}.svg`}
              alt={`${icon.label} icon`}
            />
          )}
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

export default BasicTheme
