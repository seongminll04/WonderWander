import { StyleSheet, Modal } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "@store/actions";
import { AppState } from "@store/state";

function ModalOpen() {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state: AppState) => state.isModalOpen);
    return (
        <Modal
            style={styles.modal_container}
            animationType="slide"
            transparent={true}
            visible={isModalOpen=='로그인'}
            onRequestClose={() => {dispatch(setModal(null));}}>

        </Modal>
    );
}
const styles = StyleSheet.create({
    modal_container:{
        zIndex:99,
   }
});
export default ModalOpen;
