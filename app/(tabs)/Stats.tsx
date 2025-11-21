import { PasionColor } from '@/scripts/PasionColors';
import { View, Text, StyleSheet } from 'react-native';
import RadarGraph from '@/components/RadarGraph';
import { useSQLiteContext } from 'expo-sqlite';
import DayWidget from '@/components/DayWidget';

interface weight_query {
    weight: number
}
export default function DetailsScreen() {
    const db = useSQLiteContext();
    const query: weight_query | null = db.getFirstSync("SELECT weight FROM user_data");
    const data = [{label: "Weight", value: !query ? 0 : query.weight}];
    data.push({label: "Sleep", value: 50});
    data.push({label: "Mood", value: 50});
    data.push({label: "Calories", value: 50});
    
    console.log(data);
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
