import {
    StyleSheet,
    View,
    Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import NaverLogin from '@react-native-seoul/naver-login';
import axios from "axios";
import Config from "react-native-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setLogin } from "@/store/actions";

interface Props {
    nicknameRegist : ()=>void;

}
function Naver({nicknameRegist}:Props) {
    const dispatch = useDispatch()
    const login = () => {
        NaverLogin.login({appName:Config.APP_NAME!,consumerKey:Config.NAVER_KEY!,consumerSecret:Config.NAVER_SECRET!,serviceUrlScheme:'test'}).then((result) => {
            if (result.isSuccess) {
                const accesstoken =result.successResponse?.accessToken;
                axios({
                    method:'post',
                    url: Config.API_APP_KEY+'/v1/login',
                    data:{
                        social : 'naver',
                        token : accesstoken
                    }
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
        <TouchableOpacity style={styles.login_btn} onPress={()=>login()}>
            <Image source={require("@assets/sociallogo/naver.png")} style={styles.login_logo} />
            <Text style={styles.login_text}>네이버로 로그인하기</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    login_btn:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:56,
        backgroundColor:'#78D98A',
        borderRadius:18,

    },
    login_logo:{
        width:24,
        height:24,
        marginRight:20
    },
    login_text:{
        color:'white',
        fontSize:16
    }
});
export default Naver;