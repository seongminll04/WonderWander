import { StyleSheet, Modal, Text, View, TouchableOpacity, SafeAreaView, Image, TextInput, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BlurView } from '@react-native-community/blur';
import Icon from "react-native-vector-icons/AntDesign";
import axiosInstance from "@/axiosinstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLogin } from "@/store/actions";
import Config from "react-native-config";
interface Props {
    closeModal : () => void;
}
function Withdraw({closeModal}:Props) {
    const [inputText, setInputText] = useState('')
    const dispatch = useDispatch();

    const withdraw = () => {
        if (inputText != '탈퇴에 동의합니다') {
            return ToastAndroid.show("탈퇴동의문구를 입력해주세요",ToastAndroid.SHORT)
        }
        axiosInstance({
            method:'delete',
            url: Config.API_APP_KEY + '/v1/user/withdraw',
        }).then(() => {
            AsyncStorage.clear();
            AsyncStorage.setItem('FirstLogin','ok');
            dispatch(setLogin(false));
        }).catch(err => {
            console.log(err)
        })
    }
    
    return (
        <Modal
        animationType="fade"
        transparent={true} 
        visible={true}>
            <BlurView style={styles.absolute}
                  blurAmount={1}>

                <SafeAreaView style={styles.overlay}>
                    <View style={styles.modalContents}>

                        <View style={{marginBottom:20, width:'100%',alignItems:'flex-end'}}>
                            <TouchableOpacity onPress={()=>closeModal()}
                            style={{backgroundColor:'#3B3B3B', borderRadius:20, width:27, height:27,justifyContent:'center',alignItems:'center'}}>
                                <Icon name='close' size={16} color='white' />
                            </TouchableOpacity>
                        </View>
                        <Image source={require('@assets/withdraw.png')} style={{marginBottom:10}} />
                        
                        <Text style={{fontFamily:"NotoSansKR-Regular", color:'#878787', fontSize:12, textAlign:'center'}}>
                            <Text style={{color:'black', fontSize:15}}>회원 탈퇴하시겠습니까?</Text>{'\n'}
                            회원 탈퇴시 모든 정보는 삭제됩니다.{'\n'}
                            아래 메시지를 입력해주세요.
                        </Text>
                        
                        <TextInput 
                        placeholder="탈퇴에 동의합니다" placeholderTextColor={'#AFAFAF'}
                        style={{borderBottomWidth:0.2, borderBottomColor:'#AFAFAF', color:'black', padding:10}}
                        onChangeText={(text)=>setInputText(text)} />

                        <TouchableOpacity onPress={()=>{withdraw()}}
                        style={{width:'100%', justifyContent:'center', alignItems:'center',borderTopWidth:0.5, borderTopColor:'#AFAFAF', paddingTop:20}}>
                            <Text style={{fontFamily:'NotoSansKR-Regular',color:'#878787',fontSize:15}}>탈퇴하기</Text>
                        </TouchableOpacity>

                    </View>
                </SafeAreaView>
            </BlurView>
        </Modal>
    );
}
const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
      },
   overlay:{
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
   },
   modalContents :{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 18,
        alignItems: 'center',
        marginTop:'50%',
        marginHorizontal:'10%',
        width:'80%',
   }
});
export default Withdraw;
