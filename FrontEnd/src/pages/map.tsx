import {
    StyleSheet,
    SafeAreaView,
    Text,
  } from "react-native";
import React from "react";
import NaverMap from "@/components/navermap";


  
function Map() {
    return (
      <SafeAreaView style={{ flex: 1 ,backgroundColor:'white' }}>
        <NaverMap />
      </SafeAreaView>
    );
  }
const styles = StyleSheet.create({

});
export default Map;
  