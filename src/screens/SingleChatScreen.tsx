import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../App";
import {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState, useRef } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSingleChat } from "../socket/UseSingleChat";
import { Chat } from "../socket/chat";
import { formatChatTime } from "../util/DateFormatter";
import { useSendChat } from "../socket/UseSendChat";

type Message = {
  id: number;
  text: string;
  sender: "me" | "friend";
  time: string;
  status?: "SEND" | "delivered" | "read";
};

type SingleChatScreenProps = {
  route: RouteProp<RootStackParamList, "SingleChatScreen">;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "SingleChatScreen"
  >;
};

export default function SingleChatScreen({ route, navigation }: SingleChatScreenProps) {
  // ✅ Correct params destructuring
  const { chatID, friendName, lastSeenTime, profileImage } = route.params;

  const singleChat = useSingleChat(chatID);
  const messages = singleChat.messages;
  const friend = singleChat.friend;
  const [input, setInput] = useState("");
  const sendMessage = useSendChat();
  const flatListRef = useRef<FlatList>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className="items-center justify-center" onPress={()=>{navigation.goBack()}}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </TouchableOpacity>
           <TouchableOpacity className="items-center justify-center border-gray-300 rounded-full h-14 w-14 border-1">
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                className="rounded-full w-14 h-14"
              />
            ) : (
              <View className="items-start justify-center bg-gray-300 rounded-full h-14 w-14">
                <Text className="text-lg font-bold">
                  {friendName.trim().charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <View className="space-y-2">
            <Text className="text-2xl font-bold">{friend?.firstName} {friend?.lastName}</Text>
            <Text className="text-xs italic font-semibold">
              {friend?.status === "ONLINE"?"Online":`Last seen ${formatChatTime(friend?.updatedAt ??"")}`}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, friend]);

  const renderItem = ({ item }: { item: Chat }) => {
    const isMe = item.from.id !== chatID;
    return (
      <View
        className={`my-1 px-3 max-w-[75%] ${isMe
            ? "self-end bg-green-500 rounded-tl-xl rounded-bl-xl rounded-br-xl"
            : "self-start bg-gray-500 rounded-tr-xl rounded-bl-xl rounded-br-xl"
          }`}
      >
        <Text className="mt-2 text-base text-white">{item.message}</Text>
        <View className="flex-row items-center justify-end mt-1">
          <Text className="text-xs italic text-white me-2">{formatChatTime(item.createdAt)}</Text>
          {isMe && (
            <Ionicons
              name={
                item.status === "READ"
                  ? "checkmark-done"
                  : item.status === "DELIVERED"
                    ? "checkmark-done"
                    : "checkmark"
              }
              size={16}
              color={item.status === "READ" ? "#1d4ed8" : "#f0f9ff"}
            />
          )}
        </View>
      </View>
    );
  };

  const handleSendChat = () => {
    if (!input.trim()) {
      return;
    }
    sendMessage(chatID, input);
    setInput("");
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100" edges={["bottom", "right", "left"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        className="flex-1"
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          className="px-3 mt-2"
          inverted
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />
        <View className="flex-row items-end p-2 bg-slate-200">
          <TextInput
            value={input}
            onChangeText={setInput}
            multiline
            placeholder="Type a message"
            className="flex-1 h-auto px-5 py-2 text-base bg-gray-200 min-h-14 max-h-32 rounded-3xl"
          />
          <TouchableOpacity
            className="items-center justify-center bg-green-600 rounded-full w-14 h-14"
            onPress={handleSendChat}
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
