import { Tabs, useRouter } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import {PasionColor} from "../../scripts/PasionColors"

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: PasionColor.BlancoPasion,
        tabBarInactiveTintColor: PasionColor.GrisPasion,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 90,
          paddingTop: 25,
          backgroundColor: PasionColor.NegroPasion,
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: PasionColor.NegroPasion,
        },
        headerTitleStyle: {
          color: PasionColor.BlancoPasion,
        },
      }}
    >
      <Tabs.Screen
        name="Training"
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/TrainingIcon.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => { /* Lógica del botón aquí */ }} style={{ marginRight: 25 }}>
              <Image
                source={require('../../assets/images/UserIcon.png')}
                style={{ width: 25, height: 25, tintColor: PasionColor.BlancoPasion }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="Sleep"
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/SleepIcon.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => { /* Lógica del botón aquí */ }} style={{ marginRight: 25 }}>
              <Image
                source={require('../../assets/images/UserIcon.png')}
                style={{ width: 25, height: 25, tintColor: PasionColor.BlancoPasion }}
              />
            </TouchableOpacity>
          ),
        }}

      />
      <Tabs.Screen
        name="food"
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/EatIcon.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => { /* Lógica del botón aquí */ }} style={{ marginRight: 25 }}>
              <Image
                source={require('../../assets/images/UserIcon.png')}
                style={{ width: 25, height: 25, tintColor: PasionColor.BlancoPasion }}
              />
            </TouchableOpacity>
            ),
        }}
      />
      <Tabs.Screen
        name="Stats"
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/DumbbellIcon.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => { /* Lógica del botón aquí */ }} style={{ marginRight: 25 }}>
              <Image
                source={require('../../assets/images/UserIcon.png')}
                style={{ width: 25, height: 25, tintColor: PasionColor.BlancoPasion }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/SettingsIcon.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => { /* Lógica del botón aquí */ }} style={{ marginRight: 25 }}>
              <Image
                source={require('../../assets/images/UserIcon.png')}
                style={{ width: 25, height: 25, tintColor: PasionColor.BlancoPasion }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
  },
});
