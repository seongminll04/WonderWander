import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import TopRank from '@/components/ranking/topRank';
import FriendRank from '@/components/ranking/friendRank';

function Ranking() {
  const [isFriend, setIsFriend] = useState(false);
  const [opacity, setOpacity] = useState(new Animated.Value(1)); // 초기값 0으로 설정
  const toggleSwitch = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200, // 0.5초 동안 애니메이션 진행
      useNativeDriver: false,
    }).start(() => {
      setIsFriend(!isFriend);
      fadeIn();
    });
  };

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const WindowHeight = Dimensions.get('window').height;
  const WindowWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{width: '88%', marginLeft: '6%', height: WindowHeight - 100}}>
        <View style={styles.toggle}>
          <TouchableOpacity
            style={!isFriend ? styles.buttonOn : styles.buttonOff}
            onPress={toggleSwitch}>
            <Text>전체</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={!isFriend ? styles.buttonOff : styles.buttonOn}
            onPress={toggleSwitch}>
            <Text>친구</Text>
          </TouchableOpacity>
        </View>
        <Animated.View style={{opacity}}>
          {!isFriend ? <TopRank /> : <FriendRank />}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: '6%',
  },
  toggle: {
    width: '70%',
    height: 60,
    marginLeft: '15%',
    marginTop: '10%',
    borderRadius: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#F8F6FC',
  },
  buttonOn: {
    width: '50%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOff: {
    width: '50%',
    height: 50,
    backgroundColor: '#F8F6FC',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Ranking;
