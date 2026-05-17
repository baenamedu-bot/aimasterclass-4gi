"use client";

import { useState } from "react";
import AppShell from "@/components/app-shell/AppShell";
import CsvUploader, { type CsvData } from "@/components/app-shell/CsvUploader";
import { systemPrompt } from "@/lib/apps/prompts/ki-minwoo";

type ColumnMap = {
  date: string;
  merchant: string;
  category: string;
  amount: string;
  card?: string;
};

const TARGET_FIELDS: { key: keyof ColumnMap; label: string; required?: boolean }[] = [
  { key: "date", label: "날짜", required: true },
  { key: "merchant", label: "가맹점", required: true },
  { key: "category", label: "카테고리(있으면)" },
  { key: "amount", label: "금액", required: true },
  { key: "card", label: "카드(있으면)" },
];

function autoMap(headers: string[]): ColumnMap {
  const find = (...keys: string[]) =>
    headers.find((h) => keys.some((k) => h.replace(/\s/g, "").toLowerCase().includes(k))) ?? "";
  return {
    date: find("날짜", "일자", "date"),
    merchant: find("가맹점", "사용처", "merchant", "store"),
    category: find("카테고리", "분류", "category"),
    amount: find("금액", "amount", "price"),
    card: find("카드", "card"),
  };
}

export default function KiMinwooApp() {
  const [curr, setCurr] = useState<CsvData | null>(null);
  const [prev, setPrev] = useState<CsvData | null>(null);
  const [mapping, setMapping] = useState<ColumnMap>({
    date: "",
    merchant: "",
    category: "",
    amount: "",
    card: "",
  });
  const [limits, setLimits] = useState("");

  const handleCurr = (data: CsvData) => {
    setCurr(data);
    setMapping(autoMap(data.headers));
  };

  const summarize = (data: CsvData) => {
    const lines = data.rows.slice(0, 200).map((row) => {
      const d = mapping.date ? row[mapping.date] : "";
      const m = mapping.merchant ? row[mapping.merchant] : "";
      const c = mapping.category ? row[mapping.category] : "";
      const a = mapping.amount ? row[mapping.amount] : "";
      const card = mapping.card ? row[mapping.card] : "";
      return `${d} | ${m} | ${c} | ${a} | ${card}`;
    });
    return `(총 ${data.rows.length}건 중 최대 200건 발췌)\n날짜 | 가맹점 | 카테고리 | 금액 | 카드\n${lines.join("\n")}`;
  };

  return (
    <AppShell
      participantId="ki-minwoo"
      title="월간 경비·법인카드 모니터링"
      subtitle="법인카드 사용내역 CSV를 업로드하면 카테고리·한도·이상 패턴·월간 요약을 자동 생성합니다."
      domainTag="금융 / 경비 분석"
      privacyBanner="CSV는 사용자 브라우저(클라이언트)에서만 파싱·처리됩니다. 서버에 저장되지 않습니다."
      form={({ submit, loading }) => (
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!curr) {
              alert("당월 CSV 파일을 업로드해주세요.");
              return;
            }
            if (!mapping.date || !mapping.merchant || !mapping.amount) {
              alert("최소 날짜·가맹점·금액 컬럼을 매핑해주세요.");
              return;
            }
            const userText = `[당월 거래 데이터]\n${summarize(curr)}\n\n${prev ? `[전월 거래 데이터]\n${summarize(prev)}` : "[전월 데이터 없음]"}\n\n[카드별 월 한도]\n${limits || "(미입력)"}\n\n위 데이터를 기반으로 월간 경비 모니터링 리포트를 작성하세요.`;
            await submit({ systemPrompt, userText });
          }}
        >
          <CsvUploader onParsed={handleCurr} label="당월 거래내역 CSV" />
          {curr && (
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
              <p className="text-[11px] text-neutral-600">
                <b>{curr.fileName}</b> · {curr.rows.length}행 · {curr.headers.length}컬럼
              </p>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {TARGET_FIELDS.map((f) => (
                  <div key={f.key}>
                    <label className="block text-[11px] text-neutral-600">
                      {f.label} {f.required && <span className="text-red-500">*</span>}
                    </label>
                    <select
                      value={mapping[f.key] ?? ""}
                      onChange={(e) =>
                        setMapping((m) => ({ ...m, [f.key]: e.target.value }))
                      }
                      className="mt-0.5 w-full rounded-md border border-neutral-300 px-2 py-1 text-xs"
                    >
                      <option value="">— 선택 —</option>
                      {curr.headers.map((h) => (
                        <option key={h}>{h}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}
          <CsvUploader onParsed={setPrev} label="전월 거래내역 CSV" optional />
          {prev && (
            <p className="text-[11px] text-neutral-600">
              전월: <b>{prev.fileName}</b> · {prev.rows.length}행
            </p>
          )}
          <div>
            <label className="block text-xs font-medium text-neutral-700">카드별 월 한도</label>
            <textarea
              value={limits}
              onChange={(e) => setLimits(e.target.value)}
              rows={4}
              placeholder="예) 영업1팀 카드: 500만원&#10;임원카드: 1000만원"
              className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "분석 중..." : "월간 모니터링 리포트 생성"}
          </button>
        </form>
      )}
    />
  );
}
