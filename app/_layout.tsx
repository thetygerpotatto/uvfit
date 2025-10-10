import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="Training" />
      <Tabs.Screen name="Sleep" />
      <Tabs.Screen name="food" />
      <Tabs.Screen name="Stats" />
    </Tabs>
  );
}
