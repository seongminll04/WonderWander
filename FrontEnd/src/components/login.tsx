import {
    StyleSheet,
    View,
    Text, Image, TouchableOpacity } from "react-native";
  import React from "react";
import Kakao from "./login/kakao";
import Google from "./login/google";
import Naver from "./login/naver";
  
function Login() {

    return (
      <View style={{ flex: 1, justifyContent:'center',alignItems:'center' }}>
        <Kakao/>
        <Google/>
        <Naver/>
      </View>
    );
}

const styles = StyleSheet.create({
   
});
export default Login;