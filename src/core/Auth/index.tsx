/// Auth.tsx
import {supabase} from 'api/client';
import create from 'zustand';
import {getToken, setToken, removeToken, TokenType} from './utils';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (data: TokenType) => void;
  signOut: () => void;
  hydrate: () => void;
}

export const useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  signIn: token => {
    setToken(token);
    set({status: 'signIn', token});
  },
  signOut: () => {
    removeToken();
    set({status: 'signOut', token: null});
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        get().signIn(userToken);
      } else {
        const session = supabase.auth.session();
        if (session) {
          get().signIn({
            access: session.access_token,
            refresh: session.refresh_token!,
          });
        } else {
          get().signOut();
        }
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const signOut = () => useAuth.getState().signOut();
export const hydrateAuth = () => useAuth.getState().hydrate();
