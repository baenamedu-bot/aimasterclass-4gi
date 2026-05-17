import Link from "next/link";
import { participants } from "@/data/participants";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="text-2xl font-bold tracking-tight">참가자</h1>
      <p className="mt-2 text-sm text-neutral-600">
        총 {participants.length}명 · 클릭하여 상세 보기
      </p>

      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
    </div>
  );
}
