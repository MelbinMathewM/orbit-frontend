import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import api from "../axios/axiosInstance";
import { showError, showSuccess } from "@/components/ui/snackBar";
import { useAuth } from "../context/AuthContext";
import CustomTextInput from "@/components/ui/custom-text-input";
import CustomButton from "@/components/ui/custom-button";
import CustomPasswordInput from "@/components/ui/custom-password-input";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            );

            if (response.status === 200) {
                const { accessToken, role } = response.data;

                await login({ accessToken, role })

                showSuccess("You are now logged in");

                if (role === "admin") {
                    router.push("/admin/dashboard");
                } else {
                    router.push("/");
                }
            }
        } catch (error: any) {
            if (error.response?.status === 401) {
                showError("Invalid email or password");
            } else {
                showError(error.response?.data?.error || "Something went wrong. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView className="flex-1 bg-white dark:bg-gray-950" contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 justify-center px-6 py-10">

                <Text className="text-3xl text-center font-extrabold mb-6 text-orange-600">
                    Welcome Back
                </Text>

                <CustomTextInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                <CustomPasswordInput label="Password" value={password} onChangeText={setPassword} />

                <CustomButton label="Login" onPress={handleLogin} loading={loading} />

                <Text onPress={() => router.push("/register")} className="mt-2 text-orange-700 font-medium">
                    Don't have an account? Register
                </Text>

            </View>
        </ScrollView>
    );
}
