// components/EmptyState.tsx
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type EmptyStateProps = {
    icon?: keyof typeof FontAwesome.glyphMap;
    title?: string;
    message: string;
};

export default function EmptyState({
    icon = "inbox",
    title = "No Data",
    message,
}: EmptyStateProps) {
    return (
        <View className="flex-1 items-center pt-12 justify-center px-6">
            <FontAwesome name={icon} size={42} color="#7C3AED" className="pt-12 mt-12" />
            {title && (
                <Text className="text-lg font-semibold mt-3 text-gray-800 dark:text-gray-200">
                    {title}
                </Text>
            )}
            <Text className="text-gray-600 dark:text-gray-400 mt-1 text-center">
                {message}
            </Text>
        </View>
    );
}
