import { useEffect, useRef, useState } from 'react'
import SearchField from './SearchField'
import '../styles/SearchDrawer.css'

type SearchDrawerProps = {
    onClose: () => void
    onSearch: () => void
}

export default function SearchDrawer({
    onClose,
    onSearch,
}: SearchDrawerProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [visible, setVisible] = useState(false)
    const [closing, setClosing] = useState(false)
    const closingRef = useRef(false)
    const searchAfterCloseRef = useRef(false)
    const callbacksRef = useRef({ onClose, onSearch })

    useEffect(() => {
        callbacksRef.current = { onClose, onSearch }
    }, [onClose, onSearch])

    function requestClose(openSearch = false) {
        if (closingRef.current) return

        closingRef.current = true
        searchAfterCloseRef.current = openSearch
        setVisible(false)
        setClosing(true)
    }

    useEffect(() => {
        if (!closing) return

        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches

        const timer = window.setTimeout(() => {
            callbacksRef.current.onClose()

            if (searchAfterCloseRef.current) {
                callbacksRef.current.onSearch()
            }
        }, reduceMotion ? 0 : 450)

        return () => window.clearTimeout(timer)
    }, [closing])

    useEffect(() => {
        const dialog = dialogRef.current

        if (!dialog) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        dialog.showModal()

        let secondFrame = 0

        const firstFrame = window.requestAnimationFrame(() => {
            secondFrame = window.requestAnimationFrame(() => {
                if (!closingRef.current) {
                    setVisible(true)
                }
            })
        })

        return () => {
            window.cancelAnimationFrame(firstFrame)
            window.cancelAnimationFrame(secondFrame)
            dialog.close()
            document.body.style.overflow = previousOverflow
        }
    }, [])

    useEffect(() => {
        const media = window.matchMedia('(min-width: 1024px)')

        function handleResize() {
            if (media.matches) onClose()
        }

        handleResize()
        media.addEventListener('change', handleResize)

        return () => {
            media.removeEventListener('change', handleResize)
        }
    }, [onClose])

    return (
        <dialog
            ref={dialogRef}
            id="home-search-drawer"
            aria-label="통합검색"
            onCancel={(event) => {
                event.preventDefault()
                requestClose()
            }}
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    requestClose()
                }
            }}
            className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-clip border-0 bg-transparent p-0 backdrop:bg-transparent md:backdrop:bg-black/45"        >
            <section
                data-visible={visible}
                className="home-search-panel absolute inset-y-0 right-0 w-full overflow-y-auto bg-white px-4 pt-6 md:w-[calc(100%-48px)] md:max-w-[360px] md:px-6 md:pt-7 md:shadow-xl"
            >
                <h2 className="sr-only">통합검색</h2>

                <div className="flex items-center gap-4">
                    <div className="min-w-0 flex-1 [&>form]:h-[38px] [&>form]:py-0">                        <SearchField
                            autoFocus
                            onSearch={() => requestClose(true)}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => requestClose()}
                        className="mr-1 flex h-[38px] shrink-0 items-center justify-center whitespace-nowrap text-base font-bold text-foreground md:hidden"                    >
                        취소
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => requestClose()}
                    className="hidden md:sr-only md:block md:focus:not-sr-only md:focus:mt-4 md:focus:rounded md:focus:border md:focus:border-line md:focus:px-3 md:focus:py-2"
                >
                    검색창 닫기
                </button>
            </section>
        </dialog>
    )
}