import { StyleSheet, Modal, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "@store/actions";
import { AppState } from "@store/state";

function Setting() {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state: AppState) => state.isModalOpen);
    return (
        <View style={styles.container}>
            <Text onPress={()=>{dispatch(setModal(null));}}>닫기</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1
   }
});
export default Setting;
