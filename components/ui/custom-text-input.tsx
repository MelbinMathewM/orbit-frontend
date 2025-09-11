import React from "react";
import { TextInput } from "react-native-paper";
import { useThemeContext } from "@/app/context/ThemeContext";

interface CustomTextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
    secureTextEntry?: boolean;
    multiline?: boolean;
    numberOfLines?: number;
    style?: object;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    label,
    value,
    onChangeText,
    keyboardType = "default",
    secureTextEntry = false,
    multiline = false,
    numberOfLines,
    style = {},
}) => {
    const { theme } = useThemeContext();

    return (
        <TextInput
            mode="outlined"
            label={label}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            numberOfLines={numberOfLines}
            style={[
                {
                    backgroundColor: theme === "dark" ? "#030712" : "#fcfcfcff",
                    marginBottom: 3,
                },
                style,
            ]}
            outlineColor={theme === "dark" ? "#374151" : "#D1D5DB"}
            activeOutlineColor="#EA580C"
            textColor={theme === "dark" ? "white" : "black"}
            theme={{
                roundness: 8,
                colors: {
                    onSurfaceVariant: theme === "dark" ? "#9CA3AF" : "#6B7280",
                    primary: "#EA580C",
                },
            }}
        />
    );
};

export default CustomTextInput;
