import { Image, KeyboardAvoidingView, Platform, Pressable, StatusBar, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { CountryItem, CountryPicker } from "react-native-country-codes-picker";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type ContactProps = NativeStackNavigationProp<RootStackParamList, 'ContactScreen'>;

export default function ContactScreen() {

    const navigation = useNavigation<ContactProps>();

    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState<CountryItem | null>(null);
    const { applied } = useTheme();
    const logo =
        applied === "dark"
            ? require("../../assets/logo-light.png")
            : require("../../assets/logo.png");
    return (
        <SafeAreaView className="items-center flex-1 bg-slate-100 dark:bg-slate-950">
            <StatusBar hidden={true} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "android" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
                style={{ flex: 1, width: '100%' }}
            >
                <View className="items-center justify-center w-full p-5">
                    <View>
                        <Image source={logo} className="h-40 w-36" />
                    </View>
                    <View>
                        <Text className="font-bold text-center text-md text-slate-500 dark:text-slate-100">
                            We use your contact list to connect you with your friends
                            who are already using the app.
                            Your contacts stay private and are never stored on our servers.
                        </Text>
                    </View>
                    <View className="w-full mt-5">
                        <Pressable className="flex-row items-center justify-center w-full h-16 border-b-4 border-green-600 rounded-lg"
                            onPress={() => { setShow(true) }}
                        >
                            <Text className="text-lg font-bold text-slate-500 dark:text-slate-100">
                                Select Country
                            </Text>
                            <AntDesign name="caret-down" size={20} color="green" style={{ marginLeft: 5 }} />
                        </Pressable>
                        <CountryPicker
                            show={show}
                            lang="en"
                            pickerButtonOnPress={(item) => {
                                setCountryCode(item);
                                setShow(false);
                            }}
                            
                            style={{ modal: { height: '50%' } }}
                        />
                        <View className="flex flex-row justify-center mt-5 rounded-lg bg-slate-150 dark:bg-slate-900">
                            <TextInput
                                inputMode="tel"
                                placeholderTextColor={applied === "dark" ? "#78716c" : "#64748b"}
                                className="w-[18%] h-16 text-lg font-bold border-y-4 border-y-green-600  text-stone-500 dark:text-slate-100"
                                placeholder="+94"
                            />
                            <TextInput
                                inputMode="tel"
                                placeholderTextColor={applied === "dark" ? "#78716c" : "#64748b"}
                                className="w-[80%] h-16 text-lg font-bold border-y-4 border-y-green-600 ml-2 text-stone-500 dark:text-slate-100"
                                placeholder="77 ### ####"
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
            {/* Next button fixed at the bottom */}
            <View className="absolute bottom-0 left-0 right-0 w-full px-6 pb-6">
                <Pressable className="items-center justify-center w-full bg-green-600 rounded-full h-14"
                    onPress={() => navigation.replace('AvatarScreen')}
                    >
                    <Text className="text-2xl font-bold text-slate-100 dark:text-slate-100">
                        Next
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}