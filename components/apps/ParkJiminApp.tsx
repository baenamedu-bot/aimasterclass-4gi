"use client";

import { useState } from "react";
import AppShell from "@/components/app-shell/AppShell";
import ImageUploader from "@/components/app-shell/ImageUploader";
import { fileToBase64 } from "@/lib/gemini-client";
import { systemPrompt } from "@/lib/apps/prompts/park-jimin";

export default function ParkJiminApp() {
  const [files, setFiles] = useState<File[]>([]);
  const [address, setAddress] = useState("");
  const [zone, setZone] = useState("제2종 일반주거지역");
  const [siteArea, setSiteArea] = useState("");
  const [floors, setFloors] = useState("");
  const [usage, setUsage] = useState("다세대");

  return (
    <AppShell
      participantId="park-jimin"
      title="도면 법규검토 + 보고용 슬라이드"
      subtitle="도면 이미지와 대지 정보로 법규 검토 결과와 클라이언트 보고용 슬라이드 초안을 생성합니다."
      domainTag="건축 법규 / 인허가"
      form={({ submit, loading }) => (
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (files.length === 0) {
              alert("도면 이미지를 1장 이상 업로드해주세요.");
              return;
            }
            const images = await Promise.all(files.map(fileToBase64));
            const userText = `소재지: ${address || "(미입력)"}\n용도지역: ${zone}\n대지면적: ${siteArea || "(미입력)"} ㎡\n계획층수: ${floors || "(미입력)"} 층\n용도: ${usage}\n\n첨부된 ${files.length}장의 도면을 분석해 법규 검토와 보고 슬라이드 초안을 작성하세요.`;
            await submit({ systemPrompt, userText, images });
          }}
        >
          <ImageUploader files={files} onChange={setFiles} maxFiles={3} label="도면 이미지" required />
          <div>
            <label className="block text-xs font-medium text-neutral-700">소재지(시·구·동)</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="예) 서울시 강남구 역삼동"
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
                <option>제1종 전용주거지역</option>
                <option>제2종 전용주거지역</option>
                <option>제1종 일반주거지역</option>
                <option>제2종 일반주거지역</option>
                <option>제3종 일반주거지역</option>
                <option>준주거지역</option>
                <option>일반상업지역</option>
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
              <label className="block text-xs font-medium text-neutral-700">계획층수</label>
              <input
                value={floors}
                onChange={(e) => setFloors(e.target.value)}
                inputMode="numeric"
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">용도</label>
              <select
                value={usage}
                onChange={(e) => setUsage(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              >
                <option>다세대</option>
                <option>다가구</option>
                <option>근린생활시설</option>
                <option>상가</option>
                <option>주상복합</option>
                <option>업무시설</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "검토 중..." : "법규 검토 + 슬라이드 생성"}
          </button>
        </form>
      )}
    />
  );
}
