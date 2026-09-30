import { useState } from "react";
import { todayDeals } from "../data/todayDeals";
import { useCountdownToMidnight } from "../hooks/useCountdown";
import DealCard from "./DealCard";

const PAGE_SIZE = 4;
const LAST_PAGE_SIZE = 3;

// 카드 1개 너비 = (전체 - gap 3개) / 4
const itemClass = "shrink-0 grow-0 basis-[calc((100%-72px)/4)] min-w-0";
const oneStep = "((100% - 72px) / 4 + 24px)"; // 카드 1개 + gap 1개

export default function TodayDealSection() {
  const time = useCountdownToMidnight();
  const [page, setPage] = useState(0);

  const total = todayDeals.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const isFirst = page === 0;
  const isLast = page === totalPages - 1;

  const starts = Array.from({ length: totalPages }, (_, i) =>
    i === totalPages - 1 ? total - LAST_PAGE_SIZE : i * PAGE_SIZE
  );
  const offset = starts[page];

  const arrowBtn =
  "pointer-events-auto absolute bottom-[-4px] flex h-12 w-12 items-center justify-center";

  return (
    <section className="mx-auto w-full max-w-[1200px]  py-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold">오늘의딜</h2>
        <a href="#" className="font-bold text-[#00a1ff]">더보기</a>
      </div>

      {/* 데스크톱용: 768px? 이상에서만 보임 */}
      <div className="relative hidden md:block">
        <div className="overflow-hidden">
          <ul
            className="flex w-full gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(calc(-${offset} * ${oneStep}))` }}
          >
            {todayDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} time={time} className={itemClass} />
            ))}

            <li className={itemClass}>
              <div className="flex aspect-square flex-col items-center justify-center gap-3">
                <a
                  href="#"
                  aria-label="더보기"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100"
                >
                  <svg viewBox="0 0 480 480" className="h-6 w-6" fill="#292929">
                    <path d="M252.602 87.778c7.44-7.4 19.47-7.366 26.87.073l138 138.751.34.35c7.029 7.434 6.916 19.151-.34 26.446l-138 138.75c-7.4 7.44-19.43 7.473-26.87.074-7.44-7.4-7.473-19.43-.074-26.87L358.306 259H76c-10.493 0-19-8.507-19-19s8.507-19 19-19h282.306L252.528 114.648c-7.399-7.44-7.366-19.47.074-26.87" />
                  </svg>
                </a>
                <span className="text-gray-700">더보기</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0">
          <div className="aspect-square w-[calc((100%-72px)/4)]" />
          {!isFirst && (
            <button onClick={() => setPage((p) => p - 1)} aria-label="이전" className={`${arrowBtn} left-[-20px]`}>
              <img src="/images/arrow-circle-left.svg" alt="" className="h-full w-full" />
            </button>
          )}
          {!isLast && (
            <button onClick={() => setPage((p) => p + 1)} aria-label="다음" className={`${arrowBtn} right-[-20px]`}>
              <img src="/images/arrow-circle-right.svg" alt="" className="h-full w-full" />
            </button>
          )}
        </div>
      </div>

      {/* 모바일용: 768px 미만에서만 보임.. */}
      <ul className="flex flex-col gap-8 md:hidden">
        {todayDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} time={time} className="w-full" />
        ))}
      </ul>
    </section>
  );
}