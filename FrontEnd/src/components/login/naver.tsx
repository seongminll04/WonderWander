import {
    StyleSheet,
    View,
    Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import NaverLogin from '@react-native-seoul/naver-login';
import axios from "axios";
  

function Naver() {

    return (
      <View style={{ flex: 1, justifyContent:'center',alignItems:'center' }}>
        <TouchableOpacity style={styles.login_btn} onPress={()=>login()}>
            <Image source={require("@assets/sociallogo/naver.png")} style={styles.login_logo} />
            <Text style={styles.login_text}>네이버로 로그인하기</Text>
        </TouchableOpacity>
      </View>
    );
}

const login = () => {
    NaverLogin.login({appName:'com.wonderwander',consumerKey:'A0vD7egeFm1ODK4M8t6g',consumerSecret:'oTKt5idzMG',serviceUrlScheme:'test'}).then((result) => {
        // console.log("Login Success", JSON.stringify(result));
        if (result.isSuccess) {
            const accesstoken =result.successResponse?.accessToken;
            console.log(accesstoken)
            axios({
                method:'post',
                url:'',
                data:{
                    social : 'naver',
                    token : accesstoken
                }
            }).then(res=>{
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    }).catch((error) => {
        if (error.code === 'E_CANCELLED_OPERATION') {
            console.log("Login Cancel", error.message);
        } else {
            console.log(`Login Fail(code:${error.code})`, error.message);
        }
    });
};
const styles = StyleSheet.create({
    login_btn:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:250,
        height:50,
        backgroundColor:'#03C75A',

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
        color:'white'
    }
});
export default Naver;