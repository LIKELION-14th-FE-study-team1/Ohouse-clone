import { interiorReviews } from "../data/interiorReviews";
import ReviewCard from "./ReviewCard";

export default function ReviewSection() {
  return (
    <section className="mx-auto w-full max-w-[1200px] py-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold leading-7 md:text-xl">
          <a href="#" className="transition-colors hover:text-muted">유저들의 인테리어 시공 리뷰</a>
        </h2>
        <a href="#" className="hidden text-sm font-bold text-primary hover:opacity-70 md:block md:text-base">
          더보기
        </a>
        <a href="#" aria-label="시공 리뷰 더보기" className="md:hidden">
          <img src="/images/chevron-right.svg" alt="" className="h-5 w-5" />
        </a>
      </div>

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {interiorReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ul>

      {/* 모바일 전용 버튼 */}
      <a href="#" className="mt-5 block rounded-lg border border-line py-3 text-center text-sm font-bold hover:bg-surface md:hidden">
        인테리어 시공업체 찾기
      </a>
    </section>
  );
}