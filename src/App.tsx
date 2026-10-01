import { useState } from 'react'
import Wrapper from './components/Wrapper'
import AppDownloadModal from './components/AppDownloadModal'
import HomeRecommendations from './components/HomeRecommendations'
import HomeHeader from './components/HomeHeader'
import HomeIntro from './components/HomeIntro'

export default function App() {
  const [downloadOpen, setDownloadOpen] = useState(false)

  function openDownload() {
    setDownloadOpen(true)
  }

  return (
    <>
      <HomeHeader onOpenDownload={openDownload} />

      <main className="min-h-screen bg-white pb-9 pt-5 md:pb-10 md:pt-8">
        <h1 className="sr-only">오늘의집</h1>

        <Wrapper>
          <HomeIntro onOpenDownload={openDownload} />
          <HomeRecommendations onOpenDownload={openDownload} />
        </Wrapper>
      </main>

      <AppDownloadModal
        open={downloadOpen}
        onClose={() => setDownloadOpen(false)}
      />
    </>
  )
}