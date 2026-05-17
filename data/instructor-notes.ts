export type InstructorNote = {
  participantId: string;
  name: string;
  note: string;
};

export const instructorNotes: InstructorNote[] = [
  {
    participantId: "choi-woonhyung",
    name: "최운형",
    note: "감리일지 자동화·도면 법규검토 데모에서 즉시 가치 체감 가능. 소규모 사무실 대표라 '1인 1AI 비서' 관점으로 풀어주면 효과적.",
  },
  {
    participantId: "min-kyungjin",
    name: "민경진",
    note: "이미 AI 활용도 높음. Day2 영상 생성 파트 가장 적극 참여 예상. 홍보영상 스토리보드→실제 영상 한 사이클 시연 추천.",
  },
  {
    participantId: "park-jimin",
    name: "박지민",
    note: "건축설계군 3명째 — 민경진(중급)과 최운형(초급) 사이. PPT 레이아웃 AI 경험 있음. 최운형과 법규검토 짝꿍 실습 추천. 본인 도면 직접 입력 유도.",
  },
  {
    participantId: "seo-junghwa",
    name: "서정화",
    note: "AI 무경험·연령대 고려 음성 입력/이미지 업로드 위주 시연. Day1 Gemini Gem '견적 도우미'로 진입장벽 낮춤.",
  },
  {
    participantId: "oh-sehyun",
    name: "오세현",
    note: "이미 사용 중. '만들기'에 가장 집중. Day2 GPTs 또는 단일 HTML 앱에서 실제 사업검토 양식 활용해 만들도록 유도.",
  },
  {
    participantId: "uh-myungjun",
    name: "어명준",
    note: "리서치 자동화 욕구 명확. Day1 LLM 비교(Perplexity/Claude 웹검색) + Day2 GPTs '시장조사 보조' 만들기 시연 베스트.",
  },
  {
    participantId: "park-minju",
    name: "박민주",
    note: "AI 무경험. 휴대폰 음성입력·Gemini 앱 위주 진입. 박기주 차장과 페어로 '민원응대 매뉴얼 봇' 같이 만들면 효과 큼.",
  },
  {
    participantId: "park-kiju",
    name: "박기주",
    note: "젠스파크 관심 명시. Day1 LLM 비교에서 젠스파크 워크스페이스 vs Claude/Gemini 비교 데모 추가. '인력 스케줄러' 만들기 실습 적합.",
  },
  {
    participantId: "choi-wooseop",
    name: "최우섭",
    note: "코딩 경험 있어 빠르게 흡수. '업무 적용' 핵심 니즈 — 본인 업무 직접 자동화 실습에 시간 배정. 자녀용 만든 경험 칭찬 + 업무용 전환 사례 시연.",
  },
  {
    participantId: "seo-hyun",
    name: "서현",
    note: "콘텐츠 제작 니즈 명확. Day2 이미지 생성 + Day1 Gemini Gem 'SNS 카피라이터' 만들기 직접 적중. 이종민 과장과 같은 회사라 페어 실습 가능.",
  },
  {
    participantId: "lee-jongmin",
    name: "이종민",
    note: "기존 수강 경험 있어 응용 단계. Day2 영상 생성(Veo·Seedance) 집중 시연. 기성청구 자동화 도구 별도로 만들면 회사 도입 가능성 큼.",
  },
  {
    participantId: "ki-minwoo",
    name: "기민우",
    note: "금융권 보안 이슈 별도 언급 필요. 사내 폐쇄망 가능한 API/온프레미스 옵션 안내, 민감정보 마스킹 프롬프팅 시연 권장.",
  },
];

export const getInstructorNoteById = (participantId: string) =>
  instructorNotes.find((n) => n.participantId === participantId);
