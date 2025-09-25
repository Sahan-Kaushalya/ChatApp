import { Image, KeyboardAvoidingView, Platform, Pressable, StatusBar, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import CountryPicker, { CountryCode, Country } from "react-native-country-picker-modal";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import { validateCountryCode, validatePhoneNo } from "../util/Validation";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

type ContactProps = NativeStackNavigationProp<RootStackParamList, 'ContactScreen'>;

export default function ContactScreen() {

    const navigation = useNavigation<ContactProps>();

    const [show, setShow] = useState<boolean>(false);
    const [countryCode, setCountryCode] = useState<CountryCode>("LK"); // Default country code
    const [country, setCountry] = useState<Country | null>(null); // Selected country object
    const { userData, setUserData } = useUserRegistration();

    const [callingCode, setCallingCode] = useState("+94");
    const [phoneNo, setPhoneNo] = useState("");

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
                        <View className={`flex-row items-center justify-center w-full h-16 border-b-4 rounded-lg ${applied === "dark" ? "border-green-600 bg-slate-900" : "border-green-600 bg-slate-150"}`}>
                            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                <Text className={`text-lg font-bold text-left ${applied === "dark" ? "text-slate-100" : "text-slate-500"}`}>
                                    Select country
                                </Text>
                            </View>
                            <CountryPicker
                                countryCode={countryCode}
                                withFilter
                                withFlag
                                withCountryNameButton
                                withCallingCode
                                visible={show}
                                onClose={() => setShow(false)}
                                onSelect={(country) => {
                                    setCountryCode(country.cca2);
                                    setCountry(country);
                                    setShow(false);
                                }}
                                theme={{
                                    backgroundColor: applied === "dark" ? "#0f172a" : "#f1f5f9",
                                    onBackgroundTextColor: applied === "dark" ? "#f1f5f9" : "#0f172a",
                                    fontFamily: "System"
                                }}
                            />
                            <AntDesign name="caret-down" size={20} color="green" style={{ marginLeft: 5 }} />
                        </View>

                        <View className="flex flex-row justify-center rounded-lg mt-14 bg-slate-150 dark:bg-slate-900">
                            <TextInput
                                inputMode="tel"
                                placeholderTextColor={applied === "dark" ? "#78716c" : "#64748b"}
                                className="w-[18%] h-16 text-lg font-bold border-y-4 border-y-green-600  text-stone-500 dark:text-slate-100"
                                placeholder="+94"
                                value={country ? `+${country.callingCode}` : callingCode}
                                onChangeText={(text) => {
                                    setCallingCode(text);
                                }}
                            />
                            <TextInput
                                inputMode="tel"
                                placeholderTextColor={applied === "dark" ? "#78716c" : "#64748b"}
                                className="w-[80%] h-16 text-lg font-bold border-y-4 border-y-green-600 ml-2 text-stone-500 dark:text-slate-100"
                                placeholder="77 ### ####"
                                value={phoneNo}
                                onChangeText={(text) => {
                                    setPhoneNo(text);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
            {/* Next button fixed at the bottom */}
            <View className="absolute bottom-0 left-0 right-0 w-full px-6 pb-6">
                <Pressable className="items-center justify-center w-full bg-green-600 rounded-full h-14"
                    onPress={() => {

                        let validCountryCode = validateCountryCode(callingCode);
                        let validPhoneNo = validatePhoneNo(phoneNo);

                        if (validCountryCode) { // skip null
                            Toast.show({
                                type: ALERT_TYPE.WARNING,
                                title: "WAERNING",
                                textBody: validCountryCode,
                            });
                        } else if (validPhoneNo) { // skip null
                            Toast.show({
                                type: ALERT_TYPE.WARNING,
                                title: "WAERNING",
                                textBody: validPhoneNo,
                            });
                        } else {
                            navigation.replace('AvatarScreen');
                        }

                        setUserData((previous) => ({
                            ...previous,
                            countryCode: country
                                ? `+${country.callingCode}`
                                : callingCode,
                            contactNo: phoneNo,
                        }));
                        
                    }}
                >
                    <Text className="text-2xl font-bold text-slate-100 dark:text-slate-100">
                        Next
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}