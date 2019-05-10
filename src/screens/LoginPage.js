import React, { Component } from "react";
import dva, { connect } from "dva";
import { View, Text, TouchableOpacity } from "react-native";
import NewComponent from "../components/NewComponent";

@connect(({ user }) => ({
  userInformation: user.userInformation
}))
class LoginPage extends Component {
  onPressLogin = () => {
    console.log("onPressLogin");
    const { dispatch } = this.props;
    dispatch({ type: "user/login" });
  };

  onPressFetch = () => {
    console.log("onPress");
    const { dispatch } = this.props;
    dispatch({ type: "user/fetchData" });
  };

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
        <TouchableOpacity onPress={this.onPressLogin}>
          <Text style={{ fontSize: 24 }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressFetch}>
          <Text style={{ fontSize: 24 }}>Fetch</Text>
        </TouchableOpacity>
        <NewComponent />
      </View>
    );
  }
}

export default LoginPage;
