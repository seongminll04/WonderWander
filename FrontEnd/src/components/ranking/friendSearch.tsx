import {
  StyleSheet,
  Modal,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setModal, setUserDetail} from '@store/actions';
import FriendData from '@/components/ranking/friendData';

interface UserData {
  userId: string;
  username: string;
  percentage: number;
}

function friendRank() {
  const dispatch = useDispatch();

  const [friendAddStates, setFriendAddStates] = useState<boolean[]>(
    new Array(FriendData.length).fill(false),
  );
  const [selectedFriendIds, setSelectedFriendIds] = useState<string[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  const toggleFriendAddState = (index: number) => {
    const newStates = [...friendAddStates];
    newStates[index] = !newStates[index];
    setFriendAddStates(newStates);

    // 사용자 ID를 선택된 목록에 추가 또는 제거
    const userId = FriendData[index].userId;
    if (newStates[index]) {
      setSelectedFriendIds(prevIds => [...prevIds, userId]);
    } else {
      setSelectedFriendIds(prevIds => prevIds.filter(id => id !== userId));
    }
  };

  // 친구 요청 API 만들기 전까지 임시 !!!! 확인용 !!!!!
  const sendFriendRequests = () => {
    let newMessage = '';
    if (selectedFriendIds.length === 0) {
      newMessage = '선택한 친구가 없습니다.';
    } else if (selectedFriendIds.length <= 3) {
      newMessage = `${selectedFriendIds
        .map(id => FriendData.find(friend => friend.userId === id)?.username)
        .join(', ')} 에게 친구 신청을 하시겠습니까?`;
    } else {
      const firstThreeFriends = selectedFriendIds
        .slice(0, 3)
        .map(id => FriendData.find(friend => friend.userId === id)?.username)
        .join(', ');
      const remainingFriendsCount = selectedFriendIds.length - 3;
      newMessage = `${firstThreeFriends} 외 ${remainingFriendsCount}명 에게 신청을 하시겠습니까?`;
    }
    // 모달 열기
    setModalVisible(true);
    // 메시지 저장
    setMessage(newMessage);
    // 친구 요청을 보낸 후, 상태 초기화
    setFriendAddStates(new Array(FriendData.length).fill(false));
    setSelectedFriendIds([]);
  };

  const WindowHeight = Dimensions.get('window').height;

  const getLastIndex = (data: UserData[]): number | string => {
    return FriendData && data.length != 0
      ? data.length - 1
      : '친구 목록이 비어있어요';
  };

  const lastIndex = getLastIndex(FriendData);

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
          <Text
            style={{
              flex: 1.7,
              fontSize: 24,
              color: 'black',
              fontWeight: 'bold',
            }}>
            친구 추가
          </Text>
        </View>
        <TextInput style={styles.SearchBar}>
          <Image source={require('@assets/scope.png')} />
          <Text>&nbsp;&nbsp;친구를 검색해보세요</Text>
        </TextInput>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '900',
            color: 'black',
            marginBottom: 10,
          }}>
          결과&nbsp;&nbsp;<Text style={{color: '#32D583'}}>{lastIndex}</Text>
        </Text>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: WindowHeight - 260,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: WindowHeight - 400,
              marginBottom: 80,
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
                <View
                  style={{
                    backgroundColor: 'gray',
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                  }}></View>
                <View
                  style={{
                    marginLeft: 20,
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
                    친구분들 자기소개
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.75,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 0.5,
                    }}
                    onPress={() => {
                      toggleFriendAddState(index);
                    }}>
                    {!friendAddStates[index] ? (
                      <Image source={require('@assets/Unchecked.png')} />
                    ) : (
                      <Image source={require('@assets/Checked.png')} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={sendFriendRequests}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '4%',
              height: 60,
              width: '92%',
              bottom: 0,
              backgroundColor: '#2B2B2B',
              borderColor: 'gray',
              borderWidth: 0.5,
              borderRadius: 18,
              position: 'absolute',
            }}>
            <Text style={{color: 'white', fontSize: 18}}>
              +&nbsp;&nbsp;친구 추가하기
            </Text>
          </TouchableOpacity>
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text>{message}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{color: 'blue', marginTop: 10}}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
  SearchBar: {
    height: 60,
    marginBottom: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#F8F6FC',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});
export default friendRank;
