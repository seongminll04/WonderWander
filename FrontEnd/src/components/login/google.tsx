import {
    StyleSheet,
    View,
    Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Config from "react-native-config";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface Props {
    setNicknameExists : ()=>void;
}

function Google({setNicknameExists}:Props) {
    useEffect(() => {
        GoogleSignin.configure({
          webClientId: Config.GOOGLE_KEY,
        });
      }, []);
    const login = async () => {
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        GoogleSignin.signIn().then((result) => {
            console.log("Login Success", JSON.stringify(result));
            const accesstoken =result.idToken;
            console.log(accesstoken)
            axios({
                method:'post',
                url: Config.API_APP_KEY + '/v1/login',
                data:{
                    'social' : 'google',
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
        <TouchableOpacity style={styles.login_btn} onPress={()=>{login()}}>
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