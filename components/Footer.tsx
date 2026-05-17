"use client";

import { useRef, useState } from "react";
import {
  readInstructorMode,
  setInstructorMode,
} from "@/lib/instructorMode";

const CLICK_THRESHOLD = 5;
const RESET_WINDOW_MS = 2000;

export default function Footer() {
  const [flash, setFlash] = useState<null | "on" | "off">(null);
  const countRef = useRef(0);
  const lastClickRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDotClick = () => {
    const now = Date.now();
    if (now - lastClickRef.current > RESET_WINDOW_MS) {
      countRef.current = 0;
    }
    lastClickRef.current = now;
    countRef.current += 1;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      countRef.current = 0;
    }, RESET_WINDOW_MS);

    if (countRef.current >= CLICK_THRESHOLD) {
      countRef.current = 0;
      const next = !readInstructorMode();
      setInstructorMode(next);
      setFlash(next ? "on" : "off");
      setTimeout(() => setFlash(null), 1500);
    }
  };

  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-6 text-xs text-neutral-500">
        <span>© 2026 AI 마스터클래스 4기</span>
        <div className="flex items-center gap-2">
          {flash && (
            <span
              className={`text-[11px] font-medium ${
                flash === "on" ? "text-amber-600" : "text-neutral-400"
              }`}
            >
              {flash === "on" ? "강사 모드 ON" : "강사 모드 OFF"}
            </span>
          )}
          <button
            type="button"
            aria-label="dot"
            onClick={handleDotClick}
            className="h-2 w-2 rounded-full bg-neutral-300 hover:bg-neutral-400 focus:outline-none"
          />
        </div>
      </div>
    </footer>
  );
}
