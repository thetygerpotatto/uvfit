import { View, StyleSheet, Text, TextInput } from "react-native";
import { PasionColor } from "@/scripts/PasionColors";

export default function TextFieldEntry({label, unit, val, setVal}: any) {
return (
    <View style={styles.entryContainer}>
        <Text style={styles.text}>{label}</Text>
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <TextInput  
                style={styles.text} 
                placeholder="0" 
                value={val}
                placeholderTextColor={PasionColor.GrisClaroPasion}
                onChangeText={setVal}
            />
            <Text style={styles.textUnit}>{unit}</Text>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
  entryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  datimeButton: {
    borderColor: PasionColor.GrisClaroPasion,
  },
  text: {
    color: PasionColor.BlancoPasion,
    fontSize: 18,
    fontFamily: "Open Sans",
    fontWeight: 400,
    margin: "5%",
    marginLeft: "7%",
  },
  textUnit: {
    color: PasionColor.BlancoPasion,
    fontSize: 18,
    fontFamily: "Open Sans",
    fontWeight: 400,
    margin: "5%",
    marginLeft: 0,
    marginRight: 0,

  },
});
