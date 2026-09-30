import { useState } from "react";
import type { Deal } from "../data/todayDeals";

interface Props {
  deal: Deal;
  time: string;
  className?: string;
}

export default function DealCard({ deal, time, className }: Props) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <li className={className}>
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img src={deal.imageUrl} alt={deal.title} className="h-full w-full object-cover" />
        <span className="absolute left-2 top-2 rounded bg-[#f77] px-2 py-1 text-sm font-bold text-white">
          {time} 남음
        </span>

        {/* 북마크 버튼 */}
        <button
          type="button"
          aria-label={bookmarked ? "스크랩 취소" : "스크랩"}
          aria-pressed={bookmarked}
          onClick={() => setBookmarked((prev) => !prev)}
          className="absolute bottom-3 right-3"
        >
          <img
            src={bookmarked ? "/images/bookmark-active.svg" : "/images/bookmark-inactive.svg"}
            alt=""
            className="h-7 w-7"
          />
        </button>
      </div>

      <div className="mt-3 text-sm text-gray-600">{deal.brand}</div>
      <p className="line-clamp-2 text-[15px] text-gray-800">{deal.title}</p>

      {deal.badge && <div className="mt-1 text-sm text-[#f05656]">{deal.badge}</div>}
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-xl font-bold text-[#f05656]">{deal.discountRate}%</span>
        <span className="text-xl font-bold">
          {deal.price.toLocaleString()}
          {deal.hasMore && " 외"}
        </span>
      </div>

      <div className="mt-1 text-sm text-gray-400">
        <span className="text-[#ffc300]">★</span> {deal.rating} · 리뷰 {deal.reviewCount.toLocaleString()}
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {deal.freeShipping && (
          <span className="rounded border border-gray-300 px-1.5 py-0.5 text-xs">무료배송</span>
        )}
        {deal.extraTag && (
          <span className="rounded border border-gray-300 px-1.5 py-0.5 text-xs">{deal.extraTag}</span>
        )}
      </div>
    </li>
  );
}