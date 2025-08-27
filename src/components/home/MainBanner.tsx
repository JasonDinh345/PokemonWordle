"use client";
import { useRouter } from "next/navigation";
import PlayButton from "../PlayButton";
import FullBanner from "../FullBanner";



export default function MainBanner(){
    const router = useRouter();
    return(
        <FullBanner className="bg-red-300">
            <h1 className="text-4xl font-bold">Pokédle</h1>
            <h3 className="text-2xl font-bold">Pokémon themed guessing game inspired by Wordle!</h3>
            <PlayButton className="bg-white text-xl font-bold px-16 py-4 rounded-2xl mt-8 hover:bg-stone-200"onClick={()=>router.push("/game")}>Play!</PlayButton>
        </FullBanner>
    )
}