"use client";

import { useState } from "react";
import AppShell from "@/components/app-shell/AppShell";
import { systemPrompt } from "@/lib/apps/prompts/choi-wooseop";

export default function ChoiWooseopApp() {
  const [kind, setKind] = useState("남자");
  const [stalls, setStalls] = useState("4");
  const [w, setW] = useState("900");
  const [d, setD] = useState("1500");
  const [h, setH] = useState("1800");
  const [material, setMaterial] = useState("방수PB 25T");
  const [memo, setMemo] = useState("");

  return (
    <AppShell
      participantId="choi-wooseop"
      title="화장실 칸막이 BOM + 작업지시서"
      subtitle="실측 치수와 자재를 입력하면 자재 BOM, 하드웨어, 약식 평면 스케치, 공장 작업지시서가 자동 생성됩니다."
      domainTag="제작·시공 / BOM"
      form={({ submit, loading }) => (
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const userText = `화장실 종류: ${kind}\n칸수: ${stalls}\n1칸 치수: 가로 ${w}mm × 세로 ${d}mm × 높이 ${h}mm\n자재: ${material}\n추가 메모: ${memo || "(없음)"}`;
            await submit({ systemPrompt, userText });
          }}
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700">화장실 종류</label>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              >
                <option>남자</option>
                <option>여자</option>
                <option>장애인</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">칸수</label>
              <input
                value={stalls}
                onChange={(e) => setStalls(e.target.value)}
                inputMode="numeric"
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">가로 W(mm)</label>
              <input
                value={w}
                onChange={(e) => setW(e.target.value)}
                inputMode="numeric"
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">세로 D(mm)</label>
              <input
                value={d}
                onChange={(e) => setD(e.target.value)}
                inputMode="numeric"
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">높이 H(mm)</label>
              <input
                value={h}
                onChange={(e) => setH(e.target.value)}
                inputMode="numeric"
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">자재</label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              >
                <option>방수PB 25T</option>
                <option>HPB</option>
                <option>일반PB</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700">추가 메모</label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              rows={3}
              placeholder="예) 도어 색상 무광 그레이, 잠금장치 비상열림 포함"
              className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "산출 중..." : "BOM + 작업지시서 생성"}
          </button>
        </form>
      )}
    />
  );
}
