import { Redirect, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, AppState, View } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { Text } from 'react-native';
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function TabLayout() {
  const { session, setSession, isLoading } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('~init-session', session)
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('~onAuthStateChange', session)
      setSession(session)
    })
  }, [])

  if (isLoading ) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#7BA9B9" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return <Tabs>
  <TabSlot />
  <TabList className=' bg-yellow-500 ' style={{ justifyContent: 'space-around', height: 80 }}>
    <TabTrigger name="home" href="/" className='bg-green-500 items-center p-5'>
      <Text>Home</Text>
    </TabTrigger>
    <TabTrigger className='bg-blue-500 items-center p-5' name="article" href="/article">
        <Text>Article</Text>
      </TabTrigger>
    </TabList>
  </Tabs>
}
