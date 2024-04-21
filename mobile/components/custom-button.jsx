import { TouchableOpacity, Text } from "react-native";

const CustomButton = ({
  title,
  pressHandler,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={pressHandler}
      activeOpacity={0.7}
      className={`bg-[#AF2C00] rounded-xl min-h-[62px] flex justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : "opacity-100"
      }`}
      disabled={isLoading}
    >
      <Text className={`text-white text-lg font-bold ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
