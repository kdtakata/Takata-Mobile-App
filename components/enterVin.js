import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";

const width = Dimensions.get("window").width;

class VinEnter extends React.Component {
  render(){
      return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: width * 0.05,
          marginTop: 20,
          alignContent: "space-around"
        }}
      >
        Enter the VIN
      </Text>
      <TextInput
        autoCapitalize="characters"
        maxLength={17}
        style={styles.textinput}
      ></TextInput>
      <TouchableOpacity style={styles.buttonstyle} onPress={()=> this.props.navigation.navigate("detail")}>
        <Text style={{ textAlign: "center" }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );}
}
const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  textinput: {
    borderColor: "black",
    backgroundColor: "#fff",
    width: width - 80,
    height: 40,
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 0.04 * width,
    borderRadius: 25,
    marginBottom: 5,
    padding: 10
  },
  buttonstyle: {
    marginTop: 10,
    backgroundColor: "#00BCD4",
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
    width: 180
  }
});
export default VinEnter;
