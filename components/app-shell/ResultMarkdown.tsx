"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  markdown: string;
  onRegenerate?: () => void;
  loading?: boolean;
};

export default function ResultMarkdown({
  markdown,
  onRegenerate,
  loading,
}: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="h-5 w-2/3 animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
        <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-neutral-200" />
      </div>
    );
  }

  if (!markdown) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center text-sm text-neutral-500">
        왼쪽 입력란을 채운 뒤 <b>생성</b> 버튼을 누르면 결과가 표시됩니다.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={copy}
          className="rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-xs hover:bg-neutral-50"
        >
          {copied ? "복사됨" : "복사"}
        </button>
        {onRegenerate && (
          <button
            type="button"
            onClick={onRegenerate}
            className="rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-xs hover:bg-neutral-50"
          >
            다시 생성
          </button>
        )}
      </div>
      <article className="prose prose-neutral prose-sm max-w-none prose-headings:mt-5 prose-headings:mb-2 prose-h2:text-base prose-h2:font-semibold prose-h3:text-sm prose-p:my-2 prose-table:text-xs prose-th:bg-neutral-100 prose-th:p-2 prose-td:p-2 prose-th:border prose-td:border prose-th:border-neutral-200 prose-td:border-neutral-200">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </article>
    </div>
  );
}
