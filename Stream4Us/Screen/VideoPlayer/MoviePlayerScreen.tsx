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
  // const clickedScreen = () => {
  //   clicked == true ? setClicked(false) : setClicked(true);
  //   setTimeout(function () {
  //     setClicked(false);
  //   }, 4000);
  // };

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
  
  const movieLink= route.params;
  const { videoLink } = route.params;
  const videoSource = require(`../../assets/video/bhojpuri/sadiya-ke-pin.mp4`)// Require the video

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
       })
  },[]);

  
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
    if(islockScreen==false){
       setShowControls(false);
       setIsLockScreen(true)
    }else{
    setIsLockScreen(false);setShowControls(true);
    }
  }
  const handleControls = async () => {
    setShowControls(true);
    setTimeout(() => {
      setShowControls(false);
  },4000)
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
      
        <View>
            <Video            
              style={
                orientation == "portrait" ? 
                {marginTop:-15, width: Dimensions.get("window").width, height: 260 } :
                {width: Dimensions.get("window").width, height: "100%"}
              }
              ref={videoRef}
              onPlaybackStatusUpdate={handleVideoStatusUpdate}
              source={videoSource}
              shouldPlay={!isPlaying}
              resizeMode={ResizeMode.CONTAIN}
              isLooping
            />
            </View>
           
            <TouchableWithoutFeedback onPress={handleControls}>
            <View style={orientation == "portrait" ? styles.controls : styles.lscontrols}>
            {orientation == "landscape" && 
             <View style={styles.screenLockUnlock}>
            <TouchableOpacity onPress={lockScreen}>
              <MaterialIcon style={styles.screenLUIcon} name={islockScreen ? "lock" : "lock-open"} size={24} color="white"
            ></MaterialIcon>
            </TouchableOpacity>
            </View>}
            { showControls &&
            <View>            
            <View style={orientation == "portrait" ? styles.topMiddleController : styles.lsMiddleController  }>
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
              <View  style={orientation == "portrait" ? styles.bottomController : styles.lsbottomController}>
              <Text style={{paddingLeft:12, width: "92%", color: "#dcdcdc", fontWeight:"900", fontSize:12}}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
              <TouchableOpacity onPress={toggleScreen}>
                <MaterialIcon style={styles.fsRotate} name={"fullscreen"} size={24} color="white"
                ></MaterialIcon>
              </TouchableOpacity>              
              </View>
              </View>
            }
            </View>
            </TouchableWithoutFeedback>
             
      
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
  topController: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  lscontrols :{
    position: "absolute",
    flexDirection: "column",
    height: "100%",
    width: "100%" 
  },
  topMiddleController:{
    height: "80%",
    width: "100%",
    alignContent:"center",
    alignItems:"center",
    flexDirection: "row",
    padding:50,
    justifyContent: "space-between",
    
   },
  screenLockUnlock:{
    width:"100%",
    end:"auto",
    alignItems:"flex-end",
    justifyContent:"flex-start"
   },
   lsMiddleController: {
    position:"fixed", 
    height:"80%",
    width:"100%",    
    flexDirection:"row",
    alignItems:"center",
    alignContent:"center",
    justifyContent:"space-between",
    padding:50
  },
  lsbottomController:{
    width:"100%",
    height:"20%",
    flexDirection:"row",
    display:"flex"
  },
  bottomController: {
    width:"100%",
    height:"20%",
    flexDirection:"row",
    display:"flex"
  },
   screenLUIcon: {
    position:"relative",
    fontSize:24,
    fontWeight:"700"
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
 
  fsRotate: {
    fontSize: 30,
    position: "fixed",
    fontWeight: "100",
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
