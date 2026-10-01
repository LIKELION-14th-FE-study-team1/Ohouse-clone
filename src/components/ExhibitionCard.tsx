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
        className="group flex w-full items-center gap-3 text-left md:block"
      >
        <div className="aspect-[3/2] w-[90px] shrink-0 overflow-hidden rounded bg-gray-100 md:w-full md:rounded-lg">
          <img
            src={exhibition.imageUrl}
            alt={exhibition.title}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>

        <div className="min-w-0 md:mt-3">
          {exhibition.subtitle && (
            <p className="text-xs text-gray-600 md:text-[15px]">{exhibition.subtitle}</p>
          )}
          <h3
            className={`${exhibition.subtitle ? "mt-0.5 md:mt-1" : ""} text-sm font-bold text-gray-900 md:text-lg`}
          >
            {exhibition.title}
          </h3>
        </div>
      </button>
    </li>
  );
}