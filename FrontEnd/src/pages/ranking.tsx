import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Top100 from '@/components/ranking/top100';

function Ranking() {
  const [isFriend, setIsFriend] = useState(false);
  const toggleSwitch = () => setIsFriend(!isFriend);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{width: '88%', marginLeft: '6%'}}>
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
        <Top100></Top100>
      </ScrollView>
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
    borderRadius: 25,
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
