import { useState } from 'react'
import {
  certifications,
  companyName,
  copyright,
  footerDisclaimer,
  footerLinks,
  footerNotice,
  socialLinks,
  supportItems,
  supportTitle,
} from '../data/footer'

const ICON = {
  chevronRight: '/images/chevron-right.svg',
  chevronRightMuted: '/images/chevron-right-muted.svg',
  chevronDown: '/images/chevron-down.svg',
}

interface FooterProps {
  onOpenDownload?: () => void
}

export default function Footer({ onOpenDownload }: FooterProps) {
  const [infoOpen, setInfoOpen] = useState(false)

  const blockCls = infoOpen ? 'block' : 'hidden md:block'

  return (
    <footer className="mt-auto bg-surface">
      <div className="mx-auto w-full max-w-content px-4 py-7 md:px-6 md:py-8 xl:px-4 xl:py-8">
        <div className="grid md:grid-cols-2 md:gap-y-6 xl:grid-cols-[320px_340px_minmax(0,1fr)] xl:gap-y-0">
          {/* 고객센터 */}
          <section className="pb-5 md:pb-0 md:pr-5 xl:pr-6" aria-label="고객센터">
            <button
              type="button"
              onClick={onOpenDownload}
              className="inline-flex items-center gap-1.5 text-xl font-extrabold leading-7 text-foreground hover:underline md:text-2xl"
            >
              {supportTitle.label}
              <img src={ICON.chevronRight} alt="" className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </button>

            <ul className="mt-3 flex flex-col gap-2">
              {supportItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={onOpenDownload}
                    className="flex w-full items-center justify-between gap-3 rounded-2xl border border-line bg-white px-5 py-3 text-left"
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
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* 링크 목록 */}
          <nav
            aria-label="푸터 메뉴"
            className="border-y border-line py-[26px] md:border-y-0 md:border-l md:py-0 md:pl-6 xl:px-6"
          >
            <ul className="flex flex-wrap gap-x-3 gap-y-3 md:grid md:grid-flow-col md:grid-rows-6 md:gap-x-5 md:gap-y-0">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={onOpenDownload}
                    className={`block text-left text-[13px] leading-5 text-foreground hover:underline md:py-[9px] md:text-[14px] ${
                      link.bold ? 'font-bold' : ''
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* 회사 정보 */}
          <section
            aria-label="회사 정보"
            className="pt-[18px] md:col-span-2 md:border-t md:border-line md:pt-6 xl:col-span-1 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0"
          >
            {/* 모바일 전용 헤더 */}
            <button
              type="button"
              aria-expanded={infoOpen}
              onClick={() => setInfoOpen((prev) => !prev)}
              className="flex items-center gap-1 text-sm font-bold leading-5 text-foreground md:hidden"
            >
              {companyName}
              <img
                src={ICON.chevronDown}
                alt=""
                className={`h-3.5 w-3.5 transition-transform ${infoOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* 사업자 정보 */}
            <div className={`${blockCls} mt-3 text-[13px] leading-5 text-muted md:mt-0 md:text-sm`}>
              {/* 모바일 화면 */}
              <div className="flex flex-col gap-0.7 leading-tight md:hidden">
                <p>대표이사 이승재</p>
                <p>서울 서초구 서초대로74길 4 삼성생명서초타워 25층, 27층</p>
                <p>
                  <button
                    type="button"
                    onClick={onOpenDownload}
                    className="hover:underline"
                  >
                    contact@bucketplace.net
                  </button>
                </p>
                <p>
                  사업자등록번호 119-86-91245{' '}
                  <button
                    type="button"
                    onClick={onOpenDownload}
                    className="font-bold hover:underline"
                  >
                    사업자정보확인
                  </button>
                </p>
                <p>통신판매업신고번호 제2018-서울서초-0580호</p>
              </div>

              {/* 데스크톱/노트북 화면 */}
              <div className="hidden md:block">
                <p>
                  {companyName} <span className="mx-1.5 text-muted/50">|</span> 대표이사 이승재{' '}
                  <span className="mx-1.5 text-muted/50">|</span> 서울 서초구 서초대로74길 4 삼성생명서초타워 25층, 27층
                </p>
                <p className="mt-0.5">
                  <button
                    type="button"
                    onClick={onOpenDownload}
                    className="hover:underline"
                  >
                    contact@bucketplace.net
                  </button>{' '}
                  <span className="mx-1.5 text-muted/50">|</span> 사업자등록번호 119-86-91245{' '}
                  <button
                    type="button"
                    onClick={onOpenDownload}
                    className="font-bold hover:underline"
                  >
                    사업자정보확인
                  </button>
                </p>
                <p className="mt-0.5">통신판매업신고번호 제2018-서울서초-0580호</p>
              </div>
            </div>

            {/* 안전거래 안내 */}
            <p className="mt-2.5 text-xs leading-5 text-muted md:mt-3 md:text-[13px]">
              {footerNotice.text}{' '}
              <button
                type="button"
                onClick={onOpenDownload}
                className="font-bold hover:underline"
              >
                {footerNotice.link.label}
              </button>
            </p>

            {/* 인증 마크 (모바일: 완전히 숨김 / md 이상: flex로 표시) */}
            <ul className="hidden md:flex mt-3 flex-wrap gap-2">
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

            {/* 통신판매중개 고지 */}
            <p className="mt-3 text-[11px] leading-4 text-muted md:text-xs">
              {footerDisclaimer}
            </p>

            {/* SNS */}
            <ul className="mt-3 flex gap-3 md:mt-4 md:gap-4">
              {socialLinks.map((sns) => (
                <li key={sns.id}>
                  <a
                    href={sns.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={sns.label}
                    className="block transition-opacity hover:opacity-70"
                  >
                    <img src={sns.icon} alt="" className="h-6 w-6 md:h-[30px] md:w-[30px]" />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-3 text-[11px] leading-4 text-muted md:mt-4 md:text-xs">
              {copyright}
            </p>
          </section>
        </div>
      </div>
    </footer>
  )
}