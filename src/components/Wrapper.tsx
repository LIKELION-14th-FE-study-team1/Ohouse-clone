import type { PropsWithChildren } from 'react'

type WrapperProps = PropsWithChildren<{ className?: string }>

// 전체 너비 배경은 Wrapper 바깥에, 너비를 맞출 콘텐츠는 안에 배치합니다.
export default function Wrapper({ children, className = '' }: WrapperProps) {
  return (
    <div className={`mx-auto w-full max-w-content px-4 md:px-6 lg:px-8 ${className}`.trim()}>
      {children}
    </div>
  )
}
