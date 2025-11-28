import { useRouter } from "expo-router"
import { useSQLiteContext } from "expo-sqlite"
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native"
import { PasionColor } from "@/scripts/PasionColors"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
import DateTimePicker from "react-native-modal-datetime-picker"

export default function FoodForm() {
    const db = useSQLiteContext()
    const router = useRouter()
    const [startSleeping, setStartSleeping] = useState(new Date())
    const [endSleeping, setEndSleeping] = useState(new Date())
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const handlePress = () => {
        db.runAsync(`INSERT INTO metrics (metric_type, timestamp_start, timestamp_end)
                   VALUES ("sleep", ?, ?)`,
                  [startSleeping.toISOString(), endSleeping.toISOString()])
        router.back()
    }

    return (
    <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.titleFont}>Register your Sleep</Text>
                <TouchableOpacity onPress={handlePress}>
                    <Text style={styles.saveText}>Save</Text></TouchableOpacity>
            </View>
            <View style={styles.separator}/>
            <View style={styles.entryContainer}>
                <Text style={styles.text}>Laydown Time</Text>
                <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                    <Text style={[styles.text, styles.datimeButton, {color: PasionColor.GrisClaroPasion}]}>
                        {startSleeping.toLocaleString()}
                    </Text>
                </TouchableOpacity>
                {showStartPicker && (<DateTimePicker 
                                mode="datetime"
                                isVisible={showStartPicker}
                                onConfirm={(date) => {
                                    if (date) setStartSleeping(date)
                                    setShowStartPicker(false)
                                }} 
                                onCancel={() => {
                                    setShowStartPicker(false);
                                }}
                                />)
                }
            </View>
            <View style={styles.separator}/>
            <View style={styles.entryContainer}>
                <Text style={styles.text}>Wake Up Time</Text>
                <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                    <Text style={[styles.text, styles.datimeButton, {color: PasionColor.GrisClaroPasion}]}>
                        {endSleeping.toLocaleString()}
                    </Text>
                </TouchableOpacity>
                {showEndPicker && (<DateTimePicker 
                                mode="datetime"
                                isVisible={showEndPicker}
                                onConfirm={(date) => {
                                    if (date) setEndSleeping(date)
                                    setShowEndPicker(false)
                                }} 
                                onCancel={() => {
                                    setShowEndPicker(false);
                                }}
                                />)
                }
            </View>
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
