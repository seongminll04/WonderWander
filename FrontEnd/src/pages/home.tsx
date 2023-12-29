import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
  } from "react-native";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import TopBar from "@/components/topbar";
import NaverMap from "@/components/navermap";

  
function Home() {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBar />
      <NaverMap />
      <View>
        <Text style={{fontSize:24, fontWeight:'900',marginLeft:20, color:'black'}}>이번 주말 갈 만한 곳</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{flexDirection:'row'}} style={{marginLeft:15, marginTop:10}}>
          <View style={[styles.region, styles.sel_region]}>
            <Text style={styles.region_text}>전체</Text>
          </View>
          <View style={styles.region}>
            <Text style={styles.region_text}>서울</Text>
          </View>
          <View style={styles.region}>
            <Text style={styles.region_text}>부산</Text>
          </View>
          <View style={styles.region}>
            <Text style={styles.region_text}>인천</Text>
          </View>
          <View style={styles.region}>
            <Text style={styles.region_text}>광주</Text>
          </View>
          <View style={styles.region}>
            <Text style={styles.region_text}>대전</Text>
          </View>
          <View style={styles.region}>
            <Text style={styles.region_text}>대구</Text>
          </View>
          <View style={styles.region}>
            <Text style={styles.region_text}>울산</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  region:{
    width: 50, // 각 아이템의 너비
    height: 25, // 각 아이템의 높이
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#B9BCBE',
    borderRadius:20,
    margin: 5,
  },
  sel_region:{
    backgroundColor:'#1DAEFF'
  },
  region_text:{
    color:'white'
  }
});
export default Home;