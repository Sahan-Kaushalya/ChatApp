import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { User } from "../socket/chat";
import { useUserList } from "../socket/UseUserList";


type NewChatScreenProp = NativeStackNavigationProp<RootStackParamList, "NewChatScreen">;
export default function NewChatScreen() {
  const navigation = useNavigation<NewChatScreenProp>();
  const [search, setSearch] = useState("");
  const users = useUserList();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <View className="flex-row items-center gap-x-2">
          <TouchableOpacity
            className="items-center justify-center"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </TouchableOpacity>
          <View className="flex-col">
            <Text className="text-lg font-bold">Select Contact</Text>
            <Text className="text-sm font-bold">{users.length} contacts</Text>
          </View>
        </View>
      ),
      headerRight: () => <View></View>,
    });
  }, [navigation, users]);

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      className="flex-row items-center justify-start px-3 py-2 mt-1 gap-x-3 bg-gray-50"
      onPress={() => {
        navigation.replace("SingleChatScreen", {
          chatID: item.id,
          friendName: `${item.firstName} ${item.lastName}`,
          lastSeenTime: item.updatedAt,
          profileImage: item.profileImage
            ? item.profileImage
            : `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`,
        });
      }}
    >
      <View>
        <TouchableOpacity className="items-center justify-center border-gray-300 rounded-full h-14 w-14 border-1">
          {item.profileImage ? (
            <Image
              source={{ uri: item.profileImage }}
              className="rounded-full h-14 w-14"
            />
          ) : (
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`,
              }}
              className="rounded-full h-14 w-14"
            />
          )}
        </TouchableOpacity>
      </View>
      <View className="flex-col gap-y-1">
        <Text className="text-xl font-bold">
          {item.firstName} {item.lastName}
        </Text>
        <Text className="text-sm italic">
          {item.status === "ACTIVE"
            ? "Already in Friend List; Message Now"
            : "Hey there! I am using ChatApp"}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const filterdUsers = [...users]
    .filter((user) => {
      return (
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.contactNo.includes(search)
      );
    })
    .sort((a, b) => a.firstName.localeCompare(b.firstName));

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["right", "bottom", "left"]}
    >
      <StatusBar hidden={false}/>
      <View className="flex-1">
        <View className="flex-row items-center px-3 mx-2 mt-3 border-2 border-gray-300 rounded-full h-14">
          <Ionicons name="search" size={20} color={"gray"} />
          <TextInput
            className="flex-1 text-lg font-bold ps-2"
            placeholder="Search"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </View>
        <View className="px-2 py-2 my-2 border-b-2 border-b-green-500">
          <TouchableOpacity
            className="flex-row items-center justify-start gap-x-3 h-14"
             onPress={() => navigation.navigate("NewContactScreen")}
          >
            <View className="items-center justify-center w-12 h-12 bg-green-600 rounded-full">
              <Feather name="user-plus" size={24} color="white" />
            </View>
            <Text className="text-lg font-bold">New Contact</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-2">
          <FlatList
            data={filterdUsers}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
