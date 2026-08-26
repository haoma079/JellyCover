'use client'

import { useI18n } from '@/app/i18n'

export default function PrivacyContent() {
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
        {zh ? '隐私政策' : 'Privacy Policy'}
      </h1>
      <p className='text-zinc-400 text-sm mb-6'>
        {zh ? '最后更新：2026 年 8 月' : 'Last updated: August 2026'}
      </p>

      {zh ? (
        <>
          <P>
            水母封面（JellyCover，以下简称「本站点」）非常重视您的隐私。本政策说明我们在您使用本站点时如何收集、使用与保护信息。使用本站点即表示您同意本政策的条款。
          </P>

          <H>我们收集的信息</H>
          <P>
            本站点是一个纯前端工具，您创作的封面数据（标题、副标题、图标、字体、配色等）仅保存在您自己浏览器的本地存储（localStorage）中，不会上传到我们的服务器。我们不要求注册、不收集姓名、邮箱、电话等个人身份信息。
          </P>

          <H>匿名访问统计</H>
          <P>
            我们使用 Cloudflare Web Analytics 收集匿名的访问数据（如页面浏览量、国家/地区、浏览器与设备类型），用于了解站点运行情况。这些数据不含个人身份，且不依赖Cookie。
          </P>

          <H>Cookie 与本地存储</H>
          <P>
            除上文提到的本地存储（用于保存您的封面配置）外，本站点本身不设置用于追踪的 Cookie。第三方服务（见下文）可能会根据自身政策设置 Cookie。您可以在浏览器设置中清除或禁用本地存储，但这会导致您的封面配置丢失。
          </P>

          <H>第三方服务</H>
          <P>
            为提供完整功能，本站点会调用以下第三方服务，并受其各自隐私政策约束：
          </P>
          <ul className='list-disc pl-6 text-zinc-700 leading-7 text-[15px] md:text-base space-y-1'>
            <li>Iconify（图标搜索与加载）</li>
            <li>Unsplash（在线背景图片搜索）</li>
            <li>Cloudflare（站点托管、CDN 与访问统计）</li>
          </ul>

          <H>广告</H>
          <P>
            本站点目前未投放个性化广告。若未来启用 Google AdSense 或其他广告服务，相关广告合作伙伴可能会使用 Cookie 以投放与您兴趣相关的广告。届时我们将在本政策中更新说明，并尽可能为您提供选择退出个性化广告的方式（如 Google 的广告设置）。
          </P>

          <H>您的权利</H>
          <P>
            您有权随时清除浏览器本地存储以删除保存在本机的封面配置；有权通过浏览器设置管理 Cookie 与站点数据。如您对隐私有任何疑问，可通过下方方式联系我们。
          </P>

          <H>联系我们</H>
          <P>
            如对本隐私政策有任何疑问，请通过作者博客「顺风网舟」与我们联系。我们会在合理时间内回复。
          </P>
        </>
      ) : (
        <>
          <P>
            JellyCover (the &quot;Site&quot;) takes your privacy seriously. This policy explains how we collect, use
            and protect information when you use the Site. By using the Site you agree to the terms of this policy.
          </P>

          <H>Information we collect</H>
          <P>
            The Site is a fully client-side tool. Your cover designs (title, subtitle, icons, fonts, colors, etc.)
            are stored only in your browser&apos;s local storage (localStorage) and are never uploaded to our servers.
            We do not require registration and do not collect personally identifiable information such as name, email
            or phone number.
          </P>

          <H>Anonymous analytics</H>
          <P>
            We use Cloudflare Web Analytics to collect anonymous visit data (such as page views, country/region,
            browser and device type) to understand how the Site performs. This data is not personally identifiable
            and does not rely on cookies.
          </P>

          <H>Cookies and local storage</H>
          <P>
            Apart from the local storage mentioned above (used to save your cover settings), the Site itself does not
            set tracking cookies. Third-party services (see below) may set cookies under their own policies. You can
            clear or disable local storage in your browser settings, but doing so will remove your saved cover
            settings.
          </P>

          <H>Third-party services</H>
          <P>The Site calls the following third-party services, subject to their own privacy policies:</P>
          <ul className='list-disc pl-6 text-zinc-700 leading-7 text-[15px] md:text-base space-y-1'>
            <li>Iconify (icon search and loading)</li>
            <li>Unsplash (online background image search)</li>
            <li>Cloudflare (hosting, CDN and analytics)</li>
          </ul>

          <H>Advertising</H>
          <P>
            The Site does not currently serve personalized ads. If we enable Google AdSense or other advertising in
            the future, advertising partners may use cookies to serve interest-based ads. We will update this policy
            and, where possible, offer a way to opt out of personalized ads (e.g. Google&apos;s Ad Settings).
          </P>

          <H>Your rights</H>
          <P>
            You may clear your browser&apos;s local storage at any time to delete saved cover settings, and manage
            cookies and site data through your browser settings. If you have any privacy questions, contact us via the
            means below.
          </P>

          <H>Contact us</H>
          <P>
            For any questions about this privacy policy, please reach us through the author&apos;s blog &quot;Shunfeng
            Wangzhou&quot;. We will respond within a reasonable time.
          </P>
        </>
      )}
    </article>
  )
}
