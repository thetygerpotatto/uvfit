import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { PasionColor } from '@/scripts/PasionColors';

export default function RegisterScreen() {
  const router = useRouter();

  const handleRegister = () => {
    // logica
    Alert.alert('Registration Successful', 'You can now log in.');
    router.back();
  };

  const handleLoginButton= () => {
    router.back()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
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
       <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>Already have an account?</Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleLoginButton}> 
        <Text style={styles.loginButtonText}> Login </Text>
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
  loginButton: {
    marginTop: 20,
  },
  loginButtonText: {
    color: PasionColor.AzulPasion,
    fontSize: 16,
  },
  loginText: {
    color: PasionColor.GrisClaroPasion,
    fontSize: 16,
    marginTop: 15,
  },
});
