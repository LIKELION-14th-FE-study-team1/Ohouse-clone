import { useState } from 'react'

const STORAGE_KEY = 'ohouse-clone:bookmarks'

function readBookmarks(): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
  } catch {
    return []
  }
}

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(readBookmarks)
  const [announcement, setAnnouncement] = useState('')

  function toggleBookmark(id: string) {
    const wasSaved = bookmarks.includes(id)
    const next = wasSaved ? bookmarks.filter((bookmark) => bookmark !== id) : [...bookmarks, id]
    setBookmarks(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setAnnouncement(wasSaved ? '스크랩을 취소했어요.' : '스크랩에 저장했어요.')
    } catch {
      setAnnouncement('이 브라우저에서는 저장할 수 없어 현재 화면에서만 반영돼요.')
    }
  }

  return { bookmarks, toggleBookmark, announcement }
}
