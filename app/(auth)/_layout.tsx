import { Redirect, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, AppState, View } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/hooks/stores/useAuthStore';

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

  return <Stack />;
}
