import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const images = [
  { id: '1', uri: 'https://m.media-amazon.com/images/M/MV5BMzU5N2UwODktZWY4Mi00MGYzLWI1MzQtNmYzY2M0NzNkODc0XkEyXkFqcGc@._V1_.jpg' },
  { id: '2', uri: 'https://v3img.voot.com/resizeMedium,w_810,h_1080/v3Storage/assets/3x4-1734588156138.jpg' },
  { id: '3', uri: 'https://v3img.voot.com/resizeMedium,w_256,h_341/v3Storage/assets/3x4-1734588344070.jpg' },
  { id: '4', uri: 'https://v3img.voot.com/resizeMedium,w_810,h_1080/v3Storage/assets/3x4-1734588156138.jpg' },
];

const TrendingMovies = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= images.length) nextIndex = 0;
      setActiveIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ animated: true, index: nextIndex });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [activeIndex]);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} />
    </View>
  );

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const dotPosition = scrollX.interpolate({
    inputRange: [0, width, width * 2, width * 3],
    outputRange: [0, 1, 2, 3],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        ref={flatListRef}
      />
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
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
    width:windowWidth,
    height:220,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width:"50%",
    height: "100%",
    resizeMode: 'cover',
  },
  dotsContainer: {
    position: 'relative',
    paddingLeft:"8%",
    bottom: 0,
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
