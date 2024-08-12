import React from "react";
import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  Alert,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";
import { images } from "../constants";

const SWIPE_THRESHOLD = 200; // Adjust this value based on how much swipe distance is needed

const getImageSource = (platform) => {
  const resultString = platform.replace(/\s+/g, "").toLowerCase();
  switch (resultString.toLowerCase()) {
    case "primevideo":
        return images.primevideo;
      case "netflix":
        return images.netflix;
      case "disney+hotstar":
        return images.disneyplus;
      case "sonyliv":
        return images.sonyliv;
      case "applemusic":
        return images.applemusic;
      case "spotify":
        return images.spotify;
      case "googleone":
        return images.googleone;
      case "amazonmusic":
        return images.amazonmusic;
      case "airtel":
        return images.airtel;
      case "jio":
        return images.jio;
      case "vodafoneidea":
        return images.vi;
      case "dropbox":
        return images.dropbox;
      case "airtelxstream":
        return images.xstream;
      case "tatasky":
        return images.tatasky;
      case "jiosaavn":
        return images.saavn;
      case "youtubepremium":
        return images.youtube;
      case "surfshark":
        return images.surfshark;
      case "crunchyroll":
        return images.crunchyroll;
      case "focisbroadband":
        return images.ficus;
      case "actfibernet":
        return images.act;
      case "swiggy":
        return images.swiggy;
      case "zomato":
        return images.zomato;
      case "zee5":
        return images.zee5;
      case "jiocinema":
        return images.jiocinema;
      case "chu":
        return images.chuImage;
      case "manav":
        return images.manavImage;
    // Add more cases as needed
    default:
      return null; // Fallback image
  }
};

const CustomServiceList = ({ platform, image, onPress, onDelete }) => {
  const translateX = React.useRef(new Animated.Value(0)).current;
  const backgroundColor = translateX.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: ["red", "transparent"], // Red when swiped left, transparent when at rest
  });

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: false }
  );

  const handleStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      const swipeDistance = nativeEvent.translationX;
      const shouldDelete = swipeDistance < -SWIPE_THRESHOLD;

      if (shouldDelete) {
        // Show confirmation alert
        Alert.alert(
          "Delete Service",
          "Are you sure you want to delete this service?",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => {
                // Reset to original position
                Animated.timing(translateX, {
                  toValue: 0,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              },
            },
            {
              text: "Delete",
              onPress: () => {
                // Fully swipe out of view
                Animated.timing(translateX, {
                  toValue: -1000, // Slide out of view
                  duration: 300,
                  useNativeDriver: true,
                }).start(() => {
                  if (onDelete) onDelete(); // Trigger the delete callback after animation
                });
              },
            },
          ],
          { cancelable: true }
        );
      } else {
        // Return to original position
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleGesture}
      onHandlerStateChange={handleStateChange}
    >
      <Animated.View
        style={{
          flex: 1,
          flexDirection: "row",
          transform: [{ translateX }],
        }}
      >
        <Animated.View />
        <TouchableOpacity
          onPress={onPress}
          className="bg-primary rounded-3xl shadow-md p-4 pl-1 mt-2 w-full border-2 border-gray"
        >
          <View className="flex-row items-center h-[50px]">
            {getImageSource(platform) ? (
              <Image
                source={getImageSource(platform)}
                className="w-[60px] h-[60px] bg-black-100 rounded-3xl justify-center items-center mr-2 ml-1 border-2 border-black"
              />
            ) : (
              <View className="w-[60px] h-[60px] bg-black-100 rounded-3xl justify-center items-center mr-2 ml-1 border-2 border-black">
                <Text className="text-white text-2xl font-pregular">
                  {platform.charAt(0)}
                </Text>
              </View>
            )}

            <View className="flex-1">
              <Text className="text-lg text-white font-psemibold">
                {platform}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <Animated.View className="bg-[#FF0000] rounded-3xl shadow-md p-4 pl-1 mt-2 w-full border-2 border-gray">
          <View className="flex items-start justify-center mt-2 ml-5">
            <AntDesign name="delete" size={30} color="white" />
          </View>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default CustomServiceList;