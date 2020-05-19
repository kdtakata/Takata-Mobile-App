import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
import axios from "axios";

const width = Dimensions.get("window").width;

class PickleArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      VIC: [],
      NSW: [],
      ACT: [],
      NT: [],
      QLD: [],
      SA: [],
      TAS: [],
      WA: []
    };
  }

  componentDidMount() {
    axios
      .post("http://192.168.0.20:5000/pickle",{chutiya: 'Hello'})
      .then(response => {
        this.setState({
          VIC: response.data.VIClist,
          NSW: response.data.NSWlist,
          ACT: response.data.ACTlist,
          NT: response.data.NTlist,
          QLD: response.data.QLDlist,
          SA: response.data.SAlist,
          TAS: response.data.TASlist,
          WA: response.data.WAlist,
          isLoading: false
        });
      })
      .catch(error => {
        console.log("error");
      });
  }
  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
          <ScrollView>
           <Text
          style={{ fontWeight: "bold", textAlign: "center", marginTop: 20 }}
        >
          {" "}
          Victoria
        </Text>
        <FlatList
          style={{ marginTop: 10 }}
          data={this.state.VIC}
          renderItem={({ item }) => (
            <View style={{ justifyContent: "center", marginBottom: 10 }}>
              <Text
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  textAlign:'center',
                  padding: 10,
                  width: Dimensions.get("window").width
                }}
              >
                {item.name}
              </Text>
            </View>
          )}
        />
        <Text
          style={{ fontWeight: "bold", textAlign: "center", marginTop: 10 }}
        >
          {" "}
          NSW
        </Text>
        <FlatList
          style={{ marginTop: 10 }}
          data={this.state.NSW}
          renderItem={({ item }) => (
            <View style={{ justifyContent: "center", marginBottom: 10 }}>
              <Text
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  textAlign:'center',
                  padding: 10,
                  width: Dimensions.get("window").width
                }}
              >
                {item.name}
              </Text>
            </View>
          )}
        />
        <Text
          style={{ fontWeight: "bold", textAlign: "center", marginTop: 20 }}
        >
          {" "}
          South Australia
        </Text>
        <FlatList
          style={{ marginTop: 10 }}
          data={this.state.SA}
          renderItem={({ item }) => (
            <View style={{ justifyContent: "center", marginBottom: 10 }}>
              <Text
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  textAlign:'center',
                  padding: 10,
                  width: Dimensions.get("window").width
                }}
              >
                {item.name}
              </Text>
            </View>
          )}
        />
        <Text
          style={{ fontWeight: "bold", textAlign: "center", marginTop: 20 }}
        >
          {" "}
          Queensland
        </Text>
        <FlatList
          style={{ marginTop: 10 }}
          data={this.state.QLD}
          renderItem={({ item }) => (
            <View style={{ justifyContent: "center", marginBottom: 10 }}>
              <Text
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  textAlign:'center',
                  padding: 10,
                  width: Dimensions.get("window").width
                }}
              >
                {item.name}
              </Text>
            </View>
          )}
        />
        <Text
          style={{ fontWeight: "bold", textAlign: "center", marginTop: 20 }}
        >
          {" "}
          Northern Territory 
        </Text>
        <FlatList
          style={{ marginTop: 10 }}
          data={this.state.NT}
          renderItem={({ item }) => (
            <View style={{ justifyContent: "center", marginBottom: 10 }}>
              <Text
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  textAlign:'center',
                  padding: 10,
                  width: Dimensions.get("window").width
                }}
              >
                {item.name}
              </Text>
            </View>
          )}
        />
        <Text
          style={{ fontWeight: "bold", textAlign: "center", marginTop: 20 }}
        >
          {" "}
          Western Australia
        </Text>
        <FlatList
          style={{ marginTop: 10 }}
          data={this.state.WA}
          renderItem={({ item }) => (
            <View style={{ justifyContent: "center", marginBottom: 10 }}>
              <Text
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  textAlign:'center',
                  padding: 10,
                  width: Dimensions.get("window").width
                }}
              >
                {item.name}
              </Text>
            </View>
          )}
        />
        <Text
          style={{ fontWeight: "bold", textAlign: "center", marginTop: 20 }}
        >
          {" "}
          ACT
        </Text>
        <FlatList
          style={{ marginTop: 10 }}
          data={this.state.ACT}
          renderItem={({ item }) => (
            <View style={{ justifyContent: "center", marginBottom: 10 }}>
              <Text
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  textAlign:'center',
                  padding: 10,
                  width: Dimensions.get("window").width
                }}
              >
                {item.name}
              </Text>
            </View>
          )}
        />

        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignContent: "center",
    justifyContent: "center"
  },
  wrapContent: {
    position: "relative",
    flexDirection: "row",
    backgroundColor: "#add8e6",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
    height: 40,
    paddingHorizontal: 10
  },
  boxSelect: {
    justifyContent: "flex-start",
    alignContent: "center",
    borderRadius: 5,
    paddingLeft: 10,
    width: width - 40
  },
  alignCenter: {
    lineHeight: 40,
    color: "black",
    alignItems: "center"
  }
});

export default PickleArea;
