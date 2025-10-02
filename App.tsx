import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/screens/SplashScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SettingScreen from "./src/screens/SettingScreen";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import ContactScreen from "./src/screens/ContactScreen";
import AvatarScreen from "./src/screens/AvatarScreen";
import { UserRegistrationProvider } from "./src/components/UserContext";
import { AlertNotificationRoot } from "react-native-alert-notification";
import HomeTabs from "./HomeTabs";
import SingleChatScreen from "./src/screens/SingleChatScreen";
import { WebSocketProvider } from "./src/socket/WebSocketProvider";


export type RootStackParamList = {
  SplashScreen: undefined;
  SignUpScreen: undefined;
  ContactScreen: undefined;
  AvatarScreen: undefined;
  SignInScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
  SettingScreen: undefined;
  SingleChatScreen: {
    chatID:number,
    friendName:string,
    lastSeenTime:string,
    profileImage:string,
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const USER_ID=1;
  return (
    <AlertNotificationRoot>
      <WebSocketProvider userId={USER_ID}>
      <ThemeProvider>
        <UserRegistrationProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ animation: "fade" }}>
              <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ContactScreen" component={ContactScreen} options={{ headerShown: false }} />
              <Stack.Screen name="AvatarScreen" component={AvatarScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }} />
              <Stack.Screen name="HomeScreen" component={HomeTabs} options={{ headerShown: false }}/>
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
              <Stack.Screen name="SettingScreen" component={SettingScreen} />
              <Stack.Screen name="SingleChatScreen" component={SingleChatScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserRegistrationProvider>
      </ThemeProvider>
      </WebSocketProvider>
    </AlertNotificationRoot>
  );
}
