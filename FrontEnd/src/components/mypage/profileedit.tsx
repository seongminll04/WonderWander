import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { setModal } from "@store/actions";

function ProfileEdit() {
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <Text>내 프로필 수정하기</Text>
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
export default ProfileEdit;
