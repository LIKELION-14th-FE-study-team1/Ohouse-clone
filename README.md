# 오늘의집 클론 코딩 — 팀 공통 시작 설정

React + TypeScript + Vite + Tailwind CSS v3. 프론트엔드 UI 구현을 위한 최소 구성입니다.
현재 화면은 설치 확인용 문구입니다. 실제 오늘의집 UI와 이미지, 페이지 라우팅은 아직 포함하지 않았습니다.

## 1. 시작하기

팀 Organization의 저장소를 clone한 폴더에 이 설정을 넣습니다. 개인 학습 저장소에 그대로 올리지 않습니다.
이미 팀 저장소가 있다면 다시 만들거나 기록을 지우지 말고 그대로 사용합니다.
기존 README가 있다면 보존하고 이 안내를 SETUP.md로 저장하거나 필요한 부분만 합칩니다.

권장 환경: 팀 전원이 같은 Node.js 24 LTS 사용. 검증 환경은 Node 24.21.0입니다.

```bash
npm ci
npm run dev
```

- `npm ci`: package-lock.json에 기록된 버전 그대로 설치합니다.
- `npm run dev`: 개발 서버를 실행합니다. 터미널에 표시되는 주소로 접속합니다.
- `npm run build`: TypeScript 검사 후 배포 파일을 만듭니다.
- `npm run lint`: 코드 검사입니다.
- `npm run preview`: 빌드한 결과를 로컬에서 확인합니다.

새 패키지가 필요할 때만 `npm install 패키지명`을 사용하고 package.json과 package-lock.json을 함께 올립니다.

## 2. 지금 사용하는 폴더

```text
public/
  images/                 사용할 이미지 (현재 비어 있음)
src/
  components/
    Wrapper.tsx           콘텐츠 너비·좌우 여백 공통 설정
  styles/
    global.css            Tailwind 연결·폰트·기본 스타일
  App.tsx                 각자 만든 컴포넌트를 조합하는 화면
  main.tsx                앱 실행·global.css 연결
```

| 파일 | 역할 |
| --- | --- |
| tailwind.config.js | 화면 크기 기준, 최대 너비, 폰트, 공통 색상 |
| postcss.config.js | Tailwind v3와 Autoprefixer 연결 |
| vite.config.ts | React 개발 서버와 빌드 설정 |
| tsconfig*.json | 앱과 설정 파일의 TypeScript 검사. strict 모드 사용 |
| package.json / package-lock.json | 실행 명령과 팀 공통 패키지 버전 |
| .oxlintrc.json | Vite 템플릿의 코드 검사 도구 Oxlint 설정 |
| vercel.json | Vercel의 Vite 빌드 및 dist 출력 설정 |
| .gitignore | node_modules, dist, 환경 파일 등을 Git에서 제외 |
| index.html | 앱이 붙는 HTML과 문서 제목 |

`pages`, `data`, `hooks`, `types`, 이미지 세부 폴더는 실제 필요가 생길 때 추가합니다.
한 컴포넌트에서만 쓰는 타입이나 짧은 메뉴 배열은 우선 그 파일 안에 둡니다.
라우팅이 필요한 별도 페이지가 확정되면 React Router와 SPA rewrite를 추가합니다.

## 3. 모바일부터 구현하기

접두사가 없는 클래스는 모든 화면에 적용됩니다. `md:` 같은 접두사는 해당 너비 이상에서 적용됩니다.
`sm:`은 모바일 전용이라는 뜻이 아닙니다.

| 구분 | 적용 범위 |
| --- | --- |
| 접두사 없음 | 모든 너비의 기본 스타일 |
| sm: | 640px 이상 |
| md: | 768px 이상 |
| lg: | 1024px 이상 |
| xl: | 1280px 이상 |

```tsx
<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
  {/* 모바일 2열 → 768px 이상 3열 → 1024px 이상 4열 */}
</div>
```

기본 모바일 형태를 만든 뒤 큰 화면에서 바뀌는 부분에만 접두사를 붙입니다.
모든 컴포넌트에 sm/md/lg/xl을 전부 쓸 필요는 없습니다.
각 담당자가 모바일과 데스크톱까지 완료한 단위로 PR을 올립니다. 전원이 모바일만 끝낸 후 마지막에 일괄 대응하지 않습니다.

## 4. Wrapper 사용 약속

Wrapper는 최대 너비 1256px, 가운데 정렬, 기본 좌우 16px / md 24px / lg 32px 여백입니다.
1256px는 여백을 포함한 Wrapper 전체 너비입니다.

```tsx
<header className="border-b border-line bg-white">
  <Wrapper>{/* 헤더 콘텐츠 */}</Wrapper>
</header>
<main>
  <Wrapper>{/* 메인 콘텐츠 */}</Wrapper>
</main>
```

전체 너비 배경은 Wrapper 바깥에 둡니다. 공통 여백은 해당 콘텐츠 영역에서 한 번만 적용합니다.
상위에 Wrapper가 있다면 각 하위 섹션에 다시 Wrapper를 넣거나 동일한 좌우 padding을 중복하지 않습니다.
`className`은 py-8, mt-4 같은 추가 스타일에 사용하고 공통 너비와 좌우 여백은 각자 덮어쓰지 않습니다.

## 5. 색상·글자·이미지 약속

색상과 폰트는 tailwind.config.js에서 한 번만 정의합니다. global.css는 전역 기본값을 적용합니다.
Tailwind Preflight에 포함된 reset을 별도로 복제하지 않습니다.

| 용도 | 사용할 클래스 |
| --- | --- |
| 브랜드 파랑 | text-primary / bg-primary |
| 본문 | text-foreground |
| 보조 문구 | text-muted |
| 연한 배경 | bg-surface |
| 구분선 | border-line |
| 할인 강조 | text-sale |
| 굵기 400 / 500 / 600 / 700 | font-normal / font-medium / font-semibold / font-bold |
| 보조 / 본문 / 제목 예시 | text-sm / text-base / text-xl font-bold |

폰트는 Pretendard Variable입니다. 폰트 CSS를 외부에서 불러오므로 인터넷이 없으면 시스템 폰트로 표시됩니다.
컴포넌트 디자인에 필요한 추가 색상은 팀과 합의해 공통 설정에 추가합니다.

- 컴포넌트 파일: `Header.tsx`, `ProductCard.tsx`처럼 PascalCase.
- 이미지 파일: `hero-main.webp`, `icon-search.svg`처럼 소문자·하이픈.
- `public/images/hero-main.webp`는 코드에서 `/images/hero-main.webp`로 사용합니다.
- props 타입을 명시하고, 오류를 피하려고 `any`를 붙이는 대신 타입을 확인합니다.
- `bg-${color}`처럼 클래스 이름을 조립하지 않습니다. `bg-primary`, `bg-white`처럼 완전한 문자열을 사용합니다.

## 6. 브랜치 협업

초기 설정도 작업 브랜치에서 PR로 공유합니다. main에 바로 push하지 않습니다.
이 프로젝트의 기존 `chore/#1-setting` 및 develop 협업 규칙이 유지된다면 그대로 따릅니다.
새 저장소이고 별도 규칙이 없다면 main을 통합 브랜치로, 각자 feature 브랜치를 사용하면 됩니다.

1. 초기 설정 담당자가 build/lint 확인 후 공통 설정 PR을 올립니다.
2. 팀원이 확인하고 통합 브랜치에 병합합니다.
3. 전원이 통합 브랜치를 pull하고 npm ci를 실행합니다.
4. 각자 담당 기능 브랜치에서 모바일 → 큰 화면 순서로 구현합니다.
5. PR마다 build/lint 결과, 모바일·데스크톱 화면, 완료 범위를 적습니다.
6. 공통 파일(App.tsx, global.css, tailwind.config.js, Wrapper.tsx)은 담당자를 정하고 변경 전에 공유합니다.

처음에는 작은 컴포넌트 하나를 모두가 함께 연결해보며 규칙을 확인하세요.
기능 영역 이름은 팀의 기존 4인 분담을 그대로 사용하면 됩니다.

## 7. Vercel 배포

공통 설정 PR이 병합되면 빈 화면이라도 먼저 한 번 배포해 연결을 확인합니다.

1. 팀 Organization의 Public 저장소를 Vercel에서 Import합니다.
2. Framework: Vite / Root Directory: 프로젝트 루트.
3. Build Command: npm run build / Output Directory: dist.
4. Production Branch를 팀의 배포 기준 브랜치(보통 main)로 확인합니다.
5. 배포 주소에서 새로고침·모바일 표시를 확인합니다.
6. 팀 Notion에 Organization, Public 저장소, 배포 링크를 올립니다.

현재는 한 페이지이므로 SPA rewrite는 넣지 않았습니다. URL 라우팅을 추가하면 vercel.json에 다음 항목을 추가하고, 하위 URL 직접 접속도 확인합니다.

```json
"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
```

Vercel 계정과 Organization 저장소의 연결 권한·사용 가능한 플랜은 연결 화면에서 확인합니다.
이 시작 파일은 실제 Vercel 배포를 수행한 결과물이 아닙니다.

## 8. 10월 5일 제출을 위한 권장 일정

| 기간 | 작업 |
| --- | --- |
| 9/23–9/24 | 공통 설정 PR, 팀원 실행 확인, 첫 Vercel 배포, 범위 확정 |
| 9/25–9/29 | 각자 담당 영역 모바일 구현과 큰 화면 대응, 작은 PR로 수시 통합 |
| 9/30–10/2 | 영역 통합, 링크·버튼 연결, 필요한 localStorage 기능 |
| 10/3–10/4 | 375/768/1024/1440px 확인, 가로 넘침·깨진 이미지·빌드 오류 수정 |
| 10/5 | GitHub 최종 상태와 배포 확인, 팀 Notion 링크 제출 |

백엔드가 필요한 로그인·결제 등은 제외하거나 명확한 시연용 UI로 범위를 정합니다.
찜·최근 본 상품처럼 작은 상태는 localStorage를 사용할 수 있습니다. 필수는 아닙니다.

공식 참고: https://v3.tailwindcss.com/docs/guides/vite · https://v3.tailwindcss.com/docs/responsive-design · https://vercel.com/docs/frameworks/frontend/vite
