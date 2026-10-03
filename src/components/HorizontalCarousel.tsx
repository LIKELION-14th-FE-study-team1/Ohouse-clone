import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type HorizontalCarouselProps = {
  label: string
  children: ReactNode
  kind: 'photos' | 'categories'
}

export default function HorizontalCarousel({ label, children, kind }: HorizontalCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const id = useId()
  const [edges, setEdges] = useState({ previous: false, next: false })

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const updateEdges = () => setEdges({
      previous: viewport.scrollLeft > 2,
      next: viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 2,
    })
    updateEdges()
    const observer = new ResizeObserver(updateEdges)
    observer.observe(viewport)
    viewport.addEventListener('scroll', updateEdges, { passive: true })
    return () => {
      observer.disconnect()
      viewport.removeEventListener('scroll', updateEdges)
    }
  }, [])

  function scroll(direction: number) {
    const viewport = viewportRef.current
    if (!viewport) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    viewport.scrollBy({ left: direction * viewport.clientWidth, behavior: reduceMotion ? 'instant' : 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={viewportRef}
        id={id}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="snap-x snap-mandatory overflow-x-auto rounded [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {kind === 'categories' && edges.next && (
          <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-16 bg-gradient-to-l from-white to-transparent md:block" />
        )}
        <ul className={kind === 'photos'
          ? 'grid auto-cols-[156px] grid-flow-col gap-3 sm:auto-cols-[calc((100%_-_40px)/3)] sm:gap-5 lg:auto-cols-[calc((100%_-_100px)/6)]'
          : 'grid auto-cols-[72px] grid-flow-col gap-3 md:auto-cols-[76px]'}>
          {children}
        </ul>
      </div>
      {(['previous', 'next'] as const).map((direction) => (
        <button
          key={direction}
          type="button"
          aria-label={`${label} ${direction === 'next' ? '다음' : '이전'}`}
          aria-controls={id}
          disabled={!edges[direction]}
          onClick={() => scroll(direction === 'next' ? 1 : -1)}
          className={`absolute z-20 hidden h-12 w-12 -translate-y-1/2 rounded-full shadow-md transition hover:brightness-95 disabled:pointer-events-none disabled:opacity-0 md:block ${direction === 'next' ? '-right-6' : '-left-6'} ${kind === 'photos' ? 'top-1/2' : 'top-[42px]'}`}
        >
          <img src={`/images/arrow-circle-${direction === 'next' ? 'right' : 'left'}.svg`} alt="" width="48" height="48" />
        </button>
      ))}
    </div>
  )
}
