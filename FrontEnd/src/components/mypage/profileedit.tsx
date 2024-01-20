import { Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/AntDesign";
import ImagePicker, { launchImageLibrary, ImagePickerResponse, ImageLibraryOptions } from 'react-native-image-picker';
import axiosInstance from "@/axiosinstance";
import Config from "react-native-config";

interface Props {
    isEditOpen : boolean;
    closeEdit : ()=>void;
    reload : ()=>void;
}

function ProfileEdit({isEditOpen,closeEdit,reload}:Props) {
    const [selectedImage, setSelectedImage] = useState<ImagePicker.Asset|null>(null);
    const [isUserData, setUserData] = useState(
        {"nickname":'닉네임',
        "intro":"나를 소개해봐",
        "image" : ""});

    // 소개글은 변경한거 확인해야해서 따로 추가
    const [isIntro, setIntro] = useState<string>('');


    const getUserData = async () => {
        const nickname = await AsyncStorage.getItem("nickname")
        const image = await AsyncStorage.getItem("image")
        const intro = await AsyncStorage.getItem("intro")

        setIntro(intro!);
        setUserData({"nickname":nickname!, "image" : image!,
        "intro":intro!})
    }

    useEffect(() =>{
        getUserData();
    },[])

    const newImage = () => {
        const options: ImageLibraryOptions = {
          mediaType: 'photo', // 또는 'video' 또는 'mixed'
        };
    
        launchImageLibrary(options, (response: ImagePickerResponse) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorMessage) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else if (response.assets && response.assets.length > 0) {
            const selectedAsset = response.assets[0];
            setSelectedImage(selectedAsset);
          }
        });
    };

    const EditChange = () => {
        if (isIntro == isUserData.intro && !selectedImage) {
            return Alert.alert("수정된 사항이 존재하지 않습니다.")
        }

        const formData = new FormData();
        if (selectedImage) {
            formData.append('image',{
                uri:selectedImage.uri,
                type:selectedImage.type,
                name:selectedImage.fileName
            })
        }
        if (isIntro != isUserData.intro) {
            formData.append('intro', isIntro)
        }
        axiosInstance({
            method:'patch',
            url: Config.API_APP_KEY + '/v1/user/editProfile',
            data: formData,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then(res => {
            if (isIntro != isUserData.intro) {
                AsyncStorage.setItem("intro", isIntro);
            }
            if (res.data) {
                AsyncStorage.setItem("image", res.data);
            }
            reload();
            Alert.alert('정보수정 완료')
            closeEdit();
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Modal style={styles.container}
        animationType="slide"
        visible={isEditOpen}>
            <View style={{width:'88%', marginHorizontal:'6%', justifyContent:'space-between',height:'94%',marginVertical:'3%'}}>
                <View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:50}}>
                        <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}
                        onPress={()=>{closeEdit()}}>
                            <Icon name="arrowleft" size={24} color='#000000'/>
                        </TouchableOpacity>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'black', marginRight:24}}>정보수정</Text>
                        <Text/>
                    </View>
    
                    <TouchableOpacity onPress={()=>{newImage()}}
                    style={{justifyContent:'center',alignItems:'center', marginBottom:30}}>
                        <Image source={
                            selectedImage ? {uri:selectedImage.uri} :
                            isUserData.image? {uri:isUserData.image}:
                            require("@assets/user1.png")} 
                        style={{width:120,height:120, borderRadius:100}} />
                    {selectedImage && (
                        <TouchableOpacity onPress={()=>setSelectedImage(null)} style={{ position: 'absolute', top: 0, right:'35%', backgroundColor: 'gray', borderRadius: 50, padding: 5 }}>
                            <Icon name="close" size={16} color='#000000'/>
                        </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                    


                    <View style={{backgroundColor:'#F2F2F2', borderRadius:14,padding:20, flexDirection:'row', justifyContent:'space-between', marginBottom:30}}>
                        <Text style={{fontSize:14}}>{isUserData.nickname}</Text>
                        <Image source={require("@assets/Lock.png")} width={16} height={16}/>
                    </View>
    
    
                    <TextInput placeholder="소개말을 입력해주세요." 
                    value={isIntro} 
                    textAlignVertical="top" 
                    numberOfLines={14} 
                    multiline
                    onChangeText={(text)=>{setIntro(text)}}
                    style={{backgroundColor:'#F2F2F2', borderRadius:14,padding:20, marginBottom:30, fontSize:14}} />
    
                </View>
               
                <TouchableOpacity onPress={()=>{EditChange()}}
                style={{backgroundColor:'#2B2B2B', justifyContent:'center',alignItems:'center',
            padding:10, borderRadius:18, height:60}}>
                    <Text style={{color:'white', fontSize:16}}>수정하기</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
   }
});
export default ProfileEdit;
