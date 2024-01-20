import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileEdit from "./profileedit";

function UserProfile() {
    const dispatch = useDispatch();
    const [isEditOpen, setEditOpen] = useState(false);
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
        "follower":follower!,"following":following!,"intro":intro ? intro:"나를 소개해보세요."})
    }

    useEffect(() =>{
        getUserData();
    },[])

    return (
        <View style={styles.container} >
            <ProfileEdit isEditOpen={isEditOpen} closeEdit={()=>setEditOpen(false)} reload={()=>getUserData()} />
            <View style={{flexDirection:'row', marginBottom:10}}>
                <View style={{ justifyContent:'center',alignItems:'center'}}>

                <Image source={isUserData.image? {uri:isUserData.image}:require("@assets/user1.png")} 
                style={{width:65,height:65, borderRadius:50}} />
                </View>
    
                <View style={{marginHorizontal:'6%'}}>
                    <Text style={[styles.nickname, styles.boldText]}>{isUserData.nickname}</Text>
                    <Text>팔로잉
                        <Text style={styles.boldText}> {isUserData.following}  </Text> 
                        팔로워 
                        <Text style={styles.boldText}> {isUserData.follower} </Text>
                    </Text>
                    <Text>{isUserData.intro}</Text>
                </View>
            </View>
            <View style={styles.profileEdit}>
                <TouchableOpacity onPress={()=>{setEditOpen(true)}}
                style={styles.editBtn}>
                    <Text style={{color:'#3B3B3B'}}>수정</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        justifyContent:'space-between', 
        marginTop:20, 
        flexDirection:'row', 
        width:'88%', 
        marginHorizontal:'6%',
        marginBottom:10
    },
    nickname:{
        color:'#000000', 
        fontSize:18, 
        marginBottom:5
    },
    boldText:{
        fontWeight:'bold'
    },
    profileEdit:{
        justifyContent:'center',
        alignItems:'center',
        marginRight:10,
    },
    editBtn : {
        paddingVertical:10,
        paddingHorizontal:15,
        borderWidth:1,
        borderRadius:20,
        borderColor:'#E5E5E5',
    }
});
export default UserProfile;
