import {flow, SnapshotOut} from 'mobx-state-tree';
import {types} from 'mobx-state-tree';

import * as trapApi from '@/features/trap/methods';

import {NewTrap, SupabaseResponse} from './types';

export const Trap = types.model('Trap', {
  id: types.identifierNumber,
  created_by: types.string,
  pos: types.array(types.number),
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
      const {body, error}: SupabaseResponse<TrapSnapshot> =
        yield trapApi.createTrap(trap);

      if (body) {
        self.traps.push(body);
        return {error: null};
      } else {
        return {error: error};
      }
    }),
    getAll: flow(function* () {
      const {body, error}: SupabaseResponse<TrapSnapshot[]> =
        yield trapApi.getAll();

      if (body) {
        self.traps.replace(body as any);
      } else {
        console.log(error);
      }
    }),
  }));

export type TrapSnapshot = SnapshotOut<typeof Trap>;
