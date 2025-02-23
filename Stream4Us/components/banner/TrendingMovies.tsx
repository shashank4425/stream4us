import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { bannerList } from "../../assets/bannerList/bannerList";
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window'); 

const TrendingMovies = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);
  const [data, setData] = useState([...bannerList]);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
         let nextIndex = prevIndex + 1;
         if (nextIndex >= data.length) {
          setData((prevData) => [...prevData, ...bannerList]); 
         }
         return nextIndex;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [data]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: index,
      });
    }
  }, [index]);

  const getItemLayout = (data, index) => ({
    length: width,
    offset: (width + width * 0) * index,
    index,
  });

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.imageContainer,
        index === 0 ? styles.firstImage : {},
      ]}
    >
      <TouchableOpacity onPress={() => navigation.navigate("MoviePlayer", item)}>
        <Image source={{ uri: item.seo.ogImage }} style={styles.image} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id + index}
        horizontal
        scrollEnabled={true}
        pagingEnabled
        onEndReachedThreshold={0.1}
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: width,
    height: height * 0.25, 
    marginRight: width * 0,
  },
  firstImage: {
    marginLeft: width * 0,
  },
  image: {
    backgroundColor: "#696969",
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
    borderRadius: 0,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    margin: 5,
  },
  flatListContent: {
    paddingHorizontal: 0,
  },
});

export default TrendingMovies;
