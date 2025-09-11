import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

interface SelectFieldProps<T extends string> {
    label: string;
    value: string | string[];
    type: T;
    onPress: (type: T) => void;
}

export default function SelectField<T extends string>({ label, value, type, onPress }: SelectFieldProps<T>) {
    const isArray = Array.isArray(value);

    return (
        <TouchableOpacity
            onPress={() => onPress(type)}
            className="border border-gray-300 dark:border-gray-700 rounded-md mt-2 px-4 py-3 bg-gray-50 dark:bg-gray-950 shadow-sm"
        >
            {isArray ? (
                value.length > 0 ? (
                    <View>
                        <Text className="text-xs text-gray-500 dark:text-gray-400 mb-2">{label}</Text>
                        <View className="flex-row flex-wrap">
                            {value.map((loc, index) => (
                                <View
                                    key={index}
                                    className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md mr-2 mb-2"
                                >
                                    <Text className="text-sm text-gray-800 dark:text-gray-100">{loc}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ) : (
                    <Text className="text-gray-400">{`Select ${label}`}</Text>
                )
            ) : value ? (
                <View>
                    <Text className="text-xs text-gray-500 dark:text-gray-400 mb-2">{label}</Text>
                    <Text className="text-gray-900 dark:text-gray-100">{value}</Text>
                </View>
            ) : (
                <Text className="text-gray-400">{`Select ${label}`}</Text>
            )}
        </TouchableOpacity>
    );
}
