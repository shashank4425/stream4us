import NetInfo from "@react-native-community/netinfo";
import { ResizeMode, Video } from "expo-av";
import * as Brightness from 'expo-brightness';
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
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
   console.log("Click");
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
      <View style={{ flex: 1, marginTop: 35 }}>
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
                  { width: Dimensions.get("window").width, height: 200 } :
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
              {orientation == "landscape" ? 
                 <View style={styles.screenLockUnlock}>
                  <TouchableOpacity onPress={lockScreen}>
                    <MaterialIcon style={styles.screenLUIcon} name={islockScreen ? "lock" : "lock-open"} size={42} color="white"
                    ></MaterialIcon>
                  </TouchableOpacity>
                </View> : ""}
          
            {showControls && (
              <View style={orientation == "portrait" ? styles.controls : styles.lscontrols}>
                 
                <View style={orientation == "portrait" ? styles.potraitControle : styles.lsControle}>
                  <TouchableOpacity onPress={moveVideoBack}>
                    <FontAwesomeIcon style={styles.Rotate} name="rotate-ccw" size={24} color="white"
                    ></FontAwesomeIcon>
                    <Text style={styles.fifteenSecond}>10</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handlePlayPause}>
                    <MaterialIcon
                      name={isPlaying ? "play-circle-outline" : "pause-circle-outline"} size={42} color="white"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={moveVideoForward}>
                    <FontAwesomeIcon style={styles.Rotate} name="rotate-cw" size={24} color="white"
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
                  <View style={styles.potraitFullscreen}>
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
    margin: "2%",
    height: 140,
    width: "90%",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },

  lscontrols: {
    zIndex: 0,
    position: "absolute",
    marginLeft: "10%",
    justifyContent: "center",
    alignContent: "center",
    width: "80%",
    height: "100%"
  },
  screenLockUnlock: {
    width: "90%",
    position:"absolute",
    end:"auto",
    marginLeft:"1%",
    alignItems: "flex-end",
    justifyContent: "flex-start"
  },
  screenLUIcon: {
    position: "relative",
    fontSize: 32,
    padding: 10,
    fontWeight: "700"
  },
  lsControle: {
    height: 140,
    width: "100%",
    margin: "5%",
    justifyContent: "center",
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
    display: "flex",
    marginTop: "5%",
    flexWrap: "nowrap",
    flexDirection: "row",
  },
  potraitDuration: {
    width: "90%",
    textAlign: "center",
    justifyContent: "center"
  },
  lsDuration: {
    width: "95%",
    end:"auto",
    textAlign: "center",
    justifyContent: "center"
  },

  potraitDurationTxt: {
    color: "#fff"
  },

  potraitFullscreen: {
    justifyContent: "flex-end",
    position: "fixed"
  },

  Rotate: {
    justifyContent: "space-between",
    fontSize: 40,
    padding: 50,
    fontWeight: "100",
  },
  fifteenSecond: {
    fontSize: 8,
    color: "#fff",
    marginLeft: "48%",
    marginTop: "48%",
    fontWeight: "600",
    justifyContent: "center",
    position: "absolute",
  },

  fsRotate: {
    fontSize: 30,
    position: "fixed",
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
