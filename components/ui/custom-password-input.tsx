import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { useThemeContext } from "@/app/context/ThemeContext";

interface CustomPasswordInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    style?: object;
}

const CustomPasswordInput: React.FC<CustomPasswordInputProps> = ({
    label,
    value,
    onChangeText,
    style = {},
}) => {
    const { theme } = useThemeContext();
    const [secureText, setSecureText] = useState(true);

    return (
        <TextInput
            mode="outlined"
            label={label}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureText}
            right={
                <TextInput.Icon
                    icon={secureText ? "eye-off" : "eye"}
                    onPress={() => setSecureText(!secureText)}
                />
            }
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

export default CustomPasswordInput;
