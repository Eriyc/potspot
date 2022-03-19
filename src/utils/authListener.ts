import {AuthSession, AuthUser} from '@supabase/supabase-js';
import {useEffect, useState} from 'react';

import {supabase} from './supabase';

export const useAuthState = (refetch: () => Promise<any>) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let timer: NodeJS.Timeout;
    timer = setTimeout(async () => {
      await refetch();
      setShowSplash(false);
    }, 1000);

    setSession(supabase.auth.session()); // will return the user object for scenario 1 // null for scenario 2
    setUser(supabase.auth.user()); // will return the user object for scenario 1 // null for scenario 2

    // for scenario 2, this will fire a SIGNED_IN event shortly after page load once the session has been loaded from the server.
    const {data: authListener} = supabase.auth.onAuthStateChange(
      async (event, s) => {
        console.log(event);

        setSession(s);
        setUser(s?.user ?? null);

        if (s) {
          clearTimeout(timer);
          console.log('initialize 2');

          await refetch();
          setShowSplash(false);
        }
      },
    );
    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {user, session, showSplash};
};
