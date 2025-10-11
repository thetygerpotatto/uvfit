import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { PasionColor } from '@/scripts/PasionColors';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Lógica
    router.replace('/(tabs)/Training');
  };

  const handlePressRegister = () => {
    router.push('/register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UV-Fit</Text>

      <TextInput
        style={styles.input}
        placeholder="Email/User"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>Don't have an account?</Text>
      <TouchableOpacity style={styles.registerButton} onPress={handlePressRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: PasionColor.NegroPasion,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 40,
    color: PasionColor.BlancoPasion,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: PasionColor.GrisOscuroPasion,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: PasionColor.BlancoPasion,
    borderWidth: 1,
    borderColor: PasionColor.GrisPasion,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: PasionColor.AzulPasion,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: PasionColor.BlancoPasion,
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 20,
  },
  registerButtonText: {
    color: PasionColor.AzulPasion,
    fontSize: 16,
  },
  registerText: {
    color: PasionColor.GrisClaroPasion,
    fontSize: 16,
    marginTop: 15,
  },
});
