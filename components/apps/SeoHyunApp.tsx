"use client";

import { useState } from "react";
import AppShell from "@/components/app-shell/AppShell";
import ImageUploader from "@/components/app-shell/ImageUploader";
import { fileToBase64 } from "@/lib/gemini-client";
import { systemPrompt } from "@/lib/apps/prompts/seo-hyun";

export default function SeoHyunApp() {
  const [files, setFiles] = useState<File[]>([]);
  const [brand, setBrand] = useState("Timberwise");
  const [product, setProduct] = useState("오크");
  const [finish, setFinish] = useState<"오일" | "우레탄">("오일");
  const [area, setArea] = useState("33평");
  const [space, setSpace] = useState("거실");

  return (
    <AppShell
      participantId="seo-hyun"
      title="원목마루 SNS 콘텐츠 자동 생성"
      subtitle="시공 사진 1~3장과 브랜드 정보로 인스타·블로그·해시태그·다음 콘텐츠 제안까지 한 번에."
      domainTag="콘텐츠 / 마케팅"
      form={({ submit, loading }) => (
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (files.length === 0) {
              alert("시공 사진을 1장 이상 업로드해주세요.");
              return;
            }
            const images = await Promise.all(files.map(fileToBase64));
            const userText = `브랜드: ${brand}\n제품: ${product}\n마감: ${finish}\n시공 평수: ${area}\n공간: ${space}\n\n첨부된 시공 사진 ${files.length}장의 텍스처·색감·빛을 캡션에 반영하세요.`;
            await submit({ systemPrompt, userText, images });
          }}
        >
          <ImageUploader files={files} onChange={setFiles} maxFiles={3} label="시공 사진" required />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700">브랜드</label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Timberwise / Foglie d'Oro / 기타"
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">제품</label>
              <input
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="오크 / 월넛 / 헤링본"
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">마감</label>
              <select
                value={finish}
                onChange={(e) => setFinish(e.target.value as typeof finish)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              >
                <option>오일</option>
                <option>우레탄</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700">시공 평수</label>
              <input
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700">공간</label>
            <input
              value={space}
              onChange={(e) => setSpace(e.target.value)}
              placeholder="거실 / 안방 / 카페 / 라운지"
              className="mt-1 w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "작성 중..." : "콘텐츠 4종 생성"}
          </button>
        </form>
      )}
    />
  );
}
