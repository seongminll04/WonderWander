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

function MyPage() {
  const [isPage, setPage] = useState("내 관심목록")

  return (
    <View style={{ flex: 1 }}>

      <UserProfile />

      <View style={{flexDirection:'row', justifyContent:'space-between', height:50,
      borderBottomColor:'#000000',borderBottomWidth:1}}>
        <TouchableOpacity onPress={()=>{setPage("내 관심목록")}}
        style={[styles.pagelist, isPage==='내 관심목록' && styles.select_page ]}>
          <Text style={[isPage==='내 관심목록' && {color:'#000000'}]}>내 관심목록</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setPage("분석 리포트")}}
        style={[styles.pagelist, isPage==='분석 리포트' && styles.select_page ]}>
          <Text style={[isPage==='분석 리포트' && {color:'#000000'}]}>분석 리포트</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setPage("도감")}}
        style={[styles.pagelist, isPage==='도감' && styles.select_page ]}>
          <Text style={[isPage==='도감' && {color:'#000000'}]}>도감</Text>
        </TouchableOpacity>
      </View>

      {isPage==="내 관심목록" ? <MyLikeList /> :
      isPage==="분석 리포트" ? <AnalysisReport /> :
      isPage==="도감" ? <StampBook /> : null}

    </View>
  );
}
const styles = StyleSheet.create({
  pagelist : {
    justifyContent:'center',
    alignItems:'center',
    width:'33.33%',
    borderBottomWidth:2,
    borderBottomColor:'#FFFFFF',
  },
  select_page:{
    borderBottomColor:'#1DAEFF',
    borderBottomWidth:2,
  }

});
export default MyPage;
  