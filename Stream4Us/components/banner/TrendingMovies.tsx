import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions, Animated } from 'react-native';
import { bannerList } from "../../assets/bannerList/bannerList";
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TrendingMovies = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);
  const [data, setData] = useState([...bannerList]); // Initial data

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
         let nextIndex = prevIndex + 1;
         if (nextIndex >= data.length) {
          setData((prevData) => [...prevData, ...bannerList]); 
         }
         return nextIndex;
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [data]);

  useEffect(() => {
    if (flatListRef.current) {
      // Ensure we are within bounds
      flatListRef.current.scrollToIndex({
        animated: true,
        index: index // Use modulo to stay within the valid index range
      });
    }
  }, [index]);

  const getItemLayout = (data, index) => ({
    length: 186, // Fixed height of each item
    offset: 186 * index, // Each item is offset by its height from the start
    index, // The index of the item
  });

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
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
        scrollEnabled={false} // Disable manual scroll
        pagingEnabled
        onEndReachedThreshold={0.1}
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout} // Add getItemLayout here
        contentContainerStyle={styles.flatListContent} // Add custom content container style
      />
      <View style={styles.dotsContainer}>
        {bannerList.map((_, indexDot) => (
          <View
            key={indexDot}
            style={[styles.dot, { opacity: index === indexDot ? 1 : 0.5 }]}
          />
        ))}
      </View>
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
    padding: 0,
    marginRight: 8,
    marginLeft: 6,
    width: windowWidth / 1.2,
    height: 186,
  },
  image: {
    backgroundColor: "#696969",
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
    borderRadius: 12,
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
  flatListContent: {
    paddingHorizontal: 0, // Additional padding to the left and right of the FlatList content
  },
});

export default TrendingMovies;
