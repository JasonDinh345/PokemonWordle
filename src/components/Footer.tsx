"use client"
import { useState } from "react"
import Popup from "./Popup"

export default function Footer(){
    const [visible, setVisible] = useState(false)
    return(
        <footer className="w-full h-12 bg-stone-600 flex justify-center items-center">
            <p className="text-white cursor-pointer">
                <span onClick={()=>setVisible(true)}>How to Play</span> |  
                <a href="https://github.com/JasonDinh345" target="_blank" rel="noopener noreferrer"> GitHub</a></p>
            {visible && 
                <Popup isShown={visible} setIsShownAction={setVisible}>
                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold text-3xl self-center">How To Play!</h1>
                        <ul className="list-disc pl-6 flex flex-col gap-2">
                            <li>Choose from one to multiple generations to play from</li>
                            <li>Using the search bar, attempt to guess the hidden Pokemon</li>
                            <li>For each guess, a color/symbol will appear under each field hinting the correct Pokemon: </li>
                            <ul className="list-disc pl-6">
                                <li><span className="text-green-400 font-bold">Green</span>: This field matches the hidden Pokemon</li>
                                <li ><span className="text-red-400 font-bold">Red</span>: This field doesn&apos;t match the hidden Pokemon </li>
                                <li>▲ : The hidden Pokemon&apos;s value in this field is higher than this field</li>
                                <li>▼ : The hidden Pokemon&apos;s value in this field is lower than this field</li>
                            </ul>
                            <li>Once you guess the correct Pokemon, you can play again with new or the same settings!</li>
                        </ul>
                        <p>*All data is provided by <a href="https://pokeapi.co/" className="underline text-red-400">PokéAPI</a>, some fields could be subjective</p>
                    </div>
                </Popup>
            }
        </footer>
    )
}