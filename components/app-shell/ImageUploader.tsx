"use client";

import { useRef } from "react";

type Props = {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  label?: string;
  required?: boolean;
};

export default function ImageUploader({
  files,
  onChange,
  maxFiles = 5,
  label = "이미지 업로드",
  required,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(e.target.files ?? []);
    if (!incoming.length) return;
    const combined = [...files, ...incoming].slice(0, maxFiles);
    onChange(combined);
    if (inputRef.current) inputRef.current.value = "";
  };

  const remove = (idx: number) => {
    onChange(files.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label className="block text-xs font-medium text-neutral-700">
        {label}{" "}
        <span className="text-neutral-400">
          (최대 {maxFiles}장{required ? ", 필수" : ""})
        </span>
      </label>
      <div className="mt-2 flex flex-wrap gap-2">
        {files.map((file, idx) => {
          const url = URL.createObjectURL(file);
          return (
            <div
              key={idx}
              className="group relative h-20 w-20 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt=""
                className="h-full w-full object-cover"
                onLoad={() => URL.revokeObjectURL(url)}
              />
              <button
                type="button"
                onClick={() => remove(idx)}
                className="absolute right-1 top-1 rounded bg-black/60 px-1.5 text-[10px] text-white opacity-0 transition group-hover:opacity-100"
              >
                ×
              </button>
            </div>
          );
        })}
        {files.length < maxFiles && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-20 w-20 items-center justify-center rounded-lg border border-dashed border-neutral-300 text-xs text-neutral-500 hover:bg-neutral-50"
          >
            + 사진
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleSelect}
        className="hidden"
      />
    </div>
  );
}
