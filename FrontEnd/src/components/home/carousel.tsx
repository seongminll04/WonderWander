import { StyleSheet, Modal, Text, View, FlatList, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";

type Callback = {(): void};
function useInterval(callback: Callback, delay: number | null) {
    const savedCallback = useRef<Callback>(() => {});
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
}
  

const sss = Dimensions.get("window").width

function Carousel() {
    const dispatch = useDispatch();

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const data = useMemo(
        () => [
            "1","2","3","4"
        ],
        [],
      );
    const snapToOffsets = useMemo(() => Array.from(Array(data.length)).map((_, index) => index * (sss-36)),[data],);

    useEffect(() => {
        if (currentIndex !== snapToOffsets.length) {
        flatListRef.current?.scrollToOffset({
            animated: true,
            offset: snapToOffsets[currentIndex],
        });
        }
    }, [currentIndex, snapToOffsets]);

    useInterval(() => {
        setCurrentIndex(prev => (prev === snapToOffsets.length - 1 ? 0 : prev + 1));
    }, 5000);

    return (
        <View style={styles.container}>
            <FlatList 
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal:24}}
            snapToOffsets={snapToOffsets}
            ref={flatListRef}
            renderItem={({item})=>(
                <View style={{marginRight:12}}>
                    <Text style={{backgroundColor:'gray', width:sss-48, height:280, borderRadius:40}}>
                        {item}
                    </Text>
                </View>
            )}
            keyExtractor={(_, index) => String(index)}
            />
            <View style={styles.dotContainer}>
                {data.map((_, index) => (
                <TouchableOpacity onPress={()=>{setCurrentIndex(index)}}
                style={[styles.dot,{backgroundColor: index === currentIndex ? '#000000' : '#D9D9D9',},]}/>
                ))}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: sss,
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
});
export default Carousel;
