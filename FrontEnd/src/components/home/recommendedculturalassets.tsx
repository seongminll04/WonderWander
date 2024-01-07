import { StyleSheet, Modal, Text, View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@store/state";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function RecommendedCulturalAssets() {
    const dispatch = useDispatch();
    const data = ["강진 무위사 극락..","충주 탑평리 칠층..","영주 부석사 무량..","영주 부석사 무량.."]
    return (
        <View style={{marginTop:20}}>
            <Text style={{fontSize:24, fontWeight:'900',marginLeft:25, color:'black'}}>추천 문화재</Text>
     
                <FlatList horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                contentContainerStyle={{paddingHorizontal:20,marginTop:10}}
                renderItem={({item})=>(
                    <View style={styles.region}>
                        <View>
                            <Text numberOfLines={1} ellipsizeMode="tail" 
                            style={{fontSize:12, color:'#FFFFFF',fontWeight:'bold'}}>{item}</Text>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Icon name="heart" size={12} color='#E74B2C' style={{marginRight:5}}/>
                                <Text style={{fontSize:12, color:'#FFFFFF'}}>20,400</Text>
                            </View>
                        </View>
                    </View>
                )}/>
        </View>
    );
}
const styles = StyleSheet.create({
    region:{
        width: 120, // 각 아이템의 너비
        height: 160, // 각 아이템의 높이
        justifyContent: 'flex-end',
        padding:5,
        paddingBottom:10,
        alignItems: 'center',
        backgroundColor:'grey',
        borderRadius:20,
        borderColor:'#E5E5E5',
        borderWidth:1.5,
        margin: 5,
    },
});
export default RecommendedCulturalAssets;
