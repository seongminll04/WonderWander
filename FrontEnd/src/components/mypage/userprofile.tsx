import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "@store/actions";
import axiosInstance from "@/axiosinstance";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Config from "react-native-config";
import AsyncStorage from "@react-native-async-storage/async-storage";

function UserProfile() {
    const dispatch = useDispatch();
    const [isUserData, setUserData] = useState(
        {"nickname":'닉네임',
        "follower":"1",
        "following":"2",
        "intro":"나를 소개해봐",
        "image" : ""});

    const getUserData = async () => {
        const nickname = await AsyncStorage.getItem("nickname")
        const image = await AsyncStorage.getItem("image")
        const intro = await AsyncStorage.getItem("intro")
        const follower = await AsyncStorage.getItem("follower")
        const following = await AsyncStorage.getItem("following")
        setUserData({"nickname":nickname!, "image" : image!,
        "follower":follower!,"following":following!,"intro":intro ? intro:"자기소개를 등록해보세요"})
    }

    useEffect(() =>{
        getUserData();
    },[])

    return (
        <View style={{justifyContent:'space-between', marginTop:20, flexDirection:'row', width:'80%',marginBottom:10}} >
            <View style={{width:'40%', justifyContent:'center',alignItems:'center'}}>
                <Image source={isUserData.image? {uri:isUserData.image}
                    :require("@assets/user1.png")} style={{width:75,height:75, borderRadius:50}} />
            </View>
            <View style={{ width:'60%', alignItems:'flex-start', justifyContent:'space-between'}}>
                <Text style={{color:'#000000', fontSize:18, fontWeight:'bold'}}>{isUserData.nickname}</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>팔로잉 </Text>
                    <Text style={{fontWeight:'bold'}}> {isUserData.following} </Text>
                    <Text> 팔로워 </Text>
                    <Text style={{fontWeight:'bold'}}> {isUserData.follower} </Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text>{isUserData.intro} </Text>
                    <Icon name="pencil" size={14} color="#000000" onPress={()=>{dispatch(setModal("내 정보수정"))}} />
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({

});
export default UserProfile;
