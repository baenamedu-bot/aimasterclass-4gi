"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import ApiKeyModal from "./ApiKeyModal";
import ResultMarkdown from "./ResultMarkdown";
import {
  callGemini,
  getApiKey,
  onApiKeyChange,
  type GeminiImage,
} from "@/lib/gemini-client";
import { participants } from "@/data/participants";

export type GenerateInput = {
  systemPrompt: string;
  userText: string;
  images?: GeminiImage[];
};

type Props = {
  participantId: string;
  title: string;
  subtitle: string;
  domainTag: string;
  privacyBanner?: string;
  form: (api: {
    submit: (input: GenerateInput) => Promise<void>;
    loading: boolean;
  }) => React.ReactNode;
  resultExtra?: (result: string) => React.ReactNode;
};

export default function AppShell({
  participantId,
  title,
  subtitle,
  domainTag,
  privacyBanner,
  form,
  resultExtra,
}: Props) {
  const [keyOpen, setKeyOpen] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [lastInput, setLastInput] = useState<GenerateInput | null>(null);

  useEffect(() => {
    setHasKey(!!getApiKey());
    const off = onApiKeyChange(() => setHasKey(!!getApiKey()));
    return () => off();
  }, []);

  const participant = participants.find((p) => p.id === participantId);
  const otherApps = participants.filter((p) => p.id !== participantId);

  const submit = async (input: GenerateInput) => {
    if (!getApiKey()) {
      setKeyOpen(true);
      toast.info("Gemini API 키를 먼저 입력해주세요.");
      return;
    }
    setLastInput(input);
    setLoading(true);
    try {
      const text = await callGemini(input);
      setResult(text);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.startsWith("API_KEY_INVALID") || msg === "NO_API_KEY") {
        toast.error("API 키가 유효하지 않습니다. 다시 입력해주세요.");
        setKeyOpen(true);
      } else if (msg.startsWith("HTTP_429")) {
        toast.error("호출 한도를 초과했습니다. 잠시 후 다시 시도해주세요.");
      } else {
        toast.error(`생성 실패: ${msg.slice(0, 100)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const regenerate = () => {
    if (lastInput) void submit(lastInput);
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <ApiKeyModal open={keyOpen} onClose={() => setKeyOpen(false)} />

      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-[10px] font-medium text-white">
                  {participant?.name ?? "참가자"}
                </span>
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-700">
                  {domainTag}
                </span>
              </div>
              <h1 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
                {title}
              </h1>
              <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                aria-label="설정"
                onClick={() => setKeyOpen(true)}
                className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs hover:bg-neutral-50"
                title="API 키 설정"
              >
                ⚙️
              </button>
              <Link
                href={`/participants/${participantId}`}
                aria-label="참가자 정보"
                className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs hover:bg-neutral-50"
                title="참가자 정보"
              >
                ⓘ
              </Link>
            </div>
          </div>

          {!hasKey && (
            <div className="mt-3 flex items-center justify-between rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800 ring-1 ring-amber-200">
              <span>Gemini API 키가 설정되지 않았습니다.</span>
              <button
                type="button"
                onClick={() => setKeyOpen(true)}
                className="rounded bg-amber-600 px-2 py-0.5 text-white"
              >
                키 입력
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-yellow-50/60 border-b border-yellow-200">
        <div className="mx-auto max-w-6xl px-5 py-2 text-[11px] text-yellow-800">
          ⚠️ AI 생성 결과는 참고용입니다. 실무 적용 전 검토가 필요합니다.
        </div>
      </div>

      {privacyBanner && (
        <div className="bg-emerald-50/70 border-b border-emerald-200">
          <div className="mx-auto max-w-6xl px-5 py-2 text-[11px] text-emerald-800">
            🔒 {privacyBanner}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-5 py-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl border border-neutral-200 bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold text-neutral-800">입력</h2>
            {form({ submit, loading })}
          </section>

          <section className="rounded-xl border border-neutral-200 bg-white p-5 min-h-[300px]">
            <h2 className="mb-4 text-sm font-semibold text-neutral-800">결과</h2>
            <ResultMarkdown
              markdown={result}
              loading={loading}
              onRegenerate={lastInput ? regenerate : undefined}
            />
            {result && resultExtra && resultExtra(result)}
          </section>
        </div>

        <div className="mt-10 rounded-xl border border-neutral-200 bg-white p-5">
          <p className="text-xs text-neutral-600">
            이 앱은 <b>{participant?.name}</b>님 업무용으로 기획되었습니다.
          </p>
          <details className="mt-3">
            <summary className="cursor-pointer text-xs text-neutral-500">
              다른 참가자 앱 보기 →
            </summary>
            <ul className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {otherApps.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/apps/${p.id}`}
                    className="block rounded-md border border-neutral-200 px-2 py-1.5 text-xs hover:bg-neutral-50"
                  >
                    <span className="font-medium">{p.name}</span>
                    <span className="ml-1 text-neutral-500">
                      · {p.appTitle ?? "앱"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </>
  );
}
