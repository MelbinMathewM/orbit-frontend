import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, ColorSchemeName } from "react-native";

interface CustomButtonProps {
    label: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    colorScheme: ColorSchemeName;
}

export default function CustomButton({
    label,
    onPress,
    loading = false,
    disabled = false,
    colorScheme,
}: CustomButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            className={`mt-2 py-4 rounded-md items-center shadow-md 
                ${isDisabled ? "bg-gray-400" : "bg-blue-600"}
            `}
        >
            {loading ? (
                <ActivityIndicator size="small" color={colorScheme === "dark" ? "#fff" : "#fff"} />
            ) : (
                <Text className="text-white text-base font-semibold">{label}</Text>
            )}
        </TouchableOpacity>
    );
}
