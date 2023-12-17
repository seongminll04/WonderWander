import {
    StyleSheet,
    View,
    Text, Image, TouchableOpacity } from "react-native";
  import React from "react";
  
function Google() {

    return (
      <View style={{ flex: 1, justifyContent:'center',alignItems:'center' }}>
        <TouchableOpacity style={styles.login_btn}>
            <Image source={require("@assets/sociallogo/google.png")} style={styles.login_logo} />
            <Text style={styles.login_text}>구글로 로그인하기</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    login_btn:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:250,
        height:50,
        backgroundColor:'#FFFFFF',

        borderRadius:10,
        borderColor:'#B9BCBE',
        borderWidth: 1,
    },
    login_logo:{
        width:25,
        height:25,
        marginRight:20
    },
    login_text:{
        color:'#3B3B3B'
    }
});
export default Google;