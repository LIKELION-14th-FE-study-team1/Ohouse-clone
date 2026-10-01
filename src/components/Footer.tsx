import { useState } from 'react'
import {
  certifications,
  companyInfoLines,
  companyName,
  copyright,
  footerDisclaimer,
  footerLinks,
  footerNotice,
  socialLinks,
  supportItems,
  supportTitle,
} from '../data/footer'

/* 아이콘 이미지 경로 (public/images/) */
const ICON = {
  chevronRight: '/images/chevron-right.svg',
  chevronRightMuted: '/images/chevron-right-muted.svg',
  chevronDown: '/images/chevron-down.svg',
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/*  - 모바일(~767px): 세로로 쌓기 + 회사정보 아코디언                     */
/*  - md(768px~)    : 위 [고객센터 | 링크] / 아래 [회사정보]              */
/*  - xl(1280px~)   : [고객센터 | 링크 | 회사정보] 3단                   */
/* ------------------------------------------------------------------ */

export default function Footer() {
  const [infoOpen, setInfoOpen] = useState(false)

  /* 모바일에서는 접힘 상태일 때 숨기고, md 이상에서는 항상 표시
     (Tailwind가 인식할 수 있도록 클래스를 통째로 작성) */
  const blockCls = infoOpen ? 'block' : 'hidden md:block'
  const flexCls = infoOpen ? 'flex' : 'hidden md:flex'

  return (
    <footer className="mt-auto bg-surface">
      <div className="mx-auto max-w-content px-4 py-7 md:px-6 md:py-8 xl:px-0 xl:py-8">
        <div className="grid md:grid-cols-2 md:gap-y-6 xl:grid-cols-[320px_340px_minmax(0,1fr)] xl:gap-y-0">
          {/* ── 고객센터 ── */}
          <section className="pb-5 md:pb-0 md:pr-5 xl:pr-6" aria-label="고객센터">
            <a
              href={supportTitle.href}
              className="inline-flex items-center gap-0.5 text-lg font-bold leading-6 text-foreground"
            >
              {supportTitle.label}
              <img src={ICON.chevronRight} alt="" className="h-3.5 w-3.5 md:h-5 md:w-5" />
            </a>

            <ul className="mt-3 flex flex-col gap-2">
              {supportItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-white px-5 py-3"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-bold leading-5 text-foreground md:text-[15px] md:leading-6">
                        {item.title}
                      </span>
                      {item.descriptions.map((line) => (
                        <span
                          key={line}
                          className="block text-xs leading-4 text-muted md:leading-[17px]"
                        >
                          {line}
                        </span>
                      ))}
                    </span>
                    <img src={ICON.chevronRightMuted} alt="" className="h-5 w-5 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* ── 링크 목록 ── */}
          <nav
            aria-label="푸터 메뉴"
            className="border-y border-line py-[26px] md:border-y-0 md:border-l md:py-0 md:pl-6 xl:px-6"
          >
            <ul className="flex flex-wrap gap-x-3 gap-y-3 md:grid md:grid-flow-col md:grid-rows-6 md:gap-x-5 md:gap-y-0">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`block text-xs leading-5 text-foreground md:py-[9px] md:text-[13px] ${
                      link.bold ? 'font-bold' : ''
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── 회사 정보 ── */}
          <section
            aria-label="회사 정보"
            className="pt-[18px] md:col-span-2 md:border-t md:border-line md:pt-6 xl:col-span-1 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0"
          >
            {/* 모바일 전용 아코디언 헤더 */}
            <button
              type="button"
              aria-expanded={infoOpen}
              onClick={() => setInfoOpen((prev) => !prev)}
              className="flex items-center gap-1 text-xs font-bold leading-5 text-foreground md:hidden"
            >
              {companyName}
              <img
                src={ICON.chevronDown}
                alt=""
                className={`h-3 w-3 transition-transform ${infoOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* 사업자 정보 (모바일: 접힘 / md~: 항상 표시) */}
            <div className={`${blockCls} mt-3 text-xs leading-5 text-muted md:mt-0`}>
              {companyInfoLines.map((line, index) => (
                <p key={index}>
                  {line.items.map((item, i) => (
                    <span key={item} className="inline-block">
                      {i > 0 && (
                        <span aria-hidden="true" className="mx-1.5 text-muted/50">
                          |
                        </span>
                      )}
                      {item}
                    </span>
                  ))}
                  {line.link && (
                    <a href={line.link.href} className="ml-1 font-bold">
                      {line.link.label}
                    </a>
                  )}
                </p>
              ))}
            </div>

            {/* 안전거래 안내 (항상 표시) */}
            <p className="mt-2.5 text-[10px] leading-[14px] text-muted md:mt-3 md:text-[11px] md:leading-4">
              {footerNotice.text}{' '}
              <a href={footerNotice.link.href} className="font-bold">
                {footerNotice.link.label}
              </a>
            </p>

            {/* 인증 마크 (모바일: 접힘 / md~: 항상 표시) */}
            <ul className={`${flexCls} mt-3 flex-wrap gap-2`}>
              {certifications.map((cert) => (
                <li
                  key={cert.id}
                  className={`flex h-11 items-center justify-center gap-2 border border-line px-3 ${
                    cert.texts ? 'w-[198px] justify-start' : 'w-[138px]'
                  }`}
                >
                  <img
                    src={cert.image}
                    alt={cert.alt}
                    className="h-8 w-8 shrink-0 object-contain"
                  />
                  {cert.texts && (
                    <span className="text-[11px] leading-4 text-muted">
                      {cert.texts.map((t) => (
                        <span key={t} className="block">
                          {t}
                        </span>
                      ))}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            {/* 통신판매중개 고지 (항상 표시) */}
            <p className="mt-3 text-[10px] leading-[14px] text-muted md:text-[11px] md:leading-4">
              {footerDisclaimer}
            </p>

            {/* SNS */}
            <ul className="mt-3 flex gap-3 md:mt-4 md:gap-4">
              {socialLinks.map((sns) => (
                <li key={sns.id}>
                  <a href={sns.href} aria-label={sns.label} className="block">
                    <img src={sns.icon} alt="" className="h-6 w-6 md:h-[30px] md:w-[30px]" />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-3 text-[10px] leading-[14px] text-muted md:mt-4 md:text-[11px] md:leading-4">
              {copyright}
            </p>
          </section>
        </div>
      </div>
    </footer>
  )
}