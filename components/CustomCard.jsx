import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { images } from "../constants";
import { useRouter } from "expo-router";

const CustomCard = ({ platform, date, price, subscriptionID, onPress }) => {
  const router = useRouter();

  // Helper function to determine image source based on platform
  const getImageSource = (platform) => {
    const resultString = platform.replace(/\s+/g, "").toLowerCase();
    switch (resultString.toLowerCase()) {
      case "primevideo":
        return images.primevideo;
      case "netflix":
        return images.netflix;
      case "disney+":
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
      case "vi":
        return images.vi;
      case "dropbox":
        return images.dropbox;
      case "xstream":
        return images.xstream;
      case "tatasky":
        return images.tatasky;
      case "saavn":
        return images.saavn;
      case "youtube":
        return images.youtube;
      case "surfshark":
        return images.surfshark;
      case "crunchyroll":
        return images.crunchyroll;
      case "ficus":
        return images.ficus;
      case "act":
        return images.act;
      case "swiggy":
        return images.swiggy;
      case "zomato":
        return images.zomato;
      // Add more cases as needed
      default:
        return null; // Fallback image
    }
  };

  const handlePress = () => {
    console.log(subscriptionID);
    router.push({
      pathname: `/main/view?subId=${subscriptionID}`,
      params: subscriptionID,
    }); // Remove the braces in params
  };

  // Function to render fallback view
  const renderFallbackView = () => (
    <View className="w-[60px] h-[60px] bg-black-100 rounded-3xl justify-center items-center mr-2 ml-[-4] border-2 border-black">
      <Text className="text-white text-2xl font-pregular">
        {platform.charAt(0)}
      </Text>
    </View>
  );

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="min-h-[60px] bg-black-100 rounded-3xl shadow-md p-4 mt-3 border-2 border-gray"
    >
      <View className="flex-row items-center">
        {getImageSource(platform) ? (
          <Image
            source={getImageSource(platform)}
            className="w-[60px] h-[60px] mr-2 ml-[-4] rounded-3xl"
          />
        ) : (
          renderFallbackView()
        )}

        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-lg text-white font-psemibold">
                {platform}
              </Text>
              <Text className="text-sm text-gray-500 font-pregular">
                {date}
              </Text>
            </View>

            <Text className="text-2xl text-white font-pbold">{price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCard;
