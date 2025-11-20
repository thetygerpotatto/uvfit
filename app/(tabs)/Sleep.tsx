import { PasionColor } from '@/scripts/PasionColors';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.infoContainer}> 
            
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
    backgroundColor: PasionColor.AzulFondoPasion,
    borderWidth: 1,
    borderColor: PasionColor.GrisPasion,
  },
  text: {
    color: PasionColor.AzulPasion,
  },
});
