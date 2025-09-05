import React from "react";
import { TextInput } from "react-native-paper";

interface CustomTextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    colorScheme: "light" | "dark";
    keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
    secureTextEntry?: boolean;
    style?: object;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    label,
    value,
    onChangeText,
    colorScheme,
    keyboardType = "default",
    secureTextEntry = false,
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
            style={[
                {
                    backgroundColor: colorScheme === "dark" ? "#1e2022ff" : "#fcfcfcff",
                    marginBottom: 12,
                },
                style,
            ]}
            outlineColor={colorScheme === "dark" ? "#585a5cff" : "#D1D5DB"}
            activeOutlineColor={colorScheme === "dark" ? "#60A5FA" : "#2563EB"}
            textColor={colorScheme === "dark" ? "white" : "black"}
            theme={{ roundness: 8 }}
        />
    );
};

export default CustomTextInput;
