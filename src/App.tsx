import { useState } from 'react'
import Wrapper from './components/Wrapper'
import AppDownloadModal from './components/AppDownloadModal'
import HomeHeader from './components/HomeHeader'
import HomeIntro from './components/HomeIntro'
import HomeRecommendations from './components/HomeRecommendations'
import TodayDealSection from './components/TodayDealSection'
import ReviewSection from './components/ReviewSection'
import ExhibitionSection from './components/ExhibitionSection'
import BestSection from './components/BestSection'
import Footer from './components/Footer'

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
                    <TodayDealSection />
                    <ReviewSection />
                    <ExhibitionSection />
                    <BestSection onOpenDownload={openDownload} />
                </Wrapper>

                <Footer />
            </main>

            <AppDownloadModal
                open={downloadOpen}
                onClose={() => setDownloadOpen(false)}
            />
        </>
    )
}