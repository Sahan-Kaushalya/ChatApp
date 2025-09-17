import { Image, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css"
import CircleShape from "../components/CircleShape";
import { useEffect, useRef } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export default function SplashScreen() {

 const opacity = useSharedValue(0);
  
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 3500});
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <SafeAreaView className="items-center justify-center flex-1 bg-white">
      <StatusBar hidden={true} />
      <CircleShape width={320} height={320} className="bg-blue-200" borderRadius={160} topValue={-170} leftValue={-120} opacity={0.85} />
      <CircleShape width={180} height={180} className="bg-blue-400" borderRadius={90} topValue={-90} rightValue={-60} opacity={0.8} />
      <CircleShape width={140} height={140} className="bg-cyan-400" borderRadius={70} topValue={80} leftValue={-60} opacity={0.7} />
      <CircleShape width={220} height={220} className="bg-amber-200" borderRadius={110} bottomValue={-60} rightValue={-70} opacity={0.6} />
      <CircleShape width={90} height={90} className="bg-blue-700" borderRadius={45} bottomValue={10} leftValue={-30} opacity={0.7} />

      {/* Additional blue circles for richer design */}
      <CircleShape width={70} height={70} className="bg-cyan-200" borderRadius={35} topValue={40} rightValue={70} opacity={0.5} />
      <CircleShape width={110} height={110} className="bg-sky-500" borderRadius={55} bottomValue={300} leftValue={30} opacity={0.4} />
      <CircleShape width={60} height={60} className="bg-violet-500" borderRadius={30} topValue={200} rightValue={-20} opacity={0.6} />
      <CircleShape width={150} height={150} className="bg-blue-500" borderRadius={999} bottomValue={-90} leftValue={80} opacity={0.5} />
      <CircleShape width={80} height={80} className="bg-blue-800" borderRadius={40} topValue={300} leftValue={100} opacity={0.4} />

    
      <Animated.View style={animatedStyle}>
        <Image source={require("../../assets/logo.png")} style={{ width: 180, height: 220 }} />
      </Animated.View>

<Animated.View className="absolute bottom-10" style={animatedStyle}>
  <View className="flex flex-col items-center mb-10 align-middle ">
        <Text className="text-sm font-bold text-center text-gray-600">POWERED BY : {process.env.EXPO_PUBLIC_APP_OWNER}</Text>
        <Text className="text-sm font-bold text-center text-gray-500">VERSION : {process.env.EXPO_PUBLIC_APP_VERSION}</Text>
      </View>
</Animated.View>
    
    </SafeAreaView>
  );
}