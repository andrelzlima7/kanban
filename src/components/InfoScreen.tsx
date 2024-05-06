import { SquareDashedKanban } from "lucide-react"

export const InfoScreen = () => {
    return(
        <div className="bg-secondary my-auto mx-4 rounded-xl p-4 md:hidden">
            <SquareDashedKanban size={50} className="text-primary m-auto" />
            <p className="mt-8 text-justify">Olá, para que sejá possivel aproveitar melhor esta aplicação, utilize a mesma em um dispositivo com um display maior, exemplos: tablets, notebooks, ou desktops. Que tenham no mmínimo 768px de largura. </p>
        </div>
    )
}