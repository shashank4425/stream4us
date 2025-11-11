import React, { useState, useRef, useEffect, useCallback  } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  BackHandler,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { Video, ResizeMode } from "expo-av";
import * as Brightness from 'expo-brightness';
import FontAwesomeIcon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";
import { StatusBar } from "expo-status-bar";
import NetInfo from "@react-native-community/netinfo";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MoviePlayer = ({ route }) => {
  const videoRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [islockScreen, setIsLockScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [orientation, setOrientation] = useState("portrait");
  const [sliderValue, setSliderValue] = useState(0);
  const [status, setStatus] = useState({});
  const [videoStatus, setVideoStatus] = useState({});
  const [videoDuration, setVideoDuration] = useState(0);

  const [showControls, setShowControls] = useState(true);
  const [brightness, setBrightness] = useState(1);
  const sliderValueRef = useRef(0);

  useEffect(() =>{
   const unsubscribe = NetInfo.addEventListener(status => {
     
     setIsConnected(status.isConnected);
     setIsLoading(status.isConnected ? false : true);
   });
   return () => unsubscribe();
  })
  const handleVideoStatusUpdate = (status) => {
    setVideoStatus(status);
    if (status.isLoaded) {
      setIsLoaded(true);
      setStatus(status.durationMillis);
      setCurrentTime(status.positionMillis);
      setVideoDuration(status.durationMillis / 1000);
      setSliderValue(status.positionMillis / 1000);
    }
  };
  const handleSliderChange = (value) => {
    if (videoRef.current) {
      videoRef.current.setPositionAsync(value * 1000);
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
      if (orientation === "landscape") {
        ScreenOrientation.unlockAsync();
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        setOrientation("portrait"); 
        return true;
      }
      return false;
    });
    return () => {
      backHandle.remove();
    };
  }, [orientation]);
  
  useEffect(() => {
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
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
      setOrientation("landscape");
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setOrientation("portrait");
    }
  };
  useEffect(() => {
  setTimeout(() => {
      setShowControls(false);
  },4500);
  },[]);
  const lockScreen = async () => {
    if(islockScreen==false){
       setShowControls(false);
       setIsLockScreen(true)
    }else{
    setIsLockScreen(false);
    if(isConnected){
    setShowControls(true);
    }
    }
  }
  const handleControls = async () => {
    if(!isLoading){
    if(orientation=="landscape"){
    islockScreen != true ? setShowControls(true) : setShowControls(false);
    }else{
      showControls==true ? setShowControls(false) : setShowControls(true);
    }
    }
    setTimeout(() => {
      setShowControls(false);
  },4500);
   }
 
  const getCurrentBrightness = async () => {
    const currentBrightness = await Brightness.getBrightnessAsync();
    setBrightness(currentBrightness);
  };

  const setSystemBrightness = async (value) => {
    await Brightness.setBrightnessAsync(value);
  };

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
          {!isConnected && isLoading ? (
          <View style={orientation == "portrait" ? 
            {width: Dimensions.get("window").width, position:"fixed", height: 260, alignContent:"center",justifyContent:"center"} :
            {width: Dimensions.get("window").width, position:"fixed", height: "100%",justifyContent:"center"}
         }>
            <ActivityIndicator size="large" color="red" />
          </View>
          ) : (
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
              resizeMode={ResizeMode.COVER}
              isLooping
            />)}
            </View>           
            <TouchableWithoutFeedback onPress={handleControls}>
            <View style={orientation == "portrait" ? styles.controls : styles.lscontrols}>
            {orientation == "landscape" && 
             <View style={styles.screenLockUnlock}>
            <TouchableOpacity onPress={lockScreen}>
              <MaterialIcon style={styles.screenLUIcon} name={islockScreen ? "lock" : "lock-open"} size={42} color="white"
            ></MaterialIcon>
            </TouchableOpacity>
            </View>
          }
            
            <View>          
            <View style={orientation == "portrait" ? styles.topMiddleController : styles.lsMiddleController  }>
            {orientation=="landscape"?
             
             <View style={showControls ? styles.lsMiddleleftController: {display:"none"}}>
              <Slider
              style={styles.brightnesSlider}
              minimumValue={0}
              maximumValue={1}
              step={0.01}
              value={brightness.current}
              onValueChange={handleBrightnessSliderChange}
              thumbTintColor="#fff"
              minimumTrackTintColor="#747474"
              maximumTrackTintColor="#0D0E10"
            />
            </View>  :""}  
            { showControls && 
            <View style={orientation == "portrait" ? {marginTop:"10%",width:"100%", justifyContent:"space-between",flexDirection:"row"} : styles.lsMiddleRightController}>
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
              </View>}
              
              </View>
              { showControls &&
              <View  style={orientation == "portrait" ? styles.bottomController : styles.lsbottomController}>
              <Text style={orientation == "portrait" ? styles.potraitLayout :styles.lsLayout}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
              <TouchableOpacity onPress={toggleScreen}>
                <MaterialIcon style={styles.fsRotate} name={"fullscreen"} size={24} color="white"
                ></MaterialIcon>
              </TouchableOpacity>              
              </View>}
              </View>
            
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
    flexDirection:"row"
  },
  lsMiddleleftController:{
    width:"16%",
    height:"100%"
  },
  lsMiddleRightController:{
    height:"100%",
    width:"60%",
    position:"fixed",
    flexDirection:"row",
    alignItems:"center",
    alignContent:"center",
    paddingLeft:75,
    justifyContent:"space-between"
   },
   
  bottomController: {
    width:"100%",
    height:"20%",
    flexDirection:"row",
    display:"flex"
  },
  lsbottomController:{
    width:"100%",
    height:"15%",
    flexDirection:"row",
    display:"flex"
  },
  potraitLayout:{
    width: "90%",
    padding:12, 
    color: "#dcdcdc",
    fontWeight:"900",
    fontSize:12
  },
  lsLayout:{
    width: "95%",
    padding:12, 
    color: "#dcdcdc",
    fontWeight:"900",
    fontSize:12
  },
   screenLUIcon: {
    position:"relative",
    fontSize:32,
    padding:10,
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
    top:"48%",
    position:"absolute",
    width: 100,
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
