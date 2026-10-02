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
import MobilePopularKeywords from './components/MobilePopularKeywords'
import Footer from './components/Footer'

export default function App() {
    const [downloadOpen, setDownloadOpen] = useState(false)

    function openDownload() {
        setDownloadOpen(true)
    }

    return (
        <>
            <HomeHeader onOpenDownload={openDownload} />

            <main className="min-h-screen bg-white pt-5 md:pt-8">
                <h1 className="sr-only">오늘의집</h1>

                <Wrapper>
                    <HomeIntro onOpenDownload={openDownload} />
                    <div
                        aria-hidden="true"
                        className="-mx-4 my-6 h-3 bg-surface md:hidden"
                    />
                    <HomeRecommendations onOpenDownload={openDownload} />
                    <TodayDealSection />
                    <div
                        aria-hidden="true"
                        className="-mx-4 my-6 h-3 bg-surface md:hidden"
                    />
                    <ReviewSection />
                    <div
                        aria-hidden="true"
                        className="-mx-4 my-6 h-3 bg-surface md:hidden"
                    />
                    <ExhibitionSection />
                    <div
                        aria-hidden="true"
                        className="-mx-4 my-6 h-3 bg-surface md:hidden"
                    />
                    <BestSection onOpenDownload={openDownload} />
                    <MobilePopularKeywords onOpenDownload={openDownload} />
                </Wrapper>

                <Footer onOpenDownload={openDownload} />
            </main>

            <AppDownloadModal
                open={downloadOpen}
                onClose={() => setDownloadOpen(false)}
            />
        </>
    )
}