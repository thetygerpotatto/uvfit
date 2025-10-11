import { View, Text, StyleSheet } from 'react-native';
import { PasionColor } from '../../scripts/PasionColors';

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>food details screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PasionColor.NegroPasion,
  },
  text: {
    color: PasionColor.BlancoPasion,
  },
});
