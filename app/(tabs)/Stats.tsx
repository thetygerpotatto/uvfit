import { PasionColor } from '@/scripts/PasionColors';
import { View, Text, StyleSheet } from 'react-native';
import RadarGraph from '@/components/RadarGraph';
import { useSQLiteContext } from 'expo-sqlite';
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
            <View style={styles.infoContainer}> 
                <RadarGraph data={data}></RadarGraph>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PasionColor.NegroPasion,
  },
  infoContainer: {
    position: "absolute",
    bottom: 130,
    left: 20,
    right: 20,
    top: 20,
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
});
