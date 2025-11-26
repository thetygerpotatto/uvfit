import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { PasionColor } from '../../scripts/PasionColors';
import DayWidget from '@/components/DayWidget';
import { useDayContex } from '@/components/DayContext';
import { useSQLiteContext } from 'expo-sqlite';
import { useState, useEffect } from 'react';


export default function DetailsScreen() {
    const [foodData, setFoodData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const db = useSQLiteContext()
    const router = useRouter()
    const {currentDay} : any = useDayContex()
    const data = getMealData()

    const addNewmeal = () => {
        router.push("/FoodForm");
    }

    useEffect(() => {getMealData()}, []);

    async function getMealData() {
        const startDate = new Date(currentDay.setHours(0,0,0,0))
        const endDate = new Date(currentDay.setHours(23,59,59,999))

        
        console.log(startDate, endDate)
        const result = await db.runAsync(`select * from metrics
                    where metric_type = 'food' 
                    AND timestamp_start >= ? 
                    AND timestamp_end <=  ?
                        `, [startDate.toISOString(), endDate.toISOString()])
    }
    if (isLoading) {
        return (
        <View style={styles.container}>
            <DayWidget></DayWidget>
            <View style={styles.separator}></View>
            <View style={styles.infoContainer}> 
                <Text style={styles.text}>Meals</Text>
                <Text>Loading food info</Text>
                <TouchableOpacity style={styles.plusContainer}
                                    onPress={addNewmeal}>
                    <Image source={require("../../assets/images/plusButton.png")}
                            style={styles.plusLogo}/>
                </TouchableOpacity>
            </View>
        </View>
        );
    }
    return (
    <View style={styles.container}>
        <DayWidget></DayWidget>
        <View style={styles.separator}></View>
        <View style={styles.infoContainer}> 
            <Text style={styles.text}>Meals</Text>
            <FlatList 
                    data={foodData}
                    renderItem = {({item}) => item}/>

            <TouchableOpacity style={styles.plusContainer}
                                onPress={addNewmeal}>
                <Image source={require("../../assets/images/plusButton.png")}
                        style={styles.plusLogo}/>
            </TouchableOpacity>
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
    backgroundColor: PasionColor.VerdeFondoPasion,
    borderWidth: 1,
    borderColor: PasionColor.GrisPasion,
  },
  text: {
    color: PasionColor.VerdePasion,
    fontSize: 35,
    fontWeight: "bold",
    alignContent: "center",
    margin: 5,
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
