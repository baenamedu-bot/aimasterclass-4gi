"use client";

import { useInstructorMode } from "@/lib/instructorMode";
import { getInstructorNoteById } from "@/data/instructor-notes";

export default function InstructorNotesCard({
  participantId,
}: {
  participantId: string;
}) {
  const instructorMode = useInstructorMode();
  if (!instructorMode) return null;

  const note = getInstructorNoteById(participantId);
  if (!note) return null;

  return (
    <section className="mt-8 rounded-xl border border-amber-200 bg-amber-50/60 p-5">
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex h-5 items-center rounded-full bg-amber-500 px-2 text-[10px] font-semibold tracking-wide text-white">
          INSTRUCTOR ONLY
        </span>
        <h3 className="text-sm font-semibold text-amber-900">강사용 메모</h3>
      </div>
      <p className="whitespace-pre-line text-sm leading-relaxed text-amber-950/90">
        {note.note}
      </p>
    </section>
  );
}
