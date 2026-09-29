import type { ImageCrop } from '../data/recommendations'

type ReferenceImageProps = {
  crop: ImageCrop
  alt: string
  className?: string
}

// 원본을 구하지 못한 두 사진과 일부 프로필은 제공받은 스크린샷의 이미지 영역만 표시합니다.
// 카드의 버튼, 작성자, 스크랩 등 상호작용 UI는 HomeRecommendations에서 별도로 구현합니다.
export default function ReferenceImage({ crop, alt, className }: ReferenceImageProps) {
  return (
    <svg
      viewBox={`${crop.x} ${crop.y} ${crop.width} ${crop.height}`}
      preserveAspectRatio="none"
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      focusable="false"
      className={className}
    >
      <image href="/images/recommendations/reference-screen.png" width="1528" height="1069" />
    </svg>
  )
}
