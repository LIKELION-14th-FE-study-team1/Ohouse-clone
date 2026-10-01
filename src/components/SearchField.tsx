import { useRef, useState } from 'react'

type SearchFieldProps = {
    onSearch: () => void
    autoFocus?: boolean
}

export default function SearchField({
    onSearch,
    autoFocus = false,
}: SearchFieldProps) {
    const [query, setQuery] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <form
            role="search"
            onSubmit={(event) => {
                event.preventDefault()

                if (!query.trim()) return

                onSearch()
            }}
            className="flex w-full items-center gap-2 rounded-full bg-[#F5F5F5] px-4 py-3"
        >
            <img
                src="/images/part1/search-icon.svg"
                alt=""
                className="h-5 w-5 shrink-0 opacity-50"
            />

            <input
                ref={inputRef}
                type="text"
                inputMode="search"
                enterKeyHint="search"
                aria-label="통합검색"
                placeholder="통합검색"
                autoFocus={autoFocus}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                    if (
                        event.key === 'Enter'
                        && (
                            event.nativeEvent.isComposing
                            || event.nativeEvent.keyCode === 229
                        )
                    ) {
                        event.preventDefault()
                    }
                }}
                className="min-w-0 flex-1 bg-transparent text-base outline-none"
            />

            {query.length > 0 && (
                <button
                    type="button"
                    aria-label="검색어 지우기"
                    onClick={() => {
                        setQuery('')
                        inputRef.current?.focus()
                    }}
                    className="flex h-6 w-6 shrink-0 items-center justify-center"
                >
                    <img
                        src="/images/part1/search_clear.svg"
                        alt=""
                        className="h-[18px] w-[18px] opacity-50"
                    />
                </button>
            )}
        </form>
    )
}