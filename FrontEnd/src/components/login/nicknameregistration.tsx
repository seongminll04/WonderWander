import {
    StyleSheet,
    View,
    Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import axiosInstance from "@/axiosinstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";
import Icon from "react-native-vector-icons/EvilIcons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "@/store/actions";

function NicknameRegistration() {
    const dispatch=useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [nicknameChk, setNicknameChk] = useState('0');


    const CheckNickname = () => {
        if (inputValue=='') {
            return setNicknameChk('닉네임을 입력해주세요');
        }
        axios({
            method:'get',
            url: Config.API_APP_KEY+`/v1/user/nickname/${inputValue}`,
        }).then(res=>{
            setNicknameChk('1');
        }).catch(err =>{
            setNicknameChk(err.response.data);
        })
    }

    const regist = () => {
        axiosInstance({
            method:'post',
            url: Config.API_APP_KEY+'/v1/user/nickname',
            data:{
                nickname:inputValue
            },
        }).then(res =>{
            AsyncStorage.setItem('nickname',inputValue);
            setInputValue('');
            dispatch(setLogin(true));

        }).catch(err =>{
            console.log(err)
        })
    }

    return (
      <View style={{width:'100%', height:'35%', justifyContent:'space-between'}}>
        <View>
            <View style={{width:'100%', flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
                <TextInput 
                style={[nicknameChk != '0' && nicknameChk != '1' && {borderColor:'#FF0000', borderWidth:1 },
                    {backgroundColor:'#F2F2F2', borderRadius:14, height:48, paddingHorizontal:'5%', width:'75%',fontSize:16}]} 
                placeholder="닉네임을 입력해주세요" 
                value={inputValue} 
                onChangeText={(text)=>{setInputValue(text);setNicknameChk('0')}} />
                <TouchableOpacity onPress={()=>{CheckNickname()}}
                style={{justifyContent:'center',alignItems:'center',paddingHorizontal:15,backgroundColor:'#E0F9ED', height:40, borderRadius:14, width:'22%'}}>
                    <Text style={{color:'#32D583', fontSize:13}}>중복확인</Text>
                </TouchableOpacity>
            </View>

           
            <Text style={[{color:'#FF0000',fontSize:12,marginVertical:1}, nicknameChk == '1' && {color:'#32D583'}]}>
                {nicknameChk != '0' && nicknameChk != '1' && nicknameChk }
                {nicknameChk == '1' && "사용 가능한 닉네임입니다" }
            </Text> 
        
            <Text style={{fontSize:12, color:'#878787',marginVertical:1}}>
                <Icon name='exclamation' size={14} color='#878787'/> 닉네임 수정이 불가능하니 신중하게 결정해주세요
            </Text>
            <Text style={{fontSize:12, color:'#878787',marginVertical:1}}>
                <Icon name='exclamation' size={14} color='#878787'/> 닉네임은 영문, 숫자로 이루어져야 합니다 
            </Text>
            <Text style={{fontSize:12, color:'#878787',marginVertical:1}}>
                <Icon name='exclamation' size={14} color='#878787'/> 닉네임은 3글자 이상 10글자 이하여야 합니다
            </Text>
        </View>
        
        {nicknameChk=='1' &&
        <TouchableOpacity onPress={()=>{regist()}}
                style={{backgroundColor:'#2B2B2B', justifyContent:'center',alignItems:'center',
                padding:10, borderRadius:18, height:60}}>
            <Text style={{color:'white', fontSize:16}}>시작하기</Text>
        </TouchableOpacity>}
      </View>
    );
}

const styles = StyleSheet.create({

});
export default NicknameRegistration;