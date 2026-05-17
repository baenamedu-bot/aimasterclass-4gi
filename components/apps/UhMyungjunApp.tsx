"use client";

import { useState } from "react";
import AppShell from "@/components/app-shell/AppShell";
import { systemPrompt } from "@/lib/apps/prompts/uh-myungjun";

export default function UhMyungjunApp() {
  const [region, setRegion] = useState("");
  const [type, setType] = useState("아파트");
  const [mode, setMode] = useState<"분양" | "임대">("분양");
  const [period, setPeriod] = useState("2026년 상반기");
  const [target, setTarget] = useState("");

  return (
    <AppShell
      participantId="uh-myungjun"
      title="부동산 시장조사 보고서 자동생성"
      subtitle="지역·물건 유형·시점만 입력하면 시장조사 보고서 한 장을 자동으로 만듭니다."
      domainTag="시장조사 / 리서치"
      form={({ submit, loading }) => (
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const userText = `지역: ${region || "(미입력)"}\n물건 유형: ${type}\n구분: ${mode}\n시점: ${period}\n타겟: ${target || "(자유 도출)"}`;
            await submit({ systemPrompt, userText });
          }}
        >
          <div>
            <label className="block text-xs font-medium text-neutral-700">지역(시·구)</label>
            <input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="예) 인천광역시 송도국제도시"
              className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700">물건 유형</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              >
                <option>아파트</option>
                <option>오피스텔</option>
                <option>상가</option>
                <option>지식산업센터</option>
                <option>주거형 오피스텔</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">구분</label>
              <div className="mt-1 flex gap-2">
                {(["분양", "임대"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`flex-1 rounded-md border px-2 py-1.5 text-xs ${mode === m ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300 bg-white"}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700">시점</label>
            <input
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700">타겟 (선택)</label>
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="예) 30~40대 신혼·자녀 1인 가구"
              className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "조사 중..." : "시장조사 보고서 생성"}
          </button>
        </form>
      )}
    />
  );
}
