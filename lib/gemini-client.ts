"use client";

const API_KEY_STORAGE = "gemini_api_key";
const KEY_EVENT = "gemini-key-change";
const MODEL = "gemini-2.5-flash";

export type GeminiImage = { mimeType: string; base64: string };

export function getApiKey(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(API_KEY_STORAGE);
}

export function setApiKey(key: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(API_KEY_STORAGE, key);
  window.dispatchEvent(new CustomEvent(KEY_EVENT, { detail: key }));
}

export function clearApiKey() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(API_KEY_STORAGE);
  window.dispatchEvent(new CustomEvent(KEY_EVENT, { detail: null }));
}

export function onApiKeyChange(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(KEY_EVENT, cb);
  return () => window.removeEventListener(KEY_EVENT, cb);
}

type Part =
  | { text: string }
  | { inlineData: { mimeType: string; data: string } };

export async function callGemini(params: {
  systemPrompt: string;
  userText: string;
  images?: GeminiImage[];
  apiKey?: string;
}): Promise<string> {
  const key = params.apiKey ?? getApiKey();
  if (!key) throw new Error("NO_API_KEY");

  const parts: Part[] = [{ text: params.userText }];
  if (params.images?.length) {
    for (const img of params.images) {
      parts.push({
        inlineData: { mimeType: img.mimeType, data: img.base64 },
      });
    }
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(
    key,
  )}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: params.systemPrompt }] },
      contents: [{ role: "user", parts }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    if (res.status === 400 || res.status === 401 || res.status === 403) {
      throw new Error(`API_KEY_INVALID:${res.status}:${body.slice(0, 200)}`);
    }
    throw new Error(`HTTP_${res.status}:${body.slice(0, 200)}`);
  }

  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text ?? "")
      .join("") ?? "";

  if (!text) throw new Error("EMPTY_RESPONSE");
  return text;
}

export async function fileToBase64(file: File): Promise<GeminiImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1] ?? "";
      resolve({ mimeType: file.type || "image/jpeg", base64 });
    };
    reader.readAsDataURL(file);
  });
}
