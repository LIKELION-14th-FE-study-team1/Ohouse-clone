export interface BestProduct {
  id: number;
  brand: string;
  name: string;
  price: number;
  discountRate?: number;
  priceLabel?: string;
  rating: number;
  reviewCount: number;
  image: string;
  category?: string; // 👈 카테고리 필터링용 속성
  isPick?: boolean;
  todayDelivery?: string;
  freeShipping?: string;
  colors?: { color: string; ring?: boolean }[];
}

export const bestProducts: BestProduct[] = [
  // ----------------------------------------------------------------
  // 1. 전체 / 패브릭 공통 (1번 상품)
  // ----------------------------------------------------------------
  {
    id: 1,
    brand: '헬로우슬립',
    name: '[최대20%쿠폰] 부드러운 카스테라 워싱 옥수수솜 간절기/사계절/한파 차렵이불세트-43컬러',
    price: 39900,
    discountRate: 50,
    priceLabel: '특별인증가',
    category: '패브릭',
    rating: 4.8,
    reviewCount: 81302,
    image: '/images/best/best-product-1.jpg',
    isPick: true,
    todayDelivery: '평일 13:00까지 결제시',
    freeShipping: '조건부 무료배송',
  },

  // ----------------------------------------------------------------
  // 2. 전체 / 가구 공통 (2번 상품)
  // ----------------------------------------------------------------
  {
    id: 2,
    brand: '수면밀도',
    name: '허리 디스크 환자가 만든 매트리스 S/SS/Q/K/LK 미디엄하드 S',
    price: 299000,
    discountRate: 62,
    priceLabel: '특별인증가',
    category: '가구',
    rating: 4.9,
    reviewCount: 22083,
    image: '/images/best/best-product-2.jpg',
    isPick: false,
    freeShipping: '무료배송',
  },

  // ----------------------------------------------------------------
  // 3. 전체 / 패브릭 공통 (3번 상품)
  // ----------------------------------------------------------------
  {
    id: 3,
    brand: '아엠홈',
    name: '맞춤 비침없는 도톰 레이스/쉬폰커튼(나비주름/핀형/봉집)',
    price: 16800,
    discountRate: 28,
    priceLabel: '특별인증가',
    category: '패브릭',
    rating: 4.8,
    reviewCount: 58055,
    image: '/images/best/best-product-3.jpg',
    isPick: false,
    freeShipping: '조건부 무료배송',
  },

  // ----------------------------------------------------------------
  // 4. 가구 전용 상품들 (가구 2, 3번)
  // ----------------------------------------------------------------
  {
    id: 4,
    brand: '보니아가구',
    name: '[오늘의집 단독] 혜택가 58.4만/크루저 3세대 리클라이너 슬라이딩모션 쇼파 3인4인용',
    price: 699000,
    discountRate: 56,
    priceLabel: '특별인증가',
    category: '가구',
    rating: 4.9,
    reviewCount: 2349,
    image: '/images/best/best-product-4.jpg',
    isPick: true,
    freeShipping: '배송비 별도',
  },
  {
    id: 5,
    brand: '데일리리빙',
    name: '[오늘의집 단독] 20%쿠폰 | 드레스덴 조아패브릭 호텔식 침대프레임 SS/Q/K/LK/CK',
    price: 199000,
    discountRate: 50,
    priceLabel: '특별인증가',
    category: '가구',
    rating: 4.9,
    reviewCount: 16504,
    image: '/images/best/best-product-5.jpg',
    isPick: true,
    freeShipping: '배송비 별도',
  },

  // ----------------------------------------------------------------
  // 5. 패브릭 전용 상품 (패브릭 3번)
  // ----------------------------------------------------------------
  {
    id: 6,
    brand: '데코지오',
    name: '맞춤 브라우니 린넨 암막커튼 핀형/아일렛형/형상기억 49색상',
    price: 20200,
    discountRate: 49,
    priceLabel: '특별인증가',
    category: '패브릭',
    rating: 4.7,
    reviewCount: 27627,
    image: '/images/best/best-product-6.jpg',
    isPick: false,
    freeShipping: '무료배송',
  },
  // ----------------------------------------------------------------
  // 3. 가전·디지털
  // ----------------------------------------------------------------
  {
    id: 7,
    brand: '삼성전자',
    name: '비스포크 AI 냉장고 4도어 905L RM70F90R2ZD',
    price: 2140004,
    discountRate: 10,
    priceLabel: '특별인증가',
    category: '가전·디지털',
    rating: 5.0,
    reviewCount: 93,
    image: '/images/best/best-product-7.jpg',
    isPick: false,
    freeShipping: '무료배송',
  },
  {
    id: 8,
    brand: 'LG전자',
    name: '트롬 오브제컬렉션 워시콤보+미니워시 FH25WAX (FH25WA+FX4WC)',
    price: 2969580,
    discountRate: 38,
    priceLabel: '특별인증가',
    category: '가전·디지털',
    rating: 4.9,
    reviewCount: 175,
    image: '/images/best/best-product-8.jpg',
    isPick: false,
    freeShipping: '무료배송',
  },
  {
    id: 9,
    brand: '뱀부랩',
    name: '[리퍼] Bambu Lab X2D Combo 3D 프린터',
    price: 1125000,
    discountRate: 16,
    category: '가전·디지털',
    rating: 4.8,
    reviewCount: 39,
    image: '/images/best/best-product-9.jpg',
    isPick: false,
    todayDelivery: '평일 14:00까지 결제시',
    freeShipping: '무료배송',
  },

  // ----------------------------------------------------------------
  // 4. 주방용품
  // ----------------------------------------------------------------
  {
    id: 10,
    brand: '이브리영',
    name: '자동물빠짐 연마제없는 304올스텐 2단 식기건조대 + 수저통 + 접시꽂이 + 도마걸이',
    price: 59800,
    discountRate: 14,
    priceLabel: '특별인증가',
    category: '주방용품',
    rating: 4.8,
    reviewCount: 18200,
    image: '/images/best/best-product-10.jpg',
    isPick: false,
    todayDelivery: '평일 13:00까지 결제시',
    freeShipping: '무료배송',
  },
  {
    id: 11,
    brand: '프리파라',
    name: '브루클린 트라이탄 밀폐용기 블랙 20P 세트 전자레인지 냉동보관',
    price: 249000,
    discountRate: 28,
    priceLabel: '특별인증가',
    category: '주방용품',
    rating: 5.0,
    reviewCount: 43,
    image: '/images/best/best-product-11.jpg',
    isPick: false,
    todayDelivery: '평일 13:00까지 결제시',
    freeShipping: '무료배송',
  },
  {
    id: 12,
    brand: '깐깐공주',
    name: '항균 방수 가죽 식탁보 테이블보 식탁 테이블 매트 커버',
    price: 12900,
    discountRate: 41,
    priceLabel: '특별인증가',
    category: '주방용품',
    rating: 4.8,
    reviewCount: 23773,
    image: '/images/best/best-product-12.jpg',
    isPick: false,
    todayDelivery: '평일 12:00까지 결제시',
    freeShipping: '배송비 별도',
  },
];