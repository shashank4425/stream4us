import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { bannerList } from "../../assets/bannerList/bannerList";
import { useNavigation } from '@react-navigation/native';

const TrendingMovies = () => {
  const navigation=useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= bannerList.length) nextIndex = 0;
      setActiveIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ animated: true,scrollX: true, index: nextIndex });
    }, 3000); // Change every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [activeIndex]);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("MoviePlayer", item)}>
      <Image source={{ uri: item.seo.ogImage }} style={styles.image} />
      </TouchableOpacity>
    </View>
  );

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleEndReached = () => {
    if(activeIndex == bannerList.length -1){
      setTimeout(() => {
        flatListRef.current.scrollToIndex({index : 0 , animated : true});
         setActiveIndex(0);
      }, 3000);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bannerList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        onEndReached={handleEndReached}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        ref={flatListRef}
      />
      <View style={styles.dotsContainer}>
        {bannerList.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { opacity: activeIndex === index ? 1 : 0.5 },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:0,
    justifyContent: 'flex-start'
  },
  imageContainer: {
    padding:0,
    marginRight:8,
    marginLeft:6,
    width:windowWidth/1.2,
    height:186
  },
  image: {
    backgroundColor:"#D9D9D9",
    width:"100%",
    height: "100%",
    resizeMode: 'cover',
    borderRadius:12
  },
  dotsContainer: {
    position: 'relative',
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
});

export default TrendingMovies;
