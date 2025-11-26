import { useRouter } from "expo-router"
import { useSQLiteContext } from "expo-sqlite"
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native"
import { PasionColor } from "@/scripts/PasionColors"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
import DateTimePicker from "react-native-modal-datetime-picker"
import TextFieldEntry from "@/components/TextFieldEntry"

interface FoodMetaData {
    TimestampStart: Date
    Calories: Number
    Proteins: Number
    Carbs: Number
}

export default function FoodForm() {
    const db = useSQLiteContext()
    const router = useRouter()
    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] =useState(false);
    const [calories, setCalories] = useState("")
    const [proteins, setProteins] = useState("")
    const [carbs, setCarbs] = useState("")
    
    const handlePress = () => {
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
  }
});
