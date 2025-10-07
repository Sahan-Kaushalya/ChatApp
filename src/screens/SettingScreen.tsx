import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeOption, useTheme } from "../theme/ThemeProvider";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {RootStackParamList } from "../../App";

const options: ThemeOption[] = ["light", "dark", "system"];
type SettingScreenProp = NativeStackNavigationProp<RootStackParamList, "SettingScreen">;
export default function SettingScreen() {
  const { preference, applied, setPreference } = useTheme();
  const navigation = useNavigation<SettingScreenProp>();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Setting",
      headerStyle: {
        backgroundColor: applied === "dark" ? "black" : "white",
      },
      headerTintColor: applied === "dark" ? "white" : "black",
    });
  }, [navigation, applied]);
  return (
    <SafeAreaView className="flex-1 " edges={["right", "bottom", "left"]}>
      <StatusBar hidden={false} />
      <View className="flex-1 p-5 bg-white dark:bg-black">
        <Text className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Choose App Theme
        </Text>
        <View className="flex-row mt-2 gap-x-3">
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              className={` py-2 px-5 rounded-full mb-2  ${
                preference === option ? "bg-green-600" : "bg-gray-200"
              }`}
              onPress={() => setPreference(option)}
            >
              <Text
                className={`text-center font-bold ${
                  applied === "dark" ? "text-slate-900" : "text-slate-900"
                }`}
              >
                {/* ex: light => l => L ====> slice(1) ==> Light */}
                {/* ex: dark => d => D ====> slice(1) ==> Dark */}
                {/* ex: system => s => S ====> slice(1) ==> System */}
                {option.charAt(0).toUpperCase() + option.slice(1)}
                {/* ex: light ==> after charAt => ight => slice(1) => ight */}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
