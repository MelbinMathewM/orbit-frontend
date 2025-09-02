// components/Header.tsx
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useAuth } from "../app/context/AuthContext";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

type HeaderProps = {
    title: string;
};

export default function Header({ title }: HeaderProps) {
    const { user } = useAuth();
    const router = useRouter();

    return (
        <View className="flex-row items-center justify-between px-6 py-3 bg-black shadow-md">
            {/* Logo + Company Name */}
            <View className="flex-row items-center space-x-4">
                <Image
                    source={require("../assets/images/logo-1.png")}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                />
                <Text className="text-white ml-2 font-semibold text-sm">
                    ORBIT TRAVEL & TOURS
                </Text>
            </View>

            {/* Title in center */}
            <Text className="text-center text-white text-base font-semibold">
                {title}
            </Text>

            {/* Right side buttons */}
            {user ? (
                <TouchableOpacity
                    // onPress={() => router.push("/profile")}
                    className="w-10 h-10 rounded-full bg-yellow-500 items-center justify-center"
                >
                    <FontAwesome name="user" size={20} color="white" />
                </TouchableOpacity>
            ) : (
                <View className="flex-row space-x-2">
                    <TouchableOpacity
                        onPress={() => router.push("/login")}
                        className="px-3 py-1 bg-blue-500 rounded-xl"
                    >
                        <Text className="text-white font-medium">Login</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
