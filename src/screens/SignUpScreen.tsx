import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { Image, KeyboardAvoidingView, Platform, Pressable, StatusBar, Text, TextInput, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useState } from "react";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import { validateFirstName, validateLastName } from "../util/Validation";

type SignUpProps = NativeStackNavigationProp<RootStackParamList, 'SignUpScreen'>;

export default function SignUpScreen() {

     const navigation = useNavigation<SignUpProps>();

     const [firstName, setFirstName] = useState("");
     const [lastName, setLastName] = useState("");

     const { applied } = useTheme();
     const { userData, setUserData } = useUserRegistration();
     const logo =
          applied === "dark"
               ? require("../../assets/logo-light.png")
               : require("../../assets/logo.png");

     return (
          <AlertNotificationRoot>
               <KeyboardAvoidingView
                    behavior={Platform.OS === "android" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
                    className="items-center flex-1 dark:bg-slate-950"
               >
                    <SafeAreaView className="items-center justify-center p-5">
                         <StatusBar hidden={true} />
                         <Image source={logo} className="h-40 w-36" />
                         <View className="items-start justify-start w-full">
                              <Text className="font-bold text-slate-500 dark:text-slate-100">
                                   Create your account and start the conversation TODAY
                              </Text>
                         </View>
                         <View className="self-stretch">
                              <View className="w-full my-3">
                                   <FloatingLabelInput
                                        value={userData.firstName}
                                        onChangeText={(text) => {
                                             setUserData((previous) => ({
                                                  ...previous,
                                                  firstName: text,
                                             }));
                                        }}
                                        label={"Enter Your First Name"}
                                   />
                              </View>
                              <View className="w-full my-3">
                                   <FloatingLabelInput
                                        value={userData.lastName}
                                        onChangeText={(text) => {
                                             setUserData((previous) => ({
                                                  ...previous,
                                                  lastName: text,
                                             }));
                                        }}
                                        label={"Enter Your Last Name"} />
                              </View>
                         </View>
                    </SafeAreaView>
                    <View className="absolute w-full p-5 bottom-5">
                         <Pressable className="items-center justify-center bg-green-600 rounded-full h-14"
                              onPress={() => {
                                   let validFname = validateFirstName(userData.firstName);
                                   let validLname = validateLastName(userData.lastName);

                                   if (validFname) { // skip null
                                        Toast.show({
                                             type: ALERT_TYPE.WARNING,
                                             title: "WAERNING",
                                             textBody: validFname,
                                        });
                                   } else if (validLname) { // skip null
                                        Toast.show({
                                             type: ALERT_TYPE.WARNING,
                                             title: "WAERNING",
                                             textBody: validLname,
                                        });
                                   } else {
                                        navigation.replace('ContactScreen');
                                   }

                              }}
                         >
                              <Text className="text-2xl font-bold text-slate-100 dark:text-slate-100">
                                   Next
                              </Text>
                         </Pressable>
                    </View>
               </KeyboardAvoidingView>
          </AlertNotificationRoot>
     );
}