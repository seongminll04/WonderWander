import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "@store/actions";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Intro() {
    const dispatch = useDispatch();
    const [isNextPage,setNextPage] = useState(false)

    if (!isNextPage) {
        return (
            <View style={styles.container}>
                <ImageBackground source={require("@assets/intro_one.png")}
                style={{flex:1}} resizeMode="cover">

                <View style={{width:'84%',justifyContent:'flex-end',margin:'8%',height:'90%'}}>
                    <Text style={{color:"white", fontWeight:'bold',fontSize:32, marginBottom:25}}>세상에서 {'\n'}하나뿐인 {'\n'}지도 서비스</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color:"white",fontSize:17}}>맵을 밝히면서 여행해보세요!</Text>
                        <TouchableOpacity onPress={()=>{setNextPage(true)}}
                        style={{backgroundColor:'#32D583',width:30,height:30,borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                            <Icon name="arrow-right" size={18} color='#FFFFFF'/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',marginTop:40}}>
                        <View style={{backgroundColor:'white', width:'50%',height:7}} />
                        <View style={{backgroundColor:'rgba(255,255,255,0.1)', width:'50%',height:7}} />
                    </View>
                </View>
                </ImageBackground>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <ImageBackground source={require("@assets/intro_two.png")}
                style={{flex:1}} resizeMode="cover">
                <View style={{width:'84%',justifyContent:'flex-end',margin:'8%',height:'90%'}}>
                    <Text style={{color:"white", fontWeight:'bold',fontSize:32, marginBottom:25}}>문화재 {'\n'}스탬프를 찾아 {'\n'}떠나는 여행</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color:"white",fontSize:17}}>문화재를 방문해서 스탬프를 모아봐요!</Text>
                        <TouchableOpacity onPress={()=>{dispatch(setModal(null));AsyncStorage.setItem('FirstLogin','ok');}}
                        style={{backgroundColor:'#32D583',width:30,height:30,borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                            <Icon name="arrow-right" size={18} color='#FFFFFF'/>
                        </TouchableOpacity>
                    </View>
                   
                    <View style={{backgroundColor:'white', width:'100%',height:7,marginTop:40}} />
                
                </View>
                </ImageBackground>
            </View>
        ); 
    }
}




const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1
   }
});
export default Intro;
