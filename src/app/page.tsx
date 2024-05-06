import { InfoScreen } from "@/components/InfoScreen";
import { Nav } from "@/components/Nav";
import { SpaceKanban } from "@/components/SpaceKanban";

export default function Home() {
  return (
    <main className="bg-primary h-full flex">
      <InfoScreen />
      <Nav />
      <SpaceKanban />
    </main>
  );
}
