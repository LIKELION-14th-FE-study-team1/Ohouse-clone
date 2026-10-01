import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import '../styles/MobileMenuDrawer.css'

type MobileMenuDrawerProps = {
    onClose: () => void
    onOpenDownload: () => void
}

type MenuId = 'home' | 'shopping' | 'interior'

type MenuGroup = {
    id: MenuId
    title: string
    icon: string
    items: string[]
}

const imagePath = '/images/part1'

const groups: MenuGroup[] = [
    {
        id: 'home',
        title: '집구경',
        icon: 'view-house.svg',
        items: [
            '홈',
            '추천',
            '집들이',
            '집사진',
            '커뮤니티',
            '3D인테리어',
        ],
    },
    {
        id: 'shopping',
        title: '쇼핑',
        icon: 'shopping.svg',
        items: [
            '쇼핑홈',
            '카테고리',
            '베스트',
            '오늘의딜',
            '단독상품',
            '오마트',
            '원하는날도착',
            '오!쇼룸',
            '기획전',
        ],
    },
    {
        id: 'interior',
        title: '인테리어/생활',
        icon: 'interior-life.svg',
        items: [
            '홈',
            '전체시공',
            '부분시공',
            '아파트시공사례',
            '이사',
            '제품설치',
            '시공자재랭킹',
        ],
    },
]

const categories = [
    '가구/가전·디지털',
    '패브릭',
    '주방용품',
    '식품',
    '데코·식물',
    '조명',
    '수납·정리',
    '생활용품',
    '생필품',
    '유아·아동',
    '반려동물',
    '캠핑·레저',
    '공구·DIY',
    '인테리어·시공',
    '렌탈·구독',
    '장보기',
]

const personalMenus = [
    '마이페이지',
    '나의 쇼핑',
    '스크랩북',
    '알림',
    '시공/생활 상담내역',
    '이벤트',
    '사진 올리기',
    '게시글 글쓰기',
    '집들이 글쓰기',
    '노하우 글쓰기',
    '상품 리뷰 쓰기',
    '시공 전문가 리뷰 쓰기',
    '고객센터',
]

type AccordionBodyProps = {
    id: string
    open: boolean
    children: ReactNode
}

function AccordionBody({
    id,
    open,
    children,
}: AccordionBodyProps) {
    return (
        <div
            id={id}
            data-open={open}
            aria-hidden={!open}
            inert={!open}
            className="mobile-menu-accordion"
        >
            <div className="min-h-0 overflow-hidden">
                {children}
            </div>
        </div>
    )
}

export default function MobileMenuDrawer({
    onClose,
    onOpenDownload,
}: MobileMenuDrawerProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const closingRef = useRef(false)
    const downloadAfterCloseRef = useRef(false)
    const callbacksRef = useRef({ onClose, onOpenDownload })

    const [visible, setVisible] = useState(false)
    const [closing, setClosing] = useState(false)
    const [openGroup, setOpenGroup] = useState<MenuId | null>('home')
    const [categoryOpen, setCategoryOpen] = useState(false)

    useEffect(() => {
        callbacksRef.current = { onClose, onOpenDownload }
    }, [onClose, onOpenDownload])

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
        if (!closing) return

        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches

        const timer = window.setTimeout(() => {
            callbacksRef.current.onClose()

            if (downloadAfterCloseRef.current) {
                callbacksRef.current.onOpenDownload()
            }
        }, reduceMotion ? 0 : 300)

        return () => window.clearTimeout(timer)
    }, [closing])

    useEffect(() => {
        const media = window.matchMedia('(min-width: 768px)')

        function handleResize() {
            if (media.matches) {
                callbacksRef.current.onClose()
            }
        }

        handleResize()
        media.addEventListener('change', handleResize)

        return () => {
            media.removeEventListener('change', handleResize)
        }
    }, [])

    function requestClose(openDownload = false) {
        if (closingRef.current) return

        closingRef.current = true
        downloadAfterCloseRef.current = openDownload
        setVisible(false)
        setClosing(true)
    }

    function openDownload() {
        requestClose(true)
    }

    function toggleGroup(id: MenuId) {
        setOpenGroup((current) => current === id ? null : id)
        setCategoryOpen(false)
    }

    return (
        <dialog
            ref={dialogRef}
            id="home-mobile-menu"
            aria-label="전체 메뉴"
            tabIndex={-1}
            autoFocus
            onCancel={(event) => {
                event.preventDefault()
                requestClose()
            }}
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    requestClose()
                }
            }}
            className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-clip border-0 bg-transparent p-0 text-foreground backdrop:bg-black/45"
        >
            <section
                data-visible={visible}
                className="mobile-menu-panel absolute inset-y-0 left-0 w-[calc(100%-48px)] max-w-[300px] overflow-y-auto overscroll-contain bg-white px-4 pb-8 pt-6 shadow-xl [overflow-anchor:none]"
            >
                <h2 className="sr-only">전체 메뉴</h2>

                <div className="flex items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={openDownload}
                        aria-label="오늘의집"
                    >
                        <img
                            src={`${imagePath}/ohouse-horizontal.svg`}
                            alt="오늘의집"
                            className="h-auto w-[110px]"
                        />
                    </button>

                    <button
                        type="button"
                        onClick={openDownload}
                        className="flex shrink-0 items-center gap-1 text-sm font-bold text-primary"
                    >
                        앱다운로드
                        <img
                            src={`${imagePath}/app-arrow.svg`}
                            alt=""
                            width="12"
                            height="12"
                            className="h-3 w-3 shrink-0"
                        />
                    </button>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={openDownload}
                        className="h-11 rounded-lg border border-primary text-base font-bold text-primary"
                    >
                        로그인
                    </button>

                    <button
                        type="button"
                        onClick={openDownload}
                        className="h-11 rounded-lg bg-primary text-base font-bold text-white"
                    >
                        회원가입
                    </button>
                </div>

                <nav
                    aria-label="전체 서비스"
                    className="mt-6 border-t border-line pt-5"
                >
                    {groups.map((group) => {
                        const expanded = openGroup === group.id

                        return (
                            <div key={group.id}>
                                <button
                                    type="button"
                                    aria-expanded={expanded}
                                    aria-controls={`mobile-menu-${group.id}`}
                                    onClick={() => toggleGroup(group.id)}
                                    className={`flex min-h-12 w-full items-center gap-3 rounded-md px-4 text-left text-lg font-bold ${
                                        expanded ? 'bg-surface' : ''
                                    }`}
                                >
                                    <img
                                        src={`${imagePath}/${group.icon}`}
                                        alt=""
                                        className="h-6 w-6 shrink-0"
                                    />

                                    <span className="min-w-0 flex-1">
                                        {group.title}
                                    </span>

                                    <img
                                        src={`${imagePath}/arrow-down.svg`}
                                        alt=""
                                        className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                                            expanded ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                <AccordionBody
                                    id={`mobile-menu-${group.id}`}
                                    open={expanded}
                                >
                                    <ul className="py-1">
                                        {group.items.map((item) => (
                                            <li key={item}>
                                                {group.id === 'shopping'
                                                    && item === '카테고리' ? (
                                                    <>
                                                        <button
                                                            type="button"
                                                            aria-expanded={categoryOpen}
                                                            aria-controls="mobile-shopping-categories"
                                                            onClick={() => {
                                                                setCategoryOpen((current) => !current)
                                                            }}
                                                            className="flex min-h-11 w-full items-center justify-between gap-2 rounded-md pl-[52px] pr-4 text-left text-base hover:bg-surface"
                                                        >
                                                            카테고리
                                                            <img
                                                                src={`${imagePath}/arrow-down.svg`}
                                                                alt=""
                                                                className={`h-4 w-4 transition-transform duration-300 ${
                                                                    categoryOpen ? 'rotate-180' : ''
                                                                }`}
                                                            />
                                                        </button>

                                                        <AccordionBody
                                                            id="mobile-shopping-categories"
                                                            open={categoryOpen}
                                                        >
                                                            <ul className="py-2">
                                                                {categories.map((category) => (
                                                                    <li key={category}>
                                                                        <button
                                                                            type="button"
                                                                            onClick={openDownload}
                                                                            className="min-h-10 w-full rounded-md py-2 pl-16 pr-3 text-left text-sm hover:bg-surface"
                                                                        >
                                                                            {category}
                                                                        </button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </AccordionBody>
                                                    </>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={openDownload}
                                                        className={`min-h-11 w-full rounded-md py-2 pl-[52px] pr-4 text-left text-base hover:bg-surface ${
                                                            group.id === 'home' && item === '홈'
                                                                ? 'bg-surface font-bold'
                                                                : ''
                                                        }`}
                                                    >
                                                        {item}
                                                    </button>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionBody>
                            </div>
                        )
                    })}
                </nav>

                <nav
                    aria-label="내 활동과 고객 지원"
                    className="mt-6 border-t border-line py-4"
                >
                    <ul>
                        {personalMenus.map((item) => (
                            <li key={item}>
                                <button
                                    type="button"
                                    onClick={openDownload}
                                    className="min-h-12 w-full rounded-md px-4 py-3 text-left text-base hover:bg-surface"
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex gap-5 border-t border-line px-2 pt-6">
                    {['전문가 신청', '판매자 신청'].map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={openDownload}
                            className="py-2 text-sm"
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => requestClose()}
                    className="sr-only focus:not-sr-only focus:mt-4 focus:rounded focus:border focus:border-line focus:px-3 focus:py-2"
                >
                    메뉴 닫기
                </button>
            </section>
        </dialog>
    )
}