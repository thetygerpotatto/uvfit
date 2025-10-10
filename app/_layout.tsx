import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
      // Barra de Navegación
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          paddingTop: 20,
        },
      }}
    >
      <Tabs.Screen // Botón de Entreno
        name="Training"
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/images/TrainingIcon.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />

      <Tabs.Screen // Botón de mimir
        name="Sleep"
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/images/SleepIcon.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />

      <Tabs.Screen // Botón de alimentación
        name="food"
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/images/EatIcon.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tabs.Screen // Botón de stats
        name="Stats"
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/images/DumbbellIcon.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />
    </Tabs>
  );
}

// Estilo de iconos
const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
  },
});
