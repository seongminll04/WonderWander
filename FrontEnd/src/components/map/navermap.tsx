import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";
import Geolocation from 'react-native-geolocation-service';
import Config from "react-native-config";
import axios from "axios";

interface ILocation {
    latitude: number;
    longitude: number;
}

function NaverMap() {
    const [location, setLocation] = useState<ILocation | undefined>(undefined);
    const [myLocation, setMyLocation] = useState('');

    const FindMyLocation = () => {
      Geolocation.getCurrentPosition(
        async position => {
          const {latitude, longitude} = position.coords;
          setLocation({
            latitude,
            longitude,
          });
          // GetAddress(latitude,longitude);  
          GetAddress(36.3501321,127.3475125);      
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }

    const GetAddress = (latitude:number,longitude:number) => {
      axios({
        method: 'get',
        url: `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${longitude},${latitude}&orders=roadaddr&output=json`,
        headers: {
          'X-NCP-APIGW-API-KEY-ID': Config.NAVER_MAP_CLIENT_ID,
          'X-NCP-APIGW-API-KEY': Config.NAVER_MAP_SECRET_KEY,
        }
      }).then(res => {
        // console.log(res.data.results[0])
        if (res.data.results.length > 0) {
          const firstResult = res.data.results[0]; // 'result'가 올바른 경로인지 확인합니다
          const address = firstResult?.region?.area1?.name + ' ' + firstResult?.region?.area2?.name + ' ' + firstResult?.land?.name + ' ' + firstResult?.land?.number1 + ' (' + firstResult?.region?.area3?.name +')';
          setMyLocation(address);
        } else {
          setMyLocation('해당 좌표의 지역주소가 없습니다')
        }
      }).catch(err => {
        console.log(err);
      });
    }

    useEffect(() => {
      FindMyLocation();
    }, []);

    return (

    <View
    style={{flex:1}}>
        <View style={{height:'5%', flexDirection:'row', marginLeft:20, marginBottom:5,}}>
            <Text style={{ alignItems:'center',fontFamily:'Roboto-Bold',fontSize:15, marginRight:20,fontWeight:'700',  textAlignVertical:'center'}}>현위치</Text>
            <Text style={{ alignItems:'center',fontSize:12, color:'#32D583', textAlignVertical:'center'}}>{myLocation ? myLocation : 0}</Text>
        </View>
        <NaverMapView
            style={{ height: "95%"}}
            zoomControl={false}
            center={{
            zoom: 12,
            longitude: location ? location.longitude : 0,
            latitude: location ? location.latitude : 0,
            }} />
    </View>
    );
}
const styles = StyleSheet.create({

});
export default NaverMap;
