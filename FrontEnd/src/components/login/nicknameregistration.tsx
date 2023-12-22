import {
    StyleSheet,
    View,
    Text, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import axiosInstance from "@/axiosinstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";
import axios from "axios";
interface Props {
    setNickname : ()=>void;
}
function NicknameRegistration({setNickname}:Props) {
    const [inputValue, setInputValue] = useState('');

    const regist = () => {
        axios({
            method:'get',
            url: Config.API_APP_KEY+`/nicknameCheck/${inputValue}`,
            data:{
                nickname:inputValue
            },
        }).then(res=>{
            axiosInstance({
                method:'post',
                url: Config.API_APP_KEY+'/nickname',
                data:{
                    nickname:inputValue
                },
            }).then(res=>{
                console.log(res);
                AsyncStorage.setItem('userNickname',inputValue);
                setInputValue('');
                setNickname()
            }).catch(err=>{
                console.log(err);
            })
        }).catch(err => {
            console.log(err.response);
        })
    }

    return (
      <View style={{ flex: 1, justifyContent:'center',alignItems:'center' }}>
        <TextInput style={{borderWidth:1,borderColor:'black'}} placeholder="닉네임을 입력하세요" value={inputValue} onChangeText={(text)=>{setInputValue(text);}} />
        <TouchableOpacity onPress={()=>{regist()}}>
            <Text>등록하기</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({

});
export default NicknameRegistration;