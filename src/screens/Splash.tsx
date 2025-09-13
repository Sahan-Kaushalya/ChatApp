import { Animated, Image, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css"
import CircleShape from "../components/CircleShape";
import { useEffect, useRef } from "react";

export default function SplashScreen() {

  let fadeIn = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeIn]);

  return (
    <SafeAreaView className="items-center justify-center flex-1 bg-white">
      <StatusBar hidden={true} />
      <CircleShape width={320} height={320} fillColor={"#BFDBFE"} borderRadius={160} topValue={-170} leftValue={-120} opacity={0.85} />
      <CircleShape width={180} height={180} fillColor={"#60A5FA"} borderRadius={90} topValue={-90} rightValue={-60} opacity={0.8} />
      <CircleShape width={140} height={140} fillColor={"#2dd4bf"} borderRadius={70} topValue={80} leftValue={-60} opacity={0.7} />
      <CircleShape width={220} height={220} fillColor={"#0d9488"} borderRadius={110} bottomValue={-60} rightValue={-70} opacity={0.6} />
      <CircleShape width={90} height={90} fillColor={"#2563eb"} borderRadius={45} bottomValue={10} leftValue={-30} opacity={0.7} />

      {/* Additional blue circles for richer design */}
      <CircleShape width={70} height={70} fillColor={"#67e8f9"} borderRadius={35} topValue={40} rightValue={70} opacity={0.5} />
      <CircleShape width={110} height={110} fillColor={"#0ea5e9"} borderRadius={55} bottomValue={300} leftValue={30} opacity={0.4} />
      <CircleShape width={60} height={60} fillColor={"#8b5cf6"} borderRadius={30} topValue={200} rightValue={-20} opacity={0.6} />
      <CircleShape width={150} height={150} fillColor={"#3B82F6"} borderRadius={999} bottomValue={-90} leftValue={80} opacity={0.5} />
      <CircleShape width={80} height={80} fillColor={"#2563EB"} borderRadius={40} topValue={300} leftValue={100} opacity={0.4} />

      <Animated.View style={{ opacity: 1 }}>
        <Image source={require("../../assets/logo.png")} style={{ width: 180, height: 220 }} />
      </Animated.View>

      <View className="absolute bottom-0 flex flex-col items-center mb-10 align-middle ">
        <Text className="text-sm font-bold text-center text-gray-600">POWERED BY : {process.env.EXPO_PUBLIC_APP_OWNER}</Text>
        <Text className="text-sm font-bold text-center text-gray-500">VERSION : {process.env.EXPO_PUBLIC_APP_VERSION}</Text>
      </View>
    </SafeAreaView>
  );
}