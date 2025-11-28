import { useRouter } from "expo-router"
import { useSQLiteContext } from "expo-sqlite"
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native"
import { PasionColor } from "@/scripts/PasionColors"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
import DateTimePicker from "react-native-modal-datetime-picker"
import TextFieldEntry from "@/components/TextFieldEntry"
import { Picker } from "@react-native-picker/picker"

interface FoodMetaData {
    FoodType: String
    TimestampStart: Date
    Calories: Number
    Proteins: Number
    Carbs: Number
}

export default function ActivityForm() {
    const db = useSQLiteContext()
    const router = useRouter()
    const [activity, setActivity] = useState("")
    const [proteins, setProteins] = useState("0")
    const [carbs, setCarbs] = useState("0")
    const [foodtype, setFoodType] = useState("breakfast")
      
    const handlePress = () => {
        const metadata = {foodtype, calories, proteins, carbs}
        console.log(date.toISOString())
        db.runAsync(`INSERT INTO metrics (metric_type, metadata, timestamp_start)
                   VALUES ("food", ?, ?)`,
                  [JSON.stringify(metadata), date.toISOString()])
        router.back()
    }

    return (
    <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.titleFont}>Add a Meal</Text>
                <TouchableOpacity onPress={handlePress}>
                    <Text style={styles.saveText}>Save</Text></TouchableOpacity>
            </View>
            <View style={styles.separator}/>
            <View style={styles.entryContainer}>
                <Text style={styles.text}>Food Type</Text>
                <Picker
                    style={[{flex: 1, color: PasionColor.BlancoPasion}]}
                    dropdownIconColor={PasionColor.BlancoPasion}
                    selectedValue={foodtype}
                    onValueChange={(itemValue, itemIndex) => {
                        setFoodType(itemValue)
                    }}>
                    <Picker.Item label="Breakfast" value="breakfast" />
                    <Picker.Item label="Lunch" value="lunch"/>
                    <Picker.Item label="Dinner" value="dinner"/>
                </Picker>
            </View>
            <View style={styles.separator}/>
            <View style={styles.entryContainer}>
                <Text style={styles.text}>Time</Text>
                <TouchableOpacity onPress={() => setShowPicker(true)}>
                    <Text style={[styles.text, styles.datimeButton, {color: PasionColor.GrisClaroPasion}]}>
                        {date.toLocaleString()}
                    </Text>
                </TouchableOpacity>
                {showPicker && (<DateTimePicker 
                                mode="datetime"
                                isVisible={showPicker}
                                onConfirm={(date) => {
                                    if (date) setDate(date)
                                    setShowPicker(false)
                                }} 
                                onCancel={() => {
                                    setShowPicker(false);
                                }}
                                />)
                }
            </View>
            <View style={styles.separator}/>
            <TextFieldEntry label="Calories" unit="Cal" val={calories} setVal={setCalories}/>
            <View style={styles.separator}/>
            <TextFieldEntry label="Carbs" unit="g" val={carbs} setVal={setCarbs}/>
            <TextFieldEntry label="Proteins" unit="g" val={proteins} setVal={setProteins}/>
            <View style={styles.separator}/>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: PasionColor.NegroPasion,
  },
  entryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  datimeButton: {
    borderColor: PasionColor.GrisClaroPasion,
  },
  headerContainer: {
    flexDirection: "row",
    height: "10%",
    justifyContent: 'space-between',
    alignItems: "center",
  },
  titleFont: {
    color: PasionColor.BlancoPasion,
    fontSize: 26,
    fontWeight: "800",
    fontFamily: "Open Sans",
    margin: "5%",
  },
  text: {
    color: PasionColor.BlancoPasion,
    fontSize: 18,
    fontFamily: "Open Sans",
    fontWeight: 400,
    margin: "5%",
    marginLeft: "7%",
  },
  textUnit: {
    color: PasionColor.BlancoPasion,
    fontSize: 18,
    fontFamily: "Open Sans",
    fontWeight: 400,
    margin: "5%",
    marginLeft: 0,
    marginRight: 0,

  },
  saveText: {
    color: PasionColor.BlancoPasion,
    fontSize: 18,
    fontFamily: "Open Sans",
    fontWeight: 800,
    margin: "5%",
    marginLeft: "7%",
  },
  separator: {
      flexDirection: "row",
      borderTopWidth: 1,
      borderColor: PasionColor.GrisPasion,
  },
});
