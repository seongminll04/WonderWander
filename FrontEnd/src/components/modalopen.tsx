import {StyleSheet, Modal, Text} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setModal} from '@store/actions';
import {AppState} from '@store/state';
import Alarm from './alarm';
import Intro from './Intro';
import UserDetail from './ranking/userDetail';
import Search from './home/search';
import FrinedSearch from './ranking/friendSearch';
import AlarmSetting from './mypage/setting/alarmsetting';

function ModalOpen() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);
  return (
    <Modal
      style={styles.modal_container}
      animationType="slide"
      transparent={true}
      visible={isModalOpen != null}
      onRequestClose={() => {
        dispatch(setModal(null));
      }}>
      {isModalOpen == '알림' ? (
        <Alarm />
      ) : isModalOpen == '알림설정' ? (
        <AlarmSetting />
      ) : isModalOpen == '소개' ? (
        <Intro />
      ) : isModalOpen == '검색' ? (
        <Search />
      ) : isModalOpen == '사용자 상세정보' ? (
        <UserDetail />
      ) : isModalOpen == '친구 검색' ? (
        <FrinedSearch />
      ) : null}
    </Modal>
  );
}
const styles = StyleSheet.create({
  modal_container: {
    zIndex: 999,
  },
});
export default ModalOpen;
