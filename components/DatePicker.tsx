import { useState } from "react";
import { View, Platform, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
type DateInputProps = {
  label: string;
  value: string;
  onChangeDate: (value: string) => void;
  errorState: boolean;
};
export default function DateInput({
  label,
  value,
  onChangeDate,
  errorState,
}: DateInputProps) {
  const [show, setShow] = useState(false);
  const onChange = (_event: any, selectedDate?: Date) => {
    setShow(Platform.OS === "ios");

    if (selectedDate) {
      onChangeDate(selectedDate.toISOString().split("T")[0]);
    }
  };
  return (
    <View style={{}}>
      <Text style={{ fontSize: 18, marginBottom: 5 }}>{label}</Text>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 1,
          borderColor: errorState ? "red" : "#ccc",
          borderRadius: 8,
          paddingRight: 10,
          paddingVertical: 2,
          alignItems: "center",
        }}
      >
        <Text style={{ flex: 1, padding: 12, opacity: value ? 1 : 0.6 }}>
          {value || "Select date of birth"}
        </Text>
        <TouchableOpacity onPress={() => setShow(true)}>
          <Text>Date</Text>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onValueChange={onChange}
        />
      )}
    </View>
  );
}
