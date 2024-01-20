import { StyleSheet, Modal, Text, View, Image, TextInput } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "@store/actions";
import { AppState } from "@store/state";

function Search() {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state: AppState) => state.isModalOpen);
    return (
        <View style={styles.container}>
            <Text onPress={()=>{dispatch(setModal(null));}}>닫기</Text>
            <View style={{backgroundColor:'#BCBCBC', width:'100%', flexDirection:'row', alignItems:'center',justifyContent:'center',
        borderRadius:10, marginBottom:20}}>
                <Image source={require('@assets/search.png')} style={{width:18,height:18, marginRight:10}} />
                <TextInput style={{width:'85%'}} placeholder="문화재를 검색해보세요" />
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
export default Search;
