# AI Development Rules for Vamo

This document outlines the core technologies and guidelines for developing components and features within the Vamo application.

## Tech Stack Overview

1.  **Framework:** React Native, managed by Expo.
2.  **Language:** TypeScript is mandatory for all source files (`.tsx`, `.ts`).
3.  **Routing:** Expo Router is used for file-based navigation and routing structure.
4.  **Styling:** Standard React Native `StyleSheet` is used, integrated with a custom theming system for light and dark mode support.
5.  **Theming:** The application uses `@react-navigation/native` for theme context and custom hooks (`useColorScheme`, `useThemeColor`) for color management.
6.  **Icons:** Icons are handled by the `IconSymbol` component, which utilizes native SF Symbols on iOS (`expo-symbols`) and falls back to `MaterialIcons` on Android and Web.
7.  **Animations:** `react-native-reanimated` is the designated library for all complex and gesture-driven animations.
8.  **Haptics:** `expo-haptics` is used to provide tactile feedback for user interactions.
9.  **Images:** `expo-image` is used for optimized image handling.

## Library Usage Guidelines

To ensure consistency and maintainability, adhere to the following rules when implementing features:

| Feature | Recommended Library/Component | Notes |
| :--- | :--- | :--- |
| **Navigation** | `expo-router` (`Stack`, `Tabs`, `Link`) | Use file-based routing and components provided by Expo Router. |
| **Theming/Colors** | `useThemeColor`, `ThemedText`, `ThemedView` | Always use the existing theme hooks and components to ensure light/dark mode compatibility. |
| **Icons** | `IconSymbol` | Use SF Symbol names. If a symbol is missing a Material Icon mapping (for Android/Web), update the `MAPPING` object in `components/ui/icon-symbol.tsx`. |
| **Animations** | `react-native-reanimated` | Use for all non-trivial animations and gestures. |
| **External Links** | `ExternalLink` | Use this component (from `components/external-link.tsx`) when navigating to URLs outside the application. |
| **Haptics** | `expo-haptics` | Implement soft haptic feedback for key interactions (e.g., tab presses, important button taps). |
| **Core UI** | Standard React Native components | Use `View`, `Text`, `StyleSheet` for basic layout and styling. |