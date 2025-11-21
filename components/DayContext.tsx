import { createContext, useContext, useState } from "react";

const DayInfo = createContext(null)

export function DayContext({children}: any) {
    const [selectedDay, setSelectedDay] = useState(0)
    const [currentDay, setCurrentDay] = useState(new Date().getDay())

    return (
        <DayInfo value={{selectedDay, setSelectedDay, currentDay, setCurrentDay}}> 
            {children} 
        </DayInfo>
    )
}

export function useDayContex(){
    return useContext(DayInfo)

}
