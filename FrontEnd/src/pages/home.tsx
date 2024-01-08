import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    TextInput,
    FlatList,
  } from "react-native";
import React, { useState } from "react";

import { useDispatch } from "react-redux";

import TopBar from "@/components/home/topbar";
import Carousel from "@/components/home/carousel";
import PopularCulturalAssets from "@/components/home/popularculturalassets";
import RecommendedCulturalAssets from "@/components/home/recommendedculturalassets";
import CulturalAssetsByEra from "@/components/home/culturalassetsbyera";
import MoveToMap from "@/components/home/movetomap";
  
function Home() {
  const dispatch = useDispatch();

  const location = ["전체","서울","부산","대구","인천","광주","대전","울산","세종","경기","강원","충북","충남","전북","전남","경북","경남","제주"]
  const [isLocation , setLocation] = useState("전체")

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBar />
      <ScrollView showsVerticalScrollIndicator={false} style={{width:'88%',marginLeft:'6%'}}>
        <View style={{backgroundColor:'#BCBCBC', width:'100%', flexDirection:'row', alignItems:'center',justifyContent:'center',
      borderRadius:10, marginBottom:20}}>
          <Image source={require('@assets/search.png')} style={{width:18,height:18, marginRight:10}} />
          <TextInput style={{width:'85%'}} placeholder="문화재를 검색해보세요" />
        </View>

        <Carousel />

        <PopularCulturalAssets />
        <RecommendedCulturalAssets />
        <CulturalAssetsByEra />

        <MoveToMap />

      </ScrollView>


    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

});
export default Home;