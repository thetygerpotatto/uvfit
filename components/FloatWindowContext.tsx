import { createContext, useContext, useState } from "react";

const WindowInfo = createContext(null)

export function WindowContext({children}: any) {
    const [showWindow, setShowWindow] = useState(false)

    return (
        <WindowInfo value={{showWindow, setShowWindow}}> 
            {children} 
        </WindowInfo>
    )
}

export function useWindowContext(){
    return useContext(WindowInfo)
}
