import {
    StyleSheet,
    View,
    Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import * as KakaoLogin from '@react-native-seoul/kakao-login';  
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";

interface Props {
    setNicknameExists : ()=>void;
}

function Kakao({setNicknameExists}:Props) {
    const login = () => {
        KakaoLogin.login().then((result) => {
            const accesstoken =result.accessToken;
            axios({
                method:'post',
                url: Config.API_APP_KEY + '/v1/login',
                data:{
                    'social' : 'kakao',
                    'token' : accesstoken
                },
            }).then(res=>{
                AsyncStorage.setItem('AccessToken',res.headers["authorization"].toString())
                AsyncStorage.setItem('RefreshToken',res.headers["authorization-refresh"].toString())
                AsyncStorage.setItem('userAlarm',res.data["userAlarm"].toString())
                AsyncStorage.setItem('userImage',res.data["userImage"].toString())
                AsyncStorage.setItem('userIdx',res.data["userIdx"].toString())
                if (res.data["userNickname"]) {
                    AsyncStorage.setItem('userNickname',res.data["userNickname"].toString())
                } else {
                    setNicknameExists();
                }
            }).catch(err => {
                console.log(err)
            })
        }).catch((error) => {
            if (error.code === 'E_CANCELLED_OPERATION') {
                console.log("Login Cancel", error.message);
            } else {
                console.log(`Login Fail(code:${error.code})`, error.message);
            }
        });
    };

    return (
      <View style={{ flex: 1, justifyContent:'center',alignItems:'center' }}>
        <TouchableOpacity style={styles.login_btn} onPress={()=>login()}>
            <Image source={require("@assets/sociallogo/kakao.png")} style={styles.login_logo} />
            <Text style={styles.login_text}>카카오로 로그인하기</Text>
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
        backgroundColor:'#F9E000',

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
export default Kakao;