import React from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  Button,
  Platform,
} from "react-native";
import { Image } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import data from "../api/configure";
import axios from "axios";
import {username, businessID} from './userbusiness';

const width = Dimensions.get("window").width;

class HomePage extends React.Component {
  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    headerShown: false,
  };
  submission = () => {
    console.log(this.state.username, this.state.password);
   var  datasend = {
      username: this.state.username,
      password: this.state.password
    }
    
    axios.post("http://192.168.0.20:5000/userLogin",datasend).then((response) => {
      if(response.data != "NotAuthorized"){

        console.log(response.data.id);
        this.setState({error: null,message: null,userid: response.data.id, businessID: response.data.bid})
        this.props.navigation.navigate("airbag", { userid: this.state.userid, busiID: this.state.businessID });
      }else{
this.setState({error: 'nice'});
      }
    }).catch((error) =>{
      console.log(error.message);
      this.setState({message: error.message + ' Please try again after some time'});
    });

   // 
  };
  state = {
    username: " ",
    password: " ",
    spinner: false,
    error: null,
    message: null,
    userid: '',
    businessID: '',
  };
  usernamechange = (event) => {
    let processData = event.nativeEvent.text;
  
    this.setState({ username: processData });
  };
  passwordupdate = (event) => {
    let processData = event.nativeEvent.text;
    this.setState({ password: processData });
  };
  render() { let{error, message} = this.state;
    return (
      <View
        style={{
          flex: 3,
          backgroundColor: "#e3dbcd",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} >
          <View style={{ alignItems: "center" }}>
            <Image
              style={{ width: 150, height: 150 }}
              source={require("../img/icon1.jpg")}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: width * 0.05,
                fontWeight: "bold",
                textAlign: "justify",
                marginTop: 20,
              }}
            >
              TAKATA PICKLES
            </Text>

          </View>
          {error && (<View>
            <Text style={{textShadowColor:'#FF0000', color:'#FF0000'}}>Please enter the correct username or password</Text>
        </View>)}
        {message && (<View>
            <Text style={{textShadowColor:'#FF0000', color:'#FF0000'}}>{message}</Text>
        </View>)}
          <Text
            style={{
              fontSize: width * 0.05,
              marginTop: 20,
              alignContent: "space-around",
            }}
          >
            User ID
          </Text>
          <TextInput style={styles.textinput} onChange={this.usernamechange} />
          <Text
            style={{
              fontSize: width * 0.05,
              marginTop: 5,
            }}
          >
            Password
          </Text>
          <TextInput
            secureTextEntry={true}
            style={styles.textinput}
            onChange={this.passwordupdate}
          />
          {/* <Button onPress={()=>  alert('You tapped the button!')} title="This looks great!" /> */}
          <TouchableOpacity
            style={styles.buttonstyle}
            onPress={this.submission}
          >
            <Text style={{ textAlign: "center" }}>Login</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textinput: {
    borderColor: "black",
    backgroundColor: "#D3D3D3",
    width: width - 80,
    height: 40,
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 0.04 * width,
    borderRadius: 25,
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
export default HomePage;
