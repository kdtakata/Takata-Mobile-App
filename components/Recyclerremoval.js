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
  RefreshControl,
  ScrollView
} from "react-native";
import Dialog from "react-native-dialog";
import { SearchBar, Card } from "react-native-elements";
import axios from "axios";

const width = Dimensions.get("window").width;
var newItem;

class RecyclerRemoval extends React.Component {
  static navigationOptions = {
    title: "Recycler Removal",

    headerStyle: {
      backgroundColor: "#e3e3e3"
    },

    headerTintColor: "#606070"
  };
  constructor(props) {
    super(props);
    //
    console.log();
    //setting default state
    this.state = {
      userid: props.navigation.state.params.senddata.userid,
      isLoading: true,
      type:props.navigation.state.params.senddata.type,
      search: "",
      modalVisible: false,
      business: "",
      trading: "",
      Phone: "",
      Address: "",
      selectedValue: "",
      businesskey: "",
      refreshing: false
    };
    console.log("Removal List");

    this.arrayholder = [];
  }
  componentWillMount() {
    axios
      .get("https://www.takatavinview.com/business/getdetailed/")
      .then(response => {
        var dataset = response.data;
        console.log("Data Source", dataset[1]);
        this.setState(
          {
            isLoading: false,
            dataSource: dataset
          },
          function() {
            this.arrayholder = dataset;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };
  _onRefresh = () => {
    this.setState({ refreshing: true }); axios
    .get("https://www.takatavinview.com/business/getdetailed/")
    .then(response => {
      var dataset = response.data;
      console.log("Data Source", dataset[1]);
      this.setState(
        {
          isLoading: false,
          dataSource: dataset
        },
        function() {
          this.arrayholder = dataset;
        }
      );
    })
    .catch(error => {
      console.error(error);
    }).then(() => {
      this.setState({ refreshing: false });
    });
   
  };

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.business_name
        ? item.business_name.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text
    });
  }
  handleCancel = () => {
    this.setState({ modalVisible: false });
  };

  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ modalVisible: false });
    let senddata = {
      userid: this.state.userid,
      businessID: this.state.businesskey,
      type:this.state.type
    };
    this.props.navigation.navigate("vin", { senddata });
  };

  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: "90%",
          backgroundColor: "#e3dbcd"
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
        <TouchableOpacity style={styles.buttonstyle}>
          <Text
            style={{ textAlign: "center" }}
            onPress={() => {
              console.log(this.state.userid);
              let senddata = {
                userid: this.state.userid
              };
              this.props.navigation.navigate("newBusi", { senddata });
            }}
          >
            Create a new Bussiness
          </Text>
        </TouchableOpacity>

        {/* <Picker
          style={{ width: width }}
          selectedValue={this.state.selectedValue}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ selectedValue: itemValue })
          }
        >
          <Picker.Item label="Business Name" value="java" />
          <Picker.Item label="Trading Name" value="js" />
        </Picker> */}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <SearchBar
            round
            searchIcon={{ size: 24 }}
            onChangeText={text => this.SearchFilterFunction(text)}
            onClear={text => this.SearchFilterFunction("")}
            placeholder="Type Here..."
            value={this.state.search}
          />

          <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            
            //Item Separator View
            renderItem={({ item }) => (
              // Single Comes here which will be repeatative for the FlatListItems
              <Text
                style={styles.textStyle}
                onPress={() =>
                  this.setState({
                    modalVisible: true,
                    business: item.business_name,
                    trading: item.Trading_name,
                    Phone: item.business_phone,
                    Address:
                      item.street + "," + item.state + "," + item.postcode,
                    businesskey: item.id
                  })
                }
              >
                {item.business_name}
              </Text>
            )}
            enableEmptySections={true}
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
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
    marginTop: Platform.OS == "ios" ? 0 : 0
  },
  textStyle: {
    padding: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  buttonstyle: {
    marginTop: 10,
    backgroundColor: "#00BCD4",
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
    width: width
  },
  pickerBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    marginTop: 10
  },
  pickerBoxInner: {
    borderWidth: 0.6,
    borderColor: "#0000",
    borderRadius: 2,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: 37
  },
  pickerBoxIcon: {
    position: "absolute",
    right: 0,
    fontSize: 23,
    color: "#0000"
  },
  pickerStyle: {
    width: "120%",
    paddingBottom: 0,
    paddingLeft: 0,
    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
    left: -25,
    position: "absolute",
    backgroundColor: "transparent"
  }
});

export default RecyclerRemoval;
