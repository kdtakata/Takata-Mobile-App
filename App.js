import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import axios from 'axios';
import HomePage from "./components/homepage";
import AirbagCollection from './components/AirbagCollection';
import RecyclerRemoval from './components/Recyclerremoval';
import Test from './components/test';
import Business from './components/business';
import Recycler from './components/RecyclerCollection';
import NewBusiness from './components/newBusiness';

export default class App extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    axios.defaults.baseURL = 'http://192.168.0.20:5000';
  };
 
  render() {
    return <AppContainer />;
  }
}

const RootStack = createStackNavigator(
  {
    home: { screen: HomePage },
    pickle: {screen: AirbagCollection},
    removal: {screen: RecyclerRemoval},
    business: {screen: Business},
    test: {screen: Test},
    recycler: {screen: Recycler},
    newBusi: {screen: NewBusiness}
    
  },
  {
    initialRouteName: "home",
    
  }
);

const AppContainer = createAppContainer(RootStack);
