import { StyleSheet, Text, TouchableOpacity, View,ImageBackground } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Octicons";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

function MoveToMap() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={()=>{navigation.navigate('Map')}}
        style={{marginTop:20,marginBottom:50, overflow:'hidden', borderRadius:20}}>
            <ImageBackground source={require("@assets/gotomap.png")} 
            style={{width:'100%', height:120, justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>탐험을</Text>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:20,fontWeight:'bold',marginLeft:25}}>떠나볼까요? </Text>
                    <Icon name='location' size={20} color='#FFFFFF' />
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({

});
export default MoveToMap;