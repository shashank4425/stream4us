import React, { useState, useRef, useEffect, useCallback  } from "react";
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
import * as Brightness from 'expo-brightness';
import FontAwesomeIcon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MoviePlayer = ({ route }) => {
  const videoRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [islockScreen, setIsLockScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [orientation, setOrientation] = useState("portrait");
  const [sliderValue, setSliderValue] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [status, setStatus] = useState({});
  const [videoStatus, setVideoStatus] = useState({});
  const [videoDuration, setVideoDuration] = useState(0);

  const [showControls, setShowControls] = useState(true);
  const [brightness, setBrightness] = useState(1);
    const sliderValueRef = useRef(0);

  let durration = ":";
  const clickedScreen = () => {
    clicked == true ? setClicked(false) : setClicked(true);
    setTimeout(function () {
      setClicked(false);
    }, 4000);
  };

  const handleVideoStatusUpdate = (status) => {
    setVideoStatus(status);
    if (status.isLoaded) {
      setIsLoaded(true);
      setStatus(status.durationMillis);
      setCurrentTime(status.positionMillis);
      setVideoDuration(status.durationMillis / 1000); // in seconds
      setSliderValue(status.positionMillis / 1000); // convert position to seconds
    }
  };
  const handleSliderChange = (value) => {
    if (videoRef.current) {
      videoRef.current.setPositionAsync(value * 1000); // set position in milliseconds
    }
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
       },4000)
       return (() => {
        clearTimeout(timeout);
       })
  },[]);

  const handleControls = async () => {
   setShowControls(true);

   setTimeout(()=>{
    setShowControls(false);
   },4000);
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
// Function to get the current system brightness
  const getCurrentBrightness = async () => {
    const currentBrightness = await Brightness.getBrightnessAsync();
    setBrightness(currentBrightness);
  };

  // Function to set the system brightness
  const setSystemBrightness = async (value) => {
    await Brightness.setBrightnessAsync(value);
  };

  // Throttled handler for slider value change
  const handleBrightnessSliderChange = useCallback((value) => {
      sliderValueRef.current = value;
      setBrightness(value);
      setSystemBrightness(value);
   }, []);

  useEffect(() => {
    getCurrentBrightness();
  }, []);
  
  return (
            
   <View style={{flex:1}}>
      <TouchableOpacity onPress={clickedScreen}>
        <View>
          {orientation == "portrait" ? 
          <TouchableWithoutFeedback onPress={handleControls}>
          <View>
            <Video            
              style={{marginTop:-15, width: Dimensions.get("window").width, height: 260 }}
              ref={videoRef}
              onPlaybackStatusUpdate={handleVideoStatusUpdate}
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
                <MaterialIcon
                  name={isPlaying ? "play-circle-outline" : "pause-circle-outline"}size={42}color="white"
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
                <MaterialIcon style={styles.fsRotate} name={"fullscreen"} size={24} color="white"
                ></MaterialIcon>
              </TouchableOpacity>
              </View>
              <View style={styles.sliderSection}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={videoDuration}
                value={sliderValue.current}
                onValueChange={handleSliderChange}
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
           <StatusBar hidden={true} />
            <Video
              style={{
                width: "100%",
                height: "100%",
              }}
              ref={videoRef}
              onPlaybackStatusUpdate={handleVideoStatusUpdate}
              source={{
                uri: "https://www.w3schools.com/html/mov_bbb.mp4",
              }}
              shouldPlay={!isPlaying}
              resizeMode={ResizeMode.COVER}
              isLooping
              key={movieLink.id}
            />
            { showControls && 
            
            <View style={styles.LandScapecontrols}>
            <View style={styles.screenLockUnlock}>
            <TouchableOpacity onPress={lockScreen}>
              <MaterialIcon style={styles.screenLUIcon} name={islockScreen ? "lock" : "lock-open"} size={24} color="white"
            ></MaterialIcon>
            </TouchableOpacity>
            </View>
            {!islockScreen && 
            <View style={styles.LandScapetopController}>
              <View style={styles.LandScapeLeftController}>
              <Slider
              style={styles.brightnesSlider}
              minimumValue={0}
              maximumValue={1}
              step={0.01}
              value={sliderValue.current}
              onValueChange={handleBrightnessSliderChange}
              thumbTintColor="#fff"
              minimumTrackTintColor="#747474"
              maximumTrackTintColor="#0D0E10"
            />
            </View>
            <View style={styles.LandScapeCenterController}>
           <TouchableOpacity onPress={moveVideoBack}>
              <FontAwesomeIcon style={styles.Rotate} name="rotate-ccw" size={24} color="white"
              ></FontAwesomeIcon>
              <Text style={styles.fifteenSecond}>10</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlayPause}>
              <MaterialIcon
              style={styles.Rotate} 
              name={ isPlaying ? "play-circle-outline" : "pause-circle-outline"}size={42}color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={moveVideoForward}>
              <FontAwesomeIcon style={styles.Rotate} name="rotate-cw" size={24} color="white"
              ></FontAwesomeIcon>
              <Text style={styles.fifteenSecond}>10</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.LandScapeRightController}></View>
            </View>
            }
            {!islockScreen && <View style={styles.LandScapetopMiddleController}>
            <Text style={{paddingLeft:12, width: "92%", color: "#dcdcdc", fontWeight:"900", fontSize:12}}>
              {formatTime(currentTime)} / {movieLink.duration}
            </Text>
            <TouchableOpacity onPress={toggleScreen}>
              <MaterialIcon style={styles.fsRotate} name={"fullscreen-exit"} size={24} color="white"
              ></MaterialIcon>
            </TouchableOpacity>
           
            </View>}
            {!islockScreen && <View style={styles.sliderSection}>
            
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={videoDuration}
              value={sliderValue.current}
              onValueChange={handleSliderChange}
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
  )
};

const styles = StyleSheet.create({
  controls: {
    position: "absolute",
    flexWrap: "wrap",
    alignContent: "flex-start",
    flexDirection: "column",
    height: 240,
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
   height:"10%",
   width:"100%",
  },
  screenLUIcon: {
   end:"auto",
  justifyContent:"flex-end",
   position:"absolute",
   padding:12,
   fontSize:24,
   fontWeight:"700"
  },
  topController: {
    height: "60%",
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
    flexDirection:"row",
    display:"flex"
  },
  LandScapeLeftController: {
    width:"20%",
    height:"100%",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column"
  },
  LandScapeCenterController: {
    width:"60%",
    height:"100%",
    flex:1,
    alignItems:"center",
    flexDirection:"row",
    justifyContent:"space-around"
  },
  LandScapeRightController: {
    width:"20%",
    height:"100%"
  },
  Rotate: {
    fontSize: 38,
    fontWeight: "100",
  },
 
  fifteenSecond: {
    fontSize: 8,
    marginTop: 15,
    marginLeft: 15,
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
  brightnesSlider :{
    width: 160,
    flexDirection:"row",
    transform: [{ rotate: '-90deg' }],
    
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
    padding: 2,
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

export default MoviePlayer;
