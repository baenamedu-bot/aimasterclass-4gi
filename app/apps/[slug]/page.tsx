import { notFound } from "next/navigation";
import { participants } from "@/data/participants";
import ChoiWoonhyungApp from "@/components/apps/ChoiWoonhyungApp";
import MinKyungjinApp from "@/components/apps/MinKyungjinApp";
import ParkJiminApp from "@/components/apps/ParkJiminApp";
import SeoJunghwaApp from "@/components/apps/SeoJunghwaApp";
import OhSehyunApp from "@/components/apps/OhSehyunApp";
import UhMyungjunApp from "@/components/apps/UhMyungjunApp";
import ParkMinjuApp from "@/components/apps/ParkMinjuApp";
import ParkKijuApp from "@/components/apps/ParkKijuApp";
import ChoiWooseopApp from "@/components/apps/ChoiWooseopApp";
import SeoHyunApp from "@/components/apps/SeoHyunApp";
import LeeJongminApp from "@/components/apps/LeeJongminApp";
import KiMinwooApp from "@/components/apps/KiMinwooApp";

export function generateStaticParams() {
  return participants.map((p) => ({ slug: p.appSlug }));
}

const APPS: Record<string, React.ComponentType> = {
  "choi-woonhyung": ChoiWoonhyungApp,
  "min-kyungjin": MinKyungjinApp,
  "park-jimin": ParkJiminApp,
  "seo-junghwa": SeoJunghwaApp,
  "oh-sehyun": OhSehyunApp,
  "uh-myungjun": UhMyungjunApp,
  "park-minju": ParkMinjuApp,
  "park-kiju": ParkKijuApp,
  "choi-wooseop": ChoiWooseopApp,
  "seo-hyun": SeoHyunApp,
  "lee-jongmin": LeeJongminApp,
  "ki-minwoo": KiMinwooApp,
};

export default async function AppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const App = APPS[slug];
  if (!App) notFound();
  return <App />;
}
