import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { Image, KeyboardAvoidingView, Platform, Pressable, StatusBar, Text, TextInput, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useState } from "react";

export default function SignUpScreen() {

     const { applied } = useTheme();
     const [firstName, setFirstName] = useState("");
     const [lastName, setLastName] = useState("");
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
                                        value={firstName}
                                        onChangeText={setFirstName}
                                        label={"Enter Your First Name"}
                                   />
                              </View>
                              <View className="w-full my-3">
                                   <FloatingLabelInput
                                        value={lastName}
                                        onChangeText={setLastName}
                                        label={"Enter Your Last Name"} />
                              </View>
                         </View>
                    </SafeAreaView>
                    <View className="absolute w-full p-5 bottom-5">
                         <Pressable className="items-center justify-center bg-green-600 rounded-full h-14">
                              <Text className="text-2xl font-bold text-slate-100 dark:text-slate-100">
                                   Next
                              </Text>
                         </Pressable>
                    </View>
               </KeyboardAvoidingView>
          </AlertNotificationRoot>
     );
}