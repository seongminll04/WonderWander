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
import {setModal} from '@/store/actions';

interface Props {
  setLogin: () => void;
}

function Login({setLogin}: Props) {
  const [nicknameExists, setNicknameExists] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkFirstLogin = async () => {
      // AsyncStorage.removeItem('FirstLogin');
      const FirstLogin = await AsyncStorage.getItem('FirstLogin');
      if (!FirstLogin) {
        dispatch(setModal('소개'));
      }
    };
    checkFirstLogin();

    const checkLogin = async () => {
      const accessToken = "await AsyncStorage.getItem('AccessToken')";
      if (accessToken) {
        const username = "await AsyncStorage.getItem('userNickname')";
        if (username) {
          setLogin();
        } else {
          setNicknameExists(false);
        }
      }
    };
    checkLogin();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {nicknameExists ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Text>로그인</Text>
          <Kakao setNicknameExists={() => setNicknameExists(false)} />
          <Google setNicknameExists={() => setNicknameExists(false)} />
          <Naver setNicknameExists={() => setNicknameExists(false)} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Text>닉네임 등록</Text>
          <TouchableOpacity
            onPress={() => {
              setNicknameExists(true);
              AsyncStorage.clear();
            }}>
            <Text>뒤로가기</Text>
          </TouchableOpacity>
          <NicknameRegistration
            setNickname={() => {
              setNicknameExists(false);
              setLogin();
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
export default Login;
