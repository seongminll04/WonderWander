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
import Top3User from "@/components/home/top3user";
  
function Home() {
  const dispatch = useDispatch();

  const location = ["전체","서울","부산","대구","인천","광주","대전","울산","세종","경기","강원","충북","충남","전북","전남","경북","경남","제주"]
  const [isLocation , setLocation] = useState("전체")

  return (
    <SafeAreaView style={{ flex: 1 ,backgroundColor:'white'}}>
      <TopBar />
      <ScrollView showsVerticalScrollIndicator={false} style={{width:'88%',marginLeft:'6%'}}>
        <Carousel />

        <PopularCulturalAssets />
        <RecommendedCulturalAssets />
        <CulturalAssetsByEra />

        <MoveToMap />
        <Top3User />
      </ScrollView>


    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

});
export default Home;