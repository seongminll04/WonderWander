import {StyleSheet, Modal, Text} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setModal} from '@store/actions';
import {AppState} from '@store/state';
import Alarm from './alarm';
import Setting from './setting';
import Intro from './Intro';
import ProfileEdit from './mypage/profileedit';
import UserDetail from './ranking/userDetail';

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
      ) : isModalOpen == '소개' ? (
        <Intro />
      ) : isModalOpen == '내 정보수정' ? (
        <ProfileEdit />
      ) : isModalOpen == '설정' ? (
        <Setting />
      ) : isModalOpen == '사용자 상세정보' ? (
        <UserDetail />
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
