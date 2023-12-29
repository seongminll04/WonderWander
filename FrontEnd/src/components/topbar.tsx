import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { setModal } from "@/store/actions";

function TopBar() {
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <Image source={require('@assets/logo_s.png')}/>
            <View style={styles.func}>
                <TouchableOpacity style={{marginRight:15}} onPress={()=>dispatch(setModal('알림'))}>
                    <Icon name="bell" size={24} color='#9D999D'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>dispatch(setModal('설정'))}>
                    <Icon name="gear" size={24} color='#9D999D'/>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        margin:15
    },
    func : {
        flexDirection:'row',
    }
});
export default TopBar;
