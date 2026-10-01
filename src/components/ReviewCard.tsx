import type { InteriorReview } from "../data/interiorReviews";

interface Props {
  review: InteriorReview;
  className?: string;
}

export default function ReviewCard({ review, className }: Props) {
  return (
    <li className={className}>
      <a href="#" className="group block">
        <div className="aspect-[3/2] overflow-hidden rounded-lg bg-gray-100">
          <img
            src={review.imageUrl}
            alt={review.title}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>

        <h3 className="mt-4 text-lg font-bold text-gray-900">{review.title}</h3>
        <p className="mt-1 line-clamp-3 text-[17px] leading-relaxed text-gray-700">
          {review.content}
        </p>
      </a>
    </li>
  );
}