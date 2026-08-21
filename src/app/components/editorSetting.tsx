'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { HelpCircle, RotateCcw, Save } from 'lucide-react'
import RichTextEditor from './richTextEditor'

import { useContext, useEffect, useState } from 'react'
import { CoverContext } from './coverContext'
import { fontLoader, FONTS, FONT_TYPE_EN } from '../settings/fonts'
import { PATTERNS, PATTERN_EN, PATTERN_TYPE_EN } from '../settings/patterns'
import { SIZES, SIZES_EN } from '../settings/sizes'
import { DEFAULT_SETTING } from '../settings/default'
import { imgToBase64 } from '../tools/utils'
import CenteredAlert from './common/centeredAlert'
import IconSelect from './iconSelect'
import BackgroundSelect from './backgroundSelect'
import { useI18n } from '@/app/i18n'

const EditorSetting = () => {
  const { coverSetting, setCoverSetting } = useContext(CoverContext)
  const { lang, t } = useI18n()
  const [fontData, setFontData] = useState<GroupData[]>([])
  const [patternData, setPatternData] = useState<GroupData[]>([])
  const [showAlert, setShowAlert] = useState(false)
  const [alertData, setAlertData] = useState<CenterAlertOptions>()

  // 初始化
  useEffect(() => {
    setFontData(groupWithTypeName(FONTS))
    setPatternData(groupWithTypeName(PATTERNS))
  }, [])

  const showNotification = (data: React.SetStateAction<CenterAlertOptions | undefined>) => {
    setAlertData(data)
    setShowAlert(true)
  }

  const handleClose = () => {
    setShowAlert(false)
  }

  // 字体分组显示
  const groupWithTypeName = (items: GroupItem[]): GroupData[] => {
    const grouped = items.reduce<Record<string, GroupData>>((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = {
          type: item.type,
          typeName: item.typeName,
          list: []
        }
      }
      acc[item.type].list.push(item)
      return acc
    }, {})

    return Object.values(grouped)
  }

  type changeOptions = Font | Pattern | Size
  const changeValue = (value: string, key: string, array: changeOptions[]) => {
    const selectedOption = array.filter((item) => {
      return item.value === value
    })
    setCoverSetting({
      ...coverSetting,
      [key]: selectedOption[0]
    })
  }

  const saveSetting = () => {
    const promises = []
    const settingToSave = { ...coverSetting }

    // 处理自定义图标
    if (coverSetting.customIcon) {
      promises.push(
        imgToBase64(coverSetting.customIcon).then((res) => {
          settingToSave.customIcon = 'data:image/png;base64,' + res
        })
      )
    }

    // 处理背景图片
    if (coverSetting.bg.type === 'local' && coverSetting.bg.image) {
      promises.push(
        imgToBase64(coverSetting.bg.image).then((res) => {
          settingToSave.bg.image = 'data:image/png;base64,' + res
        })
      )
    }

    if (promises.length > 0) {
      Promise.all(promises)
        .then(() => {
          localStorage.setItem('coverSetting', JSON.stringify(settingToSave))
          showNotification({
            type: 'success',
            title: t('setting.saved'),
            message: t('setting.savedDesc')
          })
        })
        .catch((err) => {
          showNotification({
            type: 'error',
            title: t('setting.saveFail'),
            message: err
          })
        })
    } else {
      localStorage.setItem('coverSetting', JSON.stringify(settingToSave))
      showNotification({
        type: 'success',
        title: t('setting.saved'),
        message: t('setting.savedDesc')
      })
    }
  }

  const resetSetting = () => {
    setCoverSetting({
      ...DEFAULT_SETTING,
      title: coverSetting.title,
      subtitle: coverSetting.subtitle,
      icon: coverSetting.icon,
      customIcon: coverSetting.customIcon,
      bg: { ...DEFAULT_SETTING.bg }
    })
    showNotification({
      type: 'success',
      title: t('setting.styleReset'),
      message: t('setting.styleResetDesc')
    })
  }

  const clearLocalSetting = () => {
    localStorage.setItem('coverSetting', JSON.stringify(DEFAULT_SETTING))
    showNotification({
      type: 'success',
      title: t('setting.cleared'),
      message: t('setting.clearedDesc')
    })
  }

  // 动态加载字体
  useEffect(() => {
    fontLoader.loadFont(coverSetting.font.label, coverSetting.font.url)
  }, [coverSetting.font.label, coverSetting.font.url])

  return (
    <div className='h-full w-full overflow-y-auto py-4'>
      <h2 className='text-lg font-bold text-center mb-4'>{t('setting.baseTitle')}</h2>
      <form className='px-4 pb-4 overflow-x-hidden'>
        <div className='flex w-full items-center flex-wrap gap-y-4 overflow-x-hidden'>
          <div className='flex w-full flex-col gap-2'>
            <Label htmlFor='title' className='w-16'>
              {t('setting.titleLabel')}
            </Label>
            <RichTextEditor
              html={coverSetting.title}
              style={coverSetting.titleStyle}
              placeholder={t('setting.titlePlaceholder')}
              onChangeHtml={(html) => setCoverSetting({ ...coverSetting, title: html })}
              onStyleChange={(patch) => setCoverSetting({ ...coverSetting, titleStyle: { ...coverSetting.titleStyle, ...patch } })}
            />
          </div>
          <div className='flex w-full flex-col gap-2'>
            <Label htmlFor='subtitle' className='w-16'>
              {t('setting.subtitleLabel')}
            </Label>
            <RichTextEditor
              html={coverSetting.subtitle}
              style={coverSetting.subtitleStyle}
              placeholder={t('setting.subtitlePlaceholder')}
              onChangeHtml={(html) => setCoverSetting({ ...coverSetting, subtitle: html })}
              onStyleChange={(patch) => setCoverSetting({ ...coverSetting, subtitleStyle: { ...coverSetting.subtitleStyle, ...patch } })}
            />
          </div>
          <div className='flex w-full flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <Label className='w-16 justify-end mr-2 shrink-0 whitespace-nowrap'>{t('setting.iconLabel')}</Label>
              <div className='flex items-center gap-2 h-9'>
                <Switch
                  id='show-icon'
                  checked={coverSetting.showIcon}
                  onCheckedChange={(checked) => setCoverSetting({ ...coverSetting, showIcon: checked })}
                />
                <Label htmlFor='show-icon' className='text-sm cursor-pointer'>
                  {t('setting.show')}
                </Label>
              </div>
            </div>
            {coverSetting.showIcon && (
              <div className='pl-[4.5rem] flex flex-col gap-3'>
                <IconSelect />
                <div className='flex flex-col gap-2 overflow-hidden'>
                  <div className='flex items-center gap-2 overflow-hidden'>
                    <span className='text-xs text-gray-500 w-8 shrink-0'>{t('setting.posX')}</span>
                    <Slider
                      className='flex-1'
                      value={[coverSetting.iconX]}
                      min={-400}
                      max={400}
                      step={1}
                      onValueChange={([v]) => setCoverSetting({ ...coverSetting, iconX: v })}
                    />
                    <span className='text-xs w-10 text-right shrink-0'>{coverSetting.iconX}px</span>
                  </div>
                  <div className='flex items-center gap-2 overflow-hidden'>
                    <span className='text-xs text-gray-500 w-8 shrink-0'>{t('setting.posY')}</span>
                    <Slider
                      className='flex-1'
                      value={[coverSetting.iconY]}
                      min={-400}
                      max={400}
                      step={1}
                      onValueChange={([v]) => setCoverSetting({ ...coverSetting, iconY: v })}
                    />
                    <span className='text-xs w-10 text-right shrink-0'>{coverSetting.iconY}px</span>
                  </div>
                  <div className='flex items-center gap-2 overflow-hidden'>
                    <span className='text-xs text-gray-500 w-8 shrink-0'>{t('setting.posScale')}</span>
                    <Slider
                      className='flex-1'
                      value={[coverSetting.iconScale]}
                      min={0.5}
                      max={3}
                      step={0.1}
                      onValueChange={([v]) => setCoverSetting({ ...coverSetting, iconScale: v })}
                    />
                    <span className='text-xs w-10 text-right shrink-0'>{coverSetting.iconScale}x</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 标题位置与缩放 */}
          <div className='flex w-full flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <Label className='w-16 justify-end mr-2'>{t('setting.posTitle')}</Label>
              <span className='text-xs text-gray-500'>{t('setting.posHint')}</span>
            </div>
            <div className='pl-[4.5rem] flex flex-col gap-2 overflow-hidden'>
              <div className='flex items-center gap-2 overflow-hidden'>
                <span className='text-xs text-gray-500 w-8 shrink-0'>{t('setting.posX')}</span>
                <Slider
                  className='flex-1'
                  value={[coverSetting.titleX]}
                  min={-400}
                  max={400}
                  step={1}
                  onValueChange={([v]) => setCoverSetting({ ...coverSetting, titleX: v })}
                />
                <span className='text-xs w-10 text-right shrink-0'>{coverSetting.titleX}px</span>
              </div>
              <div className='flex items-center gap-2 overflow-hidden'>
                <span className='text-xs text-gray-500 w-8 shrink-0'>{t('setting.posY')}</span>
                <Slider
                  className='flex-1'
                  value={[coverSetting.titleY]}
                  min={-400}
                  max={400}
                  step={1}
                  onValueChange={([v]) => setCoverSetting({ ...coverSetting, titleY: v })}
                />
                <span className='text-xs w-10 text-right shrink-0'>{coverSetting.titleY}px</span>
              </div>
              <div className='flex items-center gap-2 overflow-hidden'>
                <span className='text-xs text-gray-500 w-8 shrink-0'>{t('setting.posScale')}</span>
                <Slider
                  className='flex-1'
                  value={[coverSetting.titleScale]}
                  min={0.5}
                  max={3}
                  step={0.1}
                  onValueChange={([v]) => setCoverSetting({ ...coverSetting, titleScale: v })}
                />
                <span className='text-xs w-10 text-right shrink-0'>{coverSetting.titleScale}x</span>
              </div>
            </div>
          </div>

          {/* 副标题位置与缩放 */}
          <div className='flex w-full flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <Label className='w-16 justify-end mr-2'>{t('setting.subtitleLabel')}</Label>
              <span className='text-xs text-gray-500'>{t('setting.posHint')}</span>
            </div>
            <div className='pl-[4.5rem] flex flex-col gap-2 overflow-hidden'>
              <div className='flex items-center gap-2 overflow-hidden'>
                <span className='text-xs text-gray-500 w-8 shrink-0'>{t('setting.posX')}</span>
                <Slider
                  className='flex-1'
                  value={[coverSetting.subtitleX]}
                  min={-400}
                  max={400}
                  step={1}
                  onValueChange={([v]) => setCoverSetting({ ...coverSetting, subtitleX: v })}
                />
                <span className='text-xs w-10 text-right shrink-0'>{coverSetting.subtitleX}px</span>
              </div>
              <div className='flex items-center gap-2 overflow-hidden'>
                <span className='text-xs text-gray-500 w-8 shrink-0'>{t('setting.posY')}</span>
                <Slider
                  className='flex-1'
                  value={[coverSetting.subtitleY]}
                  min={-400}
                  max={400}
                  step={1}
                  onValueChange={([v]) => setCoverSetting({ ...coverSetting, subtitleY: v })}
                />
                <span className='text-xs w-10 text-right shrink-0'>{coverSetting.subtitleY}px</span>
              </div>
              <div className='flex items-center gap-2 overflow-hidden'>
                <span className='text-xs text-gray-500 w-8 shrink-0'>{t('setting.posScale')}</span>
                <Slider
                  className='flex-1'
                  value={[coverSetting.subtitleScale]}
                  min={0.5}
                  max={3}
                  step={0.1}
                  onValueChange={([v]) => setCoverSetting({ ...coverSetting, subtitleScale: v })}
                />
                <span className='text-xs w-10 text-right shrink-0'>{coverSetting.subtitleScale}x</span>
              </div>
            </div>
          </div>
          <div className='flex w-full md:w-1/2 xl:w-full 2xl:w-1/2'>
            <Label htmlFor='font' className='w-16 justify-end mr-2'>
              {t('setting.fontLabel')}
            </Label>
            <Select
              value={coverSetting.font.value}
              onValueChange={(value) => {
                changeValue(value, 'font', FONTS)
              }}>
              <SelectTrigger id='font' className='flex-1 mr-0 overflow-hidden focus-visible:ring-1'>
                <SelectValue placeholder={t('setting.fontPlaceholder')} />
              </SelectTrigger>
              <SelectContent position='popper'>
                {fontData.map((item) => (
                  <SelectGroup key={item.type}>
                    <SelectLabel className='font-bold text-primary'>
                      {lang === 'en' ? FONT_TYPE_EN[item.typeName] ?? item.typeName : item.typeName}
                    </SelectLabel>
                    {item.list.map((temp) => (
                      <SelectItem className={temp.value} key={temp.value} value={temp.value}>
                        {temp.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex w-full md:w-1/2 xl:w-full 2xl:w-1/2'>
            <div className='w-16 flex items-center justify-end mr-2 gap-1'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className='w-3 h-3 text-gray-400 hover:text-gray-600 cursor-help' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('setting.patternHint')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Label htmlFor='pattern'>{t('setting.patternLabel')}</Label>
            </div>
            <Select
              value={coverSetting.pattern.value}
              onValueChange={(value) => {
                changeValue(value, 'pattern', PATTERNS)
              }}>
              <SelectTrigger id='pattern' className='flex-1 mr-0 overflow-hidden focus-visible:ring-1'>
                <SelectValue placeholder={t('setting.patternPlaceholder')} />
              </SelectTrigger>
              <SelectContent position='popper'>
                {patternData.map((item) => (
                  <SelectGroup key={item.type}>
                    <SelectLabel className='font-bold text-primary'>
                      {lang === 'en' ? PATTERN_TYPE_EN[item.type] ?? item.typeName : item.typeName}
                    </SelectLabel>
                    {item.list.map((temp) => (
                      <SelectItem key={temp.value} value={temp.value}>
                        {lang === 'en' ? PATTERN_EN[temp.value] ?? temp.label : temp.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex w-full'>
            <Label htmlFor='bg' className='w-16 justify-end mr-2'>
              {t('setting.bgLabel')}
            </Label>
            <BackgroundSelect />
          </div>
          <div className='flex w-full'>
            <Label htmlFor='size' className='w-16 justify-end mr-2'>
              {t('setting.sizeLabel')}
            </Label>
            <Select
              value={coverSetting.size.value}
              onValueChange={(value) => {
                changeValue(value, 'size', SIZES)
              }}>
              <SelectTrigger id='size' className='flex-1 mr-0 overflow-hidden focus-visible:ring-1'>
                <SelectValue placeholder={t('setting.sizePlaceholder')} />
              </SelectTrigger>
              <SelectContent position='popper'>
                {SIZES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {lang === 'en' ? SIZES_EN[item.value] ?? item.label : item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex w-full md:w-1/2 xl:w-full 2xl:w-1/2'>
            <Label htmlFor='download' className='w-16 justify-end mr-2'>
              {t('setting.formatLabel')}
            </Label>
            <Select
              value={coverSetting.download}
              onValueChange={(value) => {
                setCoverSetting({ ...coverSetting, download: value as DownloadType })
              }}>
              <SelectTrigger id='download' className='flex-1 mr-0 overflow-hidden focus-visible:ring-1'>
                <SelectValue placeholder={t('setting.formatPlaceholder')} />
              </SelectTrigger>
              <SelectContent position='popper'>
                <SelectItem key='png' value='png'>
                  PNG
                </SelectItem>
                <SelectItem key='jpg' value='jpg'>
                  JPG
                </SelectItem>
                <SelectItem key='webp' value='webp'>
                  WEBP
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex w-full md:w-1/2 xl:w-full 2xl:w-1/2'>
            <Label htmlFor='download' className='w-16 justify-end mr-2'>
              {t('setting.outputLabel')}
            </Label>
            <div className='h-9 flex-1 flex items-center gap-2 border border-input rounded-md shadow-xs px-2'>
              <Slider
                id='download'
                className='flex-1'
                value={[coverSetting.scale]}
                min={0.5}
                max={5}
                step={0.5}
                onValueChange={(newValue) => setCoverSetting({ ...coverSetting, scale: newValue[0] })}
              />
              <div className='nowrap text-sm'>
                {lang === 'zh' ? `缩放${coverSetting.scale}倍` : `${t('setting.posScale')} ${coverSetting.scale}x`}
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className='flex justify-center items-center p-4'>
        <Button className='cursor-pointer mr-4' onClick={saveSetting}>
          <Save className='w-4 h-4 hidden md:block' />
          {t('setting.saveBtn')}
        </Button>
        <Button className='cursor-pointer' variant='outline' onClick={resetSetting}>
          <RotateCcw className='w-4 h-4 hidden md:block' />
          {t('setting.resetBtn')}
        </Button>
      </div>
      <div className='flex justify-end items-center p-4 pr-12'>
        <span className='text-sm underline cursor-pointer' onClick={clearLocalSetting}>
          {t('setting.clearBtn')}
        </span>
      </div>
      {showAlert && <CenteredAlert type={alertData?.type} title={alertData?.title} message={alertData?.message} onClose={handleClose} />}
    </div>
  )
}

export default EditorSetting
