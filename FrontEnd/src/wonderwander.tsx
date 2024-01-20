import {
    StyleSheet, View,
  } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import BottomTabs from '@components/bottomtabs';
import ModalOpen from '@components/modalopen';
import Login from '@/pages/login';
import { useSelector } from "react-redux";
import { AppState } from "./store/state";

function WonderWander() {
    const isLogin = useSelector((state: AppState) => state.isLogin);

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <ModalOpen />
            {!isLogin ? <Login /> :
            <NavigationContainer>
                <BottomTabs />
            </NavigationContainer>}
        </View>
    );
}
const styles = StyleSheet.create({

});
export default WonderWander;