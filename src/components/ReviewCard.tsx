import type { InteriorReview } from "../data/interiorReviews";

interface Props {
  review: InteriorReview;
  className?: string;
  onOpenDownload: () => void;
}

export default function ReviewCard({ review, className, onOpenDownload }: Props) {
  return (
    <li className={className}>
      <button
        type="button"
        onClick={onOpenDownload}
        className="group flex w-full gap-3 text-left md:block"
      >
        <div className="h-[90px] w-[90px] shrink-0 overflow-hidden rounded bg-gray-100 md:aspect-[3/2] md:h-auto md:w-full md:rounded-lg">
          <img
            src={review.imageUrl}
            alt={review.title}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-gray-900 md:mt-4 md:text-lg">{review.title}</h3>
          <p className="mt-1 line-clamp-4 text-xs leading-relaxed text-gray-700 md:line-clamp-3 md:text-[17px]">
            {review.content}
          </p>
        </div>
      </button>
    </li>
  );
}