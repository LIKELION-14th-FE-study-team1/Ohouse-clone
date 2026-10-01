import { useRef, useState } from 'react'
import Wrapper from './Wrapper'
import SearchField from './SearchField'
import SearchDrawer from './SearchDrawer'
import MobileMenuDrawer from './MobileMenuDrawer'
import useAutoCycle from '../hooks/useAutoCycle'
import '../styles/HomeSlide.css'

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

const keywords = [
    '밧드야',
    '수납정리함',
    '빌라레코드',
    '손님용 토퍼',
    '원하는날도착',
    '빈티지 커튼',
    '비스포크수납장',
    '몰딩',
    '작은방꾸미기',
    '거실 수납장',
]
const risingRanks = [4, 5, 9]

function KeywordStatus({ rank }: { rank: number }) {
    const rising = risingRanks.includes(rank)
    const iconUrl = `${imagePath}/${rising ? 'rising.svg' : 'new.svg'}`

    return (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
            <span className="sr-only">
                {rising ? '순위 상승' : '신규'}
            </span>
            <span
                aria-hidden="true"
                className={`block h-6 w-6 bg-[#FF5454] ${
                    rising ? 'rotate-180' : ''
                }`}
                style={{
                    maskImage: `url("${iconUrl}")`,
                    WebkitMaskImage: `url("${iconUrl}")`,
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                }}
            />
        </span>
    )
}

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
        2000,
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

            <header className="sticky top-0 z-40 bg-white">
                <div className="border-b border-line">
                    <Wrapper className="relative flex h-16 items-center justify-between gap-3 md:h-20 md:gap-5">
                        <button
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
                                className="h-auto w-[110px] lg:w-[130px]"
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
                                className="flex h-9 w-9 items-center justify-center lg:hidden"
                            >
                                <img
                                    src={`${imagePath}/search-icon.svg`}
                                    alt=""
                                    className="h-6 w-6"
                                />
                            </button>

                            <button
                                type="button"
                                onClick={onOpenDownload}
                                aria-label="장바구니"
                                className="flex h-9 w-9 items-center justify-center"
                            >
                                <img
                                    src={`${imagePath}/cart.svg`}
                                    alt=""
                                    className="h-6 w-6"
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
                                className="hidden items-center gap-2 whitespace-nowrap rounded bg-primary px-4 py-2.5 text-sm font-bold text-white hover:opacity-80 md:flex"
                            >
                                글쓰기
                            <img
                                src="/images/chevron-down-white.svg"
                                alt=""
                                className="h-3 w-3"
                            />
                            </button>
                        </div>
                    </Wrapper>
                </div>

                <div className="border-b border-line">
                    <Wrapper className="flex items-center justify-between gap-5">
                        <nav
                            aria-label="집구경 메뉴"
                            className="min-w-0 flex-1 overflow-x-auto md:flex-initial [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"                        >
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
                                            className={`h-[50px] whitespace-nowrap border-b-2 text-sm font-bold hover:text-primary md:text-base ${
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
                                className="flex h-[50px] w-full items-center gap-2 text-sm"
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