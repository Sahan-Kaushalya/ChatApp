import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../App";
import { useTheme } from "../theme/ThemeProvider";
import { useChatList } from "../socket/UseChatList";
import { formatChatTime } from "../util/DateFormatter";
import { AuthContext } from "../components/AuthProvider";


type HomeScreenProps = NativeStackNavigationProp<RootStackParamList, "HomeScreen">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>();
  const [search, setSearch] = useState("");
  const { applied } = useTheme();
  const [isModelVisible, setModelVisible] = useState(false);
   const auth = useContext(AuthContext);
  const chatList = useChatList();


  useLayoutEffect(() => {
    navigation.setOptions({
      title: "ChatApp",
      headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
      headerRight: () => (
        <View className="flex-row space-x-4x">
          <TouchableOpacity className="me-5">
            <Ionicons name="camera" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModelVisible(true)}>
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </TouchableOpacity>
          <Modal animationType="fade" visible={isModelVisible} onRequestClose={() => setModelVisible(false)}
            transparent={true}>
            <Pressable className="flex-1 bg-transparent "
              onPress={() => setModelVisible(false)}>

              <Pressable onPress={(e) => {
                e.stopPropagation(); // prevent the press event
              }}>

                {/* root modal View */}
                <View className="items-end justify-end p-5" style={{
                  shadowColor:"#000",
                  shadowOffset:{
                    width:0,
                    height:2,
                  },
                  shadowOpacity:0.25,
                  shadowRadius:4,
                  elevation:5,
                }}>
                  {/* content View */}
                  <View className="w-40 p-2 rounded-md bg-slate-100 me-6">
                    <TouchableOpacity className="items-start justify-center h-12 my-2 border-b-2 border-gray-300"
                    onPress={()=> {
                      navigation.navigate("SettingScreen")
                      setModelVisible(false);
                    }}>
                      <Text className="text-lg font-bold">Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="items-start justify-center h-12 my-2 border-b-2 border-gray-300"
                    onPress={()=> {
                      navigation.navigate("ProfileScreen"),
                      setModelVisible(false);
                    }}>
                      <Text className="text-lg font-bold">My Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="items-start justify-center h-12 my-2 border-b-2 border-gray-300"
                     onPress={async()=> {
                      if(auth) await auth.signOut(),
                      setModelVisible(false);
                    }}>
                      <Text className="text-lg font-bold">Logout</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Pressable>

            </Pressable>
          </Modal>
        </View>
      ),
      contentStyle: { marginBottom: 0 },
    });
  }, [navigation, isModelVisible]);

  const filterdChats = [...chatList].filter((chat) => {
    return (
      chat.friendName.toLowerCase().includes(search.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(search.toLowerCase())
    );
  }).sort((a, b) => new Date(b.lastTimeStamp).getTime() - new Date(a.lastTimeStamp).getTime());

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      className="flex-row items-center py-2 px-3 bg-gray-100 my-0.5 dark:bg-slate-900"
      onPress={() => {
        navigation.navigate("SingleChatScreen", {
          chatID: item.friendId,
          friendName: item.friendName,
          lastSeenTime: formatChatTime(item.lastTimeStamp),
          profileImage: item.profileImage
            ? item.profileImage
            : `https://ui-avatars.com/api/?name=${item.friendName.replace(" ", "+")}&background=random`,
        });
      }}
    >
      <Image
        source={{
          uri: item.profileImage
            ? item.profileImage
            : `https://ui-avatars.com/api/?name=${item.friendName.replace(" ", "+")}&background=random`,
        }}
        className="w-16 h-16 border border-gray-300 rounded-full"
      />

      <View className="flex-1 ms-3">
        <View className="flex-row justify-between">
          <Text
            className="text-xl font-bold text-gray-600 dark:text-slate-300"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.friendName}
          </Text>
          <Text className="text-xs font-bold text-gray-500">
            {formatChatTime(item.lastTimeStamp)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text
            className="flex-1 text-base text-gray-500"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View className="px-2 py-0.5 bg-green-500 rounded-full ms-2">
              <Text className="text-xs font-bold text-slate-50">
                {item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>

  );

  return (
    <SafeAreaView
      className="flex-1 p-0 bg-white dark:bg-slate-950"
      edges={["right", "bottom", "left"]}
    >
      <StatusBar hidden={false} />
      <View className="flex-row items-center px-3 mx-2 mt-3 border-2 border-gray-300 rounded-full h-14">
        <Ionicons name="search" size={20} color={"gray"} />
        <TextInput
          className="flex-1 text-lg font-bold ps-2 dark:text-slate-200"
          placeholderTextColor={applied === "dark" ? "#d4d4d4" : "#64748b"}
          placeholder="Search"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <View className="mt-1">
        <FlatList data={filterdChats} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 60 }}
        />
      </View>
      <View className="absolute w-20 h-20 bg-green-500 bottom-16 right-3 rounded-3xl">
        <TouchableOpacity className="items-center justify-center w-20 h-20 rounded-3xl" onPress={() => navigation.navigate("NewChatScreen")}>
          <Ionicons name="chatbox-ellipses" size={26} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
