import React from 'react';
import { View, Text } from 'react-native';
import { useAuthStore } from '@/hooks/stores/useAuthStore';

export default function ArticleView() {
  const { session } = useAuthStore();

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-2xl font-bold mb-4">Articles</Text>
      <Text className="text-gray-600">
        Welcome {session?.user?.email}! This is your articles page.
      </Text>
    </View>
  );
} 