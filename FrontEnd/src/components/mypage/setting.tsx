import { StyleSheet, Modal, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "@store/actions";
import { AppState } from "@store/state";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Setting() {
    return (
        <ScrollView>
            <Text>세팅</Text>
            <TouchableOpacity onPress={()=>AsyncStorage.clear()}>
                <Text>로그아웃</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
const styles = StyleSheet.create({

});
export default Setting;
