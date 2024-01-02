import {
    StyleSheet,
    View,
    Text,
  } from "react-native";
import React from "react";
import NaverMap from "@/components/navermap";


  
function Map() {
    return (
      <View style={{ flex: 1 }}>
        <NaverMap />
      </View>
    );
  }
const styles = StyleSheet.create({

});
export default Map;
  