"use client";

import { useState } from "react";
import AppShell from "@/components/app-shell/AppShell";
import ImageUploader from "@/components/app-shell/ImageUploader";
import { fileToBase64 } from "@/lib/gemini-client";
import { systemPrompt } from "@/lib/apps/prompts/lee-jongmin";

export default function LeeJongminApp() {
  const [files, setFiles] = useState<File[]>([]);
  const [brand, setBrand] = useState("Timberwise");
  const [pattern, setPattern] = useState("헤링본");
  const [space, setSpace] = useState("럭셔리 주거");

  return (
    <AppShell
      participantId="lee-jongmin"
      title="원목마루 브랜드 영상 기획"
      subtitle="시공 사진 1~3장 + 브랜드 정보로 15초 릴스용 5씬 시나리오와 Veo 영문 프롬프트를 만듭니다."
      domainTag="브랜드 영상"
      form={({ submit, loading }) => (
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (files.length === 0) {
              alert("시공 현장 사진을 1장 이상 업로드해주세요.");
              return;
            }
            const images = await Promise.all(files.map(fileToBase64));
            const userText = `브랜드: ${brand}\n제품·패턴: ${pattern}\n주거 타입: ${space}\n영상 길이: 15s (릴스 고정)\n\n첨부된 시공 사진 ${files.length}장의 결·색·빛을 시나리오와 프롬프트에 반영하세요.`;
            await submit({ systemPrompt, userText, images });
          }}
        >
          <ImageUploader files={files} onChange={setFiles} maxFiles={3} label="시공 현장 사진" required />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700">브랜드</label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">제품·패턴</label>
              <select
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              >
                <option>헤링본</option>
                <option>쉐브론</option>
                <option>와이드플랭크</option>
                <option>슬림 플랭크</option>
                <option>패턴 매트</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">주거·공간 타입</label>
              <select
                value={space}
                onChange={(e) => setSpace(e.target.value)}
                className="col-span-2 mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              >
                <option>럭셔리 주거</option>
                <option>모던 카페</option>
                <option>프리미엄 오피스</option>
                <option>호텔 라운지</option>
                <option>플래그십 쇼룸</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "기획 중..." : "릴스 시나리오 + Veo 프롬프트 생성"}
          </button>
        </form>
      )}
    />
  );
}
