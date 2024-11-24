import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session, AuthError, AuthTokenResponse } from '@supabase/supabase-js';

interface AuthState {
  isLoading: boolean;
  session: Session | null;
  setSession: (session: Session | null) => void;
  error: string | null;
  
  // Auth actions
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpOrIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  
  // Loading state actions, provides setters to other components
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  session: null,
  setSession: (session: Session | null) => set({ session }),
  error: null,

  signUpOrIn: async (email: string, password: string) => {
    try {
      // New sign up or sign in, blank state
      set({ isLoading: true, error: null });
      
      // Try to sign up
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      // If sign up fails because user exists, try to sign in
      if (signUpError?.message.includes('already registered')) {
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        // If sign in succeeded, set session
        set({ session: signInData.session }); 
        return;
      }

      // If sign up fails because for any other reason, throw error
      if (!signUpError?.message.includes('already registered')) throw signUpError;

      // If sign up succeeded, set session
      if (signUpData.session) {
        set({ session: signUpData.session });
      } else {
        set({ session: null });
      }
      
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      set({ isLoading: false });
    }
  },

  signInWithEmail: async (email: string, password: string) => {
    try {
      // New sign in, blank state
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      set({ session: data.session });
      
      await AsyncStorage.setItem('session', JSON.stringify(data.session));
      
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({ session: null });
      
      await AsyncStorage.removeItem('session');
      
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      set({ isLoading: false });
    }
  },

  // provider setters to other components
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),
}));
