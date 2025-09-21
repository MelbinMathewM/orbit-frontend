// components/AdminHeader.tsx
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

type HeaderProps = {
    title: string;
};

export default function AdminHeader({ title }: HeaderProps) {
    const router = useRouter();

    return (
        <View className="flex-row items-center justify-between px-6  pt-12 pb-3 bg-white dark:bg-neutral-900 shadow-gray-200 dark:shadow-gray-950 shadow-sm">
            <View className="flex-row items-center">
                <Image
                    source={require("../assets/images/logo-1.png")}
                    style={{ width: 36, height: 36, borderRadius: 20 }}
                />
                <Text className="text-gray-800 dark:text-gray-200 ml-2 font-semibold text-sm">
                    ORBIT TRAVEL & TOURS
                </Text>
            </View>

            <View className="flex-row items-center">
                <Text className="text-center mr-4 text-gray-300 dark:text-gray-700 text-sm font-semibold">
                    {title}
                </Text>

                <TouchableOpacity
                    onPress={() => router.push("/admin/profile")}
                    className="flex-row items-center justify-center"
                >
                    <Text className="text-violet-500 font-medium me-1">Admin</Text>
                    <FontAwesome name="user" size={20} color="violet" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
