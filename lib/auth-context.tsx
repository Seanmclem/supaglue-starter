import { useContext, createContext, type PropsWithChildren } from 'react';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { Session } from '@supabase/supabase-js';

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  session: Session | null;
  isLoading: boolean;
}>({
  signIn: async () => {},
  signOut: async () => {},
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const { signInWithEmail, signOut, session, isLoading } = useAuthStore();

  return (
    <AuthContext.Provider
      value={{
        signIn: signInWithEmail,
        signOut,
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
