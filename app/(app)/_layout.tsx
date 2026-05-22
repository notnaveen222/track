import { useEffect } from "react";
import { Stack, router } from "expo-router";
import { useAuthStore } from "@/store/authStore";

export default function AppLayout() {
  const session = useAuthStore((s) => s.session);

  useEffect(() => {
    if (!session) {
      router.replace("/(auth)/login");
    }
  }, [session]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
