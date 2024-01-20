import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Kakao from '@components/login/kakao';
import Google from '@components/login/google';
import Naver from '@components/login/naver';
import NicknameRegistration from '@components/login/nicknameregistration';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setLogin, setModal} from '@/store/actions';

import Icon from "react-native-vector-icons/AntDesign";


function Login() {
  // 닉네임 필요 여부
  const [isNextStep, setNextStep] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkFirstLogin = async () => {
      const FirstLogin = await AsyncStorage.getItem('FirstLogin');
      if (!FirstLogin) {
        dispatch(setModal('소개'));
      }
    };
    checkFirstLogin();

    const checkLogin = async () => {
      const accessToken = await AsyncStorage.getItem('AccessToken');
      if (accessToken) {
        const nickname = await AsyncStorage.getItem('nickname');
        if (nickname) {
          dispatch(setLogin(true))
        } else {
          setNextStep(true);
        }
      }
    };
    checkLogin();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginHorizontal:'6%'
      }}>
      {isNextStep &&
      <TouchableOpacity style={{position:'absolute',top:30}}
      onPress={()=>{setNextStep(false); AsyncStorage.clear(); AsyncStorage.setItem('FirstLogin','ok'); }}>
        <Icon name="arrowleft" size={24} color='#000000'/>
      </TouchableOpacity>}
      <View style={{height:'30%', marginTop:'50%', marginBottom:'15%',backgroundColor:'#F2F2F2',width:'100%',
        justifyContent:'center',alignItems:'center'}}>
        <Text>로고</Text>
      </View>
      {!isNextStep ? 
      <View style={{height:'24%',width:'100%',justifyContent:'space-between'}}>
        <Kakao nicknameRegist={() => setNextStep(true)} />
        <Naver nicknameRegist={() => setNextStep(true)} />
        <Google nicknameRegist={() => setNextStep(true)} />
      </View>
      : <NicknameRegistration />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
export default Login;
