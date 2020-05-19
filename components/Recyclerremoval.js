import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  Modal,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Picker,
} from "react-native";
import Dialog from "react-native-dialog";
import { SearchBar, Card } from "react-native-elements";

const width = Dimensions.get("window").width;
var newItem;

class RecyclerRemoval extends React.Component {
  
  constructor(props) {
    super(props);
    //setting default state
    this.state = {
      isLoading: true,
      search: "",
      modalVisible: false,
      business: "",
      trading: "",
      Phone: "",
      Address: "",
      selectedValue: "",
    };
    this.arrayholder = [];
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((responseJson) => {
        //   console.log("Data Source", responseJson)
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function () {
            this.arrayholder = responseJson;
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  search = (text) => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  }
  handleCancel = () => {
    this.setState({ modalVisible: false });
  };

  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ modalVisible: false });
    this.props.navigation.navigate("test");
  };

  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: "90%",
          backgroundColor: "#e3dbcd",
        }}
      />
    );
  };
  footer = () => {
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.titleStyle}>Unable to find the Businesss? </Text>
        <Text
          style={{ color: "blue" }}
        //  onPress={() => this.props.navigation.navigate("newBusi")}
        >
          Create a new one
        </Text>
      </View>
    );
  };

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
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
        
          
          <Picker style={{width: width}}
          selectedValue={this.state.selectedValue}
       
          onValueChange={(itemValue, itemIndex) => this.setState({selectedValue:itemValue})}>
          <Picker.Item label="Business Name" value="java" />
        <Picker.Item label="Trading Name" value="js" />
          </Picker>
      
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          onClear={(text) => this.SearchFilterFunction("")}
          placeholder="Type Here..."
          value={this.state.search}
        />
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          ListFooterComponent={this.footer}
          //Item Separator View
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
            <Text
              style={styles.textStyle}
              onPress={() =>
                this.setState({
                  modalVisible: true,
                  business: item.username,
                  trading: item.name,
                  Phone: item.phone,
                  Address: item.email,
                })
              }
            >
              {item.username}
            </Text>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />

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
  viewStyle: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
    marginTop: Platform.OS == "ios" ? 30 : 0,
  },
  textStyle: {
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  buttonstyle: {
    marginTop: 10,
    backgroundColor: "#00BCD4",
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
    width: 250,
  },
  pickerBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    marginTop: 10,
  },
  pickerBoxInner: {
    borderWidth: 0.6,
    borderColor: "#0000",
    borderRadius: 2,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: 37,
  },
  pickerBoxIcon: {
    position: "absolute",
    right: 0,
    fontSize: 23,
    color: "#0000",
  },
  pickerStyle: {
    width: "120%",
    paddingBottom: 0,
    paddingLeft: 0,
    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
    left: -25,
    position: "absolute",
    backgroundColor: "transparent",
  },
});

export default RecyclerRemoval;
