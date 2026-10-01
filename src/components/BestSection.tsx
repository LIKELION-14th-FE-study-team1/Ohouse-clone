import { useEffect, useRef, useState } from 'react'
import { bestProducts, type BestProduct } from '../data/best.ts'
import { categories } from '../data/recommendations'

const CATEGORY_TABS = ['전체', ...categories.map((c) => c.name)]

/* 이미지 에셋 경로 */
const ASSET = {
  pick: '/images/ohouse-pick.avif',
  bookmarkActive: '/images/bookmark-active.svg',
  bookmarkInactive: '/images/bookmark-inactive.svg',
  shipToday: '/images/Ship-today.png',
  arrowRight: '/images/arrow-circle-right.svg',
}

/* 스크롤바 숨김 (가로 스크롤 영역 공통) */
const HIDE_SCROLLBAR =
  '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

interface BestSectionProps {
  onOpenDownload?: () => void
}

/* ------------------------------------------------------------------ */
/* 아이콘                                                              */
/* ------------------------------------------------------------------ */

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="currentColor"
    viewBox="0 0 480 480"
    aria-hidden="true"
    className="shrink-0 text-[#FFC400]"
  >
    <path d="M213.697 40.7c11.46-20.585 41.145-20.584 52.604 0l.269.494 49.728 93.115 105.26 17.948c23.802 4.059 33.394 33.07 16.702 50.517l-72.843 76.136 14.523 107.862c3.188 23.678-21.139 41.466-42.736 31.248l-97.205-45.989-97.205 45.989c-21.597 10.218-45.924-7.57-42.736-31.248L114.58 278.91l-72.842-76.136c-16.692-17.447-7.1-46.458 16.702-50.517L163.7 134.309l49.729-93.115z" />
  </svg>
)

/* 1, 2, 3 순위 북마크 모양 배지 */
function RankBadge({ rank }: { rank: number }) {
  return (
    <div className="pointer-events-none absolute left-3 top-0 h-[29px] w-[25px] md:left-4 md:h-[34px] md:w-[30px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 26 30"
        className="h-full w-full"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="m13 24.25-13 5V0h26v29.25l-13-5Z"
          fill="rgba(0, 161, 255, 0.86)"
        />
      </svg>
      <span className="absolute inset-x-0 top-1.5 text-center text-xs font-bold leading-none text-white md:top-2 md:text-[13px]">
        {rank}
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 상품 카드                                                            */
/* ------------------------------------------------------------------ */

function ProductCard({
  product,
  rank,
  onOpenDownload,
}: {
  product: BestProduct
  rank: number
  onOpenDownload?: () => void
}) {
  const [bookmarked, setBookmarked] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onOpenDownload) {
      onOpenDownload()
    }
  }

  return (
    <li className="w-full min-w-0">
      {/* 이미지 영역 */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-surface">
        <button type="button" onClick={handleClick} className="block h-full w-full text-left">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </button>

        <RankBadge rank={rank} />

        {/* 반응형 비율 축소 적용된 오늘의집 pick 배지 */}
        {product.isPick && (
          <img
            src={ASSET.pick}
            alt="오늘의집 pick"
            className="pointer-events-none absolute right-[5%] top-0 w-[26%]"
          />
        )}

        {/* 색상 옵션 칩 */}
        {product.colors && (
          <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 md:bottom-3.5 md:gap-2">
            {product.colors.map((c, i) => (
              <span
                key={i}
                className={`h-3.5 w-3.5 rounded-full md:h-4 md:w-4 ${
                  c.ring ? 'ring-1 ring-black/10' : ''
                }`}
                style={{ backgroundColor: c.color }}
              />
            ))}
          </div>
        )}

        {/* 북마크(스크랩) 버튼 */}
        <button
          type="button"
          aria-label={bookmarked ? '스크랩 취소' : '스크랩'}
          aria-pressed={bookmarked}
          onClick={(e) => {
            e.stopPropagation()
            setBookmarked((prev) => !prev)
          }}
          className="absolute bottom-2.5 right-2.5 z-10 md:bottom-3 md:right-3"
        >
          <img
            src={bookmarked ? ASSET.bookmarkActive : ASSET.bookmarkInactive}
            alt=""
            className="h-5 w-5 md:h-6 md:w-6"
          />
        </button>
      </div>

      {/* 상품 정보 영역 (클릭 시 모달 팝업) */}
      <button type="button" onClick={handleClick} className="block w-full pt-2.5 text-left md:pt-3">
        <p className="truncate text-xs leading-4 text-foreground">{product.brand}</p>
        <p className="mt-1 line-clamp-2 text-[13px] leading-[18px] text-foreground md:text-sm md:leading-5">
          {product.name}
        </p>

        {product.priceLabel && (
          <p className="mt-1.5 text-xs font-medium leading-4 text-sale md:mt-2">
            {product.priceLabel}
          </p>
        )}

        <p
          className={`flex items-baseline gap-1 text-lg font-bold leading-6 text-foreground md:text-xl md:leading-7 ${
            product.priceLabel ? '' : 'mt-1.5 md:mt-2'
          }`}
        >
          {product.discountRate !== undefined && (
            <span className="text-sale">{product.discountRate}%</span>
          )}
          <span>{product.price.toLocaleString('ko-KR')}</span>
        </p>

        <p className="mt-0.5 flex items-center gap-1 text-xs leading-5 text-muted md:text-[13px]">
          <StarIcon />
          <span className="truncate">
            {product.rating.toFixed(1)} · 리뷰 {product.reviewCount.toLocaleString('ko-KR')}
          </span>
        </p>

        {product.todayDelivery && (
          <div className="mt-2">
            <img src={ASSET.shipToday} alt="오늘출발" className="h-4 w-auto md:h-[18px]" />
            <p className="mt-0.5 text-xs leading-4 text-primary">{product.todayDelivery}</p>
          </div>
        )}
      </button>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* BestSection                                                         */
/* ------------------------------------------------------------------ */

export default function BestSection({ onOpenDownload }: BestSectionProps) {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  // 💡 [카테고리 필터링 로직]
  // '전체'일 때는 전체 데이터를 보여주고, 그 외 카테고리 클릭 시 해당 카테고리 상품만 추출합니다.
  const filteredProducts =
    activeCategory === '전체'
      ? bestProducts.slice(0, 3)
      : bestProducts.filter((product) => product.category === activeCategory).slice(0, 3)

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    updateScrollState()
    window.addEventListener('resize', updateScrollState)
    return () => window.removeEventListener('resize', updateScrollState)
  }, [])

  const scrollPrev = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' })
  }

  const scrollNext = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' })
  }

  return (
    <section className="w-full pt-6 pb-12 md:pt-10 md:pb-16">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold leading-6 text-foreground md:text-xl md:leading-7">
          베스트
        </h2>
        <a href="/store/best" className="text-sm font-bold text-primary md:text-[15px]">
          더보기
        </a>
      </div>

      {/* 카테고리 칩 영역 */}
      <div className="relative mt-4 md:mt-5">
        {/* 왼쪽 화살표 */}
        {canScrollLeft && (
          <>
            <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-10 bg-gradient-to-r from-white via-white/90 to-transparent md:block" />
            <button
              type="button"
              aria-label="이전 카테고리 보기"
              onClick={scrollPrev}
              className="absolute -left-5 top-1/2 z-20 hidden -translate-y-1/2 drop-shadow-md md:block"
            >
              <img src={ASSET.arrowRight} alt="" className="h-10 w-10 -scale-x-100 md:h-12 md:w-12" />
            </button>
          </>
        )}

        {/* 카테고리 버튼 목록 */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className={`-mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0 ${HIDE_SCROLLBAR}`}
          role="tablist"
          aria-label="베스트 카테고리"
        >
          {CATEGORY_TABS.map((category) => {
            const isActive = category === activeCategory
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`h-8 shrink-0 whitespace-nowrap rounded-full px-3 text-sm transition-colors md:h-9 md:px-3.5 md:text-[15px] ${
                  isActive
                    ? 'bg-primary font-bold text-white'
                    : 'bg-surface text-foreground hover:bg-line'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        {/* 오른쪽 화살표 */}
        {canScrollRight && (
          <>
            <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-10 bg-gradient-to-l from-white via-white/90 to-transparent md:block" />
            <button
              type="button"
              aria-label="다음 카테고리 보기"
              onClick={scrollNext}
              className="absolute -right-5 top-1/2 z-20 hidden -translate-y-1/2 drop-shadow-md md:block"
            >
              <img src={ASSET.arrowRight} alt="" className="h-10 w-10 md:h-12 md:w-12" />
            </button>
          </>
        )}
      </div>

      {/* 상품 리스트 (필터링된 목록 출력) */}
      <ul className="mt-4 grid grid-cols-3 gap-2 sm:gap-4 md:mt-5 md:gap-x-6 md:gap-y-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              rank={index + 1}
              onOpenDownload={onOpenDownload}
            />
          ))
        ) : (
          <li className="col-span-3 py-12 text-center text-sm text-muted">
            해당 카테고리의 베스트 상품이 없습니다.
          </li>
        )}
      </ul>
    </section>
  )
}