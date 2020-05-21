import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  Button,
  Alert
} from "react-native";
import RecyclerRemoval from "./Recyclerremoval";
import Dialog from "react-native-dialog";
import axios from "axios";

class AirbagCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      collection: false,
      userid: props.navigation.state.params.userid,
      businessID: props.navigation.state.params.busiID,
      message: "",
      courier: false,
      business: "",
      trading: "",
      phone: "",
      address: "",
    };
   
  }
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
  
  handleCancel = () => {
    this.setState({ modalVisible: false });
  };

  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ modalVisible: false });
    
      let senddata ={
        userid: this.state.userid,
        businessID: this.state.businessID
      }
      this.props.navigation.navigate("vin",{senddata});
    
  };
  componentDidMount() {
    console.log('Business ID %s', this.state.businessID)
    axios
      .get("https://www.takatavinview.com/business/getdetailed/")
      .then(response => {
        var dataset = response.data;
        console.log("Data Source", this.state.businessID);

        this.setState(
          {
            dataSource: dataset
          },
          function() {
            this.arrayholder = dataset;
          }
        );
        for (var i in dataset) {
          if (dataset[i].id == this.state.businessID) {
            this.setState({
              business: dataset[i].business_name,
              trading: dataset[i].Trading_name,
              phone: dataset[i].business_phone,
              address:
                dataset[i].street +
                "," +
                dataset[i].state +
                "," +
                dataset[i].postcode
            });
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const username = this.props.navigation.state.params.username;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonstyle}
          onPress={() => {
            if (this.state.businessID === 415) {
              Alert.alert("No Access", "You dont have access to this section. Please select from the other two option",[{text: 'OK', style: 'cancel'}])
              this.setState({
                courier: !this.state.courier
              });
            }
            if (this.state.businessID != "415") {
              this.setState({
                modalVisible: !this.state.modalVisible,
                collection: !this.state.collection
              });
            }
          }}
        >
          <Text style={{ textAlign: "center" }}>Recycler Collection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonstyle}>
          <Text
            style={{ textAlign: "center" }}
            onPress={() => {
              console.log(this.state.userid)
              let senddata={
                userid: this.state.userid,
              }
              this.props.navigation.navigate("removal",{senddata})}}
          >
            Recycler Removal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonstyle}
          onPress={() => this.props.navigation.navigate("pickle",{userid: this.state.userid})}
        >
          <Text style={{ textAlign: "center" }}>Pickles Yard Collection</Text>
        </TouchableOpacity>
        <View>
          <Dialog.Container visible={this.state.modalVisible}>
            <Dialog.Title>Confirm Business Detail</Dialog.Title>
            <Dialog.Description>
              Business Name: {this.state.business} {"\n"}
              Trading Name: {this.state.trading}
              {"\n"}
              Contact Number: {this.state.Phone}
              {"\n"}
              Address: {this.state.address}
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
