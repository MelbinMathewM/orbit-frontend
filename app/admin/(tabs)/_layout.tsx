import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useThemeContext } from '@/app/context/ThemeContext';
import AdminHeader from '@/components/admin-header';
import { Ionicons } from '@expo/vector-icons';

export default function AdminLayout() {
    const { theme } = useThemeContext();

    const titles: Record<string, string> = {
        index: 'Dashboard',
        booking: 'Booking',
        profile: 'Profile',
    };

    return (
        <Tabs
            screenOptions={({ route }) => ({
                header: () => (
                    <AdminHeader
                        title={titles[route.name] || route.name}
                    />
                ),
                tabBarActiveTintColor: Colors[theme ?? 'light'].tint,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: [
                    {
                        backgroundColor: theme === "dark" ? "#111827" : "#ffffff",
                        borderTopWidth: 0.5,
                        borderTopColor: theme === "dark" ? "#374151" : "#E5E7EB",
                    },
                    Platform.select({
                        ios: { position: "absolute" },
                        default: {},
                    }),
                ],
            })}
        >
            {/* Home */}
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ focused, size }) => (
                        <Ionicons
                            name="home"
                            size={size}
                            color={focused ? "#7C3AED" : "#9CA3AF"}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={{ color: focused ? "#7C3AED" : "#9CA3AF", fontSize: 12 }}
                        >
                            Dashboard
                        </Text>
                    ),
                }}
            />

            {/* Booking */}
            <Tabs.Screen
                name="booking"
                options={{
                    title: 'Booking',
                    tabBarIcon: ({ focused, size }) => (
                        <Ionicons
                            name="calendar"
                            size={size}
                            color={focused ? "#7C3AED" : "#9CA3AF"}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={{ color: focused ? "#7C3AED" : "#9CA3AF", fontSize: 12 }}
                        >
                            Booking
                        </Text>
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    href: null,
                }}
            />
        </Tabs>
    );
}
