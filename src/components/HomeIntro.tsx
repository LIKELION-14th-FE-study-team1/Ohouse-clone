import { useState } from 'react'
import useAutoCycle from '../hooks/useAutoCycle'
import '../styles/HomeSlide.css'

type HomeIntroProps = {
    onOpenDownload: () => void
}

const imagePath = '/images/part1'
const slideCount = 17

const shortcuts = [
    { label: '쇼핑하기', image: 'shopping.png' },
    { label: '오늘의딜', image: 'todays_deal.png' },
    { label: '집들이', image: 'housewarming.png' },
    { label: '행운출첵', image: 'lucky_attendance.png' },
    { label: '패키지할인', image: 'package_dc.png' },
    { label: '챌린지참여', image: 'join_challenge.webp' },
    { label: '오마트', image: 'omart.png' },
    { label: '원하는날도착', image: 'delivers_whenever.png' },
    { label: '이사·청소', image: 'move_clean.webp' },
    { label: '인터넷신청', image: 'internet_application.webp' },
]

export default function HomeIntro({
    onOpenDownload,
}: HomeIntroProps) {
    const [hovered, setHovered] = useState(false)
    const [focused, setFocused] = useState(false)

    const {
        index,
        previousIndex,
        direction,
        transitionKey,
        duration,
        move,
    } = useAutoCycle(
        slideCount,
        5000,
        hovered || focused,
    )

    const slideNumber = index + 1

    const incomingClass =
        direction === 1
            ? 'home-slide-left-in'
            : 'home-slide-right-in'

    const outgoingClass =
        direction === 1
            ? 'home-slide-left-out'
            : 'home-slide-right-out'

    return (
        <section
            aria-label="오늘의집 주요 콘텐츠"
            className="pb-10 md:pb-14"
        >
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,0.32fr)] md:items-stretch">
                {/* 데스크탑 왼쪽 메인 집 이미지 */}
                <button
                    type="button"
                    onClick={onOpenDownload}
                    className="group relative hidden aspect-[5/3] min-w-0 overflow-hidden rounded-lg bg-surface text-left md:block"
                >           
                    <img
                        src={`${imagePath}/recommendation.avif`}
                        alt="블랙 소파와 큰 창이 있는 거실"
                        width="1700"
                        height="1020"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                    />

                    <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <span className="absolute inset-x-0 bottom-0 p-5 text-white lg:p-7">
                        <span className="block text-xl font-bold leading-snug lg:text-[28px]">
                            낡은 종이와 책, 패브릭을 좋아하는 자취생의
                            <br className="lg:hidden" />
                            {' '}박물관 같은 집
                        </span>
                        
                        <span className="mt-3 flex items-center gap-2 text-sm">
                            <img
                                src="/images/profile-img.avif"
                                alt=""
                                width="24"
                                height="24"
                                className="h-6 w-6 shrink-0 rounded-full object-cover"
                            />
                            <span>인생은아슬아슬</span>
                        </span>
                    </span>
                </button>

                {/* 모바일 가로 배너 / 데스크탑 오른쪽 세로 배너 */}
                <div
                    role="region"
                    aria-label="이벤트 배너"
                    aria-roledescription="캐러셀"
                    className="group relative isolate aspect-[1029/306] min-w-0 overflow-visible rounded-lg bg-surface md:aspect-auto"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onFocusCapture={() => setFocused(true)}
                    onBlurCapture={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) {
                            setFocused(false)
                        }
                    }}
                >
                    <button
                        type="button"
                        onClick={onOpenDownload}
                        aria-label={`이벤트 배너 ${slideNumber} / ${slideCount} 자세히 보기`}
                        className="absolute inset-0 block h-full w-full overflow-hidden rounded-[inherit]"
                    >
                        {/* 화면 밖으로 나가는 이전 배너 */}
                        {previousIndex !== null && (
                            <span
                                key={`banner-out-${transitionKey}`}
                                aria-hidden="true"
                                className={`home-slide absolute inset-0 block overflow-hidden ${outgoingClass}`}
                                style={{
                                    animationDuration: `${duration}ms`,
                                }}
                            >
                                <picture className="block h-full w-full">
                                    <source
                                        media="(min-width: 768px)"
                                        srcSet={`${imagePath}/slide${previousIndex + 1}.avif`}
                                    />
                                    <img
                                        src={`${imagePath}/small_slide${previousIndex + 1}.avif`}
                                        alt=""
                                        width="1029"
                                        height="306"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                                    />
                                </picture>
                            </span>
                        )}

                        {/* 화면 안으로 들어오는 현재 배너 */}
                        <span
                            key={`banner-in-${transitionKey}`}
                            className={`absolute inset-0 block overflow-hidden ${
                                previousIndex !== null
                                    ? `home-slide ${incomingClass}`
                                    : ''
                            }`}
                            style={{
                                animationDuration: `${duration}ms`,
                            }}
                        >
                            <picture className="block h-full w-full">
                                <source
                                    media="(min-width: 768px)"
                                    srcSet={`${imagePath}/slide${slideNumber}.avif`}
                                />
                                <img
                                    src={`${imagePath}/small_slide${slideNumber}.avif`}
                                    alt={`오늘의집 이벤트 ${slideNumber}`}
                                    width="1029"
                                    height="306"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                                />
                            </picture>
                        </span>
                    </button>

                    {/* 이전 배너 */}
                    <button
                        type="button"
                        onClick={() => move(-1)}
                        aria-label="이전 배너"
                        className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-opacity duration-200 md:pointer-events-none md:flex md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100"                    >
                        <img
                            src={`${imagePath}/prev.svg`}
                            alt=""
                            width="28"
                            height="28"
                            className="h-7 w-7"
                        />
                    </button>

                    {/* 다음 배너 */}
                    <button
                        type="button"
                        onClick={() => move(1)}
                        aria-label="다음 배너"
                        className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-opacity duration-200 md:pointer-events-none md:flex md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100"                    >
                        <img
                            src={`${imagePath}/next.svg`}
                            alt=""
                            width="28"
                            height="28"
                            className="h-7 w-7"
                        />
                    </button>
                    {/* 오른쪽 하단 n/17 + 표시 */}
                    <button
                        type="button"
                        onClick={onOpenDownload}
                        aria-label={`전체 이벤트 보기, 현재 ${slideNumber} / ${slideCount}`}
                        className="absolute bottom-0 right-0 z-10 flex h-6 items-center gap-1 rounded-none rounded-tl-xl rounded-br-lg bg-black/40 px-2 text-xs text-white md:bottom-3 md:right-3 md:h-7 md:gap-2 md:rounded-full md:px-3"
                    >
                        <span className="tabular-nums">
                            <strong className="font-bold">
                                {slideNumber}
                            </strong>
                            <span className="text-white/80">
                                /{slideCount}
                            </span>
                        </span>

                        <img
                            src={`${imagePath}/slide_plus.svg`}
                            alt=""
                            width="12"
                            height="12"
                            className="h-3 w-3 shrink-0"
                        />
                    </button>
                </div>
            </div>

            {/* 서비스 바로가기 */}
            <nav
                aria-label="서비스 바로가기"
                className="mt-6 md:mt-8"
            >
                <ul className="grid grid-cols-5 gap-x-1 gap-y-5 md:grid-cols-10 md:gap-x-2">
                    {shortcuts.map((shortcut) => (
                        <li key={shortcut.label} className="min-w-0">
                            <button
                                type="button"
                                onClick={onOpenDownload}
                                className="group flex w-full flex-col items-center gap-2 text-center"
                            >
                                <img
                                    src={`${imagePath}/${shortcut.image}`}
                                    alt=""
                                    className="h-auto w-full max-w-[88px] object-contain transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                                />
                                <span className="whitespace-nowrap text-[10px] min-[375px]:text-[11px] lg:text-sm">
                                    {shortcut.label}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    )
}