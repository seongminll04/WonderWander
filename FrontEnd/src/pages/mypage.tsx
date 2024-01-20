import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
  } from "react-native";
import React, { useState } from "react";
import UserProfile from "@/components/mypage/userprofile";
import MyLikeList from "@/components/mypage/mylikelist";
import AnalysisReport from "@/components/mypage/analysisreport";
import StampBook from "@/components/mypage/stampbook";
import Setting from "@/components/mypage/setting";
import FunctionBar from "@/components/mypage/functionbar";

function MyPage() {
  const [isPage, setPage] = useState("홈")

  return (
    <View style={{ flex: 1 ,backgroundColor:'white' }}>
      <UserProfile />

      <FunctionBar isPage={isPage} setPage={(value)=>{setPage(value)}} />
      {isPage==="홈" ? <MyLikeList /> :
      isPage==="분석리포트" ? <AnalysisReport /> :
      isPage==="도감" ? <StampBook /> :
      isPage==="설정" ? <Setting /> : null}

    </View>
  );
}
const styles = StyleSheet.create({
 

});
export default MyPage;
  