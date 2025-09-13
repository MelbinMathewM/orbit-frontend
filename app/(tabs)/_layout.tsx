import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import Header from "@/components/header";
import { useThemeContext } from "../context/ThemeContext";

export default function TabLayout() {
  const { theme } = useThemeContext();

  const titles: Record<string, string> = {
    index: "Home",
    about: "About",
    services: "Services",
    booking: "Booking",
    contact: "Contact",
    faqs: "FAQs",
    login: " ",
    register: "Register",
    profile: "Profile",
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        header: () => <Header title={titles[route.name] || route.name} />,
        tabBarActiveTintColor: Colors[theme ?? "light"].tint,
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
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={focused ? "#F97316" : "#9CA3AF"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? "#F97316" : "#9CA3AF", fontSize: 12 }}
            >
              Home
            </Text>
          ),
        }}
      />

      {/* About */}
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="information-circle"
              size={size}
              color={focused ? "#F97316" : "#9CA3AF"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? "#F97316" : "#9CA3AF", fontSize: 12 }}
            >
              About
            </Text>
          ),
        }}
      />

      {/* Services */}
      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="construct"
              size={size}
              color={focused ? "#F97316" : "#9CA3AF"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? "#F97316" : "#9CA3AF", fontSize: 12 }}
            >
              Services
            </Text>
          ),
        }}
      />

      {/* Booking */}
      <Tabs.Screen
        name="booking"
        options={{
          title: "Booking",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="calendar"
              size={size}
              color={focused ? "#F97316" : "#9CA3AF"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? "#F97316" : "#9CA3AF", fontSize: 12 }}
            >
              Booking
            </Text>
          ),
        }}
      />

      {/* Contact */}
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="call"
              size={size}
              color={focused ? "#F97316" : "#9CA3AF"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? "#F97316" : "#9CA3AF", fontSize: 12 }}
            >
              Contact
            </Text>
          ),
        }}
      />

      {/* FAQs */}
      <Tabs.Screen
        name="faqs"
        options={{
          title: "FAQs",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="help-circle"
              size={size}
              color={focused ? "#F97316" : "#9CA3AF"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? "#F97316" : "#9CA3AF", fontSize: 12 }}
            >
              FAQs
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

      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          href: null,
        }}
      />

      <Tabs.Screen
        name="register"
        options={{
          title: "Register",
          href: null,
        }}
      />

      <Tabs.Screen
        name="blogs"
        options={{
          title: "Blogs",
          href: null,
        }}
      />
    </Tabs>
  );
}
