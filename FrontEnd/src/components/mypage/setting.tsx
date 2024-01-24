import { StyleSheet, Text, ScrollView, TouchableOpacity, View, Switch } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin, setModal } from "@store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SwitchToggle from "react-native-switch-toggle";
import Withdraw from "./setting/withdraw";
import axiosInstance from "@/axiosinstance";
import Config from "react-native-config";

function Setting() {
    const dispatch = useDispatch();
    const [isWithdraw, setWithdraw] = useState(false);
    const [isVisitedToggle, setVisitedToggle] = useState(false);
    const [isPercentToggle, setPercentToggle] = useState(false);

    const percentToggleSwitch = () => setPercentToggle(previousState => !previousState);
    const visitedToggleSwitch = () => setVisitedToggle(previousState => !previousState);

    const logout = () =>{
        axiosInstance({
            method:'get',
            url: Config.API_APP_KEY + '/v1/user/logout',
        }).then(() => {
            AsyncStorage.clear();
            AsyncStorage.setItem('FirstLogin','ok');
            dispatch(setLogin(false));
        }).catch(err => {
            console.log(err)
        })
        // AsyncStorage.clear();
        // AsyncStorage.setItem('FirstLogin','ok');
        // dispatch(setLogin(false));
    }
    return (
        <ScrollView style={{marginHorizontal:'6%'}}>
            
            {isWithdraw && <Withdraw closeModal={()=>setWithdraw(false)}/> }

            <View style={{marginVertical:8}}>
                <Text style={{fontSize:12,marginBottom:8}}>알림 설정</Text>
                <TouchableOpacity onPress={()=>{dispatch(setModal("알림설정"))}}
                style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:15, borderBottomColor:'#F2F2F2',borderBottomWidth:1}}>
                    <Text style={{fontSize:14,color:'black'}}>알림 수신</Text>
                    <Text style={{fontSize:14,color:'black'}}>ON {'>'}</Text>
                </TouchableOpacity>
            </View>

            <View style={{marginVertical:8}}>
                <Text style={{fontSize:12,marginBottom:8}}>비공개 범위 설정</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:15, borderBottomColor:'#F2F2F2',borderBottomWidth:1}}>
                    <Text style={{fontSize:14,color:'black'}}>방문 기록 비공개</Text>
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
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:15, borderBottomColor:'#F2F2F2',borderBottomWidth:1}}>
                    <Text style={{fontSize:14,color:'black'}}>정복율 비공개</Text>
                    <SwitchToggle 
                    switchOn={isPercentToggle} 
                    onPress={percentToggleSwitch}
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
            </View>

            <View style={{marginVertical:8}}>
                <Text style={{fontSize:12,marginBottom:8}}>기타</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:15, borderBottomColor:'#F2F2F2',borderBottomWidth:1}}>
                    <Text style={{fontSize:14,color:'black'}}>버전 정보</Text>
                    <Text style={{fontSize:14,color:'black'}}>1.0.0</Text>
                </View>
                <TouchableOpacity onPress={()=>logout()} style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:15, borderBottomColor:'#F2F2F2',borderBottomWidth:1}}>
                    <Text style={{fontSize:14,color:'black'}}>로그아웃</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setWithdraw(true)}}
                 style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:15, borderBottomColor:'#F2F2F2',borderBottomWidth:1}}>
                    <Text style={{fontSize:14,color:'black'}}>회원탈퇴</Text>
                </TouchableOpacity>
            </View>
            
        </ScrollView>
    );
}
const styles = StyleSheet.create({

});
export default Setting;
