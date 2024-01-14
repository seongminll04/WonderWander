import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setModal} from '@store/actions';
import {AppState} from '@store/state';

function UserDetail() {
  const dispatch = useDispatch();
  const isUserDetail = useSelector((state: AppState) => state.isUserDetail);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // isUserDetail이 변경될 때마다 username을 업데이트
    setUsername(isUserDetail || ''); // null일 경우를 대비하여 빈 문자열로 설정
  }, [isUserDetail]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{top: '8%', left: '8%'}}
        onPress={() => {
          dispatch(setModal(null));
        }}>
        <Image
          source={require('@assets/ArrowLeft.png')}
          style={{tintColor: 'black', height: 20, width: 20}}
        />
      </TouchableOpacity>

      <View style={styles.profile}>
        <View
          style={{
            backgroundColor: 'gray',
            width: 60,
            height: 60,
            borderRadius: 30,
            marginTop: 10,
          }}></View>
        <Text style={{color: 'black', fontSize: 28, marginTop: 15}}>
          {username}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: 'gray',
            marginBottom: 20,
          }}>
          나의 자기 소개소개
        </Text>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '16%',
            height: 40,
            backgroundColor: '#2b2b2b',
            borderColor: 'gray',
            borderWidth: 0.5,
            borderRadius: 25,
          }}>
          <Text style={{color: 'white'}}>팔로우</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.follow}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
            300
          </Text>
          <Text style={{color: 'gray'}}>팔로우</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
            4000
          </Text>
          <Text style={{color: 'gray'}}>팔로워</Text>
        </View>
      </View>
      <View
        style={{
          opacity: 0.5,
          borderBottomWidth: 1,
          borderBottomColor: 'gray',
          flex: 0.01,
          marginHorizontal: '6%',
        }}
      />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            marginTop: 20,
            fontSize: 24,
            fontWeight: 'bold',
            color: 'black',
          }}>
          진단 결과
        </Text>
        <Text style={{marginTop: 15}}>서울을 많이 돌아다닌 당신 !</Text>
        <Text style={{marginTop: 10, fontSize: 20, color: 'black'}}>
          서울 깍쟁이
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  profile: {
    top: '10%',
    flex: 0.3,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
  follow: {
    top: '5%',
    marginTop: '15%',
    marginHorizontal: '15%',
    justifyContent: 'space-evenly',
    flex: 0.1,
    flexDirection: 'row',
  },
});
export default UserDetail;
