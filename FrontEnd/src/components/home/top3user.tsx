import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import LinearGradient from 'react-native-linear-gradient';

function Top3User() {
    return (
        <View
        style={{marginTop:20,marginBottom:50}}>
            <Text style={{fontSize:24, fontWeight:'900', color:'black'}}>TOP3 인플루언서</Text>

            <View style={{marginTop:20, flexDirection:'row', justifyContent:'space-around'}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:100,height:100, borderRadius:50, borderColor:'#32D5AE',borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                        <Image source={require("@assets/user1.png")} style={{width:90, height:90, borderRadius:50}} />
                    </View>
                    <View style={{backgroundColor:'#000000', width:60, height:30, justifyContent:'center',alignItems:'center', borderRadius:20, bottom:20}}>
                        <Text style={{color:'#FFFFFF'}}>1,000만</Text>
                    </View>
                    <Text style={{bottom:10}}>김아무개</Text>
                    <TouchableOpacity style={{borderWidth:1,borderColor:'#000000',borderRadius:20, width:65, height:35, justifyContent:'center',alignItems:'center'}}>
                        <Text>팔로우</Text>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:100,height:100, borderRadius:50, borderColor:'#32D5AE',borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                        <Image source={require("@assets/user1.png")} style={{width:90, height:90, borderRadius:50}} />
                    </View>
                    <View style={{backgroundColor:'#000000', width:60, height:30, justifyContent:'center',alignItems:'center', borderRadius:20, bottom:20}}>
                        <Text style={{color:'#FFFFFF'}}>1,000만</Text>
                    </View>
                    <Text style={{bottom:10}}>김아무개</Text>
                    <TouchableOpacity style={{borderWidth:1,borderColor:'#000000',borderRadius:20, width:65, height:35, justifyContent:'center',alignItems:'center'}}>
                        <Text>팔로우</Text>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:100,height:100, borderRadius:50, borderColor:'#32D5AE',borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                        <Image source={require("@assets/user1.png")} style={{width:90, height:90, borderRadius:50}} />
                    </View>
                    <View style={{backgroundColor:'#000000', width:60, height:30, justifyContent:'center',alignItems:'center', borderRadius:20, bottom:20}}>
                        <Text style={{color:'#FFFFFF'}}>1,000만</Text>
                    </View>
                    <Text style={{bottom:10}}>김아무개</Text>
                    <TouchableOpacity style={{borderWidth:1,borderColor:'#000000',borderRadius:20, width:65, height:35, justifyContent:'center',alignItems:'center'}}>
                        <Text>팔로우</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({

});
export default Top3User;