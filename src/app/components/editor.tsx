'use client'

import { useContext, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { LoaderCircle } from 'lucide-react'

import EditorPreview from './editorPreview'
import EditorSetting from './editorSetting'
import EditorTheme from './editorTheme'
import { CoverContext } from './coverContext'
import { DEFAULT_SETTING } from '../settings/default'
import { FONTS } from '../settings/fonts'
import { useI18n } from '@/app/i18n'

const Editor = () => {
  const { setCoverSetting } = useContext(CoverContext)
  const { t } = useI18n()
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(max-width: 1280px)')

    const handleResize = (event: MediaQueryListEvent) => {
      setIsSmallScreen(event.matches)
    }

    // 初始化检查
    setIsSmallScreen(mediaQueryList.matches)
    // 初始化数据（兼容旧版 author 字段、旧版字体对象）
    const savedData = localStorage.getItem('coverSetting')
    const parsed = savedData ? JSON.parse(savedData) : {}

    // 如果旧配置保存了字体，按 value 找到新的 Font 对象（自动迁移 CDN/fontFamily）
    const migratedFont = parsed.font?.value ? FONTS.find((f) => f.value === parsed.font.value) : undefined

    const defaultData = {
      ...DEFAULT_SETTING,
      ...parsed,
      titleStyle: { ...DEFAULT_SETTING.titleStyle, ...(parsed.titleStyle || {}) },
      subtitleStyle: { ...DEFAULT_SETTING.subtitleStyle, ...(parsed.subtitleStyle || {}) },
      font: migratedFont || { ...DEFAULT_SETTING.font, ...(parsed.font || {}) },
      bg: { ...DEFAULT_SETTING.bg, ...(parsed.bg || {}) },
      pattern: { ...DEFAULT_SETTING.pattern, ...(parsed.pattern || {}) },
      theme: { ...DEFAULT_SETTING.theme, ...(parsed.theme || {}) },
      size: { ...DEFAULT_SETTING.size, ...(parsed.size || {}) },
      icon: { ...DEFAULT_SETTING.icon, ...(parsed.icon || {}) }
    }
    if (parsed.author !== undefined && defaultData.subtitle === DEFAULT_SETTING.subtitle) {
      defaultData.subtitle = parsed.author
    }

    // 自动迁移旧版默认文案到新版默认文案（避免 localStorage 缓存旧标题/副标题）
    // 如果标题/副标题是任何已知默认值，则按当前语言替换
    const KNOWN_DEFAULT_TITLES = ['免费、漂亮的封面生成器', '一个简单、免费的封面生成器', 'A simple, free cover generator']
    const KNOWN_DEFAULT_SUBTITLES = ['小柠封', '水母封面', 'JellyCover']
    if (KNOWN_DEFAULT_TITLES.includes(defaultData.title)) {
      defaultData.title = t('default.title')
    }
    if (KNOWN_DEFAULT_SUBTITLES.includes(defaultData.subtitle)) {
      defaultData.subtitle = t('default.subtitle')
    }

    setCoverSetting(defaultData)
    setLoading(false)
    // 编辑器页面强制 body 不滚动，避免浏览器扩展注入元素导致滚动条
    document.body.style.overflow = 'hidden'
    // 添加事件监听器
    mediaQueryList.addEventListener('change', handleResize)
    // 清理事件监听器
    return () => {
      document.body.style.overflow = ''
      mediaQueryList.removeEventListener('change', handleResize)
    }
  }, [setCoverSetting])

  if (loading)
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm'>
        <div className='flex flex-col items-center gap-2'>
          <LoaderCircle size={48} className='animate-spin mb-4' /> {t('editor.loading')}
        </div>
      </div>
    )

  return (
    <div className='h-[calc(100vh-3.5rem)] mt-14'>
      {isSmallScreen ? (
        <Tabs defaultValue='setting' className='w-full h-full'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='setting'>{t('editor.tabBase')}</TabsTrigger>
            <TabsTrigger value='preview'>{t('editor.tabPreview')}</TabsTrigger>
            <TabsTrigger value='theme'>{t('editor.tabTheme')}</TabsTrigger>
          </TabsList>
          <TabsContent value='setting'>
            <div className='h-full w-full'>
              <EditorSetting />
            </div>
          </TabsContent>
          <TabsContent value='preview'>
            <div className='w-full h-full overflow-auto bg-gray-50'>
              <EditorPreview />
            </div>
          </TabsContent>
          <TabsContent value='theme'>
            <div className='h-full w-full'>
              <EditorTheme />
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className='h-full w-full flex overflow-hidden'>
          <div className='h-full w-[360px] xl:w-[400px] shrink-0'>
            <EditorSetting />
          </div>
          <Separator orientation='vertical' />
          <Separator orientation='vertical' />
          <div className='h-full flex-1 overflow-auto bg-gray-50'>
            <EditorPreview />
          </div>
          <Separator orientation='vertical' />
          <div className='h-full w-[120px] xl:w-[160px] 2xl:w-[280px] shrink-0'>
            <EditorTheme />
          </div>
        </div>
      )}
    </div>
  )
}

export default Editor
