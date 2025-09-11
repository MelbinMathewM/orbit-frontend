import { useThemeContext } from "@/app/context/ThemeContext";
import React from "react";
import { TouchableOpacity, View, Text, ColorSchemeName } from "react-native";

interface CustomRadioGroupProps<T extends string> {
    label?: string;
    options: T[];
    value: T | null;
    onChange: (value: T) => void;
}

export default function CustomRadioGroup<T extends string>({
    label,
    options,
    value,
    onChange,
}: CustomRadioGroupProps<T>) {

    const { theme } = useThemeContext();

    return (
        <View className="mb-4 mt-4">
            {label && (
                <Text className={`mb-3 font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                    {label}
                </Text>
            )}
            {options.map((option) => {
                const isSelected = value === option;
                return (
                    <TouchableOpacity
                        key={option}
                        className="flex-row items-center mb-3"
                        onPress={() => onChange(option)}
                    >
                        <View
                            className={`w-5 h-5 rounded-full mr-2 border-2 
                                ${isSelected
                                    ? "border-blue-400 bg-blue-600"
                                    : theme === "dark"
                                        ? "border-gray-500 bg-gray-800"
                                        : "border-gray-400 bg-white"
                                }`}
                        />
                        <Text className={`${theme === "dark" ? "text-white" : "text-black"}`}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}