"use client";

import { useState } from "react";
import AppShell from "@/components/app-shell/AppShell";
import { systemPrompt } from "@/lib/apps/prompts/park-minju";

export default function ParkMinjuApp() {
  const [content, setContent] = useState("");
  const [type, setType] = useState("층간소음");
  const [tone, setTone] = useState<"공감형" | "사무형" | "단호함">("공감형");

  return (
    <AppShell
      participantId="park-minju"
      title="민원 응대 답변 생성기"
      subtitle="민원 내용·유형·톤을 선택하면 공감·확인·조치·후속 4단 구조의 답변 초안이 생성됩니다."
      domainTag="민원 응대"
      form={({ submit, loading }) => (
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!content.trim()) {
              alert("민원 내용을 입력해주세요.");
              return;
            }
            const userText = `민원 유형: ${type}\n답변 톤: ${tone}\n\n민원 내용:\n${content}`;
            await submit({ systemPrompt, userText });
          }}
        >
          <div>
            <label className="block text-xs font-medium text-neutral-700">민원 내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              placeholder="예) 윗집에서 새벽 2시까지 발걸음 소리가 심합니다. 어제도 잠을 못 잤어요. 어떻게 해주실 건가요?"
              className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700">민원 유형</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              >
                <option>층간소음</option>
                <option>주차</option>
                <option>엘리베이터</option>
                <option>누수</option>
                <option>기타</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">답변 톤</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as typeof tone)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              >
                <option>공감형</option>
                <option>사무형</option>
                <option>단호함</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "작성 중..." : "답변 초안 생성"}
          </button>
        </form>
      )}
    />
  );
}
