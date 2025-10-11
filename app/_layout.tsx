import { Stack } from 'expo-router';
import { PasionColor } from '@/scripts/PasionColors';
import { Background } from '@react-navigation/elements';

export default function RootLayout() {
  return (
    <Stack
        screenOptions= {{
            contentStyle: {
                backgroundColor: PasionColor.NegroPasion,
            }
        }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: 'Register', 
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="(tabs)"   
        options={{ 
            headerShown: false }} 
       />
    </Stack>
  );
}
