import { PasionColor } from '@/scripts/PasionColors';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DayWidget from '@/components/DayWidget';
import { useRouter } from 'expo-router';

export default function DetailsScreen() {
    const router = useRouter()
    const addNewActicity = () => {
        //router.push("/ActivityForm")
    }
    return (
        <View style={styles.container}>
            <DayWidget></DayWidget>
            <View  style={styles.separator}/>
            <View style={styles.infoContainer}>
                <View style={styles.widgetContainer}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.itemText}>Average Rate</Text>
                        <Image style={styles.icons} source={require("../../assets/images/heart_icon.png")}/>
                        <Text style={styles.itemText}>3</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Text style={styles.itemText}>Calories</Text>
                        <Image style={styles.icons} source={require("../../assets/images/fire_icon.png")}/>
                        <Text style={styles.itemText}>3</Text>
                    </View>
                </View>
                <View style={styles.activityContainer}>
                    <Text style={styles.text}>Activities</Text>
                    <View style={styles.separator}/>
                    <TouchableOpacity style={styles.plusContainer}
                                        onPress={addNewActicity}>
                        <Image source={require("../../assets/images/plusButton.png")}
                                style={styles.plusLogo}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: PasionColor.NegroPasion,
    padding: 20,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
    borderRadius: 20,
    alignItems: 'flex-start',
    backgroundColor: PasionColor.NaranjaFondoPasion,
    borderWidth: 0,
    borderColor: PasionColor.GrisPasion,
  },
  itemContainer: {
    justifyContent: 'center',
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "5%",
    marginBottom: "1%",
  },
  widgetContainer: {
      flexDirection: "row",
      alignSelf: "flex-start",
      alignItems: "center",
      justifyContent: "space-around",
      width: "100%",
  },
  activityContainer: {
      alignItems: "center",
      flexDirection:"column",
      width: "100%",
      flex: 1,
      borderColor: PasionColor.GrisPasion,
      borderWidth: 1,
      borderRadius: 20,
  },
  iconContainer: {
      paddingTop: "5%",
      alignItems: "center",
      flex: 1,
      borderColor: PasionColor.GrisPasion,
      borderWidth: 1,
      borderRadius: 20,
  },
  text: {
    alignItems: "center",
    color: PasionColor.NaranjaPasion,
    fontSize: 35,
    fontWeight: "bold",
  },
  itemText: {
    alignSelf: "center",
    color: PasionColor.NaranjaPasion,
    fontSize: 16,
    fontWeight: "bold",
  },
  itemTextTitle: {
    color: PasionColor.AzulPasion,
    fontSize: 24,
    fontWeight: "bold",
  },
  separator: {
      width: "100%",
      borderTopWidth: 1,
      borderColor: PasionColor.GrisPasion,
      marginBottom: 5
  },
  icons: {
      height: 150,
      width: 150,
      resizeMode: "contain",
  },
  plusLogo: {
      height: 50,
      width: 50,
      tintColor: PasionColor.NaranjaPasion
  },
  plusContainer: {
      display: "flex",
      flexDirection: "row",
      margin: 15,
      marginTop: "auto",
      marginLeft: "auto",
  }
});
