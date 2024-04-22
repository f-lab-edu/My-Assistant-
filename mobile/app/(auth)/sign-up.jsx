import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormFiled from "../../components/form-filed";
import { useState } from "react";
import CustomButton from "../../components/custom-button";
import { Link } from "expo-router";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="flex mt-4 justify-center min-h-[90vh] w-full h-full px-4">
          <View className="flex flex-row gap-2 items-center">
            <Image
              source={images.logo}
              className="w-[80px] h-[80px]"
              resizeMode="contain"
            />
            <Text className="text-3xl text-white font-bold">MyNote</Text>
          </View>
          <Text className="mt-10 text-2xl text-white font-pbold">
            Signup to <Text className="text-[#AF2C00]">MyNote</Text>
          </Text>
          <FormFiled
            title="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />
          <FormFiled
            title="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormFiled
            title="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="회원가입"
            pressHandler={submitHandler}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex flex-row items-center justify-center pt-5 gap-2">
            <Text className="text-lg text-gray-100">이미 회원이신가요?</Text>
            <Link
              href="/sign-in"
              className="text-lg font-semibold text-[#BF3100]"
            >
              로그인
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
