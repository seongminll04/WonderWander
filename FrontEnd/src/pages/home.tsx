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

  
function Home() {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>메인홈</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    barStyle: {
      marginTop: 10,
      marginLeft: 10,
      fontSize: 24,
      color: "white",
    },
    topbar: {
      flex: 0.2,
      width: "100%",
    },
    homecontainer: {
      marginTop: 20,
      flexDirection: "row", // 가로 방향으로 자식 요소 정렬
      justifyContent: "space-between", // 주 축을 따라 공간을 동일하게 분배
      alignItems: "center", // 교차 축을 따라 중앙 정렬
      paddingHorizontal: 16, // 가로 간격 추가 (원하는 만큼 조절)
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center", // 교차 축을 따라 중앙 정렬
      marginTop: 20,
    },
    logo: {
      width: 80, // 이미지의 너비 설정
      resizeMode: "contain",
    },
    profile_img: {
      width: 50, // 이미지의 너비 설정
      resizeMode: "contain",
      borderRadius: 50,
    },
    login: {
      textDecorationLine: "underline",
      color: "white",
    },
});
export default Home;