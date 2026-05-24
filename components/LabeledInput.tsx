import { Text, TextInput, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withTiming,
} from "react-native-reanimated";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type LabeledInputProps = {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: "default" | "numeric" | "email-address";
  errorState?: boolean;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  rightElement?: React.ReactNode;
};

export default function LabeledInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  errorState,
  secureTextEntry,
  autoCapitalize = "none",
  rightElement,
}: LabeledInputProps) {
  const focused = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: errorState
      ? "red"
      : interpolateColor(focused.value, [0, 1], ["#444", "#ffffff"]),
  }));

  return (
    <View>
      {label && (
        <Text style={{ fontSize: 18, marginBottom: 5, color: "white" }}>
          {label}
        </Text>
      )}
      <View style={{ position: "relative" }}>
        <AnimatedTextInput
          placeholder={placeholder}
          placeholderTextColor="#888"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onFocus={() => {
            focused.value = withTiming(1, { duration: 100 });
          }}
          onBlur={() => {
            focused.value = withTiming(0, { duration: 100 });
          }}
          style={[
            {
              color: "white",
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
              paddingRight: rightElement ? 50 : 12,
            },
            animatedStyle,
          ]}
        />
        {rightElement && (
          <View
            style={{
              position: "absolute",
              right: 12,
              top: 0,
              bottom: 0,
              justifyContent: "center",
            }}
          >
            {rightElement}
          </View>
        )}
      </View>
    </View>
  );
}
