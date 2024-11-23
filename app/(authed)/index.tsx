import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { useSession } from '@/lib/auth-context';
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { ArrowLeftIcon } from '@/components/ui/icon';

export default function SignOut() {
  const { signOut } = useSession();
  return (
    <View className="flex-1 items-center justify-center">
      <Box className="flex flex-column gap-4 w-3/4">
        <Text className="text-3xl font-medium text-center">Sign Out</Text>
        <Button
          size="lg" 
          variant="solid"
          onPress={() => {
            signOut();
          }}
        >
          <ButtonText className="font-medium">Sign Out</ButtonText>
          <ButtonIcon as={ArrowLeftIcon} className="ml-2"/>
        </Button>
      </Box>
    </View>
  );
} 