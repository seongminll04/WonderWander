import { StyleSheet, Modal, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
    isPage:string;
    setPage:(value:string)=>void;
}

function FunctionBar({isPage,setPage}:Props) {
    return (
        <View style={{flexDirection:'row', justifyContent:'space-around', height:50, marginBottom:10}}>
          <TouchableOpacity onPress={()=>{setPage("홈")}}
          style={[styles.pagelist, isPage==='홈' && styles.select_page ]}>
            <Text style={[isPage==='홈' && {color:'#000000'}]}>홈</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setPage("분석리포트")}}
          style={[styles.pagelist, isPage==='분석리포트' && styles.select_page ]}>
            <Text style={[isPage==='분석리포트' && {color:'#000000'}]}>분석리포트</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setPage("도감")}}
          style={[styles.pagelist, isPage==='도감' && styles.select_page ]}>
            <Text style={[isPage==='도감' && {color:'#000000'}]}>도감</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setPage("설정")}}
          style={[styles.pagelist, isPage==='설정' && styles.select_page ]}>
            <Text style={[isPage==='설정' && {color:'#000000'}]}>설정</Text>
          </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    pagelist : {
        justifyContent:'center',
        alignItems:'center',
        
        // border 길이 설정
        width:'16%',
      },
      select_page:{
        borderBottomColor:'#3B3B3B',
        borderBottomWidth:3,
      }
});
export default FunctionBar;
