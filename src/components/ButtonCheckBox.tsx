"use client"
import { useState } from "react"

type ButtonCheckBoxType = {
    onClickAction:(checked: boolean)=> void
    label: string
    isChecked: boolean
}
export default function ButtonCheckBox({onClickAction, label, isChecked}:ButtonCheckBoxType){
    
    const handleOnClick = ()=>{
    
        
        onClickAction(!isChecked)
    }
    return(
        <button className={`px-2 py-4 cursor-pointer border-black border-2 rounded-4xl w-30  ${isChecked ? "bg-red-300 font-bold shadow-[4px_5px_3px_gray]": "bg-stone-400"} transition-all ease-in-out duration-150`} onClick={handleOnClick}>{label}</button>
    )
}