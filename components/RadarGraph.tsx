import React from "react"
import { RadarChart } from '@salmonco/react-native-radar-chart'
import { PasionColor } from "@/scripts/PasionColors";


export default function RadarGraph({ data }: {data: any[]}) {
    return (
        <RadarChart
            data={data}
            maxValue={100}
            gradientColor={{
                startColor: PasionColor.AzulPasion,
                endColor: PasionColor.AzulFondoPasion,
                count: 5,
            }}
            stroke={[PasionColor.GrisPasion]}
            strokeWidth={[0.5, 0.5, 0.5, 0.5, 1]}
            strokeOpacity={[1, 1, 1, 1, 0.13]}
            labelColor={PasionColor.BlancoPasion}
            dataFillColor={PasionColor.BlancoPasion}
            dataFillOpacity={0.8}
            dataStroke={PasionColor.GrisClaroPasion}
            dataStrokeWidth={2}
        />
    );
}
