import { StyleSheet, Modal, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "@store/actions";
import { AppState } from "@store/state";
import Icon from "react-native-vector-icons/AntDesign";
import SwitchToggle from "react-native-switch-toggle";

function AlarmSetting() {
    const dispatch = useDispatch();
    const [isVisitedToggle, setVisitedToggle] = useState(false);
    const [isPercentToggle, setPercentToggle] = useState(false);

    const percentToggleSwitch = () => setPercentToggle(previousState => !previousState);
    const visitedToggleSwitch = () => setVisitedToggle(previousState => !previousState);

    return (
        <View style={styles.container}>
            <View style={{width:'88%', marginHorizontal:'6%', height:'94%',marginVertical:'3%'}}>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:50}}>
                    <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}
                    onPress={()=>{dispatch(setModal(null))}}>
                        <Icon name="arrowleft" size={24} color='#000000'/>
                    </TouchableOpacity>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'black', marginRight:24}}>알림설정</Text>
                    <Text/>
                </View>
                <View style={{marginBottom:30}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:15, borderBottomColor:'#F2F2F2',borderBottomWidth:1,marginBottom:10}}>
                        <Text style={{fontSize:14,color:'black'}}>알림 수신</Text>
                        <SwitchToggle 
                        switchOn={isVisitedToggle} 
                        onPress={visitedToggleSwitch}
                        containerStyle={{
                            width: 30,
                            height: 20,
                            borderRadius: 25,
                            padding: 2,
                        }}
                        circleStyle={{
                            width: 14,
                            height: 14,
                            borderRadius: 20,
                        }}
                        backgroundColorOn="#32D583"
                        backgroundColorOff="#D9D9D9"
                        circleColorOff="#FFFFFF"
                        circleColorOn="#FFFFFF"
                        duration={300} />
                    </View>
                    <Text>
                        WonderWander 앱에서 보내는 알림 메시지를 받습니다. {'\n'}
                        아래 모든 알림을 ON/OFF할 수 있습니다.
                    </Text>
                </View>
              
                <View style={{marginBottom:30}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:15, borderBottomColor:'#F2F2F2',borderBottomWidth:1,marginBottom:10}}>
                        <Text style={{fontSize:14,color:'black'}}>정복도 알림</Text>
                        <SwitchToggle 
                        switchOn={isVisitedToggle} 
                        onPress={visitedToggleSwitch}
                        containerStyle={{
                            width: 30,
                            height: 20,
                            borderRadius: 25,
                            padding: 2,
                        }}
                        circleStyle={{
                            width: 14,
                            height: 14,
                            borderRadius: 20,
                        }}
                        backgroundColorOn="#32D583"
                        backgroundColorOff="#D9D9D9"
                        circleColorOff="#FFFFFF"
                        circleColorOn="#FFFFFF"
                        duration={300} />
                    </View>
                    <Text>10%단위로 정복도가 갱신될 때 알림을 받습니다.</Text>
                </View>

                <View style={{marginBottom:30}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:15, borderBottomColor:'#F2F2F2',borderBottomWidth:1,marginBottom:10}}>
                        <Text style={{fontSize:14,color:'black'}}>경쟁 알림</Text>
                        <SwitchToggle 
                        switchOn={isVisitedToggle} 
                        onPress={visitedToggleSwitch}
                        containerStyle={{
                            width: 30,
                            height: 20,
                            borderRadius: 25,
                            padding: 2,
                        }}
                        circleStyle={{
                            width: 14,
                            height: 14,
                            borderRadius: 20,
                        }}
                        backgroundColorOn="#32D583"
                        backgroundColorOff="#D9D9D9"
                        circleColorOff="#FFFFFF"
                        circleColorOn="#FFFFFF"
                        duration={300} />
                    </View>
                    <Text>랭킹에서 친구가 나를 제쳤을 때 알림을 받습니다.</Text>
                </View>

                <View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:15, borderBottomColor:'#F2F2F2',borderBottomWidth:1,marginBottom:10}}>
                        <Text style={{fontSize:14,color:'black'}}>행사 추천 알림</Text>
                        <SwitchToggle 
                        switchOn={isVisitedToggle} 
                        onPress={visitedToggleSwitch}
                        containerStyle={{
                            width: 30,
                            height: 20,
                            borderRadius: 25,
                            padding: 2,
                        }}
                        circleStyle={{
                            width: 14,
                            height: 14,
                            borderRadius: 20,
                        }}
                        backgroundColorOn="#32D583"
                        backgroundColorOff="#D9D9D9"
                        circleColorOff="#FFFFFF"
                        circleColorOn="#FFFFFF"
                        duration={300} />
                    </View>
                    <Text>행사 추천에 관한 알림을 받습니다.</Text>
                </View>



            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
   }
});
export default AlarmSetting;
