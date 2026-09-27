import { useEffect, useId, useRef } from 'react'

export const APP_DOWNLOAD_URL = 'https://ohou.se/app'

type AppDownloadModalProps = {
  open: boolean
  onClose: () => void
}

export default function AppDownloadModal({ open, onClose }: AppDownloadModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (!open) {
      if (dialog.open) dialog.close()
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!dialog.open) dialog.showModal()

    return () => {
      if (dialog.open) dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[430px] overflow-y-auto rounded-3xl border-0 bg-white p-0 text-foreground shadow-2xl backdrop:bg-black/45"
    >
      <div className="relative px-6 pb-7 pt-10 text-center sm:px-9 sm:pb-9">
        <button
          type="button"
          onClick={onClose}
          aria-label="앱 다운로드 안내 닫기"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <img src="/images/ohouse-logo.svg" alt="오늘의집" className="mx-auto h-8 w-auto" />
        <h2 id={titleId} className="mx-auto mt-7 max-w-[320px] text-[22px] font-bold leading-[1.45] [word-break:keep-all]">
          오늘의 집 어플을 다운 받고 나에게 맞는 서비스를 사용해보세요!
        </h2>
        <p id={descriptionId} className="mt-3 text-sm leading-6 text-muted">
          휴대폰 카메라로 QR코드를 스캔하면<br />
          오늘의집 앱 다운로드로 연결돼요.
        </p>

        <div className="mx-auto my-6 w-fit rounded-2xl border border-line bg-white p-4">
          <img
            src="/images/app-download-qr.svg"
            alt="오늘의집 앱 다운로드 QR코드"
            width="176"
            height="176"
            className="h-44 w-44"
          />
        </div>

        <a
          href={APP_DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 w-full items-center justify-center rounded-lg bg-primary px-4 py-3 font-bold text-white transition-opacity hover:opacity-80"
        >
          오늘의집 앱 다운로드
          <span className="sr-only"> (새 창 열기)</span>
        </a>
        <button type="button" onClick={onClose} className="mt-3 min-h-10 px-5 text-sm text-muted underline-offset-4 hover:underline">
          닫기
        </button>
      </div>
    </dialog>
  )
}
