import {
    StyleSheet,
    View,
    Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Config from "react-native-config";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setLogin } from "@/store/actions";


interface Props {
    nicknameRegist : ()=>void;
}

function Google({nicknameRegist}:Props) {
    const dispatch = useDispatch();
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
        <TouchableOpacity style={styles.login_btn} onPress={()=>{login()}}>
            <Image source={require("@assets/sociallogo/google.png")} style={styles.login_logo} />
            <Text style={styles.login_text}>구글로 로그인하기</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    login_btn:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    
        height:56,
        backgroundColor:'#F2F2F2',
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
        fontSize:16,
        marginRight:16
    
    }
});
export default Google;