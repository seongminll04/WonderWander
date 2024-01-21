import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "@store/actions";
import { AppState } from "@store/state";
import Icon from "react-native-vector-icons/AntDesign";

function Search() {
    const dispatch = useDispatch();
    const [isLocation, setLocation] = useState('전체');
    const location = [
        '전체',
        '서울',
        '부산',
        '대구',
        '인천',
        '광주',
        '대전',
        '울산',
        '세종',
        '경기',
        '강원',
        '충북',
        '충남',
        '전북',
        '전남',
        '경북',
        '경남',
        '제주',
      ];
      const [isAge, setAge] = useState('전체');
      const age = [
        '전체',
        '선사',
        '석기',
        '삼국',
        '청동',
        '철기',
        '삼한',
        '고구려',
        '신라',
        '발해',
        '통일신라',
        '고려',
        '조선',
        '대한제국',
        '일제강점기',
        '시대미상'
      ];
    return (
        <View style={styles.container}>
            <View style={{width:'88%', marginHorizontal:'6%',height:'94%',marginVertical:'3%'}}>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:50}}>
                    <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}
                    onPress={()=>{dispatch(setModal(null));}}>
                        <Icon name="arrowleft" size={24} color='#000000'/>
                    </TouchableOpacity>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'black', marginRight:24}}>문화재 검색</Text>
                    <Text/>
                </View>
                <View style={{backgroundColor:'#F2F2F2', width:'100%', flexDirection:'row', alignItems:'center',justifyContent:'center',
        borderRadius:14, marginBottom:20}}>
                <Image source={require('@assets/search.png')} style={{width:18,height:18, marginRight:10}} />
                <TextInput style={{width:'85%'}} placeholder="문화재를 검색해보세요" />
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:12, fontFamily:'NotoSansKR-Bold'}}>지역</Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={location}
                        contentContainerStyle={{paddingHorizontal: '3%', alignItems:'center',justifyContent:'center'}}
                        renderItem={({item}) => (
                            <TouchableOpacity
                            onPress={() => {
                                setAge(item);
                            }}
                            style={[
                                styles.region,
                                isAge === item ? styles.sel_region : null,
                            ]}>
                            <Text
                            style={
                                isAge === item
                                ? styles.sel_region_text
                                : styles.region_text
                            }>
                            {item}
                            </Text>
                        </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={{flexDirection:'row',alignItems:'center', borderBottomColor:'#D9D9D9', borderBottomWidth:1, paddingBottom:10}}>
                    <Text style={{fontSize:12, fontFamily:'NotoSansKR-Bold'}}>시대</Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={age}
                        contentContainerStyle={{paddingHorizontal: '3%', alignItems:'center',justifyContent:'center'}}
                        renderItem={({item}) => (
                            <TouchableOpacity
                            onPress={() => {
                                setLocation(item);
                            }}
                            style={[
                                styles.region,
                                isLocation === item ? styles.sel_region : null,
                            ]}>
                            <Text
                            style={
                                isLocation === item
                                ? styles.sel_region_text
                                : styles.region_text
                            }>
                            {item}
                            </Text>
                        </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={{marginTop:20}}>
                    <Text style={{fontSize:16, fontFamily:'NotoSansKR-Bold'}}>결과   <Text style={{color:'#32D583'}}>1,600</Text></Text>
                    <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        marginTop: 10,
                    }}>
                    <View
                        style={{
                        backgroundColor: 'gray',
                        width: 80,
                        height: 80,
                        borderRadius: 20,
                        }}></View>
                    <View
                        style={{marginLeft: 20, justifyContent: 'center', width: '60%'}}>
                        <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: '#000000',
                            marginBottom: 5,
                        }}>
                        경주첨성대
                        </Text>
                        <Text style={{color: '#A6A6A6', marginBottom: 5}}>
                        경상북도 경주시 인왕동 839-1
                        </Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon
                            name="heart"
                            size={15}
                            color="#E74B2C"
                            style={{marginRight: 10}}
                        />
                        <Text style={{color: '#3B3B3B'}}>20,400</Text>
                        </View>
                    </View>
            
                    </View>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
   },
   region: {

    padding:10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderColor: '#E5E5E5',
    borderWidth: 1.5,
    margin: 5,
  },
  sel_region: {
    backgroundColor: 'rgba(50,213,131,0.15)',
    borderColor: '#32D583',
  },
  region_text: {
    color: '#3B3B3B',
  },
  sel_region_text: {
    color: '#32D583',
  },
});
export default Search;
