import { useEffect, useRef, useState } from 'react'
import Wrapper from './Wrapper'
import SearchField from './SearchField'
import SearchDrawer from './SearchDrawer'
import MobileMenuDrawer from './MobileMenuDrawer'
import useAutoCycle from '../hooks/useAutoCycle'
import '../styles/HomeSlide.css'
import { keywords } from '../data/popularKeywords'
import KeywordStatus from './KeywordStatus'

type HomeHeaderProps = {
    onOpenDownload: () => void
}

const imagePath = '/images/part1'

const navigation = [
    '홈',
    '추천',
    '집들이',
    '집사진',
    '커뮤니티',
    '3D인테리어',
]

export default function HomeHeader({
    onOpenDownload,
}: HomeHeaderProps) {
    const [promotionOpen, setPromotionOpen] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [rankingOpen, setRankingOpen] = useState(false)
    const [rankingHovered, setRankingHovered] = useState(false)
    const [rankingFocused, setRankingFocused] = useState(false)
    const rankingButtonRef = useRef<HTMLButtonElement>(null)

    const [hasScrolled, setHasScrolled] = useState(false)
    const [scrollingUp, setScrollingUp] = useState(false)
    const [headerHovered, setHeaderHovered] = useState(false)
    const [headerKeyboardFocused, setHeaderKeyboardFocused] = useState(false)

        const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)')

        function updateIsMobile() {
            setIsMobile(mediaQuery.matches)
        }

        updateIsMobile()
        mediaQuery.addEventListener('change', updateIsMobile)

        return () => {
            mediaQuery.removeEventListener('change', updateIsMobile)
        }
    }, [])

    const mobileHeaderVisible =
        !hasScrolled
        || scrollingUp
        || headerKeyboardFocused

    const navigationVisible = isMobile
        ? mobileHeaderVisible
        : (
            !hasScrolled
            || scrollingUp
            || headerHovered
            || headerKeyboardFocused
        )

    useEffect(() => {
        function getScrollTop() {
            const maxScroll = Math.max(
                0,
                document.documentElement.scrollHeight - window.innerHeight,
            )

            return Math.min(maxScroll, Math.max(0, window.scrollY))
        }

        let previousScrollTop = getScrollTop()

        setHasScrolled(previousScrollTop > 8)

        function handleScroll() {
            const currentScrollTop = getScrollTop()

            setHasScrolled(currentScrollTop > 8)

            if (currentScrollTop < previousScrollTop) {
                setScrollingUp(true)
            } else if (currentScrollTop > previousScrollTop) {
                setScrollingUp(false)
            }

            previousScrollTop = currentScrollTop
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (!navigationVisible) {
            setRankingOpen(false)
            setRankingHovered(false)
            setRankingFocused(false)
        }
    }, [navigationVisible])

    function closeRanking() {
        rankingButtonRef.current?.focus()
        setRankingOpen(false)
    }

    const {
        index,
        previousIndex,
        transitionKey,
        duration,
    } = useAutoCycle(
        keywords.length,
        2030,
        rankingOpen || rankingHovered || rankingFocused,
    )

    return (
        <>
            {promotionOpen && (
                <div className="hidden bg-primary text-white md:block">
                    <Wrapper className="relative flex h-11 items-center justify-center">
                        <button
                            type="button"
                            onClick={onOpenDownload}
                            className="flex items-center gap-3 text-sm"
                        >
                            <span className="-rotate-6 rounded-sm bg-white px-2 py-1 text-xs font-bold text-primary">
                                2만원
                            </span>
                            <span>
                                첫 구매라면 누구나 최대 <strong>2만원 할인!</strong>
                            </span>
                            <span aria-hidden="true">›</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setPromotionOpen(false)}
                            aria-label="상단 할인 배너 닫기"
                            className="absolute right-6 flex h-9 w-9 items-center justify-center lg:right-8"
                        >
                            <img
                                src={`${imagePath}/banner_close.svg`}
                                alt=""
                                className="h-5 w-5"
                            />
                        </button>
                    </Wrapper>
                </div>
            )}

            <header
                aria-hidden={isMobile && !mobileHeaderVisible}
                inert={isMobile && !mobileHeaderVisible}
                className={`sticky top-0 z-40 isolate transition-transform duration-200 ease-out motion-reduce:transition-none ${
                    isMobile && !mobileHeaderVisible
                        ? '-translate-y-full'
                        : 'translate-y-0'
                }`}
                onMouseEnter={() => setHeaderHovered(true)}
                onMouseLeave={() => setHeaderHovered(false)}
                onFocusCapture={(event) => {
                    if (
                        event.target instanceof HTMLElement
                        && event.target.matches(':focus-visible')
                    ) {
                        setHeaderKeyboardFocused(true)
                    }
                }}
                onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        setHeaderKeyboardFocused(false)
                    }
                }}
            >
                <div className="relative z-20 border-b border-line bg-white">
                    <Wrapper className="relative flex h-[50px] items-center justify-between gap-3 md:h-20 md:gap-5">                        <button
                            type="button"
                            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
                            aria-expanded={menuOpen}
                            aria-controls="home-mobile-menu"
                            onClick={() => setMenuOpen((open) => !open)}
                            className="flex h-10 w-10 items-center justify-center md:hidden"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="h-6 w-6"
                                aria-hidden="true"
                            >
                                <path
                                    d="M4 6h16M4 12h16M4 18h16"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>

                        <a
                            href="#"
                            aria-label="오늘의집 홈"
                            className="absolute left-1/2 -translate-x-1/2 md:static md:shrink-0 md:translate-x-0"
                        >
                            <img
                                src={`${imagePath}/ohouse-horizontal.svg`}
                                alt="오늘의집"
                                className="h-[26px] w-[92px] object-contain md:h-[30px] md:w-[106px]"
                            />
                        </a>

                        <nav
                            aria-label="주요 서비스"
                            className="hidden shrink-0 items-center gap-4 whitespace-nowrap text-base font-bold md:flex lg:gap-6 lg:text-lg"
                        >
                            <a href="#" className="text-primary">
                                집구경
                            </a>
                            <button
                                type="button"
                                onClick={onOpenDownload}
                                className="hover:text-primary"
                            >
                                쇼핑
                            </button>
                            <button
                                type="button"
                                onClick={onOpenDownload}
                                className="hover:text-primary"
                            >
                                인테리어/생활
                            </button>
                        </nav>

                        <div className="hidden min-w-[160px] flex-1 lg:block [&>form]:ml-auto [&>form]:h-[38px] [&>form]:w-[clamp(160px,calc(43.75vw_-_330px),270px)] [&>form]:py-0">
                            <SearchField onSearch={onOpenDownload} />
                        </div>

                        <div className="ml-auto flex shrink-0 items-center gap-1 md:gap-3">
                            <button
                                type="button"
                                aria-label="검색창 열기"
                                aria-haspopup="dialog"
                                aria-expanded={searchOpen}
                                aria-controls={searchOpen ? 'home-search-drawer' : undefined}
                                onClick={() => setSearchOpen(true)}
                                className="flex h-9 w-9 items-center justify-center text-black transition-colors duration-150 hover:text-[#00A1FF] lg:hidden"
                            >
                                <span
                                    aria-hidden="true"
                                    className="block h-6 w-6 bg-current"
                                    style={{
                                        maskImage: `url("${imagePath}/search-icon.svg")`,
                                        WebkitMaskImage: `url("${imagePath}/search-icon.svg")`,
                                        maskSize: 'contain',
                                        WebkitMaskSize: 'contain',
                                        maskRepeat: 'no-repeat',
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskPosition: 'center',
                                        WebkitMaskPosition: 'center',
                                    }}
                                />
                            </button>

                            <button
                                type="button"
                                onClick={onOpenDownload}
                                aria-label="장바구니"
                                className="flex h-9 w-9 items-center justify-center text-black transition-colors duration-150 hover:text-[#00A1FF]"
                            >
                                <span
                                    aria-hidden="true"
                                    className="block h-6 w-6 bg-current"
                                    style={{
                                        maskImage: `url("${imagePath}/cart.svg")`,
                                        WebkitMaskImage: `url("${imagePath}/cart.svg")`,
                                        maskSize: 'contain',
                                        WebkitMaskSize: 'contain',
                                        maskRepeat: 'no-repeat',
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskPosition: 'center',
                                        WebkitMaskPosition: 'center',
                                    }}
                                />
                            </button>

                            <div className="hidden items-center gap-3 whitespace-nowrap text-xs md:flex">
                                <button type="button" onClick={onOpenDownload}>
                                    로그인
                                </button>
                                <span className="h-3 border-l border-line" />
                                <button type="button" onClick={onOpenDownload}>
                                    회원가입
                                </button>
                                <button
                                    type="button"
                                    onClick={onOpenDownload}
                                    className="hidden xl:block"
                                >
                                    고객센터
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={onOpenDownload}
                                className="group relative isolate hidden items-center gap-2 overflow-hidden whitespace-nowrap rounded bg-[#01A1FF] px-4 py-2.5 text-sm font-bold text-white md:flex"
                            >
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                                />

                                <span className="relative">글쓰기</span>

                                <img
                                    src="/images/chevron-down-white.svg"
                                    alt=""
                                    className="relative hidden h-3 w-3 lg:block"
                                />
                            </button>
                        </div>
                    </Wrapper>
                </div>

                <div
                    aria-hidden={!navigationVisible}
                    inert={!navigationVisible}
                    className={`relative z-10 border-b border-line bg-white md:absolute md:inset-x-0 md:top-full md:transition-[transform,opacity] md:duration-200 md:ease-out motion-reduce:transition-none ${
                        navigationVisible
                            ? 'translate-y-0 opacity-100'
                            : 'md:pointer-events-none md:-translate-y-full md:opacity-0'
                    }`}
                >
                    <Wrapper className="relative flex h-[39px] items-center justify-between gap-3 md:h-[50px] md:gap-5">
                        <nav
                            aria-label="집구경 메뉴"
                            className="min-w-0 flex-1 overflow-x-auto md:flex-initial [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"                        
                        >
                            <ul className="mx-auto flex w-max items-center gap-5 md:mx-0">
                                {navigation.map((item, itemIndex) => (
                                    <li key={item}>
                                        <button
                                            type="button"
                                            aria-current={itemIndex === 0 ? 'page' : undefined}
                                            onClick={
                                                itemIndex === 0
                                                    ? () => window.scrollTo({ top: 0 })
                                                    : onOpenDownload
                                            }
                                                className={`flex h-[39px] items-center justify-center whitespace-nowrap border-b-2 text-sm font-bold hover:text-primary md:h-[50px] md:text-base ${
                                                itemIndex === 0
                                                    ? 'border-primary text-primary'
                                                    : 'border-transparent'
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div
                            className="relative hidden w-[210px] shrink-0 md:block"
                            onMouseEnter={() => setRankingHovered(true)}
                            onMouseLeave={() => setRankingHovered(false)}
                            onFocusCapture={() => setRankingFocused(true)}
                            onBlurCapture={(event) => {
                                if (!event.currentTarget.contains(event.relatedTarget)) {
                                    setRankingFocused(false)
                                    setRankingOpen(false)
                                }
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Escape') {
                                    event.preventDefault()
                                    closeRanking()
                                }
                            }}
                        >
                            {/* 접힌 상태의 검색어 자동 순환 */}
                            <button
                                ref={rankingButtonRef}
                                type="button"
                                aria-expanded={rankingOpen}
                                aria-controls="home-keyword-list"
                                aria-label="인기 검색어 목록"
                                onClick={() => setRankingOpen((open) => !open)}
                                className="flex h-[39px] w-full items-center gap-2 text-sm md:h-[50px]"                            
                            >
                                <span className="relative block h-6 min-w-0 flex-1 overflow-hidden">
                                    {previousIndex !== null && (
                                        <span
                                            key={`keyword-out-${transitionKey}`}
                                            aria-hidden="true"
                                            className="home-slide home-slide-up-out absolute inset-0 flex items-center gap-2"
                                            style={{
                                                animationDuration: `${duration}ms`,
                                            }}
                                        >
                                            <strong className="w-5 shrink-0 text-center">
                                                {previousIndex + 1}
                                            </strong>

                                            <KeywordStatus rank={previousIndex + 1} />

                                            <span className="min-w-0 flex-1 truncate text-left">
                                                {keywords[previousIndex]}
                                            </span>
                                        </span>
                                    )}

                                    <span
                                        key={`keyword-in-${transitionKey}`}
                                        className={`absolute inset-0 flex items-center gap-2 ${
                                            previousIndex !== null
                                                ? 'home-slide home-slide-up-in'
                                                : ''
                                        }`}
                                        style={{
                                            animationDuration: `${duration}ms`,
                                        }}
                                    >
                                        <strong className="w-5 shrink-0 text-center">
                                            {index + 1}
                                        </strong>

                                        <KeywordStatus rank={index + 1} />

                                        <span className="min-w-0 flex-1 truncate text-left">
                                            {keywords[index]}
                                        </span>
                                    </span>
                                </span>

                                <img
                                    src={`${imagePath}/arrow-down.svg`}
                                    alt=""
                                    className="h-4 w-4 shrink-0"
                                />
                            </button>

                            {/* 펼쳐진 인기 검색어 목록 */}
                            {rankingOpen && (
                                <div
                                    id="home-keyword-list"
                                    role="region"
                                    aria-labelledby="home-keyword-title"
                                    className="absolute right-0 top-0 z-50 max-h-[calc(100dvh-160px)] w-[290px] overflow-y-auto rounded-lg border border-[#DADDE0] bg-white px-6 pb-5 pt-6 text-foreground shadow-md"
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <h2
                                            id="home-keyword-title"
                                            className="text-xl font-bold"
                                        >
                                            인기 검색어
                                        </h2>

                                        <button
                                            type="button"
                                            onClick={closeRanking}
                                            aria-label="인기 검색어 목록 닫기"
                                            className="flex h-8 w-8 items-center justify-center rounded hover:bg-surface"
                                        >
                                            <img
                                                src={`${imagePath}/arrow-down.svg`}
                                                alt=""
                                                className="h-5 w-5"
                                            />
                                        </button>
                                    </div>

                                    <ol>
                                        {keywords.map((keyword, keywordIndex) => (
                                            <li
                                                key={keyword}
                                                className="flex min-h-10 items-center gap-2"
                                            >
                                                <strong className="w-6 shrink-0 text-center text-lg font-bold tabular-nums">
                                                    {keywordIndex + 1}
                                                </strong>

                                                <KeywordStatus rank={keywordIndex + 1} />

                                                <span className="min-w-0 flex-1 text-base leading-6">
                                                    {keyword}
                                                </span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            )}
                        </div>
                    </Wrapper>
                </div>
            </header>

            <div aria-hidden="true" className="hidden md:block md:h-[51px]" />

            {searchOpen && (
                <SearchDrawer
                    onClose={() => setSearchOpen(false)}
                    onSearch={onOpenDownload}
                />
            )}

            {menuOpen && (
                <MobileMenuDrawer
                    onClose={() => setMenuOpen(false)}
                    onOpenDownload={onOpenDownload}
                />
            )}
        </>
    )
}