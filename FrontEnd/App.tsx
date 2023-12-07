/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import store from "./store/store";
import { Provider } from "react-redux";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import BottomBar from "./src/components/Bottombar"; // 하단 바 컴포넌트 임포트

import MainHome from "./src/pages/mainhome";




const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent", // 배경을 투명하게 설정
  },
};

function App(): JSX.Element {

  return (
    <Provider store={store}>
      {/* {Platform.OS==='android' ? <StatusBar backgroundColor={'white'} />:null} */}
      <NavigationContainer theme={MyTheme}>
        <View style={styles.container}>
          <Text>123q</Text>
          {/* <Tab.Navigator tabBar={(props) => <BottomBar {...props} />}>
            <Tab.Screen
              name="home"
              component={MainHome}
              options={{ tabBarLabel: "홈", headerShown: false }}
            /> */}
            {/* <Tab.Screen
              name="chart"
              component={MusicChart}
              options={{ tabBarLabel: "차트", headerShown: false }}
            />
            <Tab.Screen
              name="search"
              component={MusicSearch}
              options={{ tabBarLabel: "검색", headerShown: false }}
            />
            <Tab.Screen
              name="like"
              component={MusicLike}
              options={{ tabBarLabel: "보관함", headerShown: false }}
            /> */}
          {/* </Tab.Navigator> */}
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 이 부분이 화면 전체 영역을 차지하도록 하는 핵심입니다.
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default App;
