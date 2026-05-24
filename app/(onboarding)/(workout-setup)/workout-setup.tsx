import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";

export default function WorkoutSetup() {
  const session = useAuthStore((s) => s.session);
  useEffect(() => {
    if (!session) {
      router.replace("/(auth)/login");
    }
  }, [session]);
  const { signOut } = useAuthStore();
  return (
    <View>
      <Text>Workout Setup</Text>
      <Button onPress={() => signOut()} title="Sign Out" />
    </View>
  );
}
