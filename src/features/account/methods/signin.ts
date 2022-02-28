import {supabase} from '@/utils/supabase';

export type ApiError =
  | 'MISSING_CREDS'
  | 'WRONG_CREDS'
  | 'DEACTIVATED'
  | 'ACCOUNT_ERROR';

type ApiSuccess = {
  user: {
    email: string;
    id: string;
    active: boolean;
  };
  token: string;
};

export const signIn = async (
  email: string,
  password: string,
): Promise<ApiError | ApiSuccess> => {
  if (!email && !password) {
    return 'MISSING_CREDS';
  }

  const {user, error, session} = await supabase.auth.signIn({email, password});

  if (error || !user) {
    return 'WRONG_CREDS';
  }
  const {body} = await supabase.from('accounts').select('active').single();

  if (body) {
    if (!body.active) {
      return 'DEACTIVATED';
    }

    return {
      user: {
        id: user.id,
        email: user.email!,
        active: body.active,
      },
      token: session!.access_token,
    };
  }

  return 'ACCOUNT_ERROR';
};
