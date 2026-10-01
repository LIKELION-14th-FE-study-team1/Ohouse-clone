import { useState } from 'react'
import Wrapper from './components/Wrapper'
import AppDownloadModal from './components/AppDownloadModal'
import HomeRecommendations from './components/HomeRecommendations'
import TodayDealSection from "./components/TodayDealSection";
import ReviewSection from "./components/ReviewSection";
import ExhibitionSection from "./components/ExhibitionSection";


export default function App() {
  const [downloadOpen, setDownloadOpen] = useState(false)

  return (
    <>
      <main className="min-h-screen bg-white pb-9 pt-3 md:pb-10">
        <h1 className="sr-only">오늘의집 추천 콘텐츠</h1>
        <Wrapper>
          <HomeRecommendations onOpenDownload={() => setDownloadOpen(true)} />
          <TodayDealSection />
          <ReviewSection />
          <ExhibitionSection />
        </Wrapper>
      </main>
      <AppDownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} />
    </>
  )
}
