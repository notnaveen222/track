import { Redirect } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { View, ActivityIndicator } from "react-native";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type Profile = {
  has_completed_onboarding: boolean;
  has_completed_workout_setup: boolean;
};

export default function Index() {
  const { session, loading } = useAuthStore();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!session) {
      setProfileLoading(false);
      return;
    }
    supabase
      .from("profiles")
      .select("has_completed_onboarding, has_completed_workout_setup")
      .eq("id", session.user.id)
      .single()
      .then(({ data, error }) => {
        if (!error) setProfile(data);
        setProfileLoading(false);
      });
  }, [session]);
  if (loading || profileLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  if (!session) return <Redirect href="/(auth)/login" />;

  if (!profile?.has_completed_onboarding)
    return <Redirect href="/(onboarding)/onboarding" />;

  if (!profile?.has_completed_workout_setup)
    return <Redirect href="/(onboarding)/workout-setup" />;

  return <Redirect href="/(app)/home" />;
}
