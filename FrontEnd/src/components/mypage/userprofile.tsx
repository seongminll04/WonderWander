import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "@store/actions";
import axiosInstance from "@/axiosinstance";
import Icon from "react-native-vector-icons/SimpleLineIcons";

function UserProfile() {
    const dispatch = useDispatch();
    const [isUserData, setUserData] = useState("");

    const getUserData = () => {
        axiosInstance({
            method:'get',
            url:''
        }).then((res)=>{
            console.log(res)
            setUserData("a")
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() =>{
        getUserData();
    },[])

    return (
        <View style={{justifyContent:'space-between', marginTop:20, flexDirection:'row', width:'80%',marginBottom:10}} >
            <View style={{width:'40%', justifyContent:'center',alignItems:'center'}}>
                <Image source={require("@assets/user1.png")} style={{width:75,height:75, borderRadius:50}} />
            </View>
            <View style={{ width:'60%', alignItems:'flex-start', justifyContent:'space-between'}}>
                <Text style={{color:'#000000', fontSize:18, fontWeight:'bold'}}>닉네임</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>팔로잉 </Text>
                    <Text style={{fontWeight:'bold'}}> 0 </Text>
                    <Text> 팔로워 </Text>
                    <Text style={{fontWeight:'bold'}}> 0 </Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text>나를 소개해보세요 </Text>
                    <Icon name="pencil" size={14} color="#000000" onPress={()=>{dispatch(setModal("내 정보수정"))}} />
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({

});
export default UserProfile;
