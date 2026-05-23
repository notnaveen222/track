import DateInput from "@/components/DatePicker";
import LabeledInput from "@/components/LabeledInput";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { OnboardingFormData } from "@/types/user-onboarding";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Onboarding() {
  const session = useAuthStore((s) => s.session);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<OnboardingFormData>({
    full_name: "",
    dob: "",
    gender: "",
    weight: "",
    height: "",
  });
  const [errorState, setErrorState] = useState({
    full_name: false,
    dob: false,
  });
  useEffect(() => {
    if (!session) {
      router.replace("/(auth)/login");
    }
  }, [session]);
  if (!session) {
    return null;
  }
  const handleFormSubmit = async () => {
    const errors = {
      full_name: !formData.full_name.trim(),
      dob: !formData.dob,
    };

    setErrorState(errors);

    if (errors.full_name || errors.dob) {
      return;
    }
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        dob: formData.dob,
        has_completed_onboarding: true,
      })
      .eq("id", session.user.id);

    if (error) {
      // should implement a toast feature that i can use to show err
      console.log(error);
      return;
    }
    router.replace("/(onboarding)/(workout-setup)/workout-setup");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 32 }}>
        Welcome to Track
      </Text>
      {currentStep == 1 && (
        <View style={{ gap: 10 }}>
          <LabeledInput
            label="Name"
            placeholder="Pablo Picasso"
            value={formData.full_name}
            errorState={errorState.full_name}
            onChangeText={(val) => {
              setErrorState({ ...errorState, full_name: false });
              setFormData({ ...formData, full_name: val });
            }}
          />
          <DateInput
            label="Date of Birth"
            value={formData.dob}
            onChangeDate={(val) => {
              setErrorState({ ...errorState, dob: false });
              setFormData({ ...formData, dob: val });
            }}
            errorState={errorState.dob}
          />
        </View>
      )}
      <TouchableOpacity
        onPress={handleFormSubmit}
        style={{
          marginTop: 16,
          alignItems: "center",
          backgroundColor: "black",
          borderRadius: 8,
          padding: 12,
        }}
      >
        <Text style={{ color: "white" }}>Proceed to Workout Setup</Text>
      </TouchableOpacity>
    </View>
  );
}
