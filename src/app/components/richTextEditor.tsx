'use client'

import { useRef, useEffect } from 'react'
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight, Baseline, Type, PaintBucket } from 'lucide-react'
import { useI18n } from '@/app/i18n'

interface RichTextEditorProps {
  html: string
  style: TextStyle
  placeholder?: string
  onChangeHtml: (html: string) => void
  onStyleChange: (patch: Partial<TextStyle>) => void
}

const RichTextEditor = ({ html, style, placeholder, onChangeHtml, onStyleChange }: RichTextEditorProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const lastHtml = useRef(html)
  const { t } = useI18n()

  // 仅当外部 html 与本地不一致时同步（重置/切换场景），避免打字时光标跳动
  useEffect(() => {
    if (ref.current && html !== lastHtml.current) {
      ref.current.innerHTML = html
      lastHtml.current = html
    }
  }, [html])

  const handleInput = () => {
    if (ref.current) {
      lastHtml.current = ref.current.innerHTML
      onChangeHtml(ref.current.innerHTML)
    }
  }

  const btnCls =
    'flex items-center justify-center w-8 h-8 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-colors'
  const activeCls = 'bg-indigo-100 text-indigo-700 border-indigo-300'

  const toggle = (key: keyof TextStyle) => onStyleChange({ [key]: !style[key] } as Partial<TextStyle>)

  const toggleAlign = (align: TextStyle['align']) => {
    onStyleChange({ align: style.align === align ? 'center' : align })
  }

  // 颜色类按钮：已有颜色时再次点击清除颜色，无颜色时打开取色器
  const makeColorClickHandler = (key: 'color' | 'backgroundColor' | 'strokeColor') => {
    return (e: React.MouseEvent<HTMLInputElement>) => {
      if (style[key]) {
        e.preventDefault()
        onStyleChange({ [key]: '' } as Partial<TextStyle>)
      }
    }
  }

  return (
    <div className='w-full border border-gray-200 rounded-lg overflow-hidden'>
      {/* 工具栏 */}
      <div className='flex flex-wrap items-center gap-1 p-1.5 bg-gray-50 border-b border-gray-200'>
        <button
          type='button'
          className={`${btnCls} ${style.bold ? activeCls : ''}`}
          title={t('rt.bold')}
          onClick={() => toggle('bold')}>
          <Bold size={15} />
        </button>
        <button
          type='button'
          className={`${btnCls} ${style.italic ? activeCls : ''}`}
          title={t('rt.italic')}
          onClick={() => toggle('italic')}>
          <Italic size={15} />
        </button>

        <span className='w-px h-5 bg-gray-200 mx-0.5' />

        <label className={`${btnCls} relative overflow-hidden ${style.color ? activeCls : ''}`} title={t('rt.color')}>
          <Type size={15} />
          <input
            type='color'
            className='absolute inset-0 opacity-0 cursor-pointer'
            value={style.color || '#000000'}
            onClick={makeColorClickHandler('color')}
            onChange={(e) => onStyleChange({ color: e.target.value })}
          />
        </label>
        <label className={`${btnCls} relative overflow-hidden ${style.backgroundColor ? activeCls : ''}`} title={t('rt.bgColor')}>
          <PaintBucket size={15} />
          <input
            type='color'
            className='absolute inset-0 opacity-0 cursor-pointer'
            value={style.backgroundColor || '#ffffff'}
            onClick={makeColorClickHandler('backgroundColor')}
            onChange={(e) => onStyleChange({ backgroundColor: e.target.value })}
          />
        </label>

        <span className='w-px h-5 bg-gray-200 mx-0.5' />

        {/* 描边 */}
        <label className={`${btnCls} relative overflow-hidden ${style.strokeColor ? activeCls : ''}`} title={t('rt.strokeColor')}>
          <Baseline size={15} />
          <input
            type='color'
            className='absolute inset-0 opacity-0 cursor-pointer'
            value={style.strokeColor || '#000000'}
            onClick={makeColorClickHandler('strokeColor')}
            onChange={(e) => onStyleChange({ strokeColor: e.target.value })}
          />
        </label>
        <div className='flex items-center gap-1 px-1' title={t('rt.strokeWidth')}>
          <input
            type='range'
            min={0}
            max={6}
            step={0.5}
            value={style.strokeWidth}
            className='w-14 accent-indigo-500 cursor-pointer'
            onChange={(e) => onStyleChange({ strokeWidth: Number(e.target.value) })}
          />
          <span className='text-xs text-gray-500 w-6'>{style.strokeWidth}</span>
        </div>

        <span className='w-px h-5 bg-gray-200 mx-0.5' />

        {/* 对齐 */}
        <button
          type='button'
          className={`${btnCls} ${style.align === 'left' ? activeCls : ''}`}
          title={t('rt.alignLeft')}
          onClick={() => toggleAlign('left')}>
          <AlignLeft size={15} />
        </button>
        <button
          type='button'
          className={`${btnCls} ${style.align === 'center' ? activeCls : ''}`}
          title={t('rt.alignCenter')}
          onClick={() => toggleAlign('center')}>
          <AlignCenter size={15} />
        </button>
        <button
          type='button'
          className={`${btnCls} ${style.align === 'right' ? activeCls : ''}`}
          title={t('rt.alignRight')}
          onClick={() => toggleAlign('right')}>
          <AlignRight size={15} />
        </button>

        <span className='w-px h-5 bg-gray-200 mx-0.5' />

        {/* 行高 */}
        <div className='flex items-center gap-1 px-1' title={t('rt.lineHeight')}>
          <span className='text-xs text-gray-500'>{t('rt.lineHeight')}</span>
          <input
            type='range'
            min={1}
            max={2.5}
            step={0.1}
            value={style.lineHeight}
            className='w-14 accent-indigo-500 cursor-pointer'
            onChange={(e) => onStyleChange({ lineHeight: Number(e.target.value) })}
          />
          <span className='text-xs text-gray-500 w-6'>{style.lineHeight}</span>
        </div>
      </div>

      {/* 编辑区 */}
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        role='textbox'
        aria-multiline='true'
        data-placeholder={placeholder}
        onInput={handleInput}
        className='min-h-[64px] max-h-[200px] overflow-y-auto p-2.5 text-sm outline-none focus:bg-white text-gray-800 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none'
        style={{
          fontWeight: style.bold ? 'bold' : 'normal',
          fontStyle: style.italic ? 'italic' : 'normal',
          color: style.color || undefined,
          backgroundColor: style.backgroundColor || undefined,
          textAlign: style.align,
          lineHeight: style.lineHeight
        }}
      />
    </div>
  )
}

export default RichTextEditor
