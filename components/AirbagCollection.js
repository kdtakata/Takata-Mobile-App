import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

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
      address: ""
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
  componentDidMount() {
    console.log("Business ID %s", this.state.businessID);
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
            console.log(this.state.userid);
            let senddata = {
              userid: this.state.userid,
              type: "rc"
            };
            this.props.navigation.navigate("removal", { senddata });
          }}
        >
          <Text style={{ textAlign: "center" }}>Recycler Collection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonstyle}>
          <Text
            style={{ textAlign: "center" }}
            onPress={() => {
              console.log(this.state.userid);
              let senddata = {
                userid: this.state.userid,
                type: "rr"
              };
              this.props.navigation.navigate("removal", { senddata });
            }}
          >
            Recycler Removal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonstyle}
          onPress={() =>
            this.props.navigation.navigate("pickle", {
              userid: this.state.userid
            })
          }
        >
          <Text style={{ textAlign: "center" }}>Pickles Yard Collection</Text>
        </TouchableOpacity>
        
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
