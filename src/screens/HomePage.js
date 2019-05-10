import React, { Component } from "react";
import dva, { connect } from "dva";
import { Text, View } from "react-native";

@connect(({ user }) => ({
  userInformation: user.userInformation
}))
export default class HomePage extends Component {
  render() {
    const { userInformation } = this.props;
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
        <Text style={{ fontSize: 24 }}>
          {userInformation && userInformation.length}
        </Text>
      </View>
    );
  }
}
