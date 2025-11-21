import { View } from "react-native"
import React from "react"
import { RadarChart } from '@salmonco/react-native-radar-chart'
import { PasionColor } from "@/scripts/PasionColors";


export default function RadarGraph({ data }: {data: any[]}) {
    return (
        <RadarChart
            data={data}
            maxValue={100}
            gradientColor={{
                startColor: '#FF9432',
                endColor: '#FFF8F1',
                count: 5,
            }}
            stroke={['#FFE8D3', '#FFE8D3', '#FFE8D3', '#FFE8D3', '#ff9532']}
            strokeWidth={[0.5, 0.5, 0.5, 0.5, 1]}
            strokeOpacity={[1, 1, 1, 1, 0.13]}
            labelColor={PasionColor.BlancoPasion}
            dataFillColor="#FF9432"
            dataFillOpacity={0.8}
            dataStroke="salmon"
            dataStrokeWidth={2}
        />
    );
}
