import { StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "@store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Setting() {
    const dispatch = useDispatch();
    const logout = () =>{
        AsyncStorage.clear();
        AsyncStorage.setItem('FirstLogin','ok');
        dispatch(setLogin(false));
    }
    return (
        <ScrollView>
            <Text>세팅</Text>
            <TouchableOpacity onPress={()=>logout()}>
                <Text>로그아웃</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
const styles = StyleSheet.create({

});
export default Setting;
