export type ImageCrop = { x: number; y: number; width: number; height: number }

export type Photo = {
  id: string
  image: string
  description: string
  author: string
  avatar?: string
  crop?: ImageCrop
  avatarCrop?: ImageCrop
}

export const photos: Photo[] = [
  { id: 'photo-1', image: '/images/recommendations/photo-1.jpg', description: '따뜻한 조명과 우드 가구로 꾸민 아늑한 거실', author: 'jun.sum.home', avatar: '/images/recommendations/avatar-jun.jpg' },
  { id: 'photo-2', image: '/images/recommendations/photo-2.jpg', description: '햇살이 들어오는 차분한 침실', author: 'november._.home', avatarCrop: { x: 282, y: 332, width: 28, height: 28 } },
  { id: 'photo-3', image: '/images/recommendations/reference-screen.png', crop: { x: 504, y: 94, width: 207, height: 236 }, description: '팬트리 없는 집의 수납 공간', author: '옐로우동동', avatar: '/images/recommendations/avatar-yellow.jpg' },
  { id: 'photo-4', image: '/images/recommendations/photo-4.webp', description: '깔끔하게 정리한 싱크대 하부장 수납', author: '인티제하우스', avatar: '/images/recommendations/avatar-intj.jpg' },
  { id: 'photo-5', image: '/images/recommendations/reference-screen.png', crop: { x: 966, y: 94, width: 207, height: 236 }, description: '파스타와 샐러드로 차린 한 끼', author: '여신여느', avatarCrop: { x: 977, y: 332, width: 28, height: 28 } },
  { id: 'photo-6', image: '/images/recommendations/photo-6.jpg', description: '종류별로 정리한 주방 수납장', author: '로이버니', avatarCrop: { x: 1207, y: 332, width: 28, height: 28 } },
  { id: 'photo-7', image: '/images/recommendations/photo-7.jpg', description: '포근한 패브릭과 조명이 있는 거실', author: 'jun.sum.home', avatar: '/images/recommendations/avatar-jun.jpg' },
  { id: 'photo-8', image: '/images/recommendations/photo-8.jpg', description: '은은한 조명으로 채운 휴식 공간', author: 'jun.sum.home', avatar: '/images/recommendations/avatar-jun.jpg' },
  { id: 'photo-9', image: '/images/recommendations/photo-9.jpg', description: '모듬전 도라지나물 갈비찜', author: '지미니테이블', avatar: '/images/recommendations/avatar-cake.jpg' },
  { id: 'photo-10', image: '/images/recommendations/photo-10.jpg', description: '미니멀리스트의 집', author: 'dayahome', avatar: '/images/recommendations/avatar-dog.jpg' },
]

export const housewarmings = [
  { id: 'house-1', image: '/images/recommendations/house-1.jpg', title: '4평 방에 차린 디자이너&인테리어 유튜버의 평온한 안식처' },
  { id: 'house-2', image: '/images/recommendations/house-2.jpg', title: '취향이 쉼이 되는 공간, 단정한 11평 싱글 하우스' },
  { id: 'house-3', image: '/images/recommendations/house-3.jpg', title: '구조 변경 없이, 단정하고 따뜻하게 꾸민 24평 구축 신혼집' },
  { id: 'house-4', image: '/images/recommendations/house-4.jpg', title: '일러스트레이터의 아늑하고 실용적인 9평 투룸 신혼집 😊' },
]

export const categories = [
  { name: '가구', image: 'furniture.avif' },
  { name: '패브릭', image: 'fabric.avif' },
  { name: '가전·디지털', image: 'digital.avif' },
  { name: '주방용품', image: 'cooker.avif' },
  { name: '식품', image: 'food.avif' },
  { name: '데코·식물', image: 'deco.avif' },
  { name: '조명', image: 'lights.avif' },
  { name: '수납·정리', image: 'container.avif' },
  { name: '생활용품', image: 'household-goods.avif' },
  { name: '생필품', image: 'daily-necessities.avif' },
  { name: '유아·아동', image: 'kids.avif' },
  { name: '반려동물', image: 'pets.avif' },
  { name: '캠핑·레저', image: 'camping.avif' },
  { name: '공구·DIY', image: 'DIY.avif' },
  { name: '인테리어시공', image: 'interior.avif' },
  { name: '렌탈·구독', image: 'subscribe.avif' },
  { name: '장보기', image: 'grocery.avif' },
]
