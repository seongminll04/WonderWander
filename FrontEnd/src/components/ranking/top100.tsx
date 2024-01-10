import {
  StyleSheet,
  Modal,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setModal} from '@store/actions';
import {AppState} from '@store/state';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TempData from '@components/ranking/tempData';
import tempData from '@components/ranking/tempData';

function top100() {
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

  return (
    <View style={{marginTop: 20}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '900',
          color: 'black',
          marginBottom: 10,
        }}>
        전체 TOP 100
      </Text>
      <Text style={{fontSize: 14, fontWeight: '900', color: '#707070'}}>
        오늘 가장 많이 탐험한 사용자들을 만나보세요 !
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

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ScrollView>
          {TempData.map((data, index) => (
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
                style={{
                  marginRight: '5%',
                  width: '20%',
                  height: 30,
                  backgroundColor: '#ffffff',
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black'}}>자세히</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
export default top100;
