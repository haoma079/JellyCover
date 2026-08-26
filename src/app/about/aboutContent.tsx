'use client'

import { useI18n } from '@/app/i18n'

export default function AboutContent() {
  const { lang } = useI18n()
  const zh = lang === 'zh'

  const H = ({ children }: { children: React.ReactNode }) => (
    <h2 className='text-xl md:text-2xl font-bold text-[#6E56CF] mt-8 mb-3'>{children}</h2>
  )
  const P = ({ children }: { children: React.ReactNode }) => (
    <p className='text-zinc-700 leading-7 text-[15px] md:text-base'>{children}</p>
  )

  return (
    <article className='max-w-3xl mx-auto w-full'>
      <h1 className='text-3xl md:text-4xl font-extrabold text-zinc-900 mb-2'>
        {zh ? '关于水母封面' : 'About JellyCover'}
      </h1>
      <p className='text-zinc-400 text-sm mb-6'>
        {zh ? '免费 · 在线 · 开源' : 'Free · Online · Open Source'}
      </p>

      {zh ? (
        <>
          <P>
            水母封面（JellyCover）是一个简单、免费的在线封面生成器。标题与副标题可以自由拖动、缩放，图标可选可隐，配色克制清爽，一键导出适合各大平台的封面图。
          </P>

          <H>它能做什么</H>
          <ul className='list-disc pl-6 text-zinc-700 leading-7 text-[15px] md:text-base space-y-1'>
            <li>标题、副标题在预览区直接拖动排版，独立放大缩小</li>
            <li>9+ 主流尺寸，横版 + 竖版，覆盖公众号、小红书、头条、知乎等</li>
            <li>图标（Iconify）、在线背景（Unsplash）、字体、纹理多样化配置</li>
            <li>实时预览，支持 png / jpg / webp 导出与一键复制</li>
          </ul>

          <H>开源许可</H>
          <P>
            本站点基于{' '}
            <a
              target='_blank'
              href='https://github.com/weizwz/cover'
              className='text-[#6E56CF] underline'>
              weizwz/cover
            </a>{' '}
            开源项目构建，遵循 MIT 许可证。我们保留了原作者的署名，并在此基础上做了品牌视觉与功能的二次开发。
          </P>

          <H>技术栈</H>
          <P>
            基于 Next.js、React、Tailwind CSS 与 shadcn/ui 构建，部署于 Cloudflare Pages，全球 CDN 加速访问。
          </P>

          <H>联系与反馈</H>
          <P>
            如果你有建议或遇到问题，欢迎通过作者博客「顺风网舟」与我们联系。水母封面完全免费，但服务器与 CDN 会带来运营成本，你的支持能让它持续运行。
          </P>
        </>
      ) : (
        <>
          <P>
            JellyCover is a simple, free online cover generator. Drag and scale titles and subtitles freely, toggle
            icons on or off, and export covers for every platform in one click.
          </P>

          <H>What it does</H>
          <ul className='list-disc pl-6 text-zinc-700 leading-7 text-[15px] md:text-base space-y-1'>
            <li>Drag titles and subtitles directly in the preview, scale them independently</li>
            <li>9+ popular sizes, landscape &amp; portrait, for WeChat, Xiaohongshu, Toutiao, Zhihu and more</li>
            <li>Rich options: Iconify icons, Unsplash backgrounds, fonts and textures</li>
            <li>Live preview with png / jpg / webp export and one-click copy</li>
          </ul>

          <H>Open source license</H>
          <P>
            The Site is built on the open-source project{' '}
            <a
              target='_blank'
              href='https://github.com/weizwz/cover'
              className='text-[#6E56CF] underline'>
              weizwz/cover
            </a>{' '}
            under the MIT License. We keep the original author&apos;s attribution and have added our own branding and
            features on top of it.
          </P>

          <H>Tech stack</H>
          <P>
            Built with Next.js, React, Tailwind CSS and shadcn/ui, deployed on Cloudflare Pages with global CDN
            acceleration.
          </P>

          <H>Contact &amp; feedback</H>
          <P>
            Suggestions or issues? Reach us through the author&apos;s blog &quot;Shunfeng Wangzhou&quot;. JellyCover
            is completely free, but servers and CDN incur costs—your support keeps it running.
          </P>
        </>
      )}
    </article>
  )
}
