import { ReactNode } from "react";

export default function FullBanner({ children, className }: { children: ReactNode, className?:string }) {
  return (
    <div className={`w-full h-96 flex flex-col items-center justify-center ${className ? className : ""}`}>
        {children}
    </div>
  );
}