import Wrapper from './components/Wrapper'

export default function App() {
  return (
    <main className="min-h-screen bg-surface py-8 md:py-12">
      <Wrapper>
        <h1 className="text-xl font-bold text-primary md:text-2xl">오늘의집 클론 코딩</h1>
        <p className="mt-3 text-sm leading-6 text-muted md:text-base">
          9/23 공통 환경 설정 완료했습니다!<br />
          여기(App.tsx)에 각자 작업한 페이지 연결하여 전체 클론코딩 완성하면 됩니다.<br /><br />
          
          만약 필요한 색상이나 두께, 사진 등 빠진 내용이 있다면 <br />작업하면서 따로 넣으시고, 카톡으로 어떤 요소 추가했는지 알려주세요~~ <br />
          (원활한 충돌 병합을 위해 노션 페이지 및 카톡 꼭 신경써서 관리해주시길 바랍니닷!) <br /><br />

          늦어서 미안합니다...ㅠㅠ 덕멋 14기 스터디 1팀 파이팅! 어흥~~ <br />- 지원 -
          <br /><br />
          * 작업 시작할 때 h1 태그와 p 태그는 삭제해주세요! *
        </p>
      </Wrapper>
    </main>
  )
}
