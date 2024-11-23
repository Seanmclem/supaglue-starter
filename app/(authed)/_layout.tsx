import { Redirect, Stack, Tabs } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSession } from '@/lib/auth-context';
import { Text } from '@/components/ui/text';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#7BA9B9" />
      </View>
    );
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  
  ///
  ///

  // NOTE: 
  // both layouts are always rendered
  // 
  //app/(authed)/_layout.tsx is the only place where we can access the session.app/sign-in route is /sign-in
  // app/(authed)/_layout is displayed at just the root `/` since it's a PARENTHESIS+layout

  // /sign-in is only ever defaulted to because it's in the layout, that's always displayed
  // redirects to it, <Redirect href="/sign-in" />;

  ///
  ///

  return <Stack />;

  // return (
  //   <Tabs
  //     screenOptions={{
  //       tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
  //       headerShown: false,
  //       tabBarButton: HapticTab,
  //       tabBarBackground: TabBarBackground,
  //       tabBarStyle: Platform.select({
  //         ios: {
  //           // Use a transparent background on iOS to show the blur effect
  //           position: 'absolute',
  //         },
  //         default: {},
  //       }),
  //     }}>
  //     <Tabs.Screen
  //       name="index"
  //       options={{
  //         title: 'Home',
  //         tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
  //       }}
  //     />
  //     <Tabs.Screen
  //       name="explore"
  //       options={{
  //         title: 'Explore',
  //         tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
  //       }}
  //     />
  //   </Tabs>
  //   // <Stack>
  //   //   <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //   //   <Stack.Screen name="+not-found" />
  //   // </Stack>
  // );
}
