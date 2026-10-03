import { categories, housewarmings, photos } from '../data/recommendations'
import ReferenceImage from './ReferenceImage'
import useBookmarks from '../hooks/useBookmarks'
import BookmarkButton from './BookmarkButton'
import HorizontalCarousel from './HorizontalCarousel'

type HomeRecommendationsProps = { onOpenDownload: () => void }

type SectionHeadingProps = {
  id: string
  title: string
  description?: string
  onMore?: () => void
}

function SectionHeading({ id, title, description, onMore }: SectionHeadingProps) {
  return (
    <div className="mb-5 flex items-start justify-between gap-3">
      <div>
        <h2 id={id} className={`text-lg font-bold leading-7 md:text-xl ${onMore ? "cursor-pointer transition-colors hover:text-muted" : ""}`} onClick={onMore}>{title}</h2>
        {description && <p className="mt-1 text-sm leading-5">{description}</p>}
      </div>
      {onMore && (
        <button type="button" onClick={onMore} aria-label={`${title} 더보기`} className="-mr-1 shrink-0 rounded px-1 py-1 text-sm font-bold text-primary hover:opacity-70 md:text-base">
          <span className="hidden md:inline">더보기</span>
          <img src="/images/chevron-right.svg" alt="" className="h-5 w-5 md:hidden" />
        </button>
      )}
    </div>
  )
}

export default function HomeRecommendations({ onOpenDownload }: HomeRecommendationsProps) {
  const { bookmarks, toggleBookmark, announcement } = useBookmarks()

  return (
    <div className="space-y-6 md:space-y-16">
      <section aria-labelledby="photos-heading">
        <SectionHeading id="photos-heading" title="이런 사진 찾고 있나요?" description="좋아하실 만한 인테리어 콘텐츠를 추천해드려요" onMore={onOpenDownload} />
        <HorizontalCarousel label="추천 사진" kind="photos">
          {photos.map((photo, index) => (
            <li key={photo.id} className="relative min-w-0 snap-start">
              <button type="button" onClick={onOpenDownload} aria-label={`${photo.author}의 ${photo.description}`} className="group relative block aspect-[3/4] w-full overflow-hidden rounded bg-surface text-left">
                {photo.crop ? (
                  <ReferenceImage crop={photo.crop} alt={photo.description} className="h-full w-full transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none" />
                ) : (
                  <img src={photo.image} alt={photo.description} loading={index < 6 ? 'eager' : 'lazy'} width="360" height="480" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none" />
                )}
                <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-2 left-2 right-10 flex items-center gap-1.5 text-xs font-bold text-white">
                  {photo.avatarCrop ? (
                    <ReferenceImage crop={photo.avatarCrop} alt="" className="h-6 w-6 shrink-0 rounded-full" />
                  ) : (
                    <img src={photo.avatar ?? photo.image} alt="" width="24" height="24" className="h-6 w-6 shrink-0 rounded-full border border-white/30 object-cover" />
                  )}
                  <span className="truncate">{photo.author}</span>
                </span>
              </button>
              <BookmarkButton label={photo.description} saved={bookmarks.includes(photo.id)} onToggle={() => toggleBookmark(photo.id)} />
            </li>
          ))}
          <li className="min-w-0 snap-start">
            <div className="flex h-full flex-col items-center justify-center gap-3">
              <button
                type="button"
                onClick={onOpenDownload}
                aria-label="추천 사진 더보기"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f2f4] transition-colors hover:bg-gray-200"
              >
                <svg viewBox="0 0 480 480" className="h-5 w-5" fill="#292929" aria-hidden="true">
                  <path d="M252.602 87.778c7.44-7.4 19.47-7.366 26.87.073l138 138.751.34.35c7.029 7.434 6.916 19.151-.34 26.446l-138 138.75c-7.4 7.44-19.43 7.473-26.87.074-7.44-7.4-7.473-19.43-.074-26.87L358.306 259H76c-10.493 0-19-8.507-19-19s8.507-19 19-19h282.306L252.528 114.648c-7.399-7.44-7.366-19.47.074-26.87" />
                </svg>
              </button>
              <span className="text-sm font-bold text-gray-500">더보기</span>
            </div>
          </li>
        </HorizontalCarousel>
      </section>

      <div
          aria-hidden="true"
          className="-mx-4 h-3 bg-surface md:hidden"
      />

      <section aria-labelledby="housewarming-heading">
        <SectionHeading id="housewarming-heading" title="오늘의 추천 집들이 구경해보세요 🧐" onMore={onOpenDownload} />
        <ul className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-4 md:gap-x-5">
          {housewarmings.map((house) => (
            <li key={house.id} className="min-w-0">
              <div className="relative">
                <button type="button" onClick={onOpenDownload} aria-label={`${house.title} 사진 보기`} className="group block aspect-square w-full overflow-hidden rounded bg-surface md:aspect-[3/2]">
                  <img src={house.image} alt={house.title} width="600" height="400" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none" />
                </button>
                <BookmarkButton label={house.title} saved={bookmarks.includes(house.id)} onToggle={() => toggleBookmark(house.id)} />
              </div>
              <button type="button" onClick={onOpenDownload} className="mt-2 w-full text-left text-sm leading-6 md:text-base">
                {house.title}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div
          aria-hidden="true"
          className="-mx-4 h-3 bg-surface md:hidden"
      />

      <section aria-labelledby="categories-heading">
        <SectionHeading id="categories-heading" title="카테고리별 상품 찾기" />
        <HorizontalCarousel label="상품 카테고리" kind="categories">
          {categories.map((category) => (
            <li key={category.name} className="snap-start">
              <button type="button" onClick={onOpenDownload} className="group flex w-full flex-col items-center rounded pb-1 text-center">
                <img src={`/images/${category.image}`} alt="" width="76" height="76" className="h-[76px] w-[76px] object-contain" />
                <span className="mt-3 whitespace-nowrap text-xs leading-5 md:text-sm">{category.name}</span>
              </button>
            </li>
          ))}
        </HorizontalCarousel>
      </section>
      <p role="status" aria-live="polite" className="sr-only">{announcement}</p>
    </div>
  )
}
