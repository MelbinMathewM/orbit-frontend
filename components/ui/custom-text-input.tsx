import React from "react";
import { TextInput } from "react-native-paper";
import { ColorSchemeName } from "react-native";

interface CustomTextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    colorScheme: ColorSchemeName;
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
    colorScheme,
    keyboardType = "default",
    secureTextEntry = false,
    multiline = false,
    numberOfLines,
    style = {},
}) => {
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
                    backgroundColor: colorScheme === "dark" ? "#030712" : "#fcfcfcff",
                    marginBottom: 3,
                },
                style,
            ]}
            outlineColor={colorScheme === "dark" ? "#374151" : "#D1D5DB"}
            activeOutlineColor={colorScheme === "dark" ? "#60A5FA" : "#2563EB"}
            textColor={colorScheme === "dark" ? "white" : "black"}
            theme={{
                roundness: 8,
                colors: {
                    onSurfaceVariant: colorScheme === "dark" ? "#9CA3AF" : "#6B7280",
                    primary: colorScheme === "dark" ? "#60A5FA" : "#2563EB",
                },
            }}
        />
    );
};

export default CustomTextInput;
