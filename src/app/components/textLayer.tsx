'use client'

import { useDraggableText, buildWrapperStyle, buildTextStyle } from '../tools/useDraggableText'

interface TextLayerProps {
  field: 'title' | 'subtitle'
  html: string
  style: TextStyle
  fontFamily?: string
  className?: string
}

/**
 * 可拖动的文字层
 * - 外层负责 transform、拖动、水平对齐
 * - 内层 span 负责字体、颜色、背景色，且背景色只包裹实际文字长度
 */
const TextLayer = ({ field, html, style, fontFamily, className }: TextLayerProps) => {
  const drag = useDraggableText(field)

  return (
    <div
      className={className}
      style={{ ...drag.style, ...buildWrapperStyle(style) }}
      onPointerDown={drag.onPointerDown}>
      <span
        style={buildTextStyle(style, fontFamily)}
        className='[&>*]:inline [&>*]:bg-inherit'
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export default TextLayer
