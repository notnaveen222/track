import { Text, TextInput, View } from "react-native";
type LabeledInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: "default" | "numeric" | "email-address";
  errorState: boolean;
};
export default function LabeledInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  errorState,
}: LabeledInputProps) {
  return (
    <View>
      <Text style={{ fontSize: 18, marginBottom: 5 }}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        keyboardType={keyboardType}
        style={{
          borderWidth: 1,
          borderColor: errorState ? "red" : "#ccc",
          borderRadius: 8,
          padding: 12,
        }}
      />
    </View>
  );
}
