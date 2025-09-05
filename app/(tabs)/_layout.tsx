import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Header from '@/components/header';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const titles: Record<string, string> = {
    index: 'Home',
    about: 'About',
    services: 'Services',
    booking: 'Booking',
    contact: 'Contact',
    faqs: 'FAQs',
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        header: () => (
          <Header
            title={titles[route.name] || route.name}
          />
        ),
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
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
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {/* About */}
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="info.circle.fill" color={color} />
          ),
        }}
      />

      {/* Services */}
      <Tabs.Screen
        name="services"
        options={{
          title: 'Services',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="wrench.and.screwdriver.fill"
              color={color}
            />
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

      {/* Contact */}
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="phone.fill" color={color} />
          ),
        }}
      />

      {/* FAQs */}
      <Tabs.Screen
        name="faqs"
        options={{
          title: 'FAQs',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="questionmark.circle.fill"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
