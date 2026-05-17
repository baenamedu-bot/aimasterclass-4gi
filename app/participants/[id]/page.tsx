import Link from "next/link";
import { notFound } from "next/navigation";
import { participants, getParticipantById } from "@/data/participants";
import InstructorNotesCard from "@/components/InstructorNotesCard";

export function generateStaticParams() {
  return participants.map((p) => ({ id: p.id }));
}

type Props = { params: Promise<{ id: string }> };

export default async function ParticipantDetailPage({ params }: Props) {
  const { id } = await params;
  const participant = getParticipantById(id);
  if (!participant) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <Link href="/" className="text-xs text-neutral-500 hover:text-neutral-700">
        ← 참가자 목록
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{participant.name}</h1>
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700">
          {participant.level}
        </span>
      </div>
      <p className="mt-1 text-sm text-neutral-600">
        {participant.company} · {participant.role} · {participant.industry}
      </p>

      <Link
        href={`/apps/${participant.appSlug}`}
        className="mt-6 flex items-center justify-between rounded-xl bg-neutral-900 px-5 py-4 text-white transition hover:bg-neutral-800"
      >
        <div>
          <div className="text-[11px] text-neutral-300">{participant.name}님 전용 AI 도구</div>
          <div className="mt-0.5 text-base font-semibold">
            {participant.appTitle}
          </div>
          <div className="mt-1 text-xs text-neutral-300">
            {participant.appShortDesc}
          </div>
        </div>
        <span className="ml-3 shrink-0 text-sm font-medium">이 앱 직접 사용해보기 →</span>
      </Link>

      <section className="mt-8 rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-neutral-800">학습 목표</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700">
          {participant.goals.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-neutral-800">현재 경험</h2>
        <p className="mt-2 text-sm text-neutral-700">{participant.experience}</p>
      </section>

      <section className="mt-4 rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-neutral-800">관심 영역</h2>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {participant.interests.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <InstructorNotesCard participantId={participant.id} />

      <Link
        href={`/apps/${participant.appSlug}`}
        className="mt-8 block rounded-xl border border-neutral-900 bg-white px-5 py-4 text-center text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
      >
        이 앱 직접 사용해보기 →
      </Link>
    </div>
  );
}
