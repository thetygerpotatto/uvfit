import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Button } from 'react-native';
import { useRouter } from 'expo-router';
import FormField from '../components/FormField'; // Importamos el componente reutilizable
import { PasionColor } from '@/scripts/PasionColors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function PersonalDataScreen() {
  const router = useRouter();
  const [hour, setTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false)

  const handleContinue = () => {
    if (!hour) {
      Alert.alert('Incomplete', 'Please fill in all fields.');
      return;
    }

    console.log('Sleep time:', { hour});
    router.replace('/(tabs)/Training');
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.title}> Sleep time</Text>
      <Text style={styles.subtitle}>Help us customize your experience.</Text>

      <Button title="Seleccionar hora" onPress={() => setIsVisible(true)} />
      <DateTimePickerModal isVisible={isVisible}
        mode="time"
        onConfirm={(date: Date) => {
          setTime(date);
          setIsVisible(false);
        }}
        onCancel={() => setIsVisible(false)}
        is24Hour/>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: PasionColor.NegroPasion,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: PasionColor.BlancoPasion,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: PasionColor.GrisClaroPasion,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: PasionColor.AzulPasion,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: PasionColor.BlancoPasion,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
