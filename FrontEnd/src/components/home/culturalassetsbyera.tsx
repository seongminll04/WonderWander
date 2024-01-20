import { StyleSheet, Modal, Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@store/state";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function CulturalAssetsByEra() {
    const dispatch = useDispatch();
    const era = ["선사", "석기", "삼국", "청동", "철기", "삼한", "고구려", "신라", "발해", "통일신라", "고려", "조선", "대한제국", "일제강점기", "시대미상"]
    return (
        <View style={{marginTop:20}}>
            <Text style={{fontSize:24, fontWeight:'900', color:'black',marginHorizontal:'6%'}}>시대별 문화재</Text>
            <View style={{backgroundColor:'black', width:'88%',height:300, borderRadius:30, marginTop:20, marginHorizontal:'6%'}}>
                <View style={{flexDirection:'row', justifyContent:'space-between', margin:30, marginTop:50, marginBottom:10}}>
                    <Text style={{color:'white',fontSize:20, width:80}}>문화재로 시간여행 해볼래?</Text>
                    <Image source={require("@assets/rocket.png")} />
                </View>
                <Text style={{color:'white',fontSize:12, marginLeft:30}}># 시간여행 # 시대별 문화재</Text>
                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={era}
                    contentContainerStyle={{paddingHorizontal:20,marginTop:20}}
                    renderItem={({item})=>(
                    <View
                    style={{width:80,height:80, alignItems:'center',justifyContent:'center', backgroundColor:'rgba(255,255,255,0.5)',margin:3,borderRadius:20}}>
                        <Text style={{color:'white',fontSize:18}}>
                            {item}
                        </Text>
                    </View>
                    )}/>
            </View>
      
        </View>
    );
}
const styles = StyleSheet.create({

});
export default CulturalAssetsByEra;
