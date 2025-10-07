import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useContext, useLayoutEffect, useState } from "react";
import { useTheme } from "../theme/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { uploadProfileImage } from "../api/UserService";
import { AuthContext } from "../components/AuthProvider";
import { useUserProfile } from "../socket/UseUserProfile";

type ProfileScreenProp = NativeStackNavigationProp<RootStackParamList, "ProfileScreen">;
export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenProp>();
  const { applied } = useTheme();
  const userProfile = useUserProfile();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My Profile",
      headerStyle: {
        backgroundColor: applied === "dark" ? "black" : "white",
      },
      headerTintColor: applied === "dark" ? "white" : "black",
    });
  }, [navigation, applied]);

  const [image, setImage] = useState<string | null>(null);
  const auth = useContext(AuthContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadProfileImage(String(auth ? auth.userId : 0), result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="items-center justify-center flex-1 bg-white">
      <View className="flex-1 w-full p-5 mt-10">
        <View className="items-center ">
          {image ? (
            <Image
              className="w-40 h-40 border-2 border-gray-300 rounded-full"
              source={{ uri: image }}
            />
          ) : (
            <Image
              className="w-40 h-40 border-2 border-gray-300 rounded-full"
              source={{ uri: userProfile?.profileImage }}
            />
          )}
        </View>
        <View className="my-1">
          <TouchableOpacity
            className="items-center justify-center h-12"
            onPress={() => {
              pickImage();
            }}
          >
            <Text className="text-lg font-bold text-green-600">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-col justify-start my-3 gap-y-2">
          <View className="flex-row items-center gap-x-3">
            <Feather name="user" size={24} color="black" />
            <Text className="text-lg font-bold">Name</Text>
          </View>
          <Text className="text-lg font-bold">
            {userProfile?.firstName} {userProfile?.lastName}
          </Text>
        </View>
        <View className="flex-col justify-start my-3 gap-y-2">
          <View className="flex-row items-center gap-x-3">
            <Feather name="phone" size={24} color="black" />
            <Text className="text-lg font-bold">Phone</Text>
          </View>
          <Text className="text-lg font-bold">
            {userProfile?.countryCode} {userProfile?.contactNo}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
