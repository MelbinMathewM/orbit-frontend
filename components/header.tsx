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
        <View className="flex-row items-center justify-between px-6 pb-2 pt-12 bg-white dark:bg-neutral-900 shadow-gray-200 dark:shadow-gray-950 shadow-sm">
            <View className="flex-row items-center space-x-2">
                <Image
                    source={require("../assets/images/logo-1.png")}
                    style={{ width: 30, height: 30, borderRadius: 20 }}
                />
                <Text className="text-gray-800 dark:text-gray-200 ml-1 font-semibold text-base">
                    ORBIT TRAVEL & TOURS
                </Text>
            </View>

            <View className="flex-row">
                <Text className="text-center mr-3 text-gray-400 dark:text-gray-600 text-sm font-semibold">
                    {title}
                </Text>

                {user ? (
                    <TouchableOpacity
                        onPress={() => router.push("/profile")}
                        className="items-center justify-center"
                    >
                        <FontAwesome name="user" size={20} color="orange" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => router.push("/login")}
                    >
                        <Text className="text-orange-500 font-medium">Login</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
