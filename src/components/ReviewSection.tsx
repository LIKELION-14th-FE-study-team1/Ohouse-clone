import { useState } from "react";
import { interiorReviews } from "../data/interiorReviews";
import ReviewCard from "./ReviewCard";
import AppDownloadModal from "./AppDownloadModal";

export default function ReviewSection() {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const onOpenDownload = () => setDownloadOpen(true);

  return (
    <section className="mx-auto w-full max-w-[1200px] py-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold leading-7 md:text-xl">
          <button type="button" onClick={onOpenDownload} className="transition-colors hover:text-muted">
            유저들의 인테리어 시공 리뷰
          </button>
        </h2>
        <button
          type="button"
          onClick={onOpenDownload}
          className="hidden text-sm font-bold text-primary hover:opacity-70 md:block md:text-base"
        >
          더보기
        </button>
        <button type="button" onClick={onOpenDownload} aria-label="시공 리뷰 더보기" className="md:hidden">
          <img src="/images/chevron-right.svg" alt="" className="h-5 w-5" />
        </button>
      </div>

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {interiorReviews.map((review) => (
          <ReviewCard key={review.id} review={review} onOpenDownload={onOpenDownload} />
        ))}
      </ul>

      <button
        type="button"
        onClick={onOpenDownload}
        className="mt-5 block w-full rounded-lg border border-line py-3 text-center text-sm font-bold hover:bg-surface md:hidden"
      >
        인테리어 시공업체 찾기
      </button>

      <AppDownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} />
    </section>
  );
}