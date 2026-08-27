'use client'

import { useCallback, useContext } from 'react'
import { CoverContext } from '../components/coverContext'

export type DraggableField = 'title' | 'subtitle' | 'icon'

export const useDraggableText = (field: DraggableField) => {
  const { coverSetting, setCoverSetting } = useContext(CoverContext)

  const x = field === 'title' ? coverSetting.titleX : field === 'subtitle' ? coverSetting.subtitleX : coverSetting.iconX
  const y = field === 'title' ? coverSetting.titleY : field === 'subtitle' ? coverSetting.subtitleY : coverSetting.iconY
  const scale = field === 'title' ? coverSetting.titleScale : field === 'subtitle' ? coverSetting.subtitleScale : coverSetting.iconScale

  const style: React.CSSProperties = {
    transform: `translate(${x}px, ${y}px) scale(${scale})`,
    transformOrigin: 'center',
    cursor: 'move',
    touchAction: 'none',
    userSelect: 'none'
  }

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault()
      const target = e.currentTarget as HTMLElement
      const container = target.closest('[data-cover-root]') as HTMLElement | null
      const containerRect = container?.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()

      // 限制范围：元素中心不能跑出封面容器
      const halfW = containerRect ? containerRect.width / 2 : 400
      const halfH = containerRect ? containerRect.height / 2 : 300
      // 留出目标元素自身的一半尺寸，避免完全贴边时看不见
      const elHalfW = targetRect.width / 2
      const elHalfH = targetRect.height / 2
      const minX = -halfW + elHalfW
      const maxX = halfW - elHalfW
      const minY = -halfH + elHalfH
      const maxY = halfH - elHalfH

      const startX = e.clientX
      const startY = e.clientY
      const startTextX = x
      const startTextY = y

      const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max)

      const onPointerMove = (ev: PointerEvent) => {
        const dx = ev.clientX - startX
        const dy = ev.clientY - startY
        const nextX = clamp(startTextX + dx, minX, maxX)
        const nextY = clamp(startTextY + dy, minY, maxY)
        if (field === 'title') {
          setCoverSetting((prev) => ({ ...prev, titleX: nextX, titleY: nextY }))
        } else if (field === 'subtitle') {
          setCoverSetting((prev) => ({ ...prev, subtitleX: nextX, subtitleY: nextY }))
        } else {
          setCoverSetting((prev) => ({ ...prev, iconX: nextX, iconY: nextY }))
        }
      }

      const onPointerUp = () => {
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('pointerup', onPointerUp)
      }

      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerup', onPointerUp)
    },
    [x, y, setCoverSetting, field]
  )

  return { style, onPointerDown, x, y, scale }
}

// 根据 TextStyle 生成外层容器样式（transform、对齐）
export const buildWrapperStyle = (style: TextStyle): React.CSSProperties => {
  return {
    textAlign: style.align,
    display: 'inline-block',
    maxWidth: '100%'
  }
}

// 根据 TextStyle 生成内层文字样式（字体、颜色、背景只包裹文字）
export const buildTextStyle = (style: TextStyle, fontFamily?: string, fontSize?: number | string): React.CSSProperties => {
  return {
    fontWeight: style.bold ? 'bold' : 'normal',
    fontStyle: style.italic ? 'italic' : 'normal',
    color: style.color || undefined,
    backgroundColor: style.backgroundColor || undefined,
    lineHeight: style.lineHeight,
    fontSize,
    textShadow:
      style.strokeWidth > 0 && style.strokeColor
        ? buildStrokeShadow(style.strokeColor, style.strokeWidth)
        : undefined,
    fontFamily: fontFamily || undefined,
    display: 'inline',
    boxDecorationBreak: 'clone',
    WebkitBoxDecorationBreak: 'clone',
    padding: style.backgroundColor ? '0.1em 0.25em' : undefined,
    borderRadius: style.backgroundColor ? '0.15em' : undefined
  }
}

function buildStrokeShadow(color: string, width: number): string {
  const w = width
  return [
    `${w}px ${w}px 0 ${color}`,
    `-${w}px -${w}px 0 ${color}`,
    `${w}px -${w}px 0 ${color}`,
    `-${w}px ${w}px 0 ${color}`,
    `0 ${w}px 0 ${color}`,
    `0 -${w}px 0 ${color}`,
    `${w}px 0 0 ${color}`,
    `-${w}px 0 0 ${color}`
  ].join(', ')
}
