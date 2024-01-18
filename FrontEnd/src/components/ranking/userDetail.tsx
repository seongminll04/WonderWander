import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setModal} from '@store/actions';
import {AppState} from '@store/state';
import {BarChart} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import wholeData from './wholeData';

function UserDetail() {
  const dispatch = useDispatch();
  const isUserDetail = useSelector((state: AppState) => state.isUserDetail);
  const [username, setUsername] = useState('');
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [wanderRateData, setWanderRateData] = useState<{
    labels: string[];
    datasets: {
      data: number[];
    }[];
  }>({labels: [], datasets: [{data: []}]});

  const screenWidth = Dimensions.get('window').width;
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0) => `gray`,
    strokeWidth: 1,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    // decimalPlaces: 0, // Display whole numbers on the bars
    // formatYLabel: () => '', // Hide the Y-axis labels
  };

  // 방문 지역 관련
  const place = [
    '강진 무위사 극락..',
    '충주 탑평리 칠층..',
    '영주 부석사 무량..',
    '영주 부석사 무량..',
  ];

  useEffect(() => {
    const user = wholeData.find(userData => userData.userId === isUserDetail);

    setUsername(user ? user.username : '');

    // Extract WanderRate data for the chart
    const wanderRate = user
      ? (user.WanderRate as {[key: string]: number}[])
      : [];
    const labels = wanderRate.map(item => Object.keys(item)[0]); // 도시 이름 추출
    const data = wanderRate.map(item => Object.values(item)[0]); // 도시에 해당하는 값 추출
    setTotalPercentage(data[0]);
    setWanderRateData({
      labels,
      datasets: [
        {
          data,
        },
      ],
    });
  }, [isUserDetail]);

  const [isPlaceAllowed, setIsPlaceAllowed] = useState(true);
  const [isRateAllowed, setIsRateAllowed] = useState(true);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View
          style={{
            marginVertical: 30,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              dispatch(setModal(null));
            }}>
            <Image
              source={require('@assets/ArrowLeft.png')}
              style={{tintColor: 'black', height: 20, width: 20}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.profile}>
          <View
            style={{
              backgroundColor: 'gray',
              width: 60,
              height: 60,
              borderRadius: 30,
              marginBottom: 10,
            }}></View>
          <Text style={{color: 'black', fontSize: 28, marginBottom: 10}}>
            {username}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              color: 'gray',
              marginBottom: 20,
            }}>
            자기소개는 생략할게요
          </Text>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => setIsPlaceAllowed(!isPlaceAllowed)}
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
              <Text style={{color: 'white'}}>장소 ?</Text>
            </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => setIsRateAllowed(!isRateAllowed)}
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
              <Text style={{color: 'white'}}>탐험율 ?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileDetail}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <Text>300</Text>
            <Text>팔로우</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <Text>4,000</Text>
            <Text>팔로워</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <Text>{totalPercentage}%</Text>
            <Text>탐험율</Text>
          </View>
        </View>
        <View style={styles.visitedPlace}>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 24, fontWeight: '900', color: 'black'}}>
              최근 방문한 장소
            </Text>
            {isPlaceAllowed ? (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={place}
                contentContainerStyle={{paddingHorizontal: 0, marginTop: 10}}
                renderItem={({item}) => (
                  <View style={styles.region}>
                    <View>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          fontSize: 12,
                          color: '#FFFFFF',
                          fontWeight: 'bold',
                        }}>
                        {item}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon
                          name="heart"
                          size={12}
                          color="#E74B2C"
                          style={{marginRight: 5}}
                        />
                        <Text style={{fontSize: 12, color: '#FFFFFF'}}>
                          20,400
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            ) : (
              <View
                style={{
                  backgroundColor: '#F2F2F2',
                  padding: 5,
                  marginTop: 15,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 160,
                  margin: 5,
                  paddingBottom: 10,
                  flexDirection: 'row',
                }}>
                <Image source={require('@assets/InformationCircle.png')} />
                <Text style={{color: '#878787'}}>
                  &nbsp;비공개 처리 되었습니다.
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.wanderRate}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '900',
              color: 'black',
              marginVertical: 20,
            }}>
            정복율
          </Text>
          {isRateAllowed ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <BarChart
                style={{borderRadius: 16}}
                data={wanderRateData}
                width={screenWidth * 1.5} // Adjust the width as needed
                height={220}
                yAxisLabel=""
                yAxisSuffix="%"
                chartConfig={chartConfig}
                verticalLabelRotation={0}
              />
            </ScrollView>
          ) : (
            <View
              style={{
                backgroundColor: '#F2F2F2',
                padding: 5,
                marginTop: 15,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                height: 160,
                margin: 5,
                paddingBottom: 10,
                flexDirection: 'row',
              }}>
              <Image source={require('@assets/InformationCircle.png')} />
              <Text style={{color: '#878787'}}>
                &nbsp;비공개 처리 되었습니다.
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: '6%',
  },
  profile: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  profileDetail: {
    marginTop: 20,
    flex: 0.05,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: '15%',
    color: 'black',
    flexDirection: 'row',
  },
  visitedPlace: {
    flex: 0.25,
    marginBottom: 20,
  },
  wanderRate: {
    flex: 0.45,
  },
  // 방문한 지역 관련 컴포넌트
  region: {
    width: 120, // 각 아이템의 너비
    height: 160, // 각 아이템의 높이
    justifyContent: 'flex-end',
    padding: 5,
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 20,
    borderColor: '#E5E5E5',
    borderWidth: 1.5,
    margin: 5,
  },
});
export default UserDetail;
