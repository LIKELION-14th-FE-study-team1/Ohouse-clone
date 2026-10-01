import { useState } from "react";
import { exhibitions } from "../data/exhibitions";
import ExhibitionCard from "./ExhibitionCard";

const VISIBLE = 4; // 한 줄에 보이는 칸 수(특정 px 기준으로 작아지지않는이상 무조건고정)

const itemClass = "shrink-0 grow-0 basis-[calc((100%-72px)/4)] min-w-0";
const oneStep = "((100% - 72px) / 4 + 24px)";

export default function ExhibitionSection() {
  const [offset, setOffset] = useState(0);

  // 트랙 = 카드 N개 + 더보기 타일 1개
  const totalItems = exhibitions.length + 1;
  const maxOffset = Math.max(0, totalItems - VISIBLE);
  const isFirst = offset === 0;
  const isLast = offset >= maxOffset;

  const arrowBtn =
    "pointer-events-auto absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center";

  return (
    <section className="mx-auto w-full max-w-[1200px] py-8">
      <div className="mb-5 flex items-center justify-between">
  <h2 className="text-lg font-bold leading-7 md:text-xl">
    <a href="#" className="transition-colors hover:text-muted">오늘의 기획전</a>
  </h2>
  <a href="#" className="hidden text-sm font-bold text-primary hover:opacity-70 md:block md:text-base">
    더보기
  </a>
  <a href="#" aria-label="오늘의 기획전 더보기" className="md:hidden">
    <img src="/images/chevron-right.svg" alt="" className="h-5 w-5" />
  </a>
</div>

      {/* 데스크톱: 768px 이상 */}
      <div className="relative hidden md:block">
        <div className="overflow-hidden">
          <ul
            className="flex w-full gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(calc(-${offset} * ${oneStep}))` }}
          >
            {exhibitions.map((item) => (
              <ExhibitionCard key={item.id} exhibition={item} className={itemClass} />
            ))}

            {/* 트랙 끝의 더보기 타일 */}
            <li className={itemClass}>
              <div className="flex aspect-[3/2] flex-col items-center justify-center gap-3">
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

        {/* 화살표: 이미지 높이만큼의 영역의 세로 중앙에 배치 */}
        <div className="pointer-events-none absolute inset-x-0 top-0">
          <div className="aspect-[3/2] w-[calc((100%-72px)/4)]" />
          {!isFirst && (
            <button
              onClick={() => setOffset((o) => o - 1)}
              aria-label="이전"
              className={`${arrowBtn} left-[-20px]`}
            >
              <img src="/images/arrow-circle-left.svg" alt="" className="h-full w-full" />
            </button>
          )}
          {!isLast && (
            <button
              onClick={() => setOffset((o) => o + 1)}
              aria-label="다음"
              className={`${arrowBtn} right-[-20px]`}
            >
              <img src="/images/arrow-circle-right.svg" alt="" className="h-full w-full" />
            </button>
          )}
        </div>
      </div>

      {/* 모바일: 768px 미만, 세로 일렬 */}
      <div className="md:hidden">
        <ul className="flex flex-col gap-4">
          {exhibitions.map((item) => (
            <ExhibitionCard key={item.id} exhibition={item} className="w-full" />
          ))}
        </ul>
        <a
          href="#"
          className="mt-5 block rounded-lg border border-line py-3 text-center text-sm font-bold hover:bg-surface">
            기획전 더보기
        </a>
      </div>
    </section>
  );
}