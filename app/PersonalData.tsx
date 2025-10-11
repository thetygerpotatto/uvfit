import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import FormField from '../components/FormField'; // Importamos el componente reutilizable
import { PasionColor } from '@/scripts/PasionColors';

const genderOptions = ['Masculino', 'Femenino', 'Otro'];
const activityOptions = ['1-2 Dias/Semana', '3-5 Dias/Semana', '6-7 Dias/Semana'];

export default function PersonalDataScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');


  const handleContinue = () => {
    if (!name || !age || !height || !weight || !gender || !activityLevel) {
      Alert.alert('Incomplete', 'Please fill in all fields.');
      return;
    }

    console.log('Personal Data:', { name, age, height, weight, gender, activityLevel });
    router.push("/sleepForm");
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Personal Details</Text>
      <Text style={styles.subtitle}>Help us customize your experience.</Text>

      <FormField label="Name" value={name} onChangeText={setName} placeholder="e.g., John Doe" />
      <FormField label="Age" value={age} onChangeText={setAge} placeholder="e.g., 30" keyboardType="numeric" />
      <FormField label="Height (cm)" value={height} onChangeText={setHeight} placeholder="e.g., 180" keyboardType="numeric" />
      <FormField label="Weight (kg)" value={weight} onChangeText={setWeight} placeholder="e.g., 75" keyboardType="numeric" />

      {/* Selector para Género */}
      <View style={styles.selectorContainer}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.optionsContainer}>
          {genderOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.optionButton, gender === option && styles.optionButtonSelected]}
              onPress={() => setGender(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Selector para Nivel de Actividad */}
      <View style={styles.selectorContainer}>
        <Text style={styles.label}>Activity Level</Text>
        <View style={styles.optionsContainer}>
          {activityOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.optionButton, activityLevel === option && styles.optionButtonSelected]}
              onPress={() => setActivityLevel(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>


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
  // Estilos para los nuevos selectores
  selectorContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: PasionColor.BlancoPasion,
    fontSize: 16,
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    backgroundColor: PasionColor.GrisOscuroPasion,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PasionColor.GrisPasion,
  },
  optionButtonSelected: {
    backgroundColor: PasionColor.AzulPasion,
    borderColor: PasionColor.AzulPasion,
  },
  optionText: {
    color: PasionColor.BlancoPasion,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});
