import React from 'react';
import {StyleSheet, Text, View, TextInput, Dimensions, ScrollView,Alert, TouchableOpacity} from 'react-native'
import {Card, CheckBox, Image} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Spinner from "react-native-loading-spinner-overlay";
import axios from 'axios'

const width = Dimensions.get("window").width;
class Details extends React.Component {
    constructor(props, {}) {
      super(props);
      
      console.log(props.navigation.state.params.send.data[1]);
      var vininfo = props.navigation.state.params.send.data;
      var location;
      if(vininfo[1]){
        location = 'Driver  Passenger'
      }else{
        location = vininfo[0].AirbagLocation
      }
      this.state = {
        username:props.navigation.state.params.send.username ,
        sitelocation: props.navigation.state.params.send.bussID,
        vin: vininfo[0].VIN,
        Airbaglocation: location,
        Make: vininfo[0].Make,
        Model: vininfo[0].Model,
        PRAnum: vininfo[0].PRANum,
        Series: vininfo[0].Series,
        Year: vininfo[0].Year,
        image: null,
        image2: null,
        base641: null,
        base642: null,
        check1: false,
        spinner: false,
      };

    }
    static navigationOptions = {
      headerTitleStyle: {
        textAlign: "center",
        flex: 1,
      },
      title: "Submission",
    };
    submission=()=> {
      //console.log("Submission", this.state.base641);
      if (this.state.check1 && this.state.image && this.state.image2) {
        this.setState({
          spinner: true,
        });
        axios
          .post("http://192.168.0.20:5000/update", {
            image1: this.state.base641,
            image2: this.state.base642,
            site: this.state.sitelocation,
            vin: this.state.vin,
            user: this.state.username,
          })
          .then((response) => {
            console.log("Going Next");
            console.log("response", response.data);
            countairbag = response.data.count;
            console.log(countairbag);
            this.setState({
              spinner: false,
            });
            Alert.alert(
              "Submission Completed",
              "Want to do another submission?",
              [
                {
                  text: "Yes",
                   onPress: () =>{ let senddata ={
                    userid: this.state.username,
                    businessID: this.state.sitelocation
                  }
                  this.props.navigation.navigate("vin",{senddata});
                     }
                     ,
                },
                {
                  text: "No",
                   onPress: () => this.props.navigation.navigate("home"),
                },
              ],
              { cancelable: false }
            );
          })
          .catch((error) => {});
      } else {
        Alert.alert(
          "",
          "Please upload all the images and check the box inorder to complete the submission",
          [{ text: "OK", onPress: () => {} }],
          { cancelable: false }
        );
      }
    }
    render() {
      let { image, image2 } = this.state;
      return (
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={"Updating..."}
            textStyle={styles.spinnerTextStyle}
          />
          <ScrollView>
            <Text style={styles.title}>
              Site Location : {this.state.sitelocation}
            </Text>
            <Card title="VIN Details" style={{ padding: 10, margin: 10 }}>
              <Text style={{ marginTop: 5, fontSize: 0.05 * width }}>
                VIN: {this.state.vin}
              </Text>
              <Text style={{ marginTop: 5, fontSize: 0.05 * width }}>
                Make: {this.state.Make}
              </Text>
              <Text style={{ marginTop: 5, fontSize: 0.05 * width }}>
                Model: {this.state.Model}
              </Text>
              <Text style={{ marginTop: 5, fontSize: 0.05 * width }}>
                Series: {this.state.Series}
              </Text>
              <Text style={{ marginTop: 5, fontSize: 0.05 * width }}>
                PRANum: {this.state.PRAnum}
              </Text>
              <Text style={{ marginTop: 5, fontSize: 0.05 * width }}>
                Year: {this.state.Year}
              </Text>
              <Text style={{ marginTop: 5, fontSize: 0.05 * width }}>
                Airbag Location: {this.state.Airbaglocation}{" "}
              </Text>
            </Card>
            <View style={{ alignContent: "center" }}>
              <Text
                style={{
                  fontSize: 0.06 * width,
                  fontWeight: "bold",
                  marginTop: 30,
                }}
              >
                Upload the Images(Mandatory)
              </Text>
            </View>
            <View
              style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            >
              <Text style={{ fontSize: 0.048 * width, marginTop: 30 }}>
                {" "}
                VIN Plate
              </Text>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={this._pickSource1}
              >
                <Text> Attach</Text>
              </TouchableOpacity>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
              )}
              <Text style={{ fontSize: 0.048 * width, marginTop: 30 }}>
                Airbag with VIN Plate
              </Text>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={this._pickSource2}
                // onPress={() => this.props.navigation.navigate('home')}
              >
                <Text> Attach</Text>
              </TouchableOpacity>
              {image2 && (
                <Image
                  source={{ uri: image2 }}
                  style={{ marginTop: 20, width: 200, height: 200 }}
                />
              )}
              <CheckBox
                center
                title="Confirm the airbag for the above vehicle has been removed"
                checked={this.state.check1}
                onPress={() =>
                  this.setState({
                    check1: !this.state.check1,
                  })
                }
              />
   
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={this.submission}
              >
                <Text> Upload and Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }
   
    _pickSource1 = async () => {
      Alert.alert(
        "",
        "Choose an Image Source",
        [
          { text: "Camera", onPress: () => this._pickImage1(true) },
          {
            text: "Gallery",
            onPress: () => this._pickImage1(false),
          },
        ],
        { cancelable: false }
      );
    };
    _pickImage1 = async (camera) => {
      if (camera) {
        let { camera } = await Permissions.askAsync(Permissions.CAMERA);
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: false,
          aspect: [4, 3],
          base64: true,
          quality: 1,
        });
        //  console.log(result);
        if (!result.cancelled) {
          this.setState({ image: result.uri, base641: result.base64 });
        }
      } else {
        let { camera_roll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          base64: true,
          quality: 1,
        });
   
        if (!result.cancelled) {
          this.setState({ image: result.uri, base641: result.base64 });
        }
      }
    };
   
    _pickSource2 = async () => {
      Alert.alert(
        "",
        "Choose an Image Source",
        [
          { text: "Camera", onPress: () => this._pickImage2(true) },
          {
            text: "Gallery",
            onPress: () => this._pickImage2(false),
          },
        ],
        { cancelable: false }
      );
    };
    _pickImage2 = async (camera) => {
      if (camera) {
        let { camera } = await Permissions.askAsync(Permissions.CAMERA);
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: false,
          aspect: [4, 3],
          base64: true,
          quality: 0.2,
        });
        //console.log(result);
        if (!result.cancelled) {
          this.setState({ image2: result.uri, base642: result.base64 });
        }
      } else {
        let { camera_roll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          base64: true,
          quality: 0.2,
        });
   
        if (!result.cancelled) {
          this.setState({ image2: result.uri, base642: result.base64 });
        }
      }
    };
  }
  const styles = StyleSheet.create({
    spinnerTextStyle: {
      color: "#FFF",
    },
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    textInput: {
      borderColor: "black",
      backgroundColor: "#D3D3D3",
      width: 320,
      height: 40,
      borderWidth: 1,
      borderStyle: "solid",
      fontSize: 0.03 * width,
      borderRadius: 25,
      marginBottom: 5,
   
      padding: 10,
      overflow: "hidden",
    },
    button: {
      marginTop: 20,
      backgroundColor: "#00BCD4",
      padding: 10,
      alignSelf: "center",
   
      borderRadius: 10,
      width: 180,
    },
    wrapContent: {
      position: "relative",
      flexDirection: "row",
      backgroundColor: "#add8e6",
      alignItems: "center",
      justifyContent: "flex-start",
      margin: 10,
      height: 40,
      paddingHorizontal: 10,
    },
    boxSelect: {
      justifyContent: "flex-start",
      alignContent: "center",
      borderRadius: 5,
      paddingLeft: 10,
      width: width - 40,
    },
    alignCenter: {
      lineHeight: 40,
      color: "black",
      alignItems: "center",
    },
    title: {
      // fontFamily: "aer",
      fontSize: 0.05 * width,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
 export default Details;  