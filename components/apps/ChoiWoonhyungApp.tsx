"use client";

import { useState } from "react";
import AppShell from "@/components/app-shell/AppShell";
import ImageUploader from "@/components/app-shell/ImageUploader";
import { fileToBase64 } from "@/lib/gemini-client";
import { systemPrompt } from "@/lib/apps/prompts/choi-woonhyung";

export default function ChoiWoonhyungApp() {
  const [files, setFiles] = useState<File[]>([]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [weather, setWeather] = useState("맑음");
  const [memo, setMemo] = useState("");

  return (
    <AppShell
      participantId="choi-woonhyung"
      title="감리일지 자동 작성기"
      subtitle="현장 사진과 메모를 입력하면 정형화된 감리일지를 마크다운으로 생성합니다."
      domainTag="건축 감리"
      form={({ submit, loading }) => (
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (files.length === 0) {
              alert("현장 사진을 1장 이상 업로드해주세요.");
              return;
            }
            const images = await Promise.all(files.map(fileToBase64));
            const userText = `날짜: ${date}\n날씨: ${weather}\n현장 메모: ${memo || "(없음)"}\n\n첨부된 ${files.length}장의 현장 사진을 분석해 감리일지를 작성하세요.`;
            await submit({ systemPrompt, userText, images });
          }}
        >
          <ImageUploader
            files={files}
            onChange={setFiles}
            maxFiles={5}
            label="현장 사진"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700">날짜</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">날씨</label>
              <select
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              >
                <option>맑음</option>
                <option>흐림</option>
                <option>비</option>
                <option>눈</option>
                <option>강풍</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700">현장 메모</label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              rows={5}
              placeholder="예) 3층 슬라브 타설 진행 중. 동측 가설계단 미설치 확인."
              className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "생성 중..." : "감리일지 생성"}
          </button>
        </form>
      )}
    />
  );
}
