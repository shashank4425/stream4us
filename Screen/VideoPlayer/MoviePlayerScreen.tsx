import NetInfo from "@react-native-community/netinfo";
import Slider from '@react-native-community/slider';
import * as Brightness from 'expo-brightness';

import * as NavigationBar from "expo-navigation-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Video from "react-native-video";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MoviePlayer = ({ route }) => {
  const videoRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [islockScreen, setIsLockScreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [orientation, setOrientation] = useState("portrait");
const [controlsVisible, setControlsVisible] = useState(true);
const hideTimer = useRef(null);
  const [showControls, setShowControls] = useState(true);
  const [brightness, setBrightness] = useState(1);
  const sliderValueRef = useRef(0);

  useEffect(() => {
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

  const movieLink = route.params;
  const { videoLink } = route.params;
  const videoSource = require(`../../assets/video/bhojpuri/kalamchaba-gaini.mp4`)// Require the video

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const moveVideoBack = async () => {
    const newTime = Math.max(currentTime - 10, 0);
    videoRef.current.seek(newTime);
    setCurrentTime(newTime);
  }
  const moveVideoForward = async () => {
    const newTime = Math.min(currentTime + 10, duration);
    videoRef.current.seek(newTime);
    setCurrentTime(newTime);
  }
   useEffect(() => {
    const backHandle = BackHandler.addEventListener("hardwareBackPress", () => {
      if (orientation === "landscape") {
        ScreenOrientation.unlockAsync();
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        setOrientation("portrait");
        setTimeout(async () => {
         await NavigationBar.setVisibilityAsync("visible");
         await NavigationBar.setBehaviorAsync("inset-swipe");
         StatusBar.setHidden(false);
        },150)
        return true;
      }
      return false;
    });
    return () => {
      backHandle.remove();
    };
  }, [orientation]);

  // useEffect(() => {
  //   const setVideoDuration = async () => {
  //     if (videoRef.current) {
  //       const status = await videoRef.current.getStatusAsync();
  //       setDuration(status.durationMillis);
  //     }
  //   };
  //   setVideoDuration();
  // }, [videoRef]);

  // const formatTime = (status) => {
  //   const totalSeconds = Math.floor(status / 1000);
  //   const hours = Math.floor(totalSeconds / 3600);
  //   const minutes = Math.floor((totalSeconds % 3600) / 60);
  //   const seconds = totalSeconds % 60;

  //   return `${hours > 59 ? hours + ":" : ""}${minutes < 10 ? "0" : ""
  //     }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  // };
const formatTime = (t) => {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

  const toggleScreen = async () => {
  if (orientation === "portrait") {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    setOrientation("landscape");
    // Force layout refresh
    setTimeout(async () => {
        await NavigationBar.setVisibilityAsync("hidden");
         await NavigationBar.setBehaviorAsync("overlay-swipe");
         StatusBar.setHidden(true);
    }, 200);
  } else {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      setOrientation("portrait");
      NavigationBar.setVisibilityAsync("visible");
      await NavigationBar.setBehaviorAsync("inset-swipe");
      StatusBar.setHidden(false);
  }
};

  useEffect(() => {
    setTimeout(() => {
      setShowControls(false);
    }, 4500);
  }, []);
  const lockScreen = async () => {
    if (islockScreen == false) {
      setShowControls(false);
      setIsLockScreen(true)
    } else {
      setIsLockScreen(false);
      if (isConnected) {
        setShowControls(true);
      }
    }
  }
  const handleControls = async () => {
  
    if (!isLoading) {
      if (orientation == "landscape") {
        islockScreen != true ? setShowControls(true) : setShowControls(false);
      } else {
        showControls == true ? setShowControls(false) : setShowControls(true);
      }
    }
    console.log(showControls + "Calling ..")
     setTimeout(() => {
      setShowControls(false);
  },4500);
  }

  const startHideTimer = () => {
  // Clear previous timer
  if (hideTimer.current) {
    clearTimeout(hideTimer.current);
  }

  // Hide after 4 seconds
  hideTimer.current = setTimeout(() => {
    setControlsVisible(false);
  }, 4000);
};

const onVideoPress = () => {
  if(controlsVisible){
   setControlsVisible(false);
  }else{
    setControlsVisible(true);
  }
  startHideTimer();
};

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
    <>
       <View style={{ flex: 1}}>
        <View>
          {!isConnected && isLoading ? (
            <View style={orientation == "portrait" ?
              { width: Dimensions.get("window").width, position: "fixed", height: 200, alignContent: "center", justifyContent: "center" } :
              { width: Dimensions.get("window").width, position: "fixed", height: "100%", justifyContent: "center" }
            }>
              <ActivityIndicator size="large" color="red" />
            </View>
          ) : (
            <Video
                ref={videoRef}
                source={videoSource}
                paused={isPlaying}
                onLoad={(data) => setDuration(data.duration)}   // seconds
                onProgress={(data) => setCurrentTime(data.currentTime)}  // seconds
                
                onEnd={() => {
                  handleVideoStatusUpdate({
                    didJustFinish: true,
                  });
                }}
                resizeMode="cover"
                repeat={true}
                style={
                  orientation === "portrait"
                    ? {
                        marginTop: 35,
                        width: "100%",
                        height: 200,
                      }
                    : {
                        width: "100%",
                        height: "100%",
                      }
                }
              />
          )}
          <TouchableWithoutFeedback onPress={onVideoPress}>
            <View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            />
          </TouchableWithoutFeedback>
             {orientation == "landscape" && (
                  <View style={styles.screenLockUnlock}>
                  <TouchableOpacity onPress={lockScreen}>                 
                    <MaterialIcon style={styles.screenLUIcon} name={islockScreen ? "lock" : "lock-open"} size={42} color="white"
                    ></MaterialIcon>
                  </TouchableOpacity>
                </View>
               )} 
          
            {isConnected 
            && !isLoading && !islockScreen && controlsVisible  && (
              <View style={{position: "absolute",  justifyContent: "flex-start",alignContent: "center",width: "85%",
              height: "90%", margin:"8%",}}>
                 
                <View style={orientation == "portrait" ? styles.potraitControle : styles.lsControle}>
                  <TouchableOpacity onPress={moveVideoBack}>
                    <FontAwesomeIcon style={orientation == "portait" ? styles.Rotate : styles.lsRotate} name="rotate-ccw" size={36} color="white"
                    ></FontAwesomeIcon>
                    <Text style={styles.fifteenSecond}>10</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handlePlayPause}>
                    <View style={orientation == "portait" ? {position:"relative", marginTop:"65%"} : {marginTop:"35%"}}>
                      <MaterialIcon
                      name={isPlaying ? "play-circle-outline" : "pause-circle-outline"} size={60} color="white"
                    />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={moveVideoForward}>
                    <FontAwesomeIcon style={orientation == "portait" ? styles.Rotate : styles.lsRotate} name="rotate-cw" size={36} color="white"
                    ></FontAwesomeIcon>
                    <Text style={styles.fifteenSecond}>10</Text>
                  </TouchableOpacity>
                </View>
                <View style={orientation == "portrait" ? styles.bottomController : styles.lsbottomController}>
                  <View style={orientation == "portrait" ? styles.potraitDuration : styles.lsDuration}>
                    <Text style={styles.potraitDurationTxt}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </Text>
                   </View>
                   <View style={orientation == "portrait" ? styles.potraitFullscreen : styles.lsFullscreen}>
                    <TouchableOpacity onPress={toggleScreen}>
                      <MaterialIcon style={styles.fsRotate} name={"fullscreen"} size={24} color="white"
                      ></MaterialIcon>
                    </TouchableOpacity>                  
                  </View>
                    
                </View>
                <View style={orientation == "portrait" ? styles.sliderController : styles.lsSliderController}>
                    <Slider
                      value={currentTime}
                      minimumValue={0}
                      maximumValue={duration}
                      minimumTrackTintColor="#fff"
                      maximumTrackTintColor="#888"
                      thumbTintColor="#fff"

                      // when user starts dragging
                      onSlidingStart={() => setIsSeeking(true)}

                      // update UI while dragging
                      onValueChange={(time) => setCurrentTime(time)}

                      // when sliding ends, seek the video
                      onSlidingComplete={(time) => {
                        setIsSeeking(false);
                        videoRef.current.seek(time);
                      }}
                    />
                </View>
              </View>
            )}
        </View>
        {orientation == "portrait" ?
          <View style={styles.container}>
            <View style={styles.contentMain}>
              <Text style={styles.mtitle}>{movieLink.seo.page}</Text>
              <Text style={styles.mline}>{movieLink.line2}</Text>
            </View>
            <View>
              <Text style={styles.contentDes}>{movieLink.seo.description}</Text>
            </View>
          </View> : ""}
      </View>
      
    </>
  )
};


const styles = StyleSheet.create({

  potraitControle: {
    marginTop: "7%",
    height: "60%",
    width: "100%",
    flexDirection:"row",
  },

  Rotate: {
    justifyContent:"space-between",
    marginTop:"10%",
    height:"100%",
    padding:40,
    alignItems:"center",
    position:"relative"
  },
  lsRotate : {
   marginTop:"20%",
  },
  fifteenSecond: {
    fontSize: 7,
    color: "#fff",
    marginLeft: "45%",
    marginTop: "58%",
    fontWeight: "600",
    justifyContent: "center",
    position: "absolute",
  },
 bottomController: {
    display: "flex",
    width: "100%",
    height:"20%",
    color: "#fff",
    flexWrap: "nowrap",
    flexDirection: "row"
  },
  sliderController:{
    height:"auto",
    color: "#fff",
  },
 
  screenLockUnlock: {
   zIndex:1,
   top:"4%",
   padding:5, 
   justifyContent:"center",
   alignItems:"flex-end",
   width:"80%",
   marginLeft:"10%",
   position:"absolute",
   height:"auto",
  },
  screenLUIcon: {
    position: "relative",
    fontSize: 32,
    padding:5,
    fontWeight: "700"
  },
  lsControle: {
    height: "70%",
    width: "100%",
    justifyContent: "space-around",
    alignContent: "center",
    textAlign: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
 
  lsbottomController: {
    width: "100%",
    flexDirection:"row",
    height:"auto",
  },
  potraitDuration: {
    width: "90%",
    display:"flex",
    flexDirection:"row",
    justifyContent: "flex-start"
  },
  lsDuration: {
    width:"93%",
    padding:5,
  },

  potraitDurationTxt: {
    color: "#fff"
  },
  potraitFullscreen: {
    justifyContent: "flex-end",
    position: "relative"
  },
  lsFullscreen : {
    end:"auto"
  },

  

  fsRotate: {
    fontSize: 36,
    fontWeight: "100",
  },
  brightnesSlider: {
    top: "48%",
    position: "relative",
    width: 100,
    flexDirection: "row",
    transform: [{ rotate: '-90deg' }],
  },
  
  lsSliderController:{
    height:"5%", color: "#fff",
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
