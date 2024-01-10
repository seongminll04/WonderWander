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

function Ranking() {
  const [isFriend, setIsFriend] = useState(false);
  const toggleSwitch = () => setIsFriend(!isFriend);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
    </View>
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
