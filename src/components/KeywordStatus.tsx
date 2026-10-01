import { risingRanks } from '../data/popularKeywords'

export default function KeywordStatus({ rank }: { rank: number }) {
    const rising = risingRanks.includes(rank)
    const iconUrl = `/images/part1/${rising ? 'rising.svg' : 'new.svg'}`

    return (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
            <span className="sr-only">
                {rising ? '순위 상승' : '신규'}
            </span>

            <span
                aria-hidden="true"
                className={`block h-6 w-6 bg-[#FF5454] ${
                    rising ? 'rotate-180' : ''
                }`}
                style={{
                    maskImage: `url("${iconUrl}")`,
                    WebkitMaskImage: `url("${iconUrl}")`,
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                }}
            />
        </span>
    )
}