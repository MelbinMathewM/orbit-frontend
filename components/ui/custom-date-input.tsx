import React from "react";
import { DatePickerInput } from "react-native-paper-dates";
import { ColorSchemeName, StyleProp, ViewStyle } from "react-native";

interface CustomDateInputProps {
    label: string;
    value: Date | undefined | null;
    onChange: (date: Date | undefined) => void;
    colorScheme: ColorSchemeName;
    inputMode?: "start" | "end";
    locale?: string;
    style?: StyleProp<ViewStyle>;
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({
    label,
    value,
    onChange,
    colorScheme,
    inputMode = "start",
    locale = "en",
}) => {
    const scheme = colorScheme ?? "light";

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
                    backgroundColor: scheme === "dark" ? "#030712" : "#FFFFFF",
                    borderWidth: 1,
                    borderColor: scheme === "dark" ? "#374151" : "#D1D5DB",
                    borderRadius: 8,
                }
            ]}
            outlineColor={scheme === "dark" ? "#585A5C" : "#D1D5DB"}
            activeOutlineColor={scheme === "dark" ? "#60A5FA" : "#2563EB"}
            textColor={scheme === "dark" ? "white" : "black"}
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

export default CustomDateInput;
