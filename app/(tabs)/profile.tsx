import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "@/app/context/AuthContext";
import { useThemeContext } from "@/app/context/ThemeContext";
import Header from "@/components/header";
import { router } from "expo-router";

export default function Profile() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useThemeContext();

    return (
        <ScrollView className="flex-1 bg-gray-100 dark:bg-gray-900">
            <View className="px-6 py-8">
                {/* User Info */}
                <View className="items-center mb-8">
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                        {user?.name || "Guest User"}
                    </Text>
                    <Text className="text-gray-700 dark:text-gray-300">
                        {user?.email || "No email"}
                    </Text>
                </View>

                {/* Toggle Theme */}
                <TouchableOpacity
                    onPress={toggleTheme}
                    className="bg-orange-500 py-3 px-6 rounded-xl mb-4"
                >
                    <Text className="text-white text-center font-semibold">
                        Toggle Theme ({theme})
                    </Text>
                </TouchableOpacity>

                {/* Logout */}
                <TouchableOpacity
                    onPress={logout}
                    className="bg-red-600 py-3 px-6 rounded-xl mb-4"
                >
                    <Text className="text-white text-center font-semibold">Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
