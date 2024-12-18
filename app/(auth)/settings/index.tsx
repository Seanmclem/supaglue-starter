import { Text, View } from 'react-native';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { ArrowLeftIcon } from '@/components/ui/icon';

export default function SignOut() {
  const { signOut, isLoading } = useAuthStore();
  return (
    <View className="flex-1 items-center justify-center bg-blue-500 w-auto">
      <Box className="flex  gap-4 bg-red-500">
        <Text className="text-3xl font-medium text-center">Sign Out</Text>
        <Button
          size="lg"
          variant="solid"
          onPress={() => {
            signOut();
            // layout observing session, will redirect to sign-in
          }}
        >
          <ButtonText className="font-medium">Sign Out</ButtonText>
          {isLoading ? (
            <ButtonSpinner />
          ) : <ButtonIcon as={ArrowLeftIcon} className="ml-2" />}
        </Button>
      </Box>
    </View>
  );
} 