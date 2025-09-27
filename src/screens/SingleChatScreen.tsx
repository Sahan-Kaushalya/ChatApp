import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
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

type Message = {
  id: number;
  text: string;
  sender: "me" | "friend";
  time: string;
  status?: "sent" | "delivered" | "read";
};

type SingleChatScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "SingleChatScreen"
>;

export default function SingleChatScreen() {
  const navigation = useNavigation<SingleChatScreenProps>();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey! How are you?",
      sender: "friend",
      time: "10:15 AM",
      status: "read",
    },
    {
      id: 2,
      text: "I’m good, just working on my project.",
      sender: "me",
      time: "10:16 AM",
      status: "read",
    },
    {
      id: 3,
      text: "Nice! What project is it?",
      sender: "friend",
      time: "10:17 AM",
      status: "delivered",
    },
    {
      id: 4,
      text: "A chat app with React Native 🚀",
      sender: "me",
      time: "10:18 AM",
      status: "read",
    },
    {
      id: 5,
      text: "That’s awesome! Need any help?",
      sender: "friend",
      time: "10:20 AM",
      status: "delivered",
    },
    {
      id: 6,
      text: "Thanks! I’ll let you know if I get stuck.",
      sender: "me",
      time: "10:21 AM",
      status: "sent",
    },
  ]);

  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <View className="flex-row items-center gap-2">
          <Image
            source={require("../../assets/avatar/avatar_1.png")}
            className="p-1 border-2 border-gray-500 rounded-full h-14 w-14"
          />
          <View className="space-y-3">
            <Text className="text-2xl font-bold">Sahan Perera</Text>
            <Text className="text-xs italic font-semibold">
              Last seen today at 11:00 am
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
  }, [navigation]);

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.sender === "me";
    return (
      <View
        className={`my-1 px-3 max-w-[75%] ${
          isMe
            ? "self-end bg-green-500 rounded-tl-xl rounded-bl-xl rounded-br-xl"
            : "rounded-tr-xl rounded-bl-xl rounded-br-xl self-start bg-gray-500"
        }`}
      >
        <Text className="mt-2 text-base text-white">{item.text}</Text>
        <View className="flex-row items-center justify-end mt-1">
          <Text className="text-xs italic text-white me-2">{item.time}</Text>
          {isMe && (
            <Ionicons
              name={
                item.status === "read"
                  ? "checkmark-done"
                  : item.status === "delivered"
                  ? "checkmark-done"
                  : "checkmark"
              }
              size={16}
              color={item.status === "read" ? "#1d4ed8" : "#f0f9ff"}
            />
          )}
        </View>
      </View>
    );
  };

  const sendMessage = () => {
    if (input.trim()) {
      const newMsg: Message = {
        id: Date.now(),
        text: input,
        sender: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sent",
      };

      setMessages([...messages, newMsg]); // ✅ append
      setInput("");
      flatListRef.current?.scrollToEnd({ animated: true }); // ✅ auto scroll
      console.log(newMsg);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-slate-100"
      edges={["bottom", "right", "left"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
        className="flex-1"
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          className="px-3"
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />
        <View className="flex-row items-end p-2 bg-slate-200">
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            multiline
            placeholder="Type a message"
            className="flex-1 h-auto px-5 py-2 text-base bg-gray-200 min-h-14 max-h-32 rounded-3xl"
          />
          <TouchableOpacity
            className="items-center justify-center bg-green-600 rounded-full w-14 h-14"
            onPress={sendMessage}
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
