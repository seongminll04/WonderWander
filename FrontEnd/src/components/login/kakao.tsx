import {
    StyleSheet,
    View,
    Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import * as KakaoLogin from '@react-native-seoul/kakao-login';  
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";
import { useDispatch } from "react-redux";
import { setLogin } from "@/store/actions";

interface Props {
    nicknameRegist : ()=>void;
}

function Kakao({nicknameRegist}:Props) {
    const dispatch = useDispatch();
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
                AsyncStorage.setItem('alarm',res.data["alarm"].toString())
                AsyncStorage.setItem('image',res.data["image"].toString())
                AsyncStorage.setItem('follower',res.data["follower"].toString())
                AsyncStorage.setItem('following',res.data["following"].toString())
                AsyncStorage.setItem('intro',res.data["intro"].toString())
                AsyncStorage.setItem('userIdx',res.data["userIdx"].toString())
                if (res.data["nickname"]) {
                    AsyncStorage.setItem('nickname',res.data["nickname"].toString())
                    dispatch(setLogin(true))
                } else {
                    nicknameRegist();
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
        <TouchableOpacity style={styles.login_btn} onPress={()=>login()}>
            <Image source={require("@assets/sociallogo/kakao.png")} style={styles.login_logo} />
            <Text style={styles.login_text}>카카오로 로그인하기</Text>
        </TouchableOpacity>
    );
}
 
const styles = StyleSheet.create({
    login_btn:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:56,
        backgroundColor:'#F9E000',

        borderRadius:18,
        // borderColor:'#B9BCBE',
        // borderWidth: 1,
    },
    login_logo:{
        width:24,
        height:24,
        marginRight:20
    },
    login_text:{
        color:'#3B3B3B',
        fontSize:16
    }
});
export default Kakao;