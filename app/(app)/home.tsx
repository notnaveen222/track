import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/store/authStore";

export default function HomeScreen() {
  const { signOut } = useAuthStore();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Today's Workout</Text>
      <TouchableOpacity onPress={signOut} style={{ marginTop: 24 }}>
        <Text style={{ color: "red" }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
