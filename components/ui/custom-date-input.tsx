import React from "react";
import { DatePickerInput } from "react-native-paper-dates";
import { StyleProp, ViewStyle } from "react-native";
import { useThemeContext } from "@/app/context/ThemeContext";

interface CustomDateInputProps {
    label: string;
    value: Date | undefined | null;
    onChange: (date: Date | undefined) => void;
    inputMode?: "start" | "end";
    locale?: string;
    style?: StyleProp<ViewStyle>;
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({
    label,
    value,
    onChange,
    inputMode = "start",
    locale = "en",
}) => {
    const { theme } = useThemeContext();

    return (
        <DatePickerInput
            locale={locale}
            label={label}
            value={value as Date}
            onChange={onChange}
            inputMode={inputMode}
            style={[
                {
                    marginBottom: 4,
                    marginTop: 4,
                    backgroundColor: theme === "dark" ? "#030712" : "#FFFFFF",
                    borderWidth: 1,
                    borderColor: theme === "dark" ? "#374151" : "#D1D5DB",
                    borderRadius: 8,
                }
            ]}
            outlineColor={theme === "dark" ? "#585A5C" : "#D1D5DB"}
            activeOutlineColor={theme === "dark" ? "#EA580C" : "#EA580C"}
            textColor={theme === "dark" ? "white" : "black"}
            theme={{
                roundness: 8,
                colors: {
                    onSurfaceVariant: theme === "dark" ? "#9CA3AF" : "#6B7280",
                    primary: theme === "dark" ? "#EA580C" : "#EA580C",
                },
            }}
        />
    );
};

export default CustomDateInput;
