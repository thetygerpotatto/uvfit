import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { PasionColor } from '@/scripts/PasionColors';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { login_request } from '@/scripts/database_concetion'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { userDataEntry, userEntry} from '@/scripts/interfaces';

import { get_user_data } from '@/scripts/database_concetion';

export default function LoginScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const db = useSQLiteContext();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const {getItem, setItem, removeItem} = useAsyncStorage('Token')

    let logged = false;
    const sync_user_data = async (res: any) => {
        await db.runAsync(`UPDATE user_data
                     SET name = ?,
                     age = ?,
                     height = ?,
                     weight = ?,
                     gender = ?,
                     activity = ?,
                     laydown_time = ?
                     WHERE id = 1;
                     `, [res.name, res.age, res.height,  res.weight, res.gender, res.activity, res.laydowntime]);
        await db.runAsync(`UPDATE user
                     SET isNew = ?;
                     `, [res.isNew])
    }

    const handleSession = async () => {
        const token = await getItem();
        if (!token) {
            logged = false;
            console.log("NO SESSION");
        } else {
            const {res, status} = await get_user_data().then(data => data);
            if (status === 200) {
                logged = true;
                await sync_user_data(res)
                router.replace("/Training")
            } else {
                logged = false;
            }
        }
    }

    const handleLogin = async () => {
    // --- Lógica de Autenticación ---
    // 1. Llamada al backend para verificar el usuario y contraseña.
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        const result = await login_request({email: name, password: password});
        let isNewUser;
        if (result) {
            await db.runAsync("UPDATE user SET email = ?;", [name])
            const {res, status} = await get_user_data().then(data => data);
            sync_user_data(res)

            const currentUser: userEntry | null = await db.getFirstAsync("SELECT * FROM user;"); ;
            isNewUser = !currentUser ? false : currentUser.isNew

            logged = true;
        } else {
            logged = false
            Alert.alert("Incorrect User or Password")
        }

        setIsLoading(false)

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
        <Text style={styles.buttonText}>{isLoading ? "Loading...": "Login"}</Text>
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
