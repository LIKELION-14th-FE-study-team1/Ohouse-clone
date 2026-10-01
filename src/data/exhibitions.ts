export interface Exhibition {
  id: number;
  imageUrl: string;
  subtitle?: string; // 위의 회색 작은 글씨 (없을 수도 있음)
  title: string;
}

export const exhibitions: Exhibition[] = [
  {
    id: 1,
    imageUrl: "/images/exhibition/id1.avif",
    subtitle: "우리집이 더 좋아지는 시간",
    title: "LIVE 오늘의집 라이브",
  },
  {
    id: 2,
    imageUrl: "/images/exhibition/id2.avif",
    subtitle: "가구 배송, 편하게 받으세요",
    title: "오늘의집 공식 가구 배송 서비스 '원하는날도착'",
  },
  {
    id: 3,
    imageUrl: "/images/exhibition/id3.avif",
    subtitle: "전상품 무료배송",
    title: "매일 새로운 장보기 핫딜 오마트",
  },
  {
    id: 4,
    imageUrl: "/images/exhibition/id4.avif",
    title: "오늘의집 Only",
  },
];