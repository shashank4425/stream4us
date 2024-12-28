import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  BackHandler,
  TouchableWithoutFeedback
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import { Video, ResizeMode } from "expo-av"; // Import Video from expo-av
import { Ionicons } from "@expo/vector-icons"; // For icons
import FontAwesomeIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Slider from "@react-native-community/slider";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PotraitMoviePlayer = ({ route }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [islockScreen, setIsLockScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [vdduration, setVdDuration] = useState(0);
  const [orientation, setOrientation] = useState("portrait");
  const [sliderValue, setSliderValue] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [status, setStatus] = useState({});

  const [showControls, setShowControls] = useState(true);

  let durration = ":";
  const clickedScreen = () => {
    clicked == true ? setClicked(false) : setClicked(true);
    setTimeout(function () {
      setClicked(false);
    }, 4000);
  };

  const movieLink = route.params;
  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.pauseAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const moveVideoBack = async () => {
    const currentPosition = await videoRef.current.getStatusAsync();
    videoRef.current.setPositionAsync(currentPosition.positionMillis - 10000);
  }
  const moveVideoForward = async () => {
    const currentPosition = await videoRef.current.getStatusAsync();
    videoRef.current.setPositionAsync(currentPosition.positionMillis + 10000);
  }
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setIsLoaded(true);
      setStatus(status.durationMillis);
      setCurrentTime(status.positionMillis);
    }
  };

  useEffect(() => {
    const backHandle = BackHandler.addEventListener("hardwareBackPress", () => {
     
        ScreenOrientation.unlockAsync();
        ScreenOrientation.OrientationLock.PORTRAIT;
      
      return false;
    });
    return () => {
      backHandle.remove();
    };
  }, []);

  useEffect(() => {
       const timeout= setTimeout(() => {
           setShowControls(false);
       },6000)
       return (() => {
        clearTimeout(timeout);
       })
  },[]);

  const handleControls = async () => {
   setShowControls(true);

   setTimeout(()=>{
    setShowControls(false);
   },6000);
  }

  useEffect(() => {
    // Fetch the video duration once the video is loaded
    const setVideoDuration = async () => {
      if (videoRef.current) {
        const status = await videoRef.current.getStatusAsync();
        setDuration(status.durationMillis);
      }
    };
    setVideoDuration();
  }, [videoRef]);

  const formatTime = (status) => {
    const totalSeconds = Math.floor(status / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours > 59 ? hours + ":" : ""}${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const toggleScreen = async () => {
    if (orientation === "portrait") {
      // Switch to landscape mode
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
      setOrientation("landscape");
    } else {
      // Switch back to portrait mode
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setOrientation("portrait");
    }
  };
  const lockScreen = async () => {
    !islockScreen ? setIsLockScreen(true) : setIsLockScreen(false);
  }
  return (
    <View>
      <StatusBar hidden={true} />
      <TouchableOpacity onPress={clickedScreen}>
        <View>
          {orientation == "portrait" ? 
          <TouchableWithoutFeedback onPress={handleControls}>
          <View>
            <Video
            
              style={{ width: Dimensions.get("window").width, height: 250 }}
              ref={videoRef}
              onPlaybackStatusUpdate={onPlaybackStatusUpdate}
              source={{
                uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
              }}
              shouldPlay={!isPlaying}
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              key={movieLink.id}
            />
             { showControls && 
             <View style={styles.controls}>
              <View style={styles.topController}>
             <TouchableOpacity onPress={moveVideoBack}>
                <FontAwesomeIcon style={styles.Rotate} name="rotate-ccw" size={24} color="white"
                ></FontAwesomeIcon>
                <Text style={styles.fifteenSecond}>10</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePlayPause}>
                <Ionicons
                  name={
                    isPlaying ? "play-circle-outline" : "pause-circle-outline"
                  }
                  size={42}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={moveVideoForward}>
                <FontAwesomeIcon style={styles.Rotate} name="rotate-cw" size={24} color="white"
                ></FontAwesomeIcon>
                <Text style={styles.fifteenSecond}>10</Text>
              </TouchableOpacity>
              </View>
              <View style={styles.MiddleController}>
              <Text style={styles.vdTiming}>
                {formatTime(currentTime)} / {movieLink.duration}
              </Text>
              <TouchableOpacity onPress={toggleScreen}>
                <MaterialCommunityIcons style={styles.fsRotate} name={"fullscreen"} size={24} color="white"
                ></MaterialCommunityIcons>
              </TouchableOpacity>
              </View>
              <View style={styles.sliderSection}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={isLoaded ? duration / 1000 : 0}
                value={isLoaded ? currentTime / 1000 : 0}
                minimumTrackTintColor="#1FB28B"
                maximumTrackTintColor="#D3D3D3"
                thumbTintColor="#1FB28B"
              />
               </View>
              </View>}
           </View>
           </TouchableWithoutFeedback>
           : 
           <TouchableWithoutFeedback onPress={handleControls}>
           <View>
            <Video
              style={{
                width: "100%",
                height: Dimensions.get("window").height,
              }}
              ref={videoRef}
              onPlaybackStatusUpdate={onPlaybackStatusUpdate}
              source={{
                uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
              }}
              shouldPlay={!isPlaying}
              resizeMode={ResizeMode.STRETCH}
              isLooping
              key={movieLink.id}
            />
            { showControls && 
            
            <View style={styles.LandScapecontrols}>
            <TouchableOpacity onPress={lockScreen}>
              <FontAwesomeIcon style={styles.screenLockUnlock} name={islockScreen ? "lock" : "unlock"} size={24} color="white"
            ></FontAwesomeIcon>
            </TouchableOpacity>
            {!islockScreen && <View style={styles.LandScapetopController}>
           <TouchableOpacity onPress={moveVideoBack}>
              <FontAwesomeIcon style={styles.Rotate} name="rotate-ccw" size={24} color="white"
              ></FontAwesomeIcon>
              <Text style={styles.fifteenSecond}>10</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlayPause}>
              <Ionicons
              style={styles.Rotate}
                name={
                  isPlaying ? "play-circle-outline" : "pause-circle-outline"
                }
                size={42}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={moveVideoForward}>
              <FontAwesomeIcon style={styles.Rotate} name="rotate-cw" size={24} color="white"
              ></FontAwesomeIcon>
              <Text style={styles.fifteenSecond}>10</Text>
            </TouchableOpacity>
            </View>}
            {!islockScreen && <View style={styles.LandScapetopMiddleController}>
            <Text style={{paddingLeft:12, width: "92%", color: "#dcdcdc", fontWeight:"900", fontSize:12}}>
              {formatTime(currentTime)} / {movieLink.duration}
            </Text>
            <TouchableOpacity onPress={toggleScreen}>
              <MaterialCommunityIcons style={styles.fsRotate} name={"fullscreen-exit"} size={24} color="white"
              ></MaterialCommunityIcons>
            </TouchableOpacity>
            </View>}
            {!islockScreen && <View style={styles.sliderSection}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={isLoaded ? duration / 1000 : 0}
              value={isLoaded ? currentTime / 1000 : 0}
              minimumTrackTintColor="#1FB28B"
              maximumTrackTintColor="#D3D3D3"
              thumbTintColor="#1FB28B"
            />
             </View>}
             </View>
             }
           </View>
           </TouchableWithoutFeedback>
          }
        </View>
      </TouchableOpacity>
     
      <View style={styles.container}>
        <View style={styles.contentMain}>
          <Text style={styles.mtitle}>{movieLink.seo.page}</Text>
          <Text style={styles.mline}>{movieLink.line2}</Text>
        </View>
        <View>
          <Text style={styles.contentDes}>{movieLink.seo.description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  

  controls: {
    position: "absolute",
    flexWrap: "wrap",
    alignContent: "flex-start",
    flexDirection: "column",
    height: 250,
    width:"100%"
  },
  LandScapecontrols: {
    position: "absolute",
    flexWrap: "wrap",
    alignContent: "flex-start",
    flexDirection: "column",
    height: "100%",
    width:"100%"
  },
  screenLockUnlock:{
  textAlign:"right",
  end:"auto",
   padding:12,
   fontSize:24,
   fontWeight:"700"
  },
  topController: {
    height: "62%",
    width: "99%",
    flexDirection: "row",
    marginTop: 25,
    alignItems: "center",
    padding:50,
    justifyContent: "space-between",
  },
  LandScapetopController: {
    height: "70%",
    width: "100%",
    flexDirection: "row",
    marginTop: 0,
    alignItems: "center",
    padding:100,
    justifyContent: "space-between",
  },
  
  Rotate: {
    fontSize: 38,
    fontWeight: "100",
  },
 
  fifteenSecond: {
    fontSize: 8,
    marginTop: 12,
    marginLeft: 12,
    color: "#fff",
    fontWeight: "600",
    position: "absolute",
  },

  MiddleController: {
    height: "18%",
    width: "100%",
    flexDirection: "row",
    marginTop: 0,
    alignItems: "center",
    padding:0,
    justifyContent: "space-between",
  },
  LandScapetopMiddleController: {
    height: "8%",
    width: "100%",
    flexDirection: "row",
    marginBottom:0,
    alignItems: "flex-end",
    position:"relative",
    justifyContent: "space-between",
  },
  fsRotate: {
    fontSize: 30,
    position: "fixed",
    fontWeight: "100",
  },
  vdTiming: {
    width: "90%",
    paddingLeft: 12,
    color: "#dcdcdc",
    fontWeight: "900",
    fontSize: 11,
  },
  sliderSection: {
    height: "9%",
    width: "100%",
    position: "relative",
    flexWrap: "wrap",
    flexDirection: "row"
  },

  slider: {
    width: windowWidth,
    color: "#fff",
    position: "relative",
  },

  container: {
    backgroundColor: "#0D0E10",
    height: windowHeight,
    width: windowWidth,
    padding: 10,
  },
  contentMain: {
    margin: 4,
  },
  mtitle: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 18,
    padding: 6,
  },
  mline: {
    color: "#dcdcdc",
    fontWeight: "700",
    fontSize: 13,
    padding: 6,
  },
  contentDes: {
    padding: 10,
    color: "#dcdcdc",
    fontWeight: "700",
    fontSize: 10,
    width: windowWidth,
  },
});

export default PotraitMoviePlayer;
