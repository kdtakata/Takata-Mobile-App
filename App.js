import React, { Component } from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomePage from "./components/homepage";
import AirbagCollection from "./components/AirbagCollection";
import RecyclerRemoval from "./components/Recyclerremoval";
import Test from "./components/test";
import Business from "./components/business";
import Recycler from "./components/RecyclerCollection";
import NewBusiness from "./components/newBusiness";
import PickleArea from "./components/pickleList";
import VinEnter from "./components/enterVin";
import Details from "./components/submission";

export default class App extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return <AppContainer />;
  }
}

const RootStack = createStackNavigator(
  {
    home: { screen: HomePage },
    airbag: { screen: AirbagCollection },
    removal: {
      screen: RecyclerRemoval,
      navigationOptions: {
        title: "Recycler Removal",
        headerStyle: {
          backgroundColor: "#e3e3e3"
        },
        headerTintColor: "#606070"
      }
    },
    business: { screen: Business },
    test: { screen: Test },
    recycler: { screen: Recycler },
    newBusi: {
      screen: NewBusiness,
      navigationOptions: {
        title: "New Business Registration",
        headerStyle: {
          backgroundColor: "#e3e3e3"
        },
        headerTintColor: "#606070"
      }
    },
    pickle: {
      screen: PickleArea,
      navigationOptions: {
        title: "Pickle Area Location",
        headerStyle: {
          backgroundColor: "#e3e3e3"
        },
        headerTintColor: "#606070"
      }
    },
    vin: {
      screen: VinEnter,
      navigationOptions: {
        title: "VIN",
        headerStyle: {
          backgroundColor: "#e3e3e3"
        },
        headerTintColor: "#606070"
      }
    },
    detail: {
      screen: Details,
      navigationOptions: {
        title: "Submission",
        headerStyle: {
          backgroundColor: "#e3e3e3"
        },
        headerTintColor: "#606070"
      }
    }
  },
  {
    initialRouteName: "home"
  }
);

const AppContainer = createAppContainer(RootStack);
