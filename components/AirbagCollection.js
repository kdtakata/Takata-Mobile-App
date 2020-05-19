import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  Button
} from "react-native";
import RecyclerRemoval from "./Recyclerremoval";
import Dialog from "react-native-dialog";

class AirbagCollection extends Component {
  static navigationOptions = {
    //To set the header image and title for the current Screen
    title: "Airbag Collection Process",
    //Title

    //Image in Navigation Bar

    headerStyle: {
      backgroundColor: "#e3e3e3"
      //Background Color of Navigation Bar
    },

    headerTintColor: "#606070"
    //Text Color of Navigation Bar
  };
  state = {
    modalVisible: false,
    collection: false
  };
  handleCancel = () => {
    this.setState({ modalVisible: false });
  };

  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ modalVisible: false });
    if (this.state.collection) {
      this.props.navigation.navigate("vin");
    } else {
      this.props.navigation.navigate("removal");
    }
  };

  render() {
    const username = this.props.navigation.state.params.username;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonstyle}
          onPress={() => {
            this.setState({
              modalVisible: !this.state.modalVisible,
              collection: !this.state.collection
            });

            //console.log("Response is ", response);
          }}
        >
          <Text style={{ textAlign: "center" }}>Recycler Collection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonstyle}>
          <Text
            style={{ textAlign: "center" }}
            onPress={() => this.props.navigation.navigate("removal")}
          >
            Recycler Removal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonstyle}
          onPress={() => this.props.navigation.navigate("pickle")}
        >
          <Text style={{ textAlign: "center" }}>Pickles Yard Collection</Text>
        </TouchableOpacity>
        <View>
          <Dialog.Container visible={this.state.modalVisible}>
            <Dialog.Title>Confirm Business Detail</Dialog.Title>
            <Dialog.Description>
              Business Name:{this.state.business} {"\n"}
              Trading Name:{this.state.trading}
              {"\n"}
              Contact Number:{this.state.Phone}
              {"\n"}
              Address: {this.state.Address}
              {"\n"}
            </Dialog.Description>
            <Dialog.Button label="Cancel" onPress={this.handleCancel} />
            <Dialog.Button label="Confirm" onPress={this.handleDelete} />
          </Dialog.Container>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#e3dbcd",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonstyle: {
    marginTop: 10,
    backgroundColor: "#00BCD4",
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
    width: 250
  }
});
export default AirbagCollection;
