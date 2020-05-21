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
  constructor(props) {
    super(props);
    console.log("inside VIN Enter",props.navigation.state)
    this.state = { vin: " ", userid: props.navigation.state.params.senddata.userid , busiID: props.navigation.state.params.senddata.businessID };
  }
  vinchange = event => {
    let processData = event.nativeEvent.text;
    this.setState({ vin: processData });
  };
  vincheck = () => {
    fetch("https://takatalive.com/api/takata/"+this.state.vin)
      .then(response => response.json())
      .then(responseJson => {
        var obj = JSON.parse(responseJson);
        console.log(obj.HasMatch);
        if (obj.HasMatch) {
          let datasend = {
            data: obj.Result,
            username: this.state.userid,
            bussID: this.state.busiID,
          };
          this.props.navigation.navigate("detail", { send: datasend });
        }
      });
  };
  render() {
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
          onChange={this.vinchange}
        ></TextInput>
        <TouchableOpacity style={styles.buttonstyle} onPress={this.vincheck}>
          <Text style={{ textAlign: "center" }}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
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
