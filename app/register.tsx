import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import api from "./axios/axiosInstance";

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        const response = await api.post("/auth/register", { name, email, password });
        if(response){
            if(response.status === 201){
                console.log("Success");
            }else{
                console.log("failed");
            }
        }
        console.log("Registering with:", { name, email, password });
        router.push("/");
    };

    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
            {/* Title */}
            <Text className="text-3xl font-bold mb-8 text-red-600">Register</Text>

            {/* Name */}
            <Text className="text-sm font-semibold text-gray-600 mb-2 self-start">
                Full Name
            </Text>
            <TextInput
                className={`w-full px-2 py-3 rounded-xl border ${focusedInput === "name"
                        ? "border-red-600 ring-2 ring-red-300"
                        : "border-gray-300"
                    }`}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                onFocus={() => setFocusedInput("name")}
                onBlur={() => setFocusedInput(null)}
            />

            {/* Email */}
            <Text className="text-sm font-semibold text-gray-600 mb-2 mt-4 self-start">
                Email
            </Text>
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
            <Text className="text-sm font-semibold text-gray-600 mb-2 mt-4 self-start">
                Password
            </Text>
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

            {/* Register Button */}
            <Pressable
                className="w-full bg-red-600 py-3 rounded-xl mt-6"
                onPress={handleRegister}
            >
                <Text className="text-center text-white font-bold text-base">
                    Register
                </Text>
            </Pressable>

            {/* Link to Login */}
            <Pressable onPress={() => router.push("/login")}>
                <Text className="mt-4 text-red-700 font-medium">
                    Already have an account? Login
                </Text>
            </Pressable>
        </View>
    );
}
