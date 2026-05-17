"use client";

import { useState } from "react";
import AppShell from "@/components/app-shell/AppShell";
import { systemPrompt } from "@/lib/apps/prompts/oh-sehyun";

export default function OhSehyunApp() {
  const [address, setAddress] = useState("");
  const [zone, setZone] = useState("준주거지역");
  const [siteArea, setSiteArea] = useState("");
  const [usage, setUsage] = useState("주거");
  const [purpose, setPurpose] = useState("초기 사업검토 및 임원 보고");

  return (
    <AppShell
      participantId="oh-sehyun"
      title="개발사업 타당성 검토 어시스턴트"
      subtitle="입력된 사업 정보로 입지·시장·법규·사업성·리스크 검토서 초안을 생성합니다."
      domainTag="부동산 개발"
      form={({ submit, loading }) => (
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const userText = `사업지: ${address || "(미입력)"}\n용도지역: ${zone}\n대지면적: ${siteArea || "(미입력)"} ㎡\n계획용도: ${usage}\n검토 목적: ${purpose}`;
            await submit({ systemPrompt, userText });
          }}
        >
          <div>
            <label className="block text-xs font-medium text-neutral-700">사업지 주소</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="예) 경기도 성남시 분당구 정자동 OO번지"
              className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700">용도지역</label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              >
                <option>제2종 일반주거지역</option>
                <option>제3종 일반주거지역</option>
                <option>준주거지역</option>
                <option>일반상업지역</option>
                <option>중심상업지역</option>
                <option>준공업지역</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">대지면적(㎡)</label>
              <input
                value={siteArea}
                onChange={(e) => setSiteArea(e.target.value)}
                inputMode="numeric"
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">계획용도</label>
              <select
                value={usage}
                onChange={(e) => setUsage(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              >
                <option>주거</option>
                <option>상업</option>
                <option>주상복합</option>
                <option>지식산업센터</option>
                <option>오피스텔</option>
                <option>업무시설</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">검토 목적</label>
              <input
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "분석 중..." : "타당성 검토서 생성"}
          </button>
        </form>
      )}
    />
  );
}
