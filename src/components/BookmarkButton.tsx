type BookmarkButtonProps = {
  label: string
  saved: boolean
  onToggle: () => void
}

export default function BookmarkButton({ label, saved, onToggle }: BookmarkButtonProps) {
  return (
    <button
      type="button"
      aria-label={`${label} 스크랩`}
      aria-pressed={saved}
      onClick={onToggle}
      className="absolute bottom-0 right-0 z-10 flex h-11 w-11 items-center justify-center rounded transition-transform hover:scale-110 motion-reduce:transition-none"
    >
      <img src={`/images/bookmark-${saved ? 'active' : 'inactive'}.svg`} alt="" width="24" height="24" className="drop-shadow-sm" />
    </button>
  )
}
