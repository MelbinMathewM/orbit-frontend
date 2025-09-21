import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import api from "../axios/axiosInstance";
import CustomTextInput from "@/components/ui/custom-text-input";
import CustomButton from "@/components/ui/custom-button";
import CustomPasswordInput from "@/components/ui/custom-password-input";
import { showError, showSuccess } from "@/components/ui/snackBar";

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            showError("Please fill in all fields");
            return;
        }
        try {
            const response = await api.post("/auth/register", { name, email, password });
            if (response.status === 201) {
                showSuccess("Account created successfully!");
                router.push("/login");
            } else {
                showError("Registration failed, please try again");
            }
        } catch (err) {
            showError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView className="flex-1 bg-white dark:bg-gray-950" contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 justify-center px-6 py-10">

                <Text className="text-3xl text-center font-extrabold mb-6 text-orange-600">
                    Create Account
                </Text>

                <CustomTextInput label="Full Name" value={name} onChangeText={setName} />
                <CustomTextInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                <CustomPasswordInput label="Password" value={password} onChangeText={setPassword} />

                <CustomButton label="Sign Up" onPress={handleRegister} loading={loading} />

                <Text onPress={() => router.push("/login")} className="mt-2 text-orange-700 font-medium">
                    Already have an account? Login
                </Text>
            </View>
        </ScrollView>
    );
}
