"use client";

import Link from "next/link";
import { useInstructorMode } from "@/lib/instructorMode";

export default function Header() {
  const instructorMode = useInstructorMode();

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-base font-semibold tracking-tight">
            AI 마스터클래스 · 4기
          </span>
        </Link>

        {instructorMode && (
          <span
            className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-200"
            title="강사 모드가 활성화되어 있습니다"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            강사 모드
          </span>
        )}
      </div>
    </header>
  );
}
