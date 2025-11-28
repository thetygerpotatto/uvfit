import { Tabs, useRouter } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity} from 'react-native';
import { PasionColor } from "../../scripts/PasionColors"
import { createContext, useState } from 'react';
import { DayContext } from '@/components/DayContext';

const DayInfo = createContext(null);
export default function TabLayout() {
  return (
    <DayContext>
        <Tabs
          screenOptions = {({route}) => ({
            tabBarActiveTintColor: PasionColor.BlancoPasion,
            tabBarInactiveTintColor: PasionColor.GrisPasion,
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 90,
              paddingTop: 25,
              position: "absolute",
              marginBottom: 25,
              marginHorizontal: 20,
              backgroundColor: tabColor[route.name].backgroundColor,
              borderWidth: 1,
              borderColor: PasionColor.GrisPasion,
              borderRadius: 20,
            },
            headerStyle: {
              backgroundColor: PasionColor.NegroPasion,
            },
            headerTitleStyle: {
              color: tabColor[route.name].strokeStyle,
            },
          })}
        >
          <Tabs.Screen
            name="Training"
            options = {({route}) => ({
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
                    style={{ width: 25, height: 25, tintColor: tabColor[route.name].strokeStyle }}
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Tabs.Screen
            name="Sleep"
            options = { ({route}) => ({
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
                    style={{ width: 25, height: 25, tintColor: tabColor[route.name].strokeStyle}}
                  />
                </TouchableOpacity>
              ),
            })}

          />
          <Tabs.Screen
            name="Food"
            options= {({route}) => ({
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
                    style={{ width: 25, height: 25, tintColor: tabColor[route.name].strokeStyle }}
                  />
                </TouchableOpacity>
                ),
            })}
          />
          <Tabs.Screen
            name="Stats"
            options= {({route}) => ({
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
                    style={{ width: 25, height: 25, tintColor: tabColor[route.name].strokeStyle }}
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Tabs.Screen
            name="Settings"
            options={ ({route}) => ({
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
                    style={{ width: 25, height: 25, tintColor: tabColor[route.name].strokeStyle }}
                  />
                </TouchableOpacity>
              ),
            })}
          />
        </Tabs>
    </DayContext>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
  },
  container: {
      flex: 1
  }
});

const tabColor: Record<string, any> = {
    "Food": { "strokeStyle" : PasionColor.VerdePasion, "backgroundColor": PasionColor.VerdeFondoPasion},
    "Sleep": {"strokeStyle" : PasionColor.AzulPasion, "backgroundColor": PasionColor.AzulFondoPasion},
    "Training": {"strokeStyle" : PasionColor.NaranjaPasion, "backgroundColor": PasionColor.NaranjaFondoPasion},
    "Stats": {"strokeStyle" : PasionColor.BlancoPasion, "backgroundColor": PasionColor.NegroPasion},
    "Settings": {"strokeStyle" : PasionColor.BlancoPasion, "backgroundColor": PasionColor.NegroPasion}
}
