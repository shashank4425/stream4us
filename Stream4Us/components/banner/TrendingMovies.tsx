import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { bannerList } from "../../assets/bannerList/bannerList";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window'); // Get screen width and height

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
      flatListRef.current.scrollToIndex({
        animated: true,
        index: index, // Scroll to the next index
      });
    }
  }, [index]);

  const getItemLayout = (data, index) => ({
    length: width * 0.85, // Each item takes up 85% of the screen width
    offset: (width * 0.85 + width * 0.05) * index, // Add space between items (5% of screen width)
    index, // The index of the item
  });

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.imageContainer,
        index === 0 ? styles.firstImage : {}, // Special style for the first image
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
    width: width * 0.85, // Use 85% of the screen width for each item
    height: height * 0.25,  // Adjust the height dynamically (e.g., 25% of screen height)
    marginRight: width * 0.05, // 5% margin to create space between images
  },
  firstImage: {
    marginLeft: 0, // Make sure the first image has no left margin
  },
  image: {
    backgroundColor: "#696969",
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
    borderRadius: 12,
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
    paddingHorizontal: 0, // Additional padding to the left and right of the FlatList content
  },
});

export default TrendingMovies;
