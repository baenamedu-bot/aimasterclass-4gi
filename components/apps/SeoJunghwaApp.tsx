"use client";

import { useState } from "react";
import AppShell from "@/components/app-shell/AppShell";
import ImageUploader from "@/components/app-shell/ImageUploader";
import { fileToBase64 } from "@/lib/gemini-client";
import { systemPrompt } from "@/lib/apps/prompts/seo-junghwa";

type Item = {
  kind: "발코니이중창" | "단창" | "시스템창" | "방화창";
  w: string;
  h: string;
  qty: string;
  memo: string;
};

const NEW_ITEM: Item = {
  kind: "발코니이중창",
  w: "1800",
  h: "1500",
  qty: "1",
  memo: "",
};

export default function SeoJunghwaApp() {
  const [floorPlan, setFloorPlan] = useState<File[]>([]);
  const [items, setItems] = useState<Item[]>([{ ...NEW_ITEM }]);

  const update = (idx: number, patch: Partial<Item>) =>
    setItems((arr) => arr.map((it, i) => (i === idx ? { ...it, ...patch } : it)));

  return (
    <AppShell
      participantId="seo-junghwa"
      title="샷시 견적 자동 작성"
      subtitle="창호 항목을 추가하면 자재·시공·VAT가 포함된 견적서를 마크다운으로 생성합니다."
      domainTag="견적 / 창호"
      form={({ submit, loading }) => (
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const images = floorPlan.length
              ? await Promise.all(floorPlan.map(fileToBase64))
              : undefined;
            const listText = items
              .map(
                (it, i) =>
                  `[${i + 1}] ${it.kind} | ${it.w}×${it.h}mm | ${it.qty}EA | ${it.memo || "-"}`,
              )
              .join("\n");
            const userText = `창호 항목 리스트:\n${listText}\n\n${floorPlan.length ? `평면도 사진 ${floorPlan.length}장 첨부됨. 참고용으로 활용.` : "평면도 없음."}\n\n위 내용으로 견적서를 작성하세요.`;
            await submit({ systemPrompt, userText, images });
          }}
        >
          <ImageUploader
            files={floorPlan}
            onChange={setFloorPlan}
            maxFiles={1}
            label="평면도 사진"
          />
          <div className="space-y-3">
            {items.map((it, idx) => (
              <div key={idx} className="rounded-lg border border-neutral-200 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-600">항목 {idx + 1}</span>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setItems((arr) => arr.filter((_, i) => i !== idx))}
                      className="text-xs text-red-600 hover:underline"
                    >
                      삭제
                    </button>
                  )}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <select
                    value={it.kind}
                    onChange={(e) => update(idx, { kind: e.target.value as Item["kind"] })}
                    className="col-span-2 rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                  >
                    <option>발코니이중창</option>
                    <option>단창</option>
                    <option>시스템창</option>
                    <option>방화창</option>
                  </select>
                  <input
                    placeholder="가로(mm)"
                    value={it.w}
                    onChange={(e) => update(idx, { w: e.target.value })}
                    className="rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                  />
                  <input
                    placeholder="세로(mm)"
                    value={it.h}
                    onChange={(e) => update(idx, { h: e.target.value })}
                    className="rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                  />
                  <input
                    placeholder="수량"
                    value={it.qty}
                    onChange={(e) => update(idx, { qty: e.target.value })}
                    className="rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                  />
                  <input
                    placeholder="메모"
                    value={it.memo}
                    onChange={(e) => update(idx, { memo: e.target.value })}
                    className="rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setItems((arr) => [...arr, { ...NEW_ITEM }])}
              className="w-full rounded-md border border-dashed border-neutral-300 py-2 text-xs text-neutral-600 hover:bg-neutral-50"
            >
              + 창호 항목 추가
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "산정 중..." : "견적서 생성"}
          </button>
        </form>
      )}
    />
  );
}
