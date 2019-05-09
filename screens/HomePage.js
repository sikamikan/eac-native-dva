import React, { Component } from "react";
import dva, { connect } from "dva";

import { Text, View } from "react-native";

export default class HomePage extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text style={{ fontSize: 24 }}>Welcome</Text>
      </View>
    );
  }
}
