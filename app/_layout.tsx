import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite'

export default function RootLayout() {
  return (
        <SQLiteProvider 
            databaseName='userDB.db'
            onInit={async (db) => {
                await db.execAsync(`
                    CREATE TABLE IF NOT EXISTS user (
                        email TEXT PRIMARY KEY,
                        isNew BOOLEAN NOT NULL
                    );

                    CREATE TABLE IF NOT EXISTS user_data (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT,
                        age INTEGER,
                        height INTEGER,
                        weight INTEGER,
                        gender TEXT CHECK (gender IN ('MALE', 'FEMALE', 'OTHER')),
                        activity TEXT CHECK (activity IN ('LOW', 'MEDIUM', 'HIGH')),
                        laydown_time TIME
                    );
                    pragma journal_mode=WAL;
                    `);
            }}
            options={{useNewConnection: false}}
        >
        
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="PersonalData" options={{ headerShown: false }} />
          <Stack.Screen name="sleepForm" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>

        </SQLiteProvider>

  );
}
