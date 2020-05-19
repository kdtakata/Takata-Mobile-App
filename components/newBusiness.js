import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  Dimensions,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";


const width = Dimensions.get("window").width;
export default class NewBusiness extends Component {
  state = {
    value: "",
  };

  handleTextChange = (newText) => this.setState({ value: newText });

  render() {
    return (
      <>
        <View style={{ flex: 1, padding: 30, backgroundColor: "#f5fcff" }}>
          <Text>Business Name</Text>
          <TextInput style={styles.textinput}></TextInput>
          <Text>Trading Name</Text>
          <TextInput style={styles.textinput}></TextInput>
          <Text>ABN</Text>
          <TextInput style={styles.textinput}></TextInput>
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>Address</Text>
          <Text>Street</Text>
          <TextInput style={styles.textinput}></TextInput>
          <Text>City</Text>
          <TextInput style={styles.textinput}></TextInput>
          <Text>State</Text>
          <TextInput style={styles.textinput}></TextInput>
          <Text>PostCode</Text>
          <Text style={{ fontWeight: "bold" }}>Contact Details</Text>

          <TextInput style={styles.textinput}></TextInput>
          <Text>Business Email</Text>
          <TextInput style={styles.textinput}></TextInput>
          <Text>Business Phone</Text>
          <TextInput style={styles.textinput}></TextInput>
          <Text>Fax</Text>
          <TextInput style={styles.textinput}></TextInput>
          <Text>Website</Text>
          <TextInput style={styles.textinput}></TextInput>
          <Text>First Name</Text>
          <TextInput style={styles.textinput}></TextInput>
          <Text>Last Name</Text>
          <TextInput style={styles.textinput}></TextInput>
          <Text>Email</Text>
          <TextInput style={styles.textinput}></TextInput>
          <Text>Mobile</Text>
          <TextInput style={styles.textinput}></TextInput>
          <Text>Account Details</Text>
          <Text>Account Name</Text>
          <TextInput style={styles.textinput}></TextInput>
          <Text>BSB</Text>
          <TextInput style={styles.textinput}></TextInput>
          <Text>Account Number</Text>
          <TextInput style={styles.textinput}></TextInput>
          <TouchableOpacity style={styles.buttonstyle}>
            <Text
              style={{ textAlign: "center" }}
              onPress={() => this.props.navigation.navigate("removal")}
            >
              Recycler Removal
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  textinput: {
    borderColor: "black",

    width: width - 80,
    height: 40,
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 0.04 * width,
    borderRadius: 5,
    marginBottom: 5,
    padding: 10,
    overflow: "hidden",
  },
  buttonstyle: {
    marginTop: 10,
    backgroundColor: "#00BCD4",
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
    width: 180,
  },
});
