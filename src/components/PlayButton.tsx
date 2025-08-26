type ButtonProps ={
    children: string
    onClick: ()=>void
    className: string
}
export default function PlayButton({children, onClick, className}:ButtonProps){
    return(
        <button onClick={onClick} className={className}>
            {children}
        </button>
    )
}