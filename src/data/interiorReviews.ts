export interface InteriorReview {
  id: number;
  imageUrl: string;
  title: string;   // 오늘의집 인테리어
  content: string; // 리뷰 본문(길면 3줄에서 잘리도록)
}

export const interiorReviews: InteriorReview[] = [
  {
    id: 1,
    imageUrl: "/images/interiorReviews/id1.avif",
    title: "오늘의집 인테리어",
    content:
      "부모님댁 인테리어를 반셀로 진행하게 되었어요! 사실 주방 인테리어는 생각 안하고 있다가 필름으로 하기엔 너무 고칠게 많아서 2주도 안남은 시점에 급하게 오늘의집 주방에 문의했어요.",
  },
  {
    id: 2,
    imageUrl: "/images/interiorReviews/id2.avif",
    title: "오늘의집 인테리어",
    content:
      "부모님댁 20년 이상 된 엘베 없는 5층 빌라(사다리차 필수) 주방 시공 했어요~ 첫 시공이라 신뢰와 A/S가 젤 중요해서 오늘의집에서 했고요! 부모님이 화장실을 동네 업체에서 했는데 만족도가 낮았어요.",
  },
  {
    id: 3,
    imageUrl: "/images/interiorReviews/id3.avif",
    title: "오늘의집 인테리어",
    content:
      "이사 갈 신혼집이 오래된 아파트는 아니라서 도배 시공만 필요했어요. 동네 인테리어 업체 가보니까 부분 시공이라 그런지 불친절하게 대응하시더라고요..(합지 벽지로만 가능하다고 하셨어요)",
  },
];