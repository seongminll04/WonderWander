import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "@store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ProfileEdit() {
    const dispatch = useDispatch();
    const [isUserData, setUserData] = useState(
        {"nickname":'닉네임',
        "intro":"나를 소개해봐",
        "image" : ""});

    const getUserData = async () => {
        const nickname = await AsyncStorage.getItem("nickname")
        const image = await AsyncStorage.getItem("image")
        const intro = await AsyncStorage.getItem("intro")

        setUserData({"nickname":nickname!, "image" : image!,
        "intro":intro!})
    }

    useEffect(() =>{
        getUserData();
    },[])

    return (
        <View style={styles.container}>
            <View style={{width:'80%', marginLeft:'10%',justifyContent:'center', alignItems:'center'}}>
                <Text>내 프로필 수정하기</Text>
                <Text onPress={()=>{dispatch(setModal(null));}}>닫기</Text>
                <Image source={isUserData.image? {uri:isUserData.image}:require("@assets/user1.png")} 
                style={{width:150,height:150, borderRadius:100}} />
                <Text>{isUserData.nickname}</Text>
                <Text>자기소개</Text>
                <TextInput style={{borderWidth:1, width:'100%'}}
                placeholder="자기소개를 등록해보세요">{isUserData.intro}</TextInput>
                <TouchableOpacity style={{backgroundColor:'green'}}>
                    <Text>변경하기</Text>
                </TouchableOpacity>
            </View>
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
