import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CallsScreen from "./src/screens/CallsScreen";
import StatusScreen from "./src/screens/StatusScreen";
import { Ionicons } from "@expo/vector-icons";
import ChatsScreen from "./src/screens/ChatsScreen";

const Tabs = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        // define icons
        tabBarIcon: ({ color, size }) => {
          let iconName="chatbubble-ellipses";

          if (route.name === "Chats") iconName = "chatbubble-ellipses";
          else if (route.name === "Status") iconName = "time";
          else if (route.name === "Calls") iconName = "call";
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },

        tabBarLabelStyle:{fontSize:14,fontWeight:700},
        tabBarActiveTintColor: "#16a34a", 
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle:{
            height:70,
            backgroundColor:"#e2e8f0",
            paddingTop:8,
        }
      })}
    >
      <Tabs.Screen
        name="Chats"
        component={ChatsScreen}
        options={{ headerShown: false }}
      />
      <Tabs.Screen name="Status" component={StatusScreen} />
      <Tabs.Screen name="Calls" component={CallsScreen} />
    </Tabs.Navigator>
  );
}
