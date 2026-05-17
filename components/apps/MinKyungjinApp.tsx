"use client";

import { useState } from "react";
import AppShell from "@/components/app-shell/AppShell";
import ImageUploader from "@/components/app-shell/ImageUploader";
import { fileToBase64 } from "@/lib/gemini-client";
import { systemPrompt } from "@/lib/apps/prompts/min-kyungjin";

export default function MinKyungjinApp() {
  const [files, setFiles] = useState<File[]>([]);
  const [size, setSize] = useState("33평형 / 약 110㎡");
  const [style, setStyle] = useState("모던");
  const [target, setTarget] = useState("예비 건축주");
  const [duration, setDuration] = useState<"15s" | "30s" | "60s">("30s");

  return (
    <AppShell
      participantId="min-kyungjin"
      title="홍보영상 스토리보드 자동 기획"
      subtitle="외관 사진 1~3장과 프로젝트 정보로 8씬 스토리보드와 Veo 영문 프롬프트를 생성합니다."
      domainTag="영상 기획"
      form={({ submit, loading }) => (
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (files.length === 0) {
              alert("외관 사진을 1장 이상 업로드해주세요.");
              return;
            }
            const images = await Promise.all(files.map(fileToBase64));
            const userText = `프로젝트 평형/면적: ${size}\n스타일: ${style}\n타겟: ${target}\n영상 길이: ${duration}\n\n첨부된 ${files.length}장의 외관 사진을 분석해 스토리보드를 작성하세요.`;
            await submit({ systemPrompt, userText, images });
          }}
        >
          <ImageUploader
            files={files}
            onChange={setFiles}
            maxFiles={3}
            label="외관 사진"
            required
          />
          <div>
            <label className="block text-xs font-medium text-neutral-700">평형/면적</label>
            <input
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700">스타일</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              >
                <option>모던</option>
                <option>한옥</option>
                <option>북유럽</option>
                <option>미니멀</option>
                <option>인더스트리얼</option>
                <option>자연주의</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">타겟</label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              >
                <option>예비 건축주</option>
                <option>B2B (시행/시공사)</option>
                <option>일반 대중</option>
                <option>인테리어 매체</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700">영상 길이</label>
            <div className="mt-1 flex gap-2">
              {(["15s", "30s", "60s"] as const).map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`flex-1 rounded-md border px-2 py-1.5 text-xs ${duration === d ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300 bg-white"}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "생성 중..." : "스토리보드 생성"}
          </button>
        </form>
      )}
    />
  );
}
