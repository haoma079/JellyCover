import { THEMES } from './themes'
import { FONTS } from './fonts'
import { PATTERNS } from './patterns'
import { BACKGROUNDS_RANDOM } from './colorsRandom'
import { SIZES } from './sizes'

export const DEFAULT_ICON: IconOption = { label: 'xiaohongshu', value: 'simple-icons:xiaohongshu' }

export const DEFAULT_UNSPLASH_PARAM: UnsplashParam = {
  query: 'beautiful background',
  page: 1,
  per_page: 12
}

export const DEFAULT_TEXT_STYLE: TextStyle = {
  align: 'center',
  lineHeight: 1.2,
  bold: false,
  italic: false,
  color: '',
  backgroundColor: '',
  strokeColor: '',
  strokeWidth: 0
}

export const DEFAULT_SETTING: Setting = {
  title: '一个简单、免费的封面生成器',
  titleX: 0,
  titleY: 0,
  titleScale: 1,
  titleStyle: { ...DEFAULT_TEXT_STYLE, bold: true },
  subtitle: '水母封面',
  subtitleX: 0,
  subtitleY: 0,
  subtitleScale: 1,
  subtitleStyle: { ...DEFAULT_TEXT_STYLE },
  showIcon: true,
  download: 'png',
  scale: 2,
  icon: DEFAULT_ICON,
  customIcon: '',
  iconX: 0,
  iconY: 0,
  iconScale: 1,
  theme: THEMES[0],
  font: FONTS[0],
  bg: { ...BACKGROUNDS_RANDOM[0] },
  pattern: PATTERNS[0],
  size: SIZES[0]
}