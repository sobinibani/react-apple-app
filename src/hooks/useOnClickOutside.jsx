import { useEffect } from "react";

export default function useOneClickOutSide(ref, handler){
    useEffect(()=>{
        const listner = (event) => {
            if(!ref.current || ref.current.contains(event.target)){
                return;
            }
            handler();
        }
        document.addEventListener("mousedown", listner);
        return()=>{
            document.removeEventListener("mousedown", listner)
        }
    }, [ref, handler])
}