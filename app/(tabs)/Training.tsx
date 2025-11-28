import { PasionColor } from '@/scripts/PasionColors';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import DayWidget from '@/components/DayWidget';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useDayContex } from '@/components/DayContext';
import { useSQLiteContext } from 'expo-sqlite';

interface ActivityQueryResult {
    metadata: any
    timestamp_start: string
}

interface ActivityEntry {
  metadata: any;
  date: Date;
}
export default function DetailsScreen() {
    const router = useRouter()
    const db = useSQLiteContext()
    const [activityData, setActivityData] = useState<ActivityEntry[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const {currentDay}: any = useDayContex()

    const addNewActicity = () => {
        router.push("/ActivityForm")
    }
    
    useEffect(() => {
        getActivityData()
    }, [currentDay]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         updateAvgHR();
    //     }, 60000);
    //     return () => clearInterval(interval);
    // }, []);
    //
    // const updateAvgHR = async () => {
    //
    // }

    const getActivityData = async () => {
        const startDate = new Date(currentDay)
        startDate.setHours(0,0,0,0)
        const endDate = new Date(currentDay)
        endDate.setHours(23,59,59,999)

        const result = await db.getAllAsync(`select metadata, timestamp_start from metrics
                    where metric_type = 'training' 
                    AND timestamp_start >= ? 
                    AND timestamp_start <=  ?
                        `, [startDate.toISOString(), endDate.toISOString()]) as ActivityQueryResult[]
        const parsed = result.map((data: ActivityQueryResult) => {
            return {metadata: JSON.parse(data.metadata), date: new Date(data.timestamp_start)}
        });
        console.log(parsed);
        setActivityData(parsed)
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            <DayWidget></DayWidget>
            <View  style={styles.separator}/>
            <View style={styles.infoContainer}>
                <View style={styles.widgetContainer}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.itemText}>Average Rate</Text>
                        <Image style={styles.icons} source={require("../../assets/images/heart_icon.png")}/>
                        <Text style={styles.itemText}>3</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Text style={styles.itemText}>Calories</Text>
                        <Image style={styles.icons} source={require("../../assets/images/fire_icon.png")}/>
                        <Text style={styles.itemText}>3</Text>
                    </View>
                </View>
                <View style={styles.activityContainer}>
                    <Text style={styles.text}>Activities</Text>
                    <View style={styles.separator}/>
                    { isLoading && (<Text style={styles.text}>Loading food info</Text>)}
                    { !isLoading && (<FlatList 
                            style={{flex: 1}}
                            data={activityData}
                            renderItem = {({item}: {item: ActivityEntry}) => {
                                return(<ActivityEntry 
                                    title={item.metadata.activity}
                                    calories={item.metadata.calories}/>)
                            }}
                    />)}
                    <TouchableOpacity style={styles.plusContainer}
                                        onPress={addNewActicity}>
                        <Image source={require("../../assets/images/plusButton.png")}
                                style={styles.plusLogo}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

function ActivityEntry({title, calories}: {title: string, calories: Number}) {
    return(<View style={styles.itemContainer}>
               <Text style={styles.itemTextTitle}>{title}</Text>
               <Text style={styles.itemText}>{calories+""} Calorias</Text>
           </View>)
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
    flexDirection: "column",
    position: "relative",
    borderRadius: 20,
    alignItems: 'flex-start',
    backgroundColor: PasionColor.NaranjaFondoPasion,
    borderWidth: 0,
    borderColor: PasionColor.GrisPasion,
  },
  itemContainer: {
    // borderWidth: 1,
    // borderColor: PasionColor.BlancoPasion,
    width: "100%",
    marginLeft: "15%",
  },
  widgetContainer: {
      flexDirection: "row",
      alignSelf: "flex-start",
      alignItems: "center",
      justifyContent: "space-around",
      width: "100%",
  },
  activityContainer: {
      alignItems: "flex-start",
      flexDirection:"column",
      width: "100%",
      flex: 1,
      borderColor: PasionColor.GrisPasion,
      borderWidth: 1,
      borderRadius: 20,
  },
  iconContainer: {
      paddingTop: "5%",
      alignItems: "center",
      flex: 1,
      borderColor: PasionColor.GrisPasion,
      borderWidth: 1,
      borderRadius: 20,
  },
  text: {
    alignItems: "center",
    alignSelf: "center",
    color: PasionColor.NaranjaPasion,
    fontSize: 35,
    fontWeight: "bold",
  },
  itemText: {
    color: PasionColor.NaranjaPasion,
    fontSize: 16,
    fontWeight: 400,
  },
  itemTextTitle: {
    color: PasionColor.NaranjaPasion,
    fontSize: 24,
    fontWeight: "bold",
  },
  separator: {
      width: "100%",
      borderTopWidth: 1,
      borderColor: PasionColor.GrisPasion,
      marginBottom: 5
  },
  icons: {
      height: 150,
      width: 150,
      resizeMode: "contain",
  },
  plusLogo: {
      height: 50,
      width: 50,
      tintColor: PasionColor.NaranjaPasion
  },
  plusContainer: {
      display: "flex",
      flexDirection: "row",
      margin: 15,
      marginTop: "auto",
      marginLeft: "auto",
  }
});
