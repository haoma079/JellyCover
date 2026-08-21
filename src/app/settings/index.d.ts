interface SelectOption {
  label: string
  value: string
}

interface Theme extends SelectOption {
  // 预览图像
  preview?: StaticImageData
  // 图文左右交换位置
  swapX?: boolean
  // 图片上下拉伸
  stretchY?: boolean
}

interface Background {
  color: string
  image?: string
  type: 'color' | 'local' | 'unsplash' | 'gradient'
  unsplashUrl?: string
  gradient?: string
}

interface Font extends SelectOption {
  url: string
  type: string
  typeName: string
  lineHeight?: string
  // CSS font-family 名称，空则使用系统默认
  fontFamily: string
}

interface Pattern extends SelectOption {
  type: string
  typeName: string
  isOpacity?: boolean
}

type Size = SelectOption

type IconOption = SelectOption

interface UnsplashParam {
  query: string
  page: number
  per_page: number
}

interface UnsplashImage {
  searchText: string
  url: string
  downloadLink: string
}

type DownloadType = 'png' | 'jpg' | 'webp'

interface TextStyle {
  // 整体对齐方式
  align: 'left' | 'center' | 'right'
  // 行高倍数
  lineHeight: number
  // 整体加粗
  bold: boolean
  // 整体斜体
  italic: boolean
  // 文字颜色
  color: string
  // 文字背景色（空表示透明）
  backgroundColor: string
  // 描边颜色（空表示无描边）
  strokeColor: string
  // 描边宽度（px，0 表示无描边）
  strokeWidth: number
}

interface Setting {
  title: string
  titleX: number
  titleY: number
  titleScale: number
  titleStyle: TextStyle
  subtitle: string
  subtitleX: number
  subtitleY: number
  subtitleScale: number
  subtitleStyle: TextStyle
  showIcon: boolean
  download: DownloadType
  scale: number
  icon: IconOption
  customIcon: string
  iconX: number
  iconY: number
  iconScale: number
  theme: Theme
  font: Font
  bg: Background
  pattern: Pattern
  size: Size
}
