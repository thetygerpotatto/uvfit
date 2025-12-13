import { PasionColor } from '@/scripts/PasionColors';
import { View, Text, StyleSheet } from 'react-native';
import RadarGraph from '@/components/RadarGraph';
import { useSQLiteContext } from 'expo-sqlite';
import DayWidget from '@/components/DayWidget';
import { useEffect, useState } from 'react';
import { useDayContex } from '@/components/DayContext';
import useHealthConnect from '@/hooks/useHealthConnect';
import { Label } from '@react-navigation/elements';

interface radarEntry {
    label: string
    value: any
}
export default function DetailsScreen() {
    const db = useSQLiteContext();
    const [data, setData] = useState<radarEntry[]>([])
    const {currentDay}: any = useDayContex()
    const {
        getSteps,
        getHeartRate,
        getLatestHeartRate,
        getCalories,
        getSleep,
    } = useHealthConnect()

    const getData = async () => {
        const data: radarEntry[] = []
        const today = new Date()
        const startDate = new Date(currentDay)
        startDate.setHours(0,0,0,0)
        const endDate = new Date(currentDay)
        endDate.setHours(23,59,59,999)
        
        const weight: Number | string = db.getFirstSync("SELECT weight FROM user_data").weight
        const steps = await getSteps(startDate, endDate)
        const calories = (await getCalories(startDate, endDate)).toFixed()
        
        const hr_records = await getHeartRate(startDate, endDate)

        const avgHR = (hr_records.length !== 0) 
            ? (hr_records.map((record) => record.bpm).reduce((sum, bpm) => {
                return bpm + sum
            }) / hr_records.length).toFixed()
            : 0


        const heartRate =  currentDay >= today
            ? await getLatestHeartRate()
            : avgHR

        const sleep_records = await getSleep(startDate, endDate).then(result => result.records)
        let sleep = 0; 

        if (sleep_records.length !== 0) {
            const d2 = new Date(sleep_records[0].endTime) 
            const d1 = new Date(sleep_records[0].startTime) 
            sleep = (d2.getTime() - d1.getTime()) / (1000 * 60 * 60) 
        } 



        setData([
            {label: "Weight", value: weight}, 
            {label: "Steps", value: steps / 100}, 
            {label: "Calories", value: (Number(calories) / 20)}, 
            {label: "Heart Rate", value: Number(heartRate) / 2}, 
            {label: "Sleep", value: sleep * 12.4}])
    }
    
    useEffect(() => {
        getData()
    }, [currentDay])

    return (
        <View style={styles.container}>
        <DayWidget></DayWidget>
        <View style={styles.separator}></View>
            <View style={styles.infoContainer}> 
                <RadarGraph data={data}></RadarGraph>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: PasionColor.NegroPasion,
    padding: 20,
    paddingBottom: "33%"
  },
  infoContainer: {
    flex: 1,
    position: "relative",
    justifyContent: 'center',

    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: PasionColor.NegroPasion,
    borderWidth: 1,
    borderColor: PasionColor.GrisPasion,
  },
  text: {
    color: PasionColor.BlancoPasion,
  },
  separator: {
      flexDirection: "row",
      borderTopWidth: 1,
      borderColor: PasionColor.GrisPasion,
      marginBottom: 5
  }
});
