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
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
const width = Dimensions.get("window").width;
export default class NewBusiness extends Component {
  constructor(props) {
    super(props);
    console.log();
    this.state = {
      userid: props.navigation.state.params.senddata.userid,
      business: "",
      busierror: null,
      trading: "",
      bemail: "",
      busiemail: null,
      abn: "",
      bphone: "",
      busiphone: null,
      fax: "",
      website: "",
      street: "",
      streeterror: null,
      city: "",
      cityerror: null,
      state: "",
      stateerror: null,
      postcode: "",
      posterror: null,
      fname: "",
      lname: "",
      email: "",
      mob: "",
      accname: "",
      accnameerror: null,
      bsb: "",
      bsberror: null,
      accno: "",
      accerror: null,
      spinner: false
    };
  }

  businessnamechange = event => {
    let processData = event.nativeEvent.text;
    console.log('Business name', processData);
    if (processData === "") {
      this.setState({ busierror: "null" });
    }
    this.setState({ business: processData });
  };
  tradingnamechange = event => {
    let processData = event.nativeEvent.text;
    this.setState({ trading: processData });
  };
  businessemailchange = event => {
    let processData = event.nativeEvent.text;
    if (processData === "") {
      this.setState({ busiemail: "null" });
    }
    this.setState({ bemail: processData });
  };
  abnchange = event => {
    let processData = event.nativeEvent.text;
    this.setState({ abn: processData });
  };
  businessphonechange = event => {
    let processData = event.nativeEvent.text;
    if (processData === "") {
      this.setState({ busiphone: "null" });
    }
    this.setState({ bphone: processData });
  };
  faxchange = event => {
    let processData = event.nativeEvent.text;
    this.setState({ fax: processData });
  };
  websitechange = event => {
    let processData = event.nativeEvent.text;
    this.setState({ website: processData });
  };
  streetchange = event => {
    let processData = event.nativeEvent.text;
    if (processData === "") {
      this.setState({ streeterror: "null" });
    }
    this.setState({ street: processData });
  };
  citychange = event => {
    let processData = event.nativeEvent.text;
    if (processData === "") {
      this.setState({ cityerror: "null" });
    }
    this.setState({ city: processData });
  };
  statechange = event => {
    let processData = event.nativeEvent.text;
    if (processData === "") {
      this.setState({ stateerror: "null" });
    }
    this.setState({ state: processData });
  };
  postcodechange = event => {
    let processData = event.nativeEvent.text;
    if (processData === "") {
      this.setState({ posterror: "null" });
    }
    this.setState({ postcode: processData });
  };
  firstnamechange = event => {
    let processData = event.nativeEvent.text;
    this.setState({ fname: processData });
  };
  lastnamechange = event => {
    let processData = event.nativeEvent.text;
    this.setState({ lname: processData });
  };
  emailchange = event => {
    let processData = event.nativeEvent.text;
    this.setState({ email: processData });
  };
  mobilenamechange = event => {
    let processData = event.nativeEvent.text;

    this.setState({ mob: processData });
  };
  accnamechange = event => {
    let processData = event.nativeEvent.text;
    if (processData === "") {
      this.setState({ accnameerror: "null" });
    }
    this.setState({ accname: processData });
  };
  bsbchange = event => {
    let processData = event.nativeEvent.text;
    if (processData === "") {
      this.setState({ bsberror: "null" });
    }
    this.setState({ bsb: processData });
  };
  accnumbchange = event => {
    let processData = event.nativeEvent.text;
    if (processData === "") {
      this.setState({ accerror: "null" });
    }
    this.setState({ accno: processData });
  };

  submission = () => {
    if (
      this.state.business === "" &&
      this.state.bemail === "" &&
      this.state.bphone === "" &&
      this.state.street === "" &&
      this.state.city === "" &&
      this.state.postcode === "" &&
      this.state.accname === "" &&
      this.state.bsb === "" &&
      this.state.accno === ""
    ) {
      if (this.state.business === "") {
        this.setState({ busierror: "nice" });
      }
      if (this.state.bemail === "") {
        this.setState({ busiemail: "nice" });
      }
      if (this.state.bphone === "") {
        this.setState({ busiphone: "nice" });
      }
      if (this.state.street === "") {
        this.setState({ streeterror: "nice" });
      }
      if (this.state.city === "") {
        this.setState({ cityerror: "nice" });
      }
      if (this.state.state === "") {
        this.setState({ stateerror: "nice" });
      }
      if (this.state.postcode === "") {
        this.setState({ posterror: "nice" });
      }
      if (this.state.accname === "") {
        this.setState({ accnameerror: "nice" });
      }
      if (this.state.bsb === "") {
        this.setState({ bsberror: "nice" });
      }
      if (this.state.accno === "") {
        this.setState({ accerror: "nice" });
      }
      console.log("Nice");
    } else {
      this.setState({ spinner: true });
      let sendData = {
        userid: this.state.userid,
        business: this.state.business,
        trading: this.state.trading,
        bemail: this.state.bemail,
        abn: this.state.abn,
        bphone: this.state.bphone,
        fax: this.state.fax,
        website: this.state.website,
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        postcode: this.state.postcode,
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        mob: this.state.mob,
        accname: this.state.accname,
        bsb: this.state.bsb,
        accno: this.state.accno
      };
      axios.post('http://192.168.0.20:5000/newBusi',sendData).then((response) => {

        this.props.navigation.navigate('removal');
      });
      console.log("work");
    }
  };
  render() {
    return (
      <>
        <View style={{ flex: 1, padding: 30, backgroundColor: "#f5fcff" }}>
          <Spinner
            visible={this.state.spinner}
            textContent={"Updating..."}
            textStyle={styles.spinnerTextStyle}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
          >
            <ScrollView>
              <Text>Business Name*</Text>
              <TextInput
                onChange={this.businessnamechange}
                style={styles.textinput}
              ></TextInput>
              {this.state.busierror && (
                <View>
                  <Text
                    style={{ textShadowColor: "#FF0000", color: "#FF0000" }}
                  >
                    This field is required
                  </Text>
                </View>
              )}
              <Text>Trading Name</Text>
              <TextInput
                style={styles.textinput}
                onChange={this.tradingnamechange}
              ></TextInput>
              <Text>Business Email*</Text>
              <TextInput
                style={styles.textinput}
                onChange={this.businessemailchange}
              ></TextInput>
              {this.state.busiemail && (
                <View>
                  <Text
                    style={{ textShadowColor: "#FF0000", color: "#FF0000" }}
                  >
                    This field is required
                  </Text>
                </View>
              )}
              <Text>ABN*</Text>
              <TextInput
                style={styles.textinput}
                onChange={this.abnchange}
              ></TextInput>
              <Text>Business Phone*</Text>
              <TextInput
                style={styles.textinput}
                keyboardType="number-pad"
                onChange={this.businessphonechange}
              ></TextInput>
              {this.state.busiphone && (
                <View>
                  <Text
                    style={{ textShadowColor: "#FF0000", color: "#FF0000" }}
                  >
                    This field is required
                  </Text>
                </View>
              )}
              <Text>Fax</Text>
              <TextInput
                style={styles.textinput}
                onChange={this.faxchange}
              ></TextInput>
              <Text>Website</Text>
              <TextInput
                style={styles.textinput}
                onChange={this.websitechange}
              ></TextInput>

              <Text style={{ marginTop: 10, fontWeight: "bold" }}>Address</Text>
              <Text>Street*</Text>
              <TextInput
                style={styles.textinput}
                onChange={this.streetchange}
              ></TextInput>
              {this.state.streeterror && (
                <View>
                  <Text
                    style={{ textShadowColor: "#FF0000", color: "#FF0000" }}
                  >
                    This field is required
                  </Text>
                </View>
              )}
              <Text>City*</Text>
              <TextInput
                style={styles.textinput}
                onChange={this.citychange}
              ></TextInput>
              {this.state.cityerror && (
                <View>
                  <Text
                    style={{ textShadowColor: "#FF0000", color: "#FF0000" }}
                  >
                    This field is required
                  </Text>
                </View>
              )}
              <Text>State*</Text>
              <TextInput
                style={styles.textinput}
                onChange={this.statechange}
              ></TextInput>
              {this.state.stateerror && (
                <View>
                  <Text
                    style={{ textShadowColor: "#FF0000", color: "#FF0000" }}
                  >
                    This field is required
                  </Text>
                </View>
              )}
              <Text>PostCode*</Text>

              <TextInput
                style={styles.textinput}
                keyboardType="number-pad"
                onChange={this.postcodechange}
              ></TextInput>
              {this.state.posterror && (
                <View>
                  <Text
                    style={{ textShadowColor: "#FF0000", color: "#FF0000" }}
                  >
                    This field is required
                  </Text>
                </View>
              )}

              <Text
                style={{ marginTop: 10, fontWeight: "bold", marginBottom: 5 }}
              >
                Contact Details*
              </Text>
              <Text>First Name</Text>
              <TextInput
                style={styles.textinput}
                onChange={this.firstnamechange}
              ></TextInput>
              <Text>Last Name</Text>
              <TextInput
                style={styles.textinput}
                onChange={this.lastnamechange}
              ></TextInput>
              <Text>Email</Text>
              <TextInput
                style={styles.textinput}
                onChange={this.emailchange}
              ></TextInput>
              <Text>Mobile</Text>
              <TextInput
                style={styles.textinput}
                onChange={this.mobilenamechange}
              ></TextInput>
              <Text
                style={{ marginTop: 10, fontWeight: "bold", marginBottom: 5 }}
              >
                Account Details*
              </Text>
              <Text>Account Name</Text>
              <TextInput
                style={styles.textinput}
                onChange={this.accnamechange}
              ></TextInput>
              {this.state.accnameerror && (
                <View>
                  <Text
                    style={{ textShadowColor: "#FF0000", color: "#FF0000" }}
                  >
                    This field is required
                  </Text>
                </View>
              )}
              <Text>BSB</Text>
              <TextInput
                keyboardType="number-pad"
                maxLength={6}
                style={styles.textinput}
                onChange={this.bsbchange}
              ></TextInput>
              {this.state.bsberror && (
                <View>
                  <Text
                    style={{ textShadowColor: "#FF0000", color: "#FF0000" }}
                  >
                    This field is required
                  </Text>
                </View>
              )}
              <Text>Account Number</Text>
              <TextInput
                keyboardType="number-pad"
                maxLength={9}
                style={styles.textinput}
                onChange={this.accnumbchange}
              ></TextInput>
              {this.state.accerror && (
                <View>
                  <Text
                    style={{ textShadowColor: "#FF0000", color: "#FF0000" }}
                  >
                    This field is required
                  </Text>
                </View>
              )}

              <Text
                style={{ marginTop: 10, fontWeight: "bold", marginBottom: 5 }}
              >
                * Required
              </Text>

              <TouchableOpacity style={styles.buttonstyle}>
                <Text
                  style={{ textAlign: "center" }}
                  // onPress={() => this.props.navigation.navigate("removal")}
                  onPress={this.submission}
                >
                  Complete Registration
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
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
    overflow: "hidden"
  },
  intextinput: {
    borderColor: "red",
    width: width - 80,
    height: 40,
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 0.04 * width,
    borderRadius: 5,
    marginBottom: 5,
    padding: 10,
    overflow: "hidden"
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
