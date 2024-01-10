import {
  StyleSheet,
  Modal,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setModal} from '@store/actions';
import {AppState} from '@store/state';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function PopularCulturalAssets() {
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
      <Text style={{fontSize: 24, fontWeight: '900', color: 'black'}}>
        지역별 인기 문화재
      </Text>
      {/* 지역별 인기 문화재 지역선택 버튼들 */}
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
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: 'gray',
              width: 80,
              height: 80,
              borderRadius: 20,
            }}></View>
          <View
            style={{marginLeft: 20, justifyContent: 'center', width: '60%'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: '#000000',
                marginBottom: 5,
              }}>
              경주첨성대
            </Text>
            <Text style={{color: '#A6A6A6', marginBottom: 5}}>
              경상북도 경주시 인왕동 839-1
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="heart"
                size={15}
                color="#E74B2C"
                style={{marginRight: 10}}
              />
              <Text style={{color: '#3B3B3B'}}>20,400</Text>
            </View>
          </View>
          <Icon
            name="arrow-top-right"
            size={24}
            color="#000000"
            style={{marginRight: 10}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: 'gray',
              width: 80,
              height: 80,
              borderRadius: 20,
            }}></View>
          <View
            style={{marginLeft: 20, justifyContent: 'center', width: '60%'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: '#000000',
                marginBottom: 5,
              }}>
              경주첨성대
            </Text>
            <Text style={{color: '#A6A6A6', marginBottom: 5}}>
              경상북도 경주시 인왕동 839-1
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="heart"
                size={15}
                color="#E74B2C"
                style={{marginRight: 10}}
              />
              <Text style={{color: '#3B3B3B'}}>20,400</Text>
            </View>
          </View>
          <Icon
            name="arrow-top-right"
            size={24}
            color="#000000"
            style={{marginRight: 10}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: 'gray',
              width: 80,
              height: 80,
              borderRadius: 20,
            }}></View>
          <View
            style={{marginLeft: 20, justifyContent: 'center', width: '60%'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: '#000000',
                marginBottom: 5,
              }}>
              경주첨성대
            </Text>
            <Text style={{color: '#A6A6A6', marginBottom: 5}}>
              경상북도 경주시 인왕동 839-1
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="heart"
                size={15}
                color="#E74B2C"
                style={{marginRight: 10}}
              />
              <Text style={{color: '#3B3B3B'}}>20,400</Text>
            </View>
          </View>
          <Icon
            name="arrow-top-right"
            size={24}
            color="#000000"
            style={{marginRight: 10}}
          />
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
});
export default PopularCulturalAssets;
