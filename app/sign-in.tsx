import React, { useEffect, useState } from "react";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { LinkText } from "@/components/ui/link";
// import Link from "@unitools/link";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import {
  ArrowLeftIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Icon,
} from "@/components/ui/icon";
import { Button, ButtonText, ButtonIcon, ButtonSpinner } from "@/components/ui/button";
import { Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react-native";
import { AntDesign } from '@expo/vector-icons';
import { Pressable } from "@/components/ui/pressable";
import { Link, Redirect, useRouter } from "expo-router";
import { AuthContainer } from "@/components/AuthContainer";
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { humanizeAuthError } from '@/lib/utils/humanizeAuthError';
// import { AuthLayout } from "../layout";

const USERS = [
  {
    email: "gabrial@gmail.com",
    password: "Gabrial@123",
  },
  {
    email: "tom@gmail.com",
    password: "Tom@123",
  },
  {
    email: "thomas@gmail.com",
    password: "Thomas@1234",
  },
];

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
  rememberme: z.boolean().optional(),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const  LoginWithLeftBackground = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const toast = useToast();

  const [validated, setValidated] = useState({
    emailValid: true,
    passwordValid: true,
  });

  const { signUpOrIn, isLoading, session, error } = useAuthStore();

  useEffect(() => {
    if (error && error !== 'error') {
      console.log('~error', error);
      toast.show({
        placement: "top",
        render: ({ id }) => {
          return (
            <Toast nativeID={id} action="error" variant="solid">
              <ToastTitle>Login failed: {humanizeAuthError(error)}</ToastTitle>
            </Toast>
          );
        },
      });
    }
  }, [error]);

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await signUpOrIn(data.email, data.password);
      // Handle successful sign in
    } catch (error) {
      // Show error in toast
      toast.show({
        placement: "top",
        render: ({ id }) => {
          return (
            <Toast nativeID={id} action="error" variant="solid">
              <ToastTitle>Login failed: {error instanceof Error ? error.message : 'An error occurred'}</ToastTitle>
            </Toast>
          );
        },
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  if(session){
    return <Redirect href="/" />
  }
  
  return (
    <VStack className="max-w-[440px] w-full" space="md">
      <VStack className="md:items-center" space="md">
        {/* <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Icon
            as={ArrowLeftIcon}
            className="md:hidden text-background-800"
            size="xl"
          />
        </Pressable> */}
        <VStack>
          <Heading className="md:text-center" size="3xl">
            Log in
          </Heading>
          <Text></Text>
        </VStack>
      </VStack>
      <VStack className="w-full">
        <VStack space="xl" className="w-full">
          <FormControl
            isInvalid={!!errors?.email || !validated.emailValid}
            className="w-full"
          >
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="email"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await loginSchema.parseAsync({ email: value });
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    placeholder="Enter email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} />
              <FormControlErrorText>
                {errors?.email?.message ||
                  (!validated.emailValid && "Email ID not found")}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          {/* Label Message */}
          <FormControl
            isInvalid={!!errors.password || !validated.passwordValid}
            className="w-full"
          >
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="password"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await loginSchema.parseAsync({ password: value });
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                  />
                  <InputSlot onPress={handleState} className="pr-3">
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} />
              <FormControlErrorText>
                {errors?.password?.message ||
                  (!validated.passwordValid && "Password was incorrect")}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <HStack className="w-full justify-between ">
            <Controller
              name="rememberme"
              defaultValue={false}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  size="sm"
                  value="Remember me"
                  isChecked={value}
                  onChange={onChange}
                  aria-label="Remember me"
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>Remember me</CheckboxLabel>
                </Checkbox>
              )}
            />
            <Link href="/auth/forgot-password">
              <LinkText className="font-medium text-sm text-primary-700 group-hover/link:text-primary-600">
                Forgot Password?
              </LinkText>
            </Link>
          </HStack>
        </VStack>
        <VStack className="w-full my-7 " space="lg">
          <Button 
            className="w-full" 
            onPress={handleSubmit(onSubmit)}
            isDisabled={isLoading}
          >
            <ButtonText className="font-medium">
              {isLoading ? 'loading...' : 'Continue'}
            </ButtonText>
            {isLoading ? (
              <ButtonSpinner />
            ) : null}
          </Button>
          <Button
            variant="outline"
            action="secondary"
            className="w-full flex flex-row items-center justify-center"
            onPress={() => {}}
          >
            <ButtonText className="font-medium">
              Continue with Google
            </ButtonText>
            <ButtonIcon as={AntDesign} name="google" className="ml-2 flex items-center justify-center w-auto h-auto" />
          </Button>
          <Button
            variant="outline"
            action="secondary"
            className="w-full flex flex-row items-center justify-center"
            onPress={() => {}}
          >
            <ButtonText className="font-medium">
              Continue with Apple
            </ButtonText>
            <ButtonIcon as={AntDesign} name="apple1" className="ml-2 flex items-center justify-center w-auto h-auto" />
          </Button>
        </VStack>
        <HStack className="self-center" space="sm">
          <Text size="md">Don't have an account?</Text>
          <Link href="/sign-up">
            <LinkText
              className="font-medium text-primary-700 group-hover/link:text-primary-600  group-hover/pressed:text-primary-700"
              size="md"
            >
              Sign up
            </LinkText>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  );
};

const SignIn = () => {
  return (
    <AuthContainer>
      <LoginWithLeftBackground />
    </AuthContainer>
  );
};

export default SignIn;

// export const SignIn = () => {
//   return (
//     // <AuthLayout> 
//       <LoginWithLeftBackground />
//     // </AuthLayout>
//   );
// };

// Thanks Gluestack
// https://github.com/gluestack/gluestack-ui-starter-kits/blob/main/expo-app/screens/auth/signin/index.tsx