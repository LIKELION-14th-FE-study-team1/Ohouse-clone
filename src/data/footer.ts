export type FooterLink = {
  label: string;
  href: string;
  /** 굵게 표시 (개인정보 처리방침 등) */
  bold?: boolean;
};

export type SupportItem = {
  id: string;
  title: string;
  /** 한 줄씩 표시할 설명 */
  descriptions: string[];
  href: string;
};

export type CompanyInfoLine = {
  /** ' | ' 로 구분되어 표시되는 항목들 */
  items: string[];
  /** 줄 끝에 붙는 굵은 링크 (예: 사업자정보확인) */
  link?: FooterLink;
};

export type Certification = {
  id: string;
  image: string;
  alt: string;
  /** 이미지 옆에 붙는 문구 (ISMS 인증 기간 등) */
  texts?: string[];
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: string;
};

export const supportTitle = { label: "고객센터", href: "#" };

export const supportItems: SupportItem[] = [
  {
    id: "support-inquiry",
    title: "1:1 문의",
    descriptions: ["24시간 접수 · 평일 09:00-18:00 답변"],
    href: "#",
  },
  {
    id: "support-chat",
    title: "채팅 상담",
    descriptions: ["평일 09:00-18:00"],
    href: "#",
  },
  {
    id: "support-phone",
    title: "1670-0876",
    descriptions: [
      "평일 09:00-18:00 · 일요일 : 휴무",
      "토·공휴일 : 원하는날도착 주문건 상담",
    ],
    href: "tel:1670-0876",
  },
];

/* 배열 순서 = 모바일에서 읽히는 순서 = 데스크톱에서 위→아래, 왼쪽→오른쪽 순서 */
export const footerLinks: FooterLink[] = [
  { label: "회사소개", href: "#" },
  { label: "채용정보", href: "#" },
  { label: "이용약관", href: "#" },
  { label: "개인정보 처리방침", href: "#", bold: true },
  { label: "공지사항", href: "#" },
  { label: "권리보호센터", href: "#" },
  { label: "입점신청", href: "#" },
  { label: "제휴/광고 문의", href: "#" },
  { label: "시공파트너 안내", href: "#" },
  { label: "파트너 개인정보 처리방침", href: "#", bold: true },
  { label: "상품광고 소개", href: "#" },
  { label: "결제대행 위탁사", href: "#" },
];

export const companyName = "(주)버킷플레이스";

export const companyInfoLines: CompanyInfoLine[] = [
  {
    items: [
      "(주)버킷플레이스",
      "대표이사 이승재",
      "서울 서초구 서초대로74길 4 삼성생명서초타워 25층, 27층",
      "contact@bucketplace.net",
      "사업자등록번호 119-86-91245",
    ],
    link: { label: "사업자정보확인", href: "#" },
  },
  { items: ["통신판매업신고번호 제2018-서울서초-0580호"] },
];

export const footerNotice = {
  text: "고객님이 현금결제한 금액에 대해 우리은행과 채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다.",
  link: { label: "서비스가입사실확인", href: "#" },
};

export const certifications: Certification[] = [
  {
    id: "isms",
    image: "/images/cert-isms.png",
    alt: "ISMS 인증",
    texts: ["오늘의집 서비스 운영", "2024. 09. 08 ~ 2027. 09. 07"],
  },
  { id: "iso27001", image: "/images/cert-iso27001.png", alt: "ISO 27001 인증" },
  { id: "pcr", image: "/images/cert-pcr.png", alt: "개인정보보호 인증" },
];

export const footerDisclaimer =
  "(주)버킷플레이스는 통신판매중개자로 거래 당사자가 아니므로, 판매자가 등록한 상품정보 및 거래 등에 대해 책임을 지지 않습니다. 단, (주)버킷플레이스가 판매자로 등록 판매한 상품은 판매자로서 책임을 부담합니다.";

export const socialLinks: SocialLink[] = [
  {
    id: "youtube",
    label: "유튜브",
    href: "#",
    icon: "/images/sns-youtube.svg",
  },
  {
    id: "instagram",
    label: "인스타그램",
    href: "#",
    icon: "/images/sns-instagram.svg",
  },
  {
    id: "facebook",
    label: "페이스북",
    href: "#",
    icon: "/images/sns-facebook.svg",
  },
  {
    id: "naver-blog",
    label: "네이버 블로그",
    href: "#",
    icon: "/images/sns-naver.svg",
  },
];

export const copyright =
  "Copyright 2014. bucketplace, Co., Ltd. All rights reserved.";
