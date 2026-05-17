import Link from "next/link";
import { participants } from "@/data/participants";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="text-2xl font-bold tracking-tight">AI 마스터클래스 4기</h1>
      <p className="mt-2 text-sm text-neutral-600">
        참가자 12명 · 1인 1개 실제 작동 AI 앱
      </p>

      <section className="mt-10">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight">
              12개 앱 직접 사용하기
            </h2>
            <p className="mt-1 text-xs text-neutral-500">
              참가자별 업무에 맞춰 만든 실제 작동 AI 도구
            </p>
          </div>
        </div>
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {participants.map((p) => (
            <li key={p.appSlug}>
              <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-neutral-300 hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500">{p.name}</span>
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-600">
                    {p.industry}
                  </span>
                </div>
                <h3 className="mt-1 text-sm font-semibold">{p.appTitle}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-neutral-600">
                  {p.appShortDesc}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <Link
                    href={`/participants/${p.id}`}
                    className="text-[11px] text-neutral-500 hover:underline"
                  >
                    참가자 정보
                  </Link>
                  <Link
                    href={`/apps/${p.appSlug}`}
                    className="rounded-md bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white hover:bg-neutral-800"
                  >
                    시작 →
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-bold tracking-tight">참가자 정보</h2>
        <p className="mt-1 text-xs text-neutral-500">상세 카드 클릭 시 프로필</p>
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {participants.map((p) => (
            <li key={p.id}>
              <Link
                href={`/participants/${p.id}`}
                className="block rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-neutral-300 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold">{p.name}</span>
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-600">
                    {p.level}
                  </span>
                </div>
                <div className="mt-1 text-xs text-neutral-500">
                  {p.company} · {p.role}
                </div>
                <div className="mt-2 text-xs text-neutral-600">{p.industry}</div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
