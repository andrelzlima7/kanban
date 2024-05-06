import { Codesandbox, Figma, SquareDashedKanban, Swords } from "lucide-react";
import { ThemeToggle } from "./theme/ThemeToggle";
import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="py-8 ml-9  text-secondary font-bold hidden md:flex flex-col justify-between">
      <div className="flex flex-col gap-10">
        <div className="flex justify-center">
          <SquareDashedKanban size={50} className="text-secondary" />
        </div>
        <div className="flex">
          <span className="flex items-center">
            <ThemeToggle />
            Theme
          </span>
        </div>
      </div>
      <div>
        <span className="flex gap-1 items-center">
          <Codesandbox />
          Projeto
        </span>
        <ul className="ml-4 flex flex-col gap-3 mt-4">
          <li>
            <Link
              className="flex"
              target="_blank"
              href={"https://www.figma.com/community/file/1220368226816658013"}>
              <span>
                <Figma />
              </span>
              Figma
            </Link>
          </li>
          <li>
            <Link
              className="flex"
              target="_blank"
              href={"https://www.rocketseat.com.br/boracodar"}>
              <span>
                <Swords />
              </span>
              #BoraCodar
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
