import React, { Component } from "react";
import dva, { connect } from "dva";
import { View, Text, TouchableOpacity } from "react-native";

const LoginPage = connect()(({ dispatch }) => {
  const onPress = () => {
    dispatch({ type: "user/fetchData" });
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <Text style={{ fontSize: 24 }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
});
export default LoginPage;
