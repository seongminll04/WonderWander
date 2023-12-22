import { StyleSheet } from "react-native";
import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@/pages/home';
import Map from "@/pages/map";
import Ranking from "@/pages/ranking";
import MyPage from "@/pages/mypage";
import Login from "@/pages/login";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
      <Tab.Screen name="Home" component={Home} options={{title:'홈'}} />
      <Tab.Screen name="Map" component={Map} options={{title:'모험'}} />
      <Tab.Screen name="Ranking" component={Ranking} options={{title:'랭킹'}} />
      <Tab.Screen name="MyPage" component={MyPage} options={{title:'마이페이지'}} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
   
});
export default BottomTabs;