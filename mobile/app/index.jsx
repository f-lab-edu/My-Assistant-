import { View, Text, ScrollView, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/custom-button";

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex justify-center items-center w-full h-full min-h-[85vh] px-4">
          <View className="flex flex-row gap-2 items-center">
            <Image
              source={images.logo}
              className="w-[80px] h-[80px]"
              resizeMode="contain"
            />
            <Text className="text-3xl text-white font-bold">MyNote</Text>
          </View>
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="mt-5 relative">
            <Text className="text-3xl leading-[40px] text-white font-pbold text-center">
              개인 맞춤형 일정/프로젝트 관리 앱{" "}
              <Text className="text-[#AF2C00]">MyNote</Text>
            </Text>
            <Image
              source={images.path}
              className="absolute -bottom-2 right-4 w-[136px] h-[15px]"
              resizeMode="contain"
            />
          </View>
          <Text className="mt-7 text-center text-sm font-normal text-gray-100">
            개인 프로젝트에 대한 관리와, 일반적인 일정관리를 하나의 앱에서
            완벽하게 처리해보세요!
          </Text>
          <CustomButton
            title="시작하기"
            pressHandler={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
