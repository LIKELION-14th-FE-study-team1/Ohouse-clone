import { useState } from "react";
import type { Deal } from "../data/todayDeals";

interface Props {
  deal: Deal;
  time: string;
  className?: string;
  horizontal?: boolean; // 모바일용 가로 카드
  onOpenDownload: () => void;
}

export default function DealCard({
  deal,
  time,
  className = "",
  horizontal = false,
  onOpenDownload,
}: Props) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <li
      role="button"
      tabIndex={0}
      onClick={onOpenDownload}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenDownload();
        }
      }}
      className={`cursor-pointer ${className} ${
        horizontal ? "flex items-center gap-4 border-t border-line py-4 first:border-t-0 first:pt-0" : ""
      }`}
    >
      <div
        className={`relative aspect-square overflow-hidden rounded-lg bg-gray-100 ${
          horizontal ? "w-[47%] shrink-0" : ""
        }`}
      >
        <img src={deal.imageUrl} alt={deal.title} className="h-full w-full object-cover" />
        <span
          className={`absolute rounded bg-sale font-bold text-white ${
            horizontal ? "left-1.5 top-1.5 px-1.5 py-0.5 text-[11px]" : "left-2 top-2 px-2 py-1 text-sm"
          }`}
        >
          {time} 남음
        </span>

        <button
          type="button"
          aria-label={bookmarked ? "스크랩 취소" : "스크랩"}
          aria-pressed={bookmarked}
          onClick={(e) => {
            e.stopPropagation(); // 북마크 클릭 시 모달이 같이 뜨지 않게하기..
            setBookmarked((prev) => !prev);
          }}
          className={`absolute ${horizontal ? "bottom-2 right-2" : "bottom-3 right-3"}`}
        >
          <img
            src={bookmarked ? "/images/bookmark-active.svg" : "/images/bookmark-inactive.svg"}
            alt=""
            className={horizontal ? "h-5 w-5" : "h-7 w-7"}
          />
        </button>
      </div>

      <div className={horizontal ? "min-w-0 flex-1" : ""}>
        <div className={`${horizontal ? "text-xs" : "mt-3 text-sm"} text-gray-600`}>{deal.brand}</div>
        <p className={`line-clamp-2 text-gray-800 ${horizontal ? "text-[13px]" : "text-[15px]"}`}>
          {deal.title}
        </p>

        {deal.badge && <div className="mt-1 text-sm text-[#ff4b5c]">{deal.badge}</div>}
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className={`font-bold text-[#ff4b5c] ${horizontal ? "text-base" : "text-xl"}`}>
            {deal.discountRate}%
          </span>
          <span className={`font-bold ${horizontal ? "text-base" : "text-xl"}`}>
            {deal.price.toLocaleString()}
            {deal.hasMore && " 외"}
          </span>
        </div>

        <div className={`mt-1 text-gray-400 ${horizontal ? "text-xs" : "text-sm"}`}>
          <span className="text-[#ffc300]">★</span> {deal.rating} · 리뷰 {deal.reviewCount.toLocaleString()}
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {deal.freeShipping && (
            <span className="rounded border border-gray-300 px-1.5 py-0.5 text-[11px] md:text-xs">무료배송</span>
          )}
          {deal.extraTag && (
            <span className="rounded border border-gray-300 px-1.5 py-0.5 text-[11px] md:text-xs">{deal.extraTag}</span>
          )}
        </div>
      </div>
    </li>
  );
}