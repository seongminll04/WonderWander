import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";
import Geolocation from 'react-native-geolocation-service';

interface ILocation {
    latitude: number;
    longitude: number;
}

function NaverMap() {
    const [location, setLocation] = useState<ILocation | undefined>(undefined);

    useEffect(() => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLocation({
            latitude,
            longitude,
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }, []);

    return (

    <View
    style={{flex:1}}>
        <View style={{height:'5%', flexDirection:'row', marginLeft:20, marginBottom:5,}}>
            <Text style={{ alignItems:'center',fontFamily:'Roboto-Bold',fontSize:15, marginRight:20,fontWeight:'700',  textAlignVertical:'center'}}>현위치</Text>
            <Text style={{ alignItems:'center',fontSize:12, color:'#32D583', textAlignVertical:'center'}}>{location ? String(location.latitude)+','+String(location.longitude) : 0}</Text>
        </View>
        <NaverMapView
            style={{ height: "95%"}}
            zoomControl={false}
            center={{
            zoom: 12,
            latitude: location ? location.latitude : 0,
            longitude: location ? location.longitude : 0,
            }} />
    </View>
    );
}
const styles = StyleSheet.create({

});
export default NaverMap;
