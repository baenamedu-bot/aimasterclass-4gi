"use client";

import { useEffect, useState } from "react";
import { getApiKey, setApiKey, clearApiKey } from "@/lib/gemini-client";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ApiKeyModal({ open, onClose }: Props) {
  const [value, setValue] = useState("");
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    if (open) {
      setValue(getApiKey() ?? "");
      setHasKey(!!getApiKey());
    }
  }, [open]);

  if (!open) return null;

  const save = () => {
    if (!value.trim()) return;
    setApiKey(value.trim());
    onClose();
  };

  const remove = () => {
    clearApiKey();
    setValue("");
    setHasKey(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">Gemini API 키</h2>
        <p className="mt-1 text-xs text-neutral-500">
          키는 브라우저(localStorage)에만 저장됩니다. 서버로 전송되지 않습니다.
          <br />
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Google AI Studio에서 키 발급 →
          </a>
        </p>

        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="AIza..."
          className="mt-4 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
        />

        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={remove}
            className="text-xs text-neutral-500 underline-offset-2 hover:underline disabled:opacity-40"
            disabled={!hasKey}
          >
            저장된 키 삭제
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm hover:bg-neutral-50"
            >
              취소
            </button>
            <button
              type="button"
              onClick={save}
              disabled={!value.trim()}
              className="rounded-lg bg-neutral-900 px-3 py-1.5 text-sm text-white disabled:opacity-40"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
