import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormFiled = ({
  title,
  value,
  onChange,
  placeholder,
  otherStyles,
  ...props
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="flex flex-row w-full h-16 px-4 bg-black-100 border-2 border-solid border-black-200 rounded-2xl focus:border-white items-center">
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          secureTextEntry={title === "Password" && !isShowPassword}
          placeholderTextColor="#7b7b8b"
          className="flex-1 w-full text-white font-pbold text-base"
        />

        {title === "Password" ? (
          <TouchableOpacity
            onPress={() => setIsShowPassword((prevState) => !prevState)}
          >
            <Image
              source={isShowPassword ? icons.eye : icons.eyeHide}
              className="h-6 w-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default FormFiled;
