"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "instructor_mode";
const EVENT_NAME = "instructor-mode-change";

export function readInstructorMode(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

export function setInstructorMode(enabled: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, enabled ? "true" : "false");
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: enabled }));
}

export function toggleInstructorMode(): boolean {
  const next = !readInstructorMode();
  setInstructorMode(next);
  return next;
}

export function useInstructorMode(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(readInstructorMode());

    const onChange = (e: Event) => {
      const ce = e as CustomEvent<boolean>;
      setEnabled(typeof ce.detail === "boolean" ? ce.detail : readInstructorMode());
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setEnabled(readInstructorMode());
    };

    window.addEventListener(EVENT_NAME, onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENT_NAME, onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return enabled;
}
