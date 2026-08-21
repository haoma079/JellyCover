import type { Metadata } from 'next'
import Head from '../components/head'
import Editor from '../components/editor'

export const metadata: Metadata = {
  title: '在线编辑器',
  description:
    '在水母封面在线编辑器中拖动排版标题与副标题、选择图标与主题，实时预览并一键导出封面图。',
  robots: { index: true, follow: true },
}

export default function Home() {
  return (
    <div className='h-screen overflow-hidden'>
      <Head />
      <Editor />
    </div>
  )
}
