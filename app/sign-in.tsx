import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { useSession } from '@/lib/auth-context';
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { ArrowRightIcon } from '@/components/ui/icon';

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <View className="flex-1 items-center justify-center">
      <Box className="flex flex-column gap-4 w-3/4">
        <Text className="text-3xl font-medium text-center">Welcome Back</Text>
        <Button 
          size="lg"
          variant="solid"
          onPress={() => {
            signIn();
            router.replace('/');
          }}
        >
          <ButtonText className="font-medium">Sign In</ButtonText>
          <ButtonIcon as={ArrowRightIcon} className="ml-2"/>
        </Button>
      </Box>
    </View>
  );
}
