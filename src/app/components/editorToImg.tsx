'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { LoaderCircle, Download, Copy, ArrowRightLeft, ImageUpscale } from 'lucide-react'
import html2canvas from 'html2canvas-pro'
import type { Options } from 'html2canvas-pro'

import CenteredAlert from './common/centeredAlert'
import { CoverContext } from './coverContext'
import { base64ToBlob, getFormattedDateTime } from '../tools/utils'
import { useT } from '@/app/i18n'

const EditorToImg: React.FC<EditorToImgProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [copyLoading, setCopyLoading] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertData, setAlertData] = useState<CenterAlertOptions>()
  const [scale, setScale] = useState(1)
  const { coverSetting, setCoverSetting } = useContext(CoverContext)
  const t = useT()
  const hiddenRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const showNotification = (data: React.SetStateAction<CenterAlertOptions | undefined>) => {
    setAlertData(data)
    setShowAlert(true)
  }

  const handleClose = () => {
    setShowAlert(false)
  }

  // 根据容器空间自动缩放预览封面，保证不同比例（尤其是竖屏 3:4/9:16）都能完整显示
  useEffect(() => {
    const measure = () => {
      const container = containerRef.current
      const hidden = hiddenRef.current
      if (!container || !hidden) return
      const containerRect = container.getBoundingClientRect()
      const hiddenRect = hidden.getBoundingClientRect()
      if (!containerRect.width || !containerRect.height || !hiddenRect.width || !hiddenRect.height) return

      const newScale = Math.min(
        containerRect.width / hiddenRect.width,
        containerRect.height / hiddenRect.height,
        1 // 不放大超过原始尺寸
      )
      setScale(Number(newScale.toFixed(4)))
    }

    measure()

    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      ro = new ResizeObserver(measure)
      ro.observe(containerRef.current)
    }

    const handleResize = () => measure()
    window.addEventListener('resize', handleResize)

    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [coverSetting.size.value, coverSetting.theme.value])

  async function saveImage(data: string): Promise<void> {
    const a = document.createElement('a') as HTMLAnchorElement
    a.href = data
    a.download = `${t('toimg.prefix')}${getFormattedDateTime()}.${coverSetting.download}`
    document.body.appendChild(a)

    a.click()
    document.body.removeChild(a)
  }

  const downloadImage = async (): Promise<void> => {
    setLoading(true)

    if (hiddenRef.current) {
      const data = await getData(hiddenRef.current)
      await saveImage(data)

      // 如果使用了unsplash图片，追踪下载
      if (coverSetting.bg.type === 'unsplash' && coverSetting.bg.unsplashUrl) {
        // 这里需要从unsplashParam中获取下载链接，暂时注释掉
        // unsplash.photos.trackDownload({ downloadLocation: downloadLink })
      }
    }

    setLoading(false)
    showNotification({
      type: 'success',
      title: t('toimg.generated'),
      message: t('toimg.genPrompt')
    })
  }

  const copyImage = async (): Promise<void> => {
    setCopyLoading(true)

    if (hiddenRef.current) {
      const data = await getData(hiddenRef.current)
      await copyImageToClipboard(data)
    }

    setCopyLoading(false)
  }

  async function getData(element: HTMLElement): Promise<string> {
    // https://github.com/yorickshan/html2canvas-pro/blob/main/docs/configuration.md
    const options: Options = {
      useCORS: true,
      scale: coverSetting.scale,
      backgroundColor: null,
      allowTaint: true,
      height: element.offsetHeight,
      width: element.offsetWidth,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      x: 0,
      y: 0,
      logging: process.env.NODE_ENV === 'development',
      imageTimeout: 15000,
      foreignObjectRendering: false,
      ignoreElements: (element) => {
        return element.classList.contains('ignore')
      }
    }

    return await html2canvas(element, options).then((canvas: HTMLCanvasElement) => {
      return canvas.toDataURL('image/' + coverSetting.download)
    })
  }

  async function copyImageToClipboard(base64: string): Promise<void> {
    try {
      const blob = base64ToBlob(base64)
      const clipboardItem = new ClipboardItem({ ['image/png']: blob })
      await navigator.clipboard.write([clipboardItem])
      showNotification({
        type: 'success',
        title: t('toimg.copied'),
        message: t('toimg.copiedDesc')
      })
    } catch (err) {
      showNotification({
        type: 'error',
        title: t('toimg.copyFail'),
        message: '' + err
      })
    }
  }

  const changeThemeAndSwapX = (): void => {
    setCoverSetting({
      ...coverSetting,
      theme: { ...coverSetting.theme, swapX: !coverSetting.theme.swapX }
    })
  }

  const changeThemeStretchY = (): void => {
    setCoverSetting({
      ...coverSetting,
      theme: { ...coverSetting.theme, stretchY: !coverSetting.theme.stretchY }
    })
  }

  return (
    <React.Fragment>
      <div className='relative flex flex-col h-full w-full overflow-hidden bg-gray-50'>
        {/* 操作按钮：固定在预览区顶部，不再随封面比例变化被挤出 */}
        <div className='shrink-0 flex items-center justify-end gap-2 px-4 py-3 border-b border-zinc-200 bg-white'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className='cursor-pointer' disabled={loading} variant='outline' size='icon' onClick={() => downloadImage()}>
                  {loading ? <LoaderCircle className='animate-spin' /> : <Download />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('toimg.dlTip')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className='cursor-pointer' disabled={copyLoading} variant='outline' size='icon' onClick={() => copyImage()}>
                  {copyLoading ? <LoaderCircle className='animate-spin' /> : <Copy />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('toimg.copyTip')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {coverSetting.theme.swapX !== undefined && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className={`group cursor-pointer ${coverSetting.theme.swapX ? 'bg-primary' : ''} hover:bg-primary`}
                    variant='outline'
                    size='icon'
                    onClick={() => {
                      changeThemeAndSwapX()
                    }}>
                    <ArrowRightLeft className={`${coverSetting.theme.swapX ? 'text-white' : ''} group-hover:text-white`}/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('toimg.swapTip')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {coverSetting.theme.stretchY !== undefined && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className={`group cursor-pointer ${coverSetting.theme.stretchY ? 'bg-primary' : ''} hover:bg-primary`}
                    variant='outline'
                    size='icon'
                    onClick={() => {
                      changeThemeStretchY()
                    }}>
                    <ImageUpscale className={`rotate-180 scale-x-[-1] ${coverSetting.theme.stretchY ? 'text-white' : ''} group-hover:text-white`}/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('toimg.stretchTip')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {/* 预览区：根据容器尺寸自动缩放封面，保证完整可见 */}
        <div ref={containerRef} className='flex-1 min-h-0 relative flex items-center justify-center p-4 overflow-hidden'>
          {/* 隐藏原始尺寸封面，用于 html2canvas 截图 */}
          <div ref={hiddenRef} className='absolute -left-[9999px] -top-[9999px]'>
            {props.children}
          </div>
          {/* 可见的自适应缩放封面 */}
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
            {props.children}
          </div>
        </div>
      </div>
      {showAlert && <CenteredAlert type={alertData?.type} title={alertData?.title} message={alertData?.message} onClose={handleClose} />}
    </React.Fragment>
  )
}

export default EditorToImg
