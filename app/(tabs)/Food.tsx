import { View, Text, StyleSheet } from 'react-native';
import { PasionColor } from '../../scripts/PasionColors';
import DayWidget from '@/components/DayWidget';

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
        <DayWidget></DayWidget>
        <View style={styles.separator}></View>
        <View style={styles.infoContainer}> 
            <Text style={styles.text}>Food DETAILS</Text>
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
  },
  separator: {
      flexDirection: "row",
      borderTopWidth: 1,
      borderColor: PasionColor.GrisPasion,
      marginBottom: 5
  }
});
