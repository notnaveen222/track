import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 32 }}>
        {isSignUp ? "Create Account" : "Welcome Back"}
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          paddingRight: 10,
          paddingVertical: 2,
          marginBottom: 24,
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Password"
          style={{
            flex: 1,
            padding: 12,
            margin: 0,
          }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => {
            setShowPassword(!showPassword);
          }}
        >
          <Text>{showPassword ? "hide" : "show"}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: "#000",
          padding: 16,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          {isSignUp ? "Sign Up" : "Log In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsSignUp(!isSignUp)}
        style={{ marginTop: 16, alignItems: "center" }}
      >
        <Text style={{ color: "#666" }}>
          {isSignUp
            ? "Already have an account? Log in"
            : "Don't have an account? Sign up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
