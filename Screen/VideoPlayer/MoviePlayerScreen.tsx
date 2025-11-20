import NetInfo from "@react-native-community/netinfo";
import { ResizeMode, Video } from "expo-av";
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

    return `${hours > 59 ? hours + ":" : ""}${minutes < 10 ? "0" : ""
      }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const toggleScreen = async () => {
    if (orientation === "portrait") {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
      setTimeout(async () => {
         await NavigationBar.setVisibilityAsync("hidden");
         await NavigationBar.setBehaviorAsync("overlay-swipe");
         StatusBar.setHidden(true);
      },150);
      setOrientation("landscape");
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      NavigationBar.setVisibilityAsync("visible");
      await NavigationBar.setBehaviorAsync("inset-swipe");
      StatusBar.setHidden(false);
      setOrientation("portrait");
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
    <>
    <TouchableWithoutFeedback onPress={handleControls}>
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
              style={
                orientation == "portrait" ?
                  {marginTop: 35, width: Dimensions.get("window").width, height: 200 } :
                  { width: "100%", height: "100%" }
              }
              ref={videoRef}
              onPlaybackStatusUpdate={handleVideoStatusUpdate}
              source={videoSource}              
              shouldPlay={!isPlaying}
              resizeMode={ResizeMode.COVER}
              isLooping
            />
          )}
             {orientation == "landscape" && (
                  <View style={styles.screenLockUnlock}>
                  <TouchableOpacity onPress={lockScreen}>                 
                    <MaterialIcon style={styles.screenLUIcon} name={islockScreen ? "lock" : "lock-open"} size={42} color="white"
                    ></MaterialIcon>
                  </TouchableOpacity>
                </View>
               )} 
          
            {isConnected && !isLoading && showControls && (
              <View style={orientation == "portrait" ? styles.controls : styles.lscontrols}>
                 
                <View style={orientation == "portrait" ? styles.potraitControle : styles.lsControle}>
                  <TouchableOpacity onPress={moveVideoBack}>
                    <FontAwesomeIcon style={styles.Rotate} name="rotate-ccw" size={16} color="white"
                    ></FontAwesomeIcon>
                    <Text style={styles.fifteenSecond}>10</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handlePlayPause}>
                    <MaterialIcon
                      name={isPlaying ? "play-circle-outline" : "pause-circle-outline"} size={56} color="white"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={moveVideoForward}>
                    <FontAwesomeIcon style={styles.Rotate} name="rotate-cw" size={16} color="white"
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
      </TouchableWithoutFeedback>
    </>
  )
};


const styles = StyleSheet.create({
  controls: {
    position: "absolute",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    height: 200,
    width: "100%"
  },
  potraitControle: {
    marginTop: "10%",
    height: 160,
    width: "90%",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },

  lscontrols: {
    position: "absolute",
    marginLeft: "10%",
    marginTop:"1%",
    justifyContent: "center",
    alignContent: "center",
    width: "80%",
    height: "100%"
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
    height: "58%",
    width: "100%",
    justifyContent: "space-around",
    alignContent: "center",
    textAlign: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  bottomController: {
    display: "flex",
    width: "90%",
    color: "#fff",
    flexWrap: "nowrap",
    flexDirection: "row",
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

  Rotate: {
    justifyContent: "space-between",
    fontSize: 32,
    padding: 50,
    fontWeight: "100",
  },
  fifteenSecond: {
    fontSize: 8,
    color: "#fff",
    marginLeft: "47%",
    marginTop: "48%",
    fontWeight: "600",
    justifyContent: "center",
    position: "absolute",
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
