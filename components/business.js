import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableHighlight,
} from "react-native";
import { Card } from "react-native-elements";
const width = Dimensions.get("window").width;
const Business = (props) => {
  var details = props.navigation.state.params;
  //   return (
  <View style={styles.container}>
    <Card title="Confirm Business Detail">
      <Text style={{ fontSize: width * 0.05 }}>
        Business Name: {details.username}
      </Text>
      <Text style={{ fontSize: width * 0.05 }}>
        Trading Name: {details.name}
      </Text>
      <Text style={{ fontSize: width * 0.05 }}>
        Phone Number: {details.phone}
      </Text>
      <Text style={{ fontSize: width * 0.05 }}>Address: {details.id}</Text>
      <TouchableOpacity style={styles.buttonstyle}>
        <Text style={{ textAlign: "center" }}>Confirm</Text>
      </TouchableOpacity>
    </Card>
  </View>;
  //   );
};
const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#e3dbcd",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonstyle: {
    marginTop: 10,
    backgroundColor: "#00BCD4",
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
    width: 250,
  },
});

export default Business;
