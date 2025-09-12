// components/LoadingScreen.tsx
import { View, ActivityIndicator, Text } from "react-native";

type LoadingScreenProps = {
    message?: string;
};

export default function LoadingScreen({ message }: LoadingScreenProps) {
    return (
        <View className="flex-1 items-center pt-12 justify-center space-y-3">
            <ActivityIndicator size="large" color="#7C3AED" className="mt-12 pt-12"/>
            {message && (
                <Text className="text-gray-600 dark:text-gray-400 text-base font-medium mt-2">
                    {message}
                </Text>
            )}
        </View>
    );
}
