import { useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import api from "./axios/axiosInstance";
import { showError, showSuccess } from "@/components/ui/snackBar";
import { useAuth } from "./context/AuthContext";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const validateInputs = () => {
        if (!email || !password) {
            showError("Email and password are required");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError("Please enter a valid email address");
            return false;
        }
        if (password.length < 6) {
            showError("Password must be at least 6 characters");
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        if (!validateInputs()) return;

        setLoading(true);
        try {
            const response = await api.post(
                "/auth/login",
                { email, password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                const { accessToken, role } = response.data;

                await login({ accessToken, role })

                showSuccess("You are now logged in");

                if(role === "admin"){
                    router.push("/");
                }else{
                    router.push("/");
                }
            }
        } catch (error: any) {
            console.error("Login error:", error.response?.data || error.message);

            if (error.response?.status === 401) {
                showError("Invalid email or password");
            } else {
                showError(error.response?.data?.message || "Something went wrong. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
            <Text className="text-3xl font-bold mb-8 text-red-600">Login</Text>

            {/* Email */}
            <Text className="text-sm font-semibold text-gray-600 mb-2 self-start">Email</Text>
            <TextInput
                className={`w-full px-2 py-3 rounded-xl border ${focusedInput === "email"
                    ? "border-red-600 ring-2 ring-red-300"
                    : "border-gray-300"
                    }`}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
            />

            {/* Password */}
            <Text className="text-sm font-semibold text-gray-600 mb-2 mt-4 self-start">Password</Text>
            <TextInput
                className={`w-full px-2 py-3 rounded-xl border ${focusedInput === "password"
                    ? "border-red-600 ring-2 ring-red-300"
                    : "border-gray-300"
                    }`}
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
            />

            {/* Login Button */}
            <Pressable
                className={`w-full py-3 rounded-xl mt-6 ${loading ? "bg-gray-400" : "bg-red-600"}`}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-center text-white font-bold text-base">Login</Text>
                )}
            </Pressable>

            {/* Register Link */}
            <Pressable onPress={() => router.push("/register")}>
                <Text className="mt-4 text-red-700 font-medium">
                    Don't have an account? Register
                </Text>
            </Pressable>
        </View>
    );
}
