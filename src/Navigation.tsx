import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {AuthNavigation} from './features/account';
import {AppNavigation} from './features/app';
import {useMst} from '@/store';
import {supabase} from './utils/supabase';
import {AuthSession, AuthUser} from '@supabase/supabase-js';

const useAuthState = () => {
  const {initialize} = useMst();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session()); // will return the user object for scenario 1 // null for scenario 2
    setUser(supabase.auth.user()); // will return the user object for scenario 1 // null for scenario 2

    // for scenario 2, this will fire a SIGNED_IN event shortly after page load once the session has been loaded from the server.
    const {data: authListener} = supabase.auth.onAuthStateChange((event, s) => {
      console.log(`Supbase auth event: ${event}`);
      setSession(s);
      setUser(s?.user ?? null);

      if (s) {
        initialize();
      }
    });
    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {user, session};
};

const MainNavigation = observer(() => {
  const {isLoggedIn} = useMst();
  const {session} = useAuthState();

  /* if (session === 'pending') {
    return (
      <View style={tw`flex flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  } */

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
});

export {MainNavigation};
