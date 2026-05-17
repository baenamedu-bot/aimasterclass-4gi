"use client";

import { useRef } from "react";
import Papa from "papaparse";

export type CsvData = {
  fileName: string;
  headers: string[];
  rows: Record<string, string>[];
};

type Props = {
  onParsed: (data: CsvData) => void;
  label?: string;
  optional?: boolean;
};

export default function CsvUploader({ onParsed, label, optional }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        onParsed({
          fileName: file.name,
          headers: result.meta.fields ?? [],
          rows: result.data,
        });
      },
    });
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-xs font-medium text-neutral-700">
        {label ?? "CSV 파일"}{" "}
        <span className="text-neutral-400">
          {optional ? "(선택)" : "(필수)"}
        </span>
      </label>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        onChange={handleFile}
        className="mt-2 block w-full cursor-pointer rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-neutral-100 file:px-2 file:py-1 file:text-xs"
      />
    </div>
  );
}
