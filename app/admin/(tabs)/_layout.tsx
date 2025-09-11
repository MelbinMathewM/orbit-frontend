import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import Header from '@/components/header';
import { useThemeContext } from '@/app/context/ThemeContext';

export default function AdminLayout() {
    const { theme } = useThemeContext();

    const titles: Record<string, string> = {
        index: 'Dashboard',
        booking: 'Booking',
    };

    return (
        <Tabs
            screenOptions={({ route }) => ({
                header: () => (
                    <Header
                        title={titles[route.name] || route.name}
                    />
                ),
                tabBarActiveTintColor: Colors[theme ?? 'light'].tint,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute',
                    },
                    default: {},
                }),
            })}
        >
            {/* Home */}
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="house.fill" color={color} />
                    ),
                }}
            />

            {/* Booking */}
            <Tabs.Screen
                name="booking"
                options={{
                    title: 'Booking',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="calendar" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
