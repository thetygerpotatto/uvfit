import { PasionColor } from '@/scripts/PasionColors';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SLEEP DETAILS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PasionColor.AzulFondoPasion,
  },
  text: {
    color: PasionColor.AzulPasion,
  },
});
