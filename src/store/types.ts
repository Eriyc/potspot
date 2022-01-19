import {PostgrestError} from '@supabase/supabase-js';
import {Point} from 'geojson';
import {Instance} from 'mobx-state-tree';

import {Trap} from './TrapStore';

export interface NewTrap {
  displayname: string;
  pos: Point;
}

export interface ITrap extends Instance<typeof Trap> {}

export type SupabaseResponse<T> = {
  body: null | T;
  error: null | PostgrestError;
};
