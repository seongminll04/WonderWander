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
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: '#1DAEFF', headerShown:false, tabBarStyle:{height:60}}}>
      <Tab.Screen name="Home" component={Home} options={{title:'홈' ,tabBarIcon:({focused})=>{
        return (  
          <Image source={focused? require('@assets/Home_S.png'):require('@assets/Home.png')} />
        )
      }}} />
      <Tab.Screen name="Map" component={Map} options={{title:'지도',tabBarIcon:({focused})=>{
        return (  
          <Image source={focused? require('@assets/Location_S.png'):require('@assets/Location.png')} />
        )
      }}} />
      <Tab.Screen name="Ranking" component={Ranking} options={{title:'랭킹',tabBarIcon:({focused})=>{
        return (  
          <Image source={focused? require('@assets/Ranking_S.png'):require('@assets/Ranking.png')} />
        )
      }}} />
      <Tab.Screen name="MyPage" component={MyPage} options={{title:'설정',tabBarIcon:({focused})=>{
        return (  
          <Image source={focused? require('@assets/Setting_S.png'):require('@assets/Setting.png')} />
        )
      }}} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
   
});
export default BottomTabs;