import { interiorReviews } from "../data/interiorReviews";
import ReviewCard from "./ReviewCard";

export default function ReviewSection() {
  return (
    <section className="mx-auto w-full max-w-[1200px] py-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold leading-7 md:text-xl">
          <a href="#" className="transition-colors hover:text-muted">유저들의 인테리어 시공 리뷰</a>
        </h2>
        <a href="#" className="text-sm font-bold text-primary hover:opacity-70 md:text-base">더보기</a>
      </div>

      {/* 760px 이상: 3열, 미만일떄는: 1열 */}
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {interiorReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
}