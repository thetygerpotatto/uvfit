import { PasionColor } from '@/scripts/PasionColors';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import useHealthConnect from '@/hooks/useHealthConnect';

export default function DetailsScreen() {
    const db = useSQLiteContext()
    const router = useRouter()
    const {removeItem} = useAsyncStorage('Token')
    const {openSettings} = useHealthConnect()
    
    const options = [{id: "1", label: "Cerrar Sesion"},
                    {id: "2", label: "Ver datos Fisicos"},
                    {id: "3", label: "Health Connect"}];

    const handlePress = (id: string) => {
        switch(id){
            case "1":
                removeItem()
                db.execAsync("UPDATE user SET email=null, isNew = True")
                router.replace("/login")
                break;
            case "2":
                router.replace("/Stats")
                break;
            case "3":
                openSettings()
                break;
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}> 
                <Text style={styles.text}>Settings</Text>
                <FlatList
                    bounces={true}
                    style={styles.list}
                    data={options}
                    keyExtractor = {(item) => item.id}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.settingBotton} onPress={() => handlePress(item.id)}>
                            <Text style={styles.label}>{item.label}</Text>
                        </TouchableOpacity>
                    )}
                ItemSeparatorComponent={() => <View style={styles.separator}/>}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  separator: {
      width: "100%",
      height: 5,
  },
  label: {
      color: PasionColor.BlancoPasion,
      flex: 1,
  },
  list: {
      width: "100%",
      padding: "5%"
  },
  settingBotton: {
    backgroundColor: PasionColor.NegroPasion,
    borderWidth: 1, 
    borderColor: PasionColor.GrisClaroPasion,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 10,
    width: "100%"
  },
  container: {
    flex: 1,
    backgroundColor: PasionColor.NegroPasion,
  },
  infoContainer: {
    position: "absolute",
    bottom: 130,
    left: 20,
    right: 20,
    top: 20,
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: PasionColor.NegroPasion,
    borderWidth: 1,
    borderColor: PasionColor.GrisPasion,
  },
  text: {
    color: PasionColor.BlancoPasion,
    fontSize: 32,
    paddingTop: 15
  },
});
