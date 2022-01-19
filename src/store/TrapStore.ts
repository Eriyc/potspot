import {PostgrestError} from '@supabase/supabase-js';
import {Point} from 'geojson';
import {flow, SnapshotOut} from 'mobx-state-tree';
import {types} from 'mobx-state-tree';

import {supabase} from '@/utils/supabase';

interface NewTrap {
  displayname: string;
  pos: Point;
}

type SupabaseResponse<T> = {
  body: null | T;
  error: null | PostgrestError;
};

export const Trap = types.model('Trap', {
  id: types.identifierNumber,
  createdBy: types.string,
  pos: types.string,
  updated_at: types.string,
  displayname: types.optional(types.string, 'Tina utan namn'),
  in_use: types.boolean,
});

export const TrapStore = types
  .model('TrapStore', {
    traps: types.array(Trap),
    selected: types.maybeNull(types.reference(Trap)),
  })
  .actions(self => ({
    new: flow(function* (trap: NewTrap) {
      const {body, error}: SupabaseResponse<TrapSnapshot> = yield supabase.rpc(
        'create_trap_rpc',
        {
          details: {
            displayname: trap.displayname,
            pos: JSON.stringify(trap.pos),
          },
        },
      );

      if (body) {
        self.traps.push(body);
      }
    }),
  }));

type TrapSnapshot = SnapshotOut<typeof Trap>;
