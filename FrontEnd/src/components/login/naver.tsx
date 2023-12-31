import {
    StyleSheet,
    View,
    Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import NaverLogin from '@react-native-seoul/naver-login';
import axios from "axios";
import Config from "react-native-config";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
    setNicknameExists : ()=>void;
}
function Naver({setNicknameExists}:Props) {
    const login = () => {
        NaverLogin.login({appName:Config.APP_NAME!,consumerKey:Config.NAVER_KEY!,consumerSecret:Config.NAVER_SECRET!,serviceUrlScheme:'test'}).then((result) => {
            if (result.isSuccess) {
                const accesstoken =result.successResponse?.accessToken;
                axios({
                    method:'post',
                    url: Config.API_APP_KEY+'/login',
                    data:{
                        social : 'naver',
                        token : accesstoken
                    }
                }).then(res=>{
                    AsyncStorage.setItem('AccessToken',res.headers["authorization"].toString())
                    AsyncStorage.setItem('RefreshToken',res.headers["authorization-refresh"].toString())
                    AsyncStorage.setItem('userAlarm',res.data["userAlarm"].toString())
                    AsyncStorage.setItem('userImage',res.data["userImage"].toString())
                    if (res.data["userNickname"]) {
                        AsyncStorage.setItem('userNickname',res.data["userNickname"].toString())
                    } else {
                        setNicknameExists();
                    }
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
    
    return (
      <View style={{ flex: 1, justifyContent:'center',alignItems:'center' }}>
        <TouchableOpacity style={styles.login_btn} onPress={()=>login()}>
            <Image source={require("@assets/sociallogo/naver.png")} style={styles.login_logo} />
            <Text style={styles.login_text}>네이버로 로그인하기</Text>
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