export interface Deal {
  id: number;
  brand: string;
  title: string;
  imageUrl: string;
  discountRate: number;
  price: number;
  hasMore?: boolean;
  rating: number;
  reviewCount: number;
  freeShipping: boolean;
  badge?: string;
  extraTag?: string;       
}

export const todayDeals: Deal[] = [
  {
    id: 1,
    brand: "늘신선",
    title: "[500개 한정] 시즌오픈 직송 햇조생감귤 4.5kg 실중량",
    imageUrl: "/images/todayDeals/orange.avif", 
    discountRate: 46,
    price: 13800,
    rating: 5,
    reviewCount: 5,
    freeShipping: true,
  },
  {
    id: 2,
    brand: "피아바(FIABA)",
    title: "[BEST] 피아바가 제안하는 다이닝 가구 모음전",
    imageUrl: "/images/todayDeals/FIABA.avif", 
    discountRate: 10,
    price: 801000,
    hasMore: true,
    rating: 4.9,
    reviewCount: 113,
    freeShipping: false,
  },
  {
    id: 3,
    brand: "원하는날도착",
    title: "[단하루 쿠폰] BEST 침대/매트리스 모음 LED호텔침실 수납/패브릭 침대 프레임",
    imageUrl: "/images/todayDeals/bed.avif",
    discountRate: 35,
    price: 349000,
    hasMore: true,
    rating: 4.8,
    reviewCount: 79906,
    freeShipping: true,
  },
  {
    id: 4,
    brand: "피죤",
    title: "액츠 퍼펙트 실내건조 3L(용기)x2개+1개더 외 특가모음",
    imageUrl: "/images/todayDeals/id4.avif", 
    discountRate: 37,
    price: 24900,
    hasMore: true,
    rating: 4.8,
    reviewCount: 3050,
    freeShipping: true,
  },
  {
    id: 5,
    brand: "라다타",
    title: "[오늘의집 단독] [신상 런칭] 코마사 디자인 수건/발매트/욕실용품 모음전",
    imageUrl: "/images/todayDeals/id5.avif", 
    discountRate: 58,
    price: 22900,
    hasMore: true,
    rating: 4.7,
    reviewCount: 19721,
    freeShipping: true,
    badge: "특별인증가",
  },
  {
    id: 6,
    brand: "쿠첸",
    title: "[사은품+적립]브레인 IH압력밥솥/제로핏 음식물처리기 외 모음",
    imageUrl: "/images/todayDeals/id6.avif", 
    discountRate: 32,
    price: 248980,
    hasMore: true,
    rating: 4.8,
    reviewCount: 14110,
    freeShipping: true,
  },
  {
    id: 7,
    brand: "트루쿡",
    title: "[단하루 최대29%쿠폰] 박은영셰프 추천!팬/냄비/조리도구 주방용품 골라담기",
    imageUrl: "/images/todayDeals/id7.avif", 
    discountRate: 16,
    price: 15000,
    hasMore: true,
    rating: 4.8,
    reviewCount: 26629,
    freeShipping: true,
  },
  {
    id: 8,
    brand: "먼데이하우스",
    title: "인테리어 종합가구 BIG SALE",
    imageUrl: "/images/todayDeals/id8.avif", 
    discountRate: 68,
    price: 159000,
    hasMore: true,
    rating: 4.7,
    reviewCount: 188745,
    freeShipping: false,
  },
  {
    id: 9,
    brand: "브랜든",
    title: "이불/아우터/짐 정리 및 여행 준비 압축 파우치 모음전",
    imageUrl: "/images/todayDeals/id9.avif", 
    discountRate: 21,
    price: 43000,
    hasMore: true,
    rating: 4.9,
    reviewCount: 5610,
    freeShipping: false,
  },
  {
    id: 10,
    brand: "일화",
    title: "일화차시 호박팥차 500mL 20pet 외 골라담기",
    imageUrl: "/images/todayDeals/id10.avif", 
    discountRate: 26,
    price: 16900,
    hasMore: true,
    rating: 4.9,
    reviewCount: 546,
    freeShipping: true,
  },
];