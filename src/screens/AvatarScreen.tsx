import { Image, Pressable, StatusBar, Text, View, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { useTheme } from "../theme/ThemeProvider";
import { useUserRegistration } from "../components/UserContext";

export default function AvatarScreen() {
    const [image, setImage] = useState<string | null>(null);
    const { userData, setUserData } = useUserRegistration();

    const { applied } = useTheme();
    const logo =
        applied === "dark"
            ? require("../../assets/logo-light.png")
            : require("../../assets/logo.png");


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setUserData((previous) => ({
                ...previous,
                profileImage: result.assets[0].uri,
            }));
        }
    };

    const avatars = [
        require("../../assets/avatar/avatar_1.png"),
        require("../../assets/avatar/avatar_2.png"),
        require("../../assets/avatar/avatar_3.png"),
        require("../../assets/avatar/avatar_4.png"),
        require("../../assets/avatar/avatar_5.png"),
        require("../../assets/avatar/avatar_6.png"),
        require("../../assets/avatar/avatar_7.png"),
        require("../../assets/avatar/avatar_8.png"),
        require("../../assets/avatar/avatar_9.png"),
        require("../../assets/avatar/avatar_10.png"),
        require("../../assets/avatar/avatar_11.png"),
    ];

    return (
        <SafeAreaView className="items-center flex-1 bg-slate-100 dark:bg-slate-950">
            <StatusBar hidden={true} />
            <View className="items-center flex-1 bg-slate-100 dark:bg-slate-950">
                <View>
                    <Image source={logo} className="h-40 w-36" />
                </View>

                <View className="items-center">
                    <Text className="text-lg font-bold text-slate-700 dark:text-slate-200">
                        Choose a Profile Image
                    </Text>

                    <View className="items-center mt-8 h-72">
                        <Pressable className="h-[120] w-[120] rounded-full bg-gray-100 dark:bg-slate-800 
                        justify-center items-center border-2 border-green-600 border-dashed"
                            onPress={pickImage}>

                            {image ? (
                                <Image source={{ uri: image }} className="h-[120] w-[120] rounded-full  bg-gray-100 dark:bg-slate-800 
                        justify-center items-center border-2 border-green-600 border-dashed" />
                            ) : (
                                <View className="items-center">
                                    <Text className="text-2xl font-bold text-slate-500">+</Text>
                                    <Text className="text-lg font-bold text-slate-500">Add Image</Text>
                                </View>
                            )}
                        </Pressable>
                        <Text className="my-2 mt-5 mb-5 text-lg font-bold text-slate-700 dark:text-slate-200">
                            Or select an Avatar</Text>
                        <FlatList
                            data={avatars}
                            horizontal
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (<TouchableOpacity
                                onPress={() => {
                                    setImage(Image.resolveAssetSource(item).uri);
                                    setUserData((previous) => ({
                                        ...previous,
                                        profileImage: Image.resolveAssetSource(item).uri,
                                    }));
                                }}>
                                <Image source={item}
                                    className="w-20 h-20 mx-2 border-2 border-gray-300 rounded-full" />
                            </TouchableOpacity>)}

                            contentContainerStyle={{ paddingHorizontal: 10 }}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>

            </View>
            <View className="absolute bottom-0 left-0 right-0 w-full px-6 pb-6">
                <Pressable className="items-center justify-center w-full bg-green-600 rounded-full h-14"
                    onPress={() => {

                        console.log(userData);
                    }}

                >
                    <Text className="text-2xl font-bold text-slate-100 dark:text-slate-100">
                        Create New Account
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}