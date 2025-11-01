import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { PasionColor } from '@/scripts/PasionColors';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { login_request } from '@/scripts/database_concetion'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

interface userEntry {
  Email: string;
  isNew: boolean;
}

export default function LoginScreen() {
    const router = useRouter();
    const db = useSQLiteContext();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const {getItem, setItem, removeItem} = useAsyncStorage('Token')

    let logged = false;

    const handleSession = async () => {
        const token = await getItem();
        if (!token) {
            logged = false;
            console.log("NO SESSION");
        } else {
            logged = true;
        }
    }

    const handleLogin = async () => {
    // --- Lógica de Autenticación ---
    // 1. Aquí harías la llamada a tu backend para verificar el usuario y contraseña.
        const currentUser: userEntry | null = await db.getFirstAsync("SELECT * FROM user;"); ;
        console.log("current user: ", currentUser);

        const isNewUser = !currentUser ? false : currentUser.isNew

        console.log("nuevo usuario", isNewUser)
        const result = await login_request({email: name, password: password, name: null});

        if (result) {
            await db.runAsync("UPDATE user SET email = ?;", [name])
            logged = true;
        } else {
            logged = false
            Alert.alert("Incorrect User or Password")
        }

        // 2. Basado en la respuesta, decides a dónde redirigir.
        if (isNewUser && logged) {
          // Si es un usuario nuevo, lo mandas al formulario de datos personales.
          router.push('/PersonalData');
        } else if (!isNewUser && logged) {
            router.replace("/(tabs)/Training")
        }
    };

  const handlePressRegister = () => {
    router.push('/register');
  };

  useFocusEffect(
      useCallback(() => {
          handleSession()
      }, [])
  )
  return (
    <View style={styles.container}>
      <Text style={styles.title}>UV-Fit</Text>

      <TextInput
        style={styles.input}
        placeholder="Email/User"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
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
