import {AuthUser} from '@supabase/supabase-js';
import {types} from 'mobx-state-tree';

export const User = types.model<AuthUser>('User', {
  id: types.string,
  email: types.string,
});
