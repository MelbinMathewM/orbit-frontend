import { ModalType } from "@/types/modal";
import React from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import { useColorScheme } from "react-native";

interface Item {
    label: string;
    value: string;
}

interface SelectModalProps {
    visible: boolean;
    type: ModalType;
    items: Item[];
    selectedValues: string | string[];
    onClose: () => void;
    onSelect: (value: string) => void;
}

export default function SelectModal({
    visible,
    type,
    items,
    selectedValues,
    onClose,
    onSelect,
}: SelectModalProps) {
    const colorScheme = useColorScheme();
    const isMultiSelect = type === "locations";

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View
                    style={[
                        styles.container,
                        {
                            backgroundColor: colorScheme === "dark" ? "#1f2937" : "white",
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.title,
                            { color: colorScheme === "dark" ? "#fff" : "#111827" },
                        ]}
                    >
                        Select {type ? type.charAt(0).toUpperCase() + type.slice(1) : ""}
                    </Text>

                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.value}
                        renderItem={({ item }) => {
                            const isSelected = selectedValues.includes(item.value);

                            return (
                                <TouchableOpacity
                                    style={[
                                        styles.option,
                                        isSelected && {
                                            backgroundColor:
                                                colorScheme === "dark" ? "#374151" : "#e5e7eb",
                                        },
                                    ]}
                                    onPress={() => onSelect(item.value)}
                                >
                                    <Text
                                        style={{
                                            color: colorScheme === "dark" ? "#fff" : "#111827",
                                            fontWeight: isSelected ? "600" : "400",
                                        }}
                                    >
                                        {item.label}
                                    </Text>
                                    {isSelected && (
                                        <Text style={{ color: "#2563eb", fontWeight: "bold" }}>
                                            {isMultiSelect ? "✓" : "●"}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            );
                        }}
                    />

                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    container: {
        maxHeight: "70%",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#d1d5db",
        borderRadius: 8,
        marginBottom: 6,
    },
    closeButton: {
        marginTop: 12,
        paddingVertical: 14,
        backgroundColor: "#2563eb",
        borderRadius: 8,
        alignItems: "center",
    },
    closeText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
