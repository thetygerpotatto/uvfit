import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { PasionColor } from '../../scripts/PasionColors';
import DayWidget from '@/components/DayWidget';
import { useDayContex } from '@/components/DayContext';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

interface FoodQueryResult {
    metadata: any
    timestamp_start: string
}

interface MealEntry {
  metadata: any;
  date: Date;
}

interface FoodMetaData {
    FoodType: String
    TimestampStart: Date
    Calories: Number
    Proteins: Number
    Carbs: Number
}

export default function DetailsScreen() {
    const [isLoading, setIsLoading] = useState(true)
    const [foodData, setFoodData] = useState<MealEntry[]>([])
    const db = useSQLiteContext()
    const router = useRouter()
    const {currentDay} : any = useDayContex()

    const addNewmeal = () => {
        router.push("/FoodForm");
    }

    useEffect(() => {
        getMealData()
    }, [currentDay])

    async function getMealData() {
        setIsLoading(true)
        const copyCurrentDay = new Date(currentDay)
        const startDate = new Date(copyCurrentDay)
        startDate.setHours(0,0,0,0)
        const endDate = new Date(copyCurrentDay)
        endDate.setHours(23,59,59,999)
        console.log(startDate)
        console.log(endDate)

        const result = await db.getAllAsync(`select metadata, timestamp_start from metrics
                    where metric_type = 'food' 
                    AND timestamp_start >= ? 
                    AND timestamp_start <=  ?
                        `, [startDate.toISOString(), endDate.toISOString()]) as FoodQueryResult[]
        const newFoodData = result.map((data: FoodQueryResult) => {
            return {metadata: JSON.parse(data.metadata), date: new Date(data.timestamp_start)}
        });
        console.log("FOOD DATA", newFoodData)
        setFoodData(newFoodData)
        setIsLoading(false);
    }
    if (isLoading) {
        return (
        <View style={styles.container}>
            <DayWidget/>
            <View style={styles.separator}></View>
            <View style={styles.infoContainer}> 
                <Text style={styles.text}>Meals</Text>
                <Text style={styles.text}>Loading food info</Text>
                <TouchableOpacity style={styles.plusContainer}
                                    onPress={addNewmeal}>
                    <Image source={require("../../assets/images/plusButton.png")}
                            style={styles.plusLogo}/>
                </TouchableOpacity>
            </View>
        </View>
        );
    } else {
        return (
        <View style={styles.container}>
            <DayWidget/>
            <View style={styles.separator}></View>
            <View style={styles.infoContainer}> 
                <Text style={styles.text}>Meals</Text>
                <FlatList 
                        data={foodData}
                        extraData={foodData}
                        renderItem = {({item}) => {
                            return (<MealItem foodtype={item.metadata.foodtype} calories={item.metadata.calories}/>)
                        }}
                    />
                <TouchableOpacity style={styles.plusContainer}
                                    onPress={addNewmeal}>
                    <Image source={require("../../assets/images/plusButton.png")}
                            style={styles.plusLogo}/>
                </TouchableOpacity>
            </View>
        </View>
    );

    }
}

function MealItem({foodtype, calories}: any) {
    return(
        <View style={styles.itemContainer}>
        <Text style={styles.itemTextTitle}>{foodtype}</Text>
        <Text style={styles.itemText}>{calories} Cal</Text>
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
    borderRadius: 20,
    alignItems: 'flex-start',
    backgroundColor: PasionColor.VerdeFondoPasion,
    borderWidth: 1,
    borderColor: PasionColor.GrisPasion,
  },
  itemContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: "column",
    borderRadius: 20,
    alignItems: "flex-start",
    marginLeft: "15%",
  },
  text: {
    alignItems: "center",
    margin: "auto",
    color: PasionColor.VerdePasion,
    fontSize: 35,
    fontWeight: "bold",
  },
  itemText: {
    color: PasionColor.VerdePasion,
    fontSize: 16,
    fontWeight: 400,
  },
  itemTextTitle: {
    color: PasionColor.VerdePasion,
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
      tintColor: PasionColor.VerdePasion
  },
  plusContainer: {
      display: "flex",
      flexDirection: "row",
      margin: 15,
      marginTop: "auto",
      marginLeft: "auto",
  }
});
