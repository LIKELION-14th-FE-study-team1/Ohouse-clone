import { keywords } from '../data/popularKeywords'
import KeywordStatus from './KeywordStatus'

type MobilePopularKeywordsProps = {
    onOpenDownload: () => void
}

export default function MobilePopularKeywords({
    onOpenDownload,
}: MobilePopularKeywordsProps) {
    return (
        <section
            aria-labelledby="mobile-popular-keywords-title"
            className="relative mt-8 pb-8 pt-6 md:hidden"
        >
            <div
                aria-hidden="true"
                className="absolute -left-4 -right-4 top-0 h-3 bg-surface"
            />

            <h2
                id="mobile-popular-keywords-title"
                className="mt-2 mb-5 text-xl font-bold text-foreground"
            >
                인기 검색어
            </h2>

            <ol className="grid grid-cols-2 gap-x-4 gap-y-1">
                {keywords.map((keyword, index) => (
                    <li key={keyword} className="min-w-0">
                        <button
                            type="button"
                            onClick={onOpenDownload}
                            className="flex min-h-11 w-full items-center gap-1 rounded py-2 text-left text-foreground hover:bg-surface"
                        >
                            <span className="w-5 shrink-0 text-center text-base font-bold tabular-nums">
                                {index + 1}
                            </span>

                            <KeywordStatus rank={index + 1} />

                            <span className="min-w-0 flex-1 break-words text-base leading-5">
                                {keyword}
                            </span>
                        </button>
                    </li>
                ))}
            </ol>
        </section>
    )
}