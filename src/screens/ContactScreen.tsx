import { Image, KeyboardAvoidingView, Platform, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";

export default function ContactScreen() {
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
            >
                <View className="items-center justify-center p-5">
                    <View>
                        <Image source={logo} className="h-40 w-36" />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}