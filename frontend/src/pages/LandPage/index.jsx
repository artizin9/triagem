import { Main } from "./components/main"
import { Services } from "./components/services"
import { About } from "./components/about"
import { FQA } from "./components/fqa"

export function Landpage(){
    return (
        <div className="w-full h-full flex items-center justify-center flex-col overflow-x-hidden">
                <Main />
                <Services />
                <About />
                <FQA />
        </div>
    )
}