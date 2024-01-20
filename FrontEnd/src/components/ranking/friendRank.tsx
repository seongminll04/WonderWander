import {
  StyleSheet,
  Modal,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setModal, setUserDetail} from '@store/actions';
import FriendData from '@/components/ranking/friendData';

function friendRank() {
  const dispatch = useDispatch();
  const location = [
    '전체',
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '세종',
    '경기',
    '강원',
    '충북',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
    '제주',
  ];
  const [isLocation, setLocation] = useState('전체');
  const [isFriendAdd, setIsFriendAdd] = useState(false);
  const WindowHeight = Dimensions.get('window').height;
  const WindowWidth = Dimensions.get('window').width;

  return (
    <View style={{marginTop: 20}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '900',
          color: 'black',
          marginBottom: 10,
        }}>
        친구 랭킹
      </Text>
      <Text style={{fontSize: 14, fontWeight: '900', color: '#707070'}}>
        내 친구들은 얼마나 탐험을 했을까? 확인해보세요!
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={location}
        contentContainerStyle={{paddingHorizontal: 0, marginTop: 10}}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setLocation(item);
            }}
            style={[
              styles.region,
              isLocation === item ? styles.sel_region : null,
            ]}>
            <Text
              style={
                isLocation === item
                  ? styles.sel_region_text
                  : styles.region_text
              }>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: WindowHeight - 400,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            height: WindowHeight - 400,
            marginBottom: 15,
          }}>
          {FriendData.map((data, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text
                  style={{
                    color: '#32D583',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {index + 1}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'gray',
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                }}></View>
              <View
                style={{
                  marginLeft: 0,
                  justifyContent: 'center',
                  width: '50%',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: '#000000',
                    marginBottom: 5,
                  }}>
                  {data.username}
                </Text>
                <Text style={{color: '#A6A6A6', marginBottom: 5}}>
                  {data.percentage}%
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  dispatch(setUserDetail(data.username));
                  dispatch(setModal('사용자 상세정보'));
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '6%',
                  width: '16%',
                  height: 30,
                  backgroundColor: '#ffffff',
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  borderRadius: 25,
                }}>
                <Text style={{color: 'black'}}>자세히</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '4%',
            height: 60,
            width: '92%',
            bottom: -50,
            backgroundColor: '#2B2B2B',
            borderColor: 'gray',
            borderWidth: 0.5,
            borderRadius: 18,
            position: 'absolute',
          }}>
          <TouchableOpacity>
            <Text style={{color: 'white', fontSize: 18}}>
              +&nbsp;&nbsp;친구 추가하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  region: {
    width: 45, // 각 아이템의 너비
    height: 35, // 각 아이템의 높이
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderColor: '#E5E5E5',
    borderWidth: 1.5,
    margin: 5,
  },
  sel_region: {
    backgroundColor: 'rgba(50,213,131,0.15)',
    borderColor: '#32D583',
  },
  region_text: {
    color: '#3B3B3B',
  },
  sel_region_text: {
    color: '#32D583',
  },
  buttonDetail: {},
});
export default friendRank;
