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
import PickleArea from './components/pickleList';
import VinEnter from './components/enterVin';
import Details from './components/submission'

export default class App extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
   
  };
 
  render() {
    return <AppContainer />;
  }
}

const RootStack = createStackNavigator(
  {
    home: { screen: HomePage },
    airbag: {screen: AirbagCollection},
    removal: {screen: RecyclerRemoval, navigationOptions : {
      title: "Recycler Removal",
     
  
      headerStyle: {
        backgroundColor: "#e3e3e3"
  
      },
  
      headerTintColor: "#606070"
    }},
    business: {screen: Business},
    test: {screen: Test},
    recycler: {screen: Recycler},
    newBusi: {screen: NewBusiness},
    pickle: {screen: PickleArea},
    vin:{screen: VinEnter},
    detail:{screen: Details}
    
  },
  {
    initialRouteName: "home",
    
  }
);

const AppContainer = createAppContainer(RootStack);
