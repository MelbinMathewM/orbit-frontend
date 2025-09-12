import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { useAuth } from "@/app/context/AuthContext";
import { useThemeContext } from "@/app/context/ThemeContext";
import { router } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Profile() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useThemeContext();

    return (
        <ScrollView className="flex-1 bg-gray-100 dark:bg-gray-900 px-6 py-12">
            <View className="items-center mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md w-11/12 self-center">
                <Image
                    source={require("../../../assets/images/man-icon.jpg")}
                    style={{ height: 60, width: 60 }}
                    className="rounded-full mb-4 shadow-md border-4 border-gray-200 dark:border-gray-700"
                />

                <Text className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">
                    {user?.name || "Guest User"}
                </Text>

                <Text className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {user?.email || "No email"}
                </Text>
            </View>

            <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-md">
                <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Settings
                </Text>

                {/* Toggle Theme */}
                <TouchableOpacity
                    onPress={toggleTheme}
                    className="flex-row items-center py-3 px-2 border-b border-gray-200 dark:border-gray-700"
                >
                    <Ionicons
                        name={theme === "dark" ? "moon" : "sunny"}
                        size={22}
                        color={"#f97316"}
                        style={{ marginRight: 12 }}
                    />
                    <Text className="text-base text-gray-800 dark:text-gray-200 font-medium">
                        Toggle Theme ({theme})
                    </Text>
                </TouchableOpacity>

                {/* Logout */}
                <TouchableOpacity
                    onPress={logout}
                    className="flex-row items-center py-3 px-2"
                >
                    <MaterialIcons
                        name="logout"
                        size={22}
                        color="#ef4444"
                        style={{ marginRight: 12 }}
                    />
                    <Text className="text-base text-red-600 dark:text-red-400 font-medium">
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
