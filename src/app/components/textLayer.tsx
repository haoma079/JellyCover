'use client'

import { useEffect, useRef, useState } from 'react'
import { useDraggableText, buildWrapperStyle, buildTextStyle } from '../tools/useDraggableText'

interface TextLayerProps {
  field: 'title' | 'subtitle'
  html: string
  style: TextStyle
  fontFamily?: string
  className?: string
  // 自动按容器宽度缩放字号，保证单行不溢出（默认仅标题开启）
  autoFit?: boolean
}

/**
 * 可拖动的文字层
 * - 外层负责 transform、拖动、水平对齐
 * - 内层 span 负责字体、颜色、背景色，且背景色只包裹实际文字长度
 * - autoFit 时：测量文本自然单行宽度 vs 父容器可用宽度，按比例缩小 fontSize 保证单行
 */
const TextLayer = ({ field, html, style, fontFamily, className, autoFit = false }: TextLayerProps) => {
  const drag = useDraggableText(field)
  const wrapRef = useRef<HTMLDivElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)
  const [fitFontPx, setFitFontPx] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (!autoFit) return
    const wrap = wrapRef.current
    const span = spanRef.current
    if (!wrap || !span) return

    const measure = () => {
      const cs = window.getComputedStyle(span)
      const baseFont = parseFloat(cs.fontSize)
      const parent = wrap.parentElement
      const available = parent ? parent.clientWidth : wrap.clientWidth
      if (!baseFont || !available) return

      // 离屏测量：复制字体，nowrap 取自然单行宽度
      const probe = document.createElement('span')
      probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;left:-99999px;top:-99999px;'
      probe.style.fontSize = cs.fontSize
      probe.style.fontWeight = cs.fontWeight
      probe.style.fontStyle = cs.fontStyle
      probe.style.fontFamily = cs.fontFamily
      probe.style.letterSpacing = cs.letterSpacing
      probe.innerHTML = html
      document.body.appendChild(probe)
      const natural = probe.getBoundingClientRect().width
      document.body.removeChild(probe)

      if (natural > 0 && natural > available) {
        // 留 1% 余量，避免 subpixel 误差导致在边界反复缩放
        setFitFontPx(baseFont * (available / natural) * 0.99)
      } else {
        // 已能在单行内容纳：保持当前缩放值，避免重置为 undefined 导致
        // 字号在「原始大小 / 缩放大小」之间反复跳变（闪动）
        setFitFontPx((prev) => (prev === undefined ? baseFont : prev))
      }
    }

    measure()

    let cancelled = false
    // 自定义/网络字体加载完成后宽度会变化，重新测量
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) measure()
      })
    }

    // 容器尺寸变化（换尺寸/改 padding）时重新测量；只监听父容器，
    // 监听文字自身会在每次字号变化时触发测量从而加剧抖动
    const ro = new ResizeObserver(() => measure())
    if (wrap.parentElement) ro.observe(wrap.parentElement)

    return () => {
      cancelled = true
      ro.disconnect()
    }
  }, [html, fontFamily, style, className, autoFit])

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ ...drag.style, ...buildWrapperStyle(style) }}
      onPointerDown={drag.onPointerDown}>
      <span
        ref={spanRef}
        style={buildTextStyle(style, fontFamily, fitFontPx)}
        className='[&>*]:inline [&>*]:bg-inherit'
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export default TextLayer
