import { PasionColor } from "@/scripts/PasionColors";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDayContex } from "./DayContext";

interface OnDayPressed {
    onDayPressed: () => any
}

export default function DayWidget() {
    const {selectedDay, setSelectedDay, setCurrentDay} = useDayContex()
    const days = getLast7Days(selectedDay)
            const DayBubbles = days.map((d, index) => (
                <TouchableOpacity key={index} 
                                  style={[styles.day,
                                        d.isToday && styles.todayDay,
                                        d.isSelectedDay && styles.selectedDay
                                        ]}
                                  onPress={() => {
                                      setDay(d.date, index)
                                  }}>
                    <Text style={[styles.letters, d.isToday && styles.todayLetter, d.isSelectedDay && styles.selectedLetter]}>
                        {d.letter}
                    </Text>
                </TouchableOpacity>) 
            )
    return (
        <View style={styles.container}>
        {DayBubbles}
        </View>
    );

    function setDay(day: Date, index: number) {
        setCurrentDay(day);
        setSelectedDay(day.getDay());
    }
}

function getLast7Days(selectedDay: number) {
  const letters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const result = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    const today = new Date()
    date.setDate(date.getDate() - i);

    result.push({
      date,
      letter: letters[date.getDay()],
      isToday: i === 0,
      isSelectedDay: i === 6 - (selectedDay + (6 - today.getDay())) % 7
    });
  }
  return result;
}


const styles = StyleSheet.create({
  container: {
      margin: 5,
      borderColor: PasionColor.GrisPasion,
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10
  },
  day: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      borderRadius: 100,
      borderColor: PasionColor.BlancoPasion,
      borderWidth: 1
  },
  todayDay: {
      backgroundColor: PasionColor.GrisPasion,
      borderColor: PasionColor.BlancoPasion
  },
  todayLetter: {
      color: PasionColor.BlancoPasion
  },
  selectedDay: {
      backgroundColor: PasionColor.BlancoPasion,
  },
  selectedLetter: {
      color: PasionColor.NegroPasion
  },
  letters: {
      flexDirection: "column",
      fontSize: 16,
      color: PasionColor.BlancoPasion,
  }
});
