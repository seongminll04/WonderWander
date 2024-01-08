import { Image, StyleSheet } from "react-native";
import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@/pages/home';
import Map from "@/pages/map";
import Ranking from "@/pages/ranking";
import MyPage from "@/pages/mypage";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: '#3B3B3B', headerShown:false, tabBarStyle:{height:80,paddingTop:10}, tabBarLabelStyle:{
      paddingBottom:20, fontSize:12
    }}}>
      <Tab.Screen name="Home" component={Home} options={{title:'홈' ,tabBarIcon:({focused})=>{
        return (  
          <Image source={require('@assets/Home.png')} style={{tintColor:focused ? '#3B3B3B':'#B9BCBE'}}  />
        )
      }}} />
      <Tab.Screen name="Map" component={Map} options={{title:'지도',tabBarIcon:({focused})=>{
        return (  
          <Image source={require('@assets/Location.png')} style={{tintColor:focused ? '#3B3B3B':'#B9BCBE'}}   />
        )
      }}} />
      <Tab.Screen name="Ranking" component={Ranking} options={{title:'랭킹',tabBarIcon:({focused})=>{
        return (  
          <Image source={require('@assets/Ranking.png')} style={{tintColor:focused ? '#3B3B3B':'#B9BCBE'}} />
        )
      }}} />
      <Tab.Screen name="MyPage" component={MyPage} options={{title:'마이페이지',tabBarIcon:({focused})=>{
        return (  
          <Image source={require('@assets/Setting.png')} style={{tintColor:focused ? '#3B3B3B':'#B9BCBE'}}  />
        )
      }}} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
   
});
export default BottomTabs;