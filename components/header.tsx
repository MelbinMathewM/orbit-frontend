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
            <View className="flex-row items-center space-x-2">
                <Image
                    source={require("../assets/images/logo-1.png")}
                    style={{ width: 36, height: 36, borderRadius: 20 }}
                />
                <Text className="text-white ml-1 font-semibold text-sm">
                    ORBIT TRAVEL & TOURS
                </Text>
            </View>

            <View className="flex-row space-x-4">
                <Text className="text-center text-white text-sm font-semibold">
                    {title}
                </Text>

                {user ? (
                    <TouchableOpacity
                        // onPress={() => router.push("/profile")}
                        className="items-center justify-center"
                    >
                        <FontAwesome name="user" size={20} color="white" />
                    </TouchableOpacity>
                ) : (
                    <View className="flex-row space-x-2">
                        <TouchableOpacity
                            onPress={() => router.push("/login")}
                            className="px-3 py-1 bg-blue-500 rounded-md"
                        >
                            <Text className="text-white font-medium">Login</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}
