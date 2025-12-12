import { PasionColor } from '@/scripts/PasionColors';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import DayWidget from '@/components/DayWidget';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useDayContex } from '@/components/DayContext';
import { useSQLiteContext } from 'expo-sqlite';
import useHealthConnect from '@/hooks/useHealthConnect';

interface SleepRecord {
    timestamp_start: string
    timestamp_end: string
}

export default function DetailsScreen() {
    const {
        isAvailable,
        isInitialized,
        getSleep
    } = useHealthConnect()

    const router = useRouter();
    const db = useSQLiteContext();
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);
    const [sleepData, setSleepData] = useState<SleepRecord[]>([])
    const {currentDay}: any = useDayContex()

    const addNewSleep = () => {
        router.push("/SleepDaylyForm");
    }

    const getSleepData = async () => {
        const startDate = new Date(currentDay)
        startDate.setHours(0,0,0,0)
        const endDate = new Date(currentDay)
        endDate.setHours(23,59,59,999)
        const hc_result = await getSleep(startDate, endDate).then(result => result.records)
        const db_result = await db.getAllAsync(`
                                         SELECT timestamp_start, timestamp_end
                                         FROM metrics
                                         WHERE metric_type = "sleep" AND
                                            (timestamp_start >= ? 
                                                AND timestamp_start <= ? ) 
                                             OR (timestamp_end >= ? 
                                                AND timestamp_end <= ? );`,

                                        [startDate.toISOString(),
                                         endDate.toISOString(),
                                         startDate.toISOString(),
                                         endDate.toISOString()]
                                        );
        if (db_result.length === 0 && hc_result.length == 0) {
            setIsEmpty(true)
        } else {
            setIsEmpty(false)
        }
        

        const db_records = db_result.map((r) => {
            return r as SleepRecord
        })
        const hc_records = hc_result.length
            ? hc_result.map((record: any) => {
                return {timestamp_start: record.startTime, timestamp_end: record.endTime} as SleepRecord
            })
            : []
        const records = [...db_records, ...hc_records]

        setSleepData(records)

        setIsLoading(false)

    }

    useEffect(() => {
        getSleepData()   
    }, [currentDay])

    return (
        <View style={styles.container}>
            <DayWidget/>
            <View style={styles.separator}></View>
            <View style={styles.infoContainer}> 

                <Text style={styles.text}>Sleep</Text>

                {isLoading && (<Text style={styles.text}>Loading food info</Text>)}

                { !isEmpty && !isLoading && (<FlatList 
                        data={sleepData}
                        renderItem = {({item}) => {
                            console.log(item)
                            const dateStart = new Date(item.timestamp_start)
                            const dateEnd = new Date(item.timestamp_end)
                            
                            return (<SleepItem start={dateStart} end={dateEnd}/>)
                        }}
                />)}
                {isEmpty && (<Text style={styles.text}>No records</Text>)}

                <TouchableOpacity style={styles.plusContainer}
                                    onPress={addNewSleep}>
                    <Image source={require("../../assets/images/plusButton.png")}
                            style={styles.plusLogo}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

interface SleepDates {
    start: Date
    end: Date
}

function SleepItem({start, end}: SleepDates) {
    const startHour = start.toLocaleString().substring(12,24)
    const endHour = end.toLocaleString().substring(12,24)
    const hours = ((end.getTime() - start.getTime()) / (1000 * 60 * 60)).toFixed(2)
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTextTitle}>{startHour} - {endHour}</Text>
            <Text style={styles.itemText}> {hours}h</Text>
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
    alignItems: 'flex-start',
    backgroundColor: PasionColor.AzulFondoPasion,
    borderWidth: 1,
    borderColor: PasionColor.GrisPasion,
  },
  itemContainer: {
    justifyContent: 'center',
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "5%",
    marginBottom: "1%",
  },
  text: {
    alignItems: "center",
    marginHorizontal: "auto",
    color: PasionColor.AzulPasion,
    fontSize: 35,
    fontWeight: "bold",
  },
  itemText: {
    color: PasionColor.AzulPasion,
    fontSize: 16,
    fontWeight: 400,
  },
  itemTextTitle: {
    color: PasionColor.AzulPasion,
    fontSize: 24,
    fontWeight: "bold",
  },
  separator: {
      flexDirection: "row",
      borderTopWidth: 1,
      borderColor: PasionColor.GrisPasion,
      marginBottom: 5
  },
  plusLogo: {
      height: 50,
      width: 50,
      tintColor: PasionColor.AzulPasion
  },
  plusContainer: {
      display: "flex",
      flexDirection: "row",
      margin: 15,
      marginTop: "auto",
      marginLeft: "auto",
  }
});
