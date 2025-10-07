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
import NewChatScreen from "./src/screens/NewChatScreen";
import NewContactScreen from "./src/screens/NewContactScreen";
import { useWebSocketPing } from "./src/socket/UseWebSocketPing";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./src/components/AuthProvider";


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
    chatID: number,
    friendName: string,
    lastSeenTime: string,
    profileImage: string,
  };
  NewChatScreen: undefined;
  NewContactScreen: undefined;
};

function ChatApp() {
  //useWebSocketPing(4000 * 60);
  const auth = useContext(AuthContext);
  return (
    <WebSocketProvider userId={auth? Number(auth.userId) : 0}>
      <ThemeProvider>
        <UserRegistrationProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ animation: "fade" }}>
              {auth?.isLoading ? (

                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />

              ) : auth?.userId === null ? (
                 <Stack.Group>
                {/* // when user is not logged in */}
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ContactScreen" component={ContactScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AvatarScreen" component={AvatarScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }} />
                </Stack.Group>
               ) : ( 
               <Stack.Group>
               {/* // when user is logged in */}
                <Stack.Screen name="HomeScreen" component={HomeTabs} options={{ headerShown: false }} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                <Stack.Screen name="SingleChatScreen" component={SingleChatScreen} />
                <Stack.Screen name="SettingScreen" component={SettingScreen} />
                <Stack.Screen name="NewChatScreen" component={NewChatScreen} />
                <Stack.Screen name="NewContactScreen" component={NewContactScreen} />
                </Stack.Group>

              )}
            </Stack.Navigator>
          </NavigationContainer>
        </UserRegistrationProvider>
      </ThemeProvider>
    </WebSocketProvider>
  );
}
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AlertNotificationRoot>
      <AuthProvider>
        <ChatApp />
      </AuthProvider>
    </AlertNotificationRoot>
  );
}
