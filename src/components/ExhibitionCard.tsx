import type { Exhibition } from "../data/exhibitions";

interface Props {
  exhibition: Exhibition;
  className?: string;
  onOpenDownload: () => void;
}

export default function ExhibitionCard({ exhibition, className, onOpenDownload }: Props) {
  return (
    <li className={className}>
      <button
        type="button"
        onClick={onOpenDownload}
        className="group flex w-full items-center gap-4 text-left md:block"
      >
        {/* 이미지: 90px → 120px (3:2 비율 유지) */}
        <div className="aspect-[3/2] w-[120px] shrink-0 overflow-hidden rounded bg-gray-100 md:w-full md:rounded-lg">
          <img
            src={exhibition.imageUrl}
            alt={exhibition.title}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>

        <div className="min-w-0 md:mt-3">
          {exhibition.subtitle && (
            <p className="text-[13px] text-gray-600 md:text-[15px]">{exhibition.subtitle}</p>
          )}
          <h3
            className={`${exhibition.subtitle ? "mt-1" : ""} text-base font-bold text-gray-900 md:mt-1 md:text-lg`}
          >
            {exhibition.title}
          </h3>
        </div>
      </button>
    </li>
  );
}