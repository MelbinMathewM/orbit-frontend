import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface CustomButtonProps {
    label: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
}

export default function CustomButton({
    label,
    onPress,
    loading = false,
    disabled = false,
}: CustomButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            className={`mt-2 py-4 rounded-md items-center shadow-md 
                ${isDisabled ? "bg-gray-400" : "bg-orange-500"}
            `}
        >
            {loading ? (
                <ActivityIndicator size="small" color={"white"} />
            ) : (
                <Text className="text-white text-base font-semibold">{label}</Text>
            )}
        </TouchableOpacity>
    );
}
