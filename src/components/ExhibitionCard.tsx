import type { Exhibition } from "../data/exhibitions";

interface Props {
  exhibition: Exhibition;
  className?: string;
}

export default function ExhibitionCard({ exhibition, className }: Props) {
  return (
    <li className={className}>
      <a href="#" className="group block">
        <div className="aspect-[3/2] overflow-hidden rounded-lg bg-gray-100">
          <img
            src={exhibition.imageUrl}
            alt={exhibition.title}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>

        {exhibition.subtitle && (
          <p className="mt-3 text-[15px] text-gray-600">{exhibition.subtitle}</p>
        )}
        <h3 className={`${exhibition.subtitle ? "mt-1" : "mt-3"} text-lg font-bold text-gray-900`}>
          {exhibition.title}
        </h3>
      </a>
    </li>
  );
}