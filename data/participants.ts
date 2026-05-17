export type Participant = {
  id: string;
  name: string;
  company: string;
  role: string;
  industry: string;
  level: "무경험" | "초급" | "중급" | "중상급" | "상급";
  goals: string[];
  experience: string;
  interests: string[];
};

export const participants: Participant[] = [
  {
    id: "choi-woonhyung",
    name: "최운형",
    company: "건축사사무소",
    role: "대표",
    industry: "건축설계",
    level: "초급",
    goals: ["감리일지 자동화", "도면 법규검토"],
    experience: "AI 활용 입문 단계, 소규모 사무실 1인 운영",
    interests: ["감리/감독", "도면 검토", "업무 자동화"],
  },
  {
    id: "min-kyungjin",
    name: "민경진",
    company: "건축설계사무소",
    role: "설계팀",
    industry: "건축설계",
    level: "중급",
    goals: ["홍보영상 제작", "AI 영상 워크플로우 구축"],
    experience: "ChatGPT·Midjourney 등 일상 활용 중",
    interests: ["영상 생성", "이미지 생성", "브랜딩"],
  },
  {
    id: "park-jimin",
    name: "박지민",
    company: "건축설계사무소",
    role: "설계팀",
    industry: "건축설계",
    level: "중급",
    goals: ["PPT 레이아웃 자동화", "도면 기반 산출물 정리"],
    experience: "Gamma 등 AI PPT 도구 사용 경험",
    interests: ["프레젠테이션", "도면 검토", "문서 자동화"],
  },
  {
    id: "seo-junghwa",
    name: "서정화",
    company: "종합건설",
    role: "견적팀",
    industry: "건설/견적",
    level: "무경험",
    goals: ["견적 작업 보조", "기초 AI 사용법 익히기"],
    experience: "AI 도구 사용 경험 없음, 음성/사진 위주 활용 선호",
    interests: ["견적 산출", "음성 입력", "이미지 인식"],
  },
  {
    id: "oh-sehyun",
    name: "오세현",
    company: "디벨로퍼",
    role: "사업검토팀",
    industry: "부동산 개발",
    level: "중상급",
    goals: ["사업검토 양식 자동화 앱 제작", "GPTs/단일 HTML 도구 직접 구축"],
    experience: "ChatGPT 정기 사용, 업무 적용 단계",
    interests: ["GPTs 만들기", "사업성 분석", "양식 자동화"],
  },
  {
    id: "uh-myungjun",
    name: "어명준",
    company: "건설사",
    role: "기획팀",
    industry: "건설/기획",
    level: "중급",
    goals: ["시장조사 자동화", "리서치 GPT 구축"],
    experience: "Perplexity·Claude 비교 사용 경험",
    interests: ["LLM 비교", "리서치 자동화", "시장조사"],
  },
  {
    id: "park-minju",
    name: "박민주",
    company: "공공기관",
    role: "민원담당",
    industry: "행정/민원",
    level: "무경험",
    goals: ["민원응대 매뉴얼 작성 보조", "휴대폰 기반 간단한 AI 사용"],
    experience: "AI 도구 사용 경험 없음",
    interests: ["민원 응대", "Gemini 앱", "음성 입력"],
  },
  {
    id: "park-kiju",
    name: "박기주",
    company: "건설사",
    role: "차장",
    industry: "건설/관리",
    level: "중급",
    goals: ["인력 스케줄러 제작", "젠스파크 활용 비교"],
    experience: "젠스파크 등 신규 LLM 도구에 관심 높음",
    interests: ["젠스파크", "스케줄 관리", "LLM 비교"],
  },
  {
    id: "choi-wooseop",
    name: "최우섭",
    company: "건설사",
    role: "실무자",
    industry: "건설/IT",
    level: "중상급",
    goals: ["본인 업무 자동화 도구 구축", "코딩 + AI 결합 실습"],
    experience: "기초 코딩 경험 있음, 자녀 학습용 도구 자체 제작 경험",
    interests: ["바이브 코딩", "업무 자동화", "GPTs"],
  },
  {
    id: "seo-hyun",
    name: "서현",
    company: "건설사",
    role: "마케팅/홍보",
    industry: "콘텐츠/마케팅",
    level: "중급",
    goals: ["SNS 콘텐츠 제작", "카피라이팅 GPT 활용"],
    experience: "콘텐츠 제작 도구 부분 사용 중",
    interests: ["이미지 생성", "SNS 카피", "Gemini Gem"],
  },
  {
    id: "lee-jongmin",
    name: "이종민",
    company: "건설사",
    role: "과장",
    industry: "건설/공무",
    level: "중상급",
    goals: ["영상 생성(Veo·Seedance) 실무 적용", "기성청구 자동화 도구"],
    experience: "이전 강의 수강, 응용 단계",
    interests: ["영상 생성", "기성청구", "현장 자동화"],
  },
  {
    id: "ki-minwoo",
    name: "기민우",
    company: "금융사",
    role: "실무자",
    industry: "금융",
    level: "중급",
    goals: ["사내 보안 정책 내 AI 도입", "민감정보 마스킹 워크플로우"],
    experience: "공용 클라우드 사용 제약, 폐쇄망 환경 고려 필요",
    interests: ["보안/컴플라이언스", "API/온프레미스", "프롬프트 마스킹"],
  },
];

export const getParticipantById = (id: string) =>
  participants.find((p) => p.id === id);
