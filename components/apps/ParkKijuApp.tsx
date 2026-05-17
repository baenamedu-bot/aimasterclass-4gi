"use client";

import { useState } from "react";
import AppShell from "@/components/app-shell/AppShell";
import {
  schedulerSystemPrompt,
  billingSystemPrompt,
} from "@/lib/apps/prompts/park-kiju";

export default function ParkKijuApp() {
  const [tab, setTab] = useState<"sched" | "bill">("sched");

  // 스케줄러
  const [cleaning, setCleaning] = useState("3");
  const [security, setSecurity] = useState("4");
  const [buildings, setBuildings] = useState("5");
  const [pattern, setPattern] = useState("주간/야간 교대");
  const [offRequest, setOffRequest] = useState("");

  // 관리비
  const [households, setHouseholds] = useState("100");
  const [prev, setPrev] = useState("");
  const [curr, setCurr] = useState("");
  const [unitPrice, setUnitPrice] = useState("130");

  return (
    <AppShell
      participantId="park-kiju"
      title="인력 스케줄러 + 관리비 산정"
      subtitle="월간 인력배치표 자동 작성과 가구별 관리비 산정을 한 곳에서."
      domainTag="시설 운영 / 관리"
      form={({ submit, loading }) => (
        <div className="space-y-4">
          <div className="flex gap-1 border-b border-neutral-200">
            {(
              [
                ["sched", "① 인력 스케줄러"],
                ["bill", "② 관리비 산정"],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => setTab(k)}
                className={`px-3 py-1.5 text-xs ${tab === k ? "border-b-2 border-neutral-900 font-medium" : "text-neutral-500"}`}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === "sched" ? (
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const userText = `청소 인원: ${cleaning}명\n경비 인원: ${security}명\n관리 동수: ${buildings}동\n근무 패턴: ${pattern}\n월 휴무 요청:\n${offRequest || "(없음)"}`;
                await submit({ systemPrompt: schedulerSystemPrompt, userText });
              }}
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700">청소 인원</label>
                  <input
                    value={cleaning}
                    onChange={(e) => setCleaning(e.target.value)}
                    inputMode="numeric"
                    className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700">경비 인원</label>
                  <input
                    value={security}
                    onChange={(e) => setSecurity(e.target.value)}
                    inputMode="numeric"
                    className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700">관리 동수</label>
                  <input
                    value={buildings}
                    onChange={(e) => setBuildings(e.target.value)}
                    inputMode="numeric"
                    className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700">근무 패턴</label>
                  <select
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                  >
                    <option>주간/야간 교대</option>
                    <option>주간만</option>
                    <option>격일 24시간</option>
                    <option>주말휴무</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-700">월 휴무 요청</label>
                <textarea
                  value={offRequest}
                  onChange={(e) => setOffRequest(e.target.value)}
                  rows={4}
                  placeholder="예) 김OO 5/10~5/12, 이OO 5/20"
                  className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
              >
                {loading ? "배치 중..." : "월간 인력배치표 생성"}
              </button>
            </form>
          ) : (
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const userText = `가구 수: ${households}\n단가(원/㎥): ${unitPrice}\n\n전월 검침값 (가구별, 줄바꿈으로 구분):\n${prev}\n\n당월 검침값 (가구별, 줄바꿈으로 구분):\n${curr}`;
                await submit({ systemPrompt: billingSystemPrompt, userText });
              }}
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700">가구 수</label>
                  <input
                    value={households}
                    onChange={(e) => setHouseholds(e.target.value)}
                    inputMode="numeric"
                    className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700">단가(원/㎥)</label>
                  <input
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    inputMode="numeric"
                    className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-700">전월 검침값</label>
                <textarea
                  value={prev}
                  onChange={(e) => setPrev(e.target.value)}
                  rows={4}
                  placeholder="가구별 한 줄씩&#10;101동101호: 130&#10;101동102호: 142"
                  className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-700">당월 검침값</label>
                <textarea
                  value={curr}
                  onChange={(e) => setCurr(e.target.value)}
                  rows={4}
                  placeholder="가구별 한 줄씩&#10;101동101호: 155&#10;101동102호: 168"
                  className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
              >
                {loading ? "계산 중..." : "관리비 산정"}
              </button>
            </form>
          )}
        </div>
      )}
    />
  );
}
