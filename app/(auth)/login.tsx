import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import LabeledInput from "@/components/LabeledInput";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuthStore();

  const handleSubmit = async () => {
    const error = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password);

    if (error) {
      Alert.alert("Error", error);
    } else {
      router.replace("/");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 24,
          backgroundColor: "black",
        }}
      >
        <Animated.Text
          entering={FadeInDown.duration(300).delay(0)}
          style={{
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 32,
            color: "white",
          }}
        >
          {isSignUp ? "Create Account" : "Welcome Back"}
        </Animated.Text>

        <Animated.View entering={FadeInDown.delay(100)} style={{ marginBottom: 12 }}>
          <LabeledInput
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200)} style={{ marginBottom: 24 }}>
          <LabeledInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightElement={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={{ color: "white" }}>
                  {showPassword ? "hide" : "show"}
                </Text>
              </TouchableOpacity>
            }
          />
        </Animated.View>

        <Animated.View entering={FadeIn.delay(300)}>
          <TouchableOpacity
            onPress={() => {
              impactAsync(ImpactFeedbackStyle.Light);
              handleSubmit();
            }}
            style={{
              backgroundColor: "white",
              padding: 16,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#000", fontWeight: "bold" }}>
              {isSignUp ? "Sign Up" : "Log In"}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(350)}>
          <TouchableOpacity
            onPress={() => setIsSignUp(!isSignUp)}
            style={{ marginTop: 16, alignItems: "center" }}
          >
            <Text style={{ color: "white", opacity: 0.8 }}>
              {isSignUp
                ? "Already have an account? Log in"
                : "Don't have an account? Sign up"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
