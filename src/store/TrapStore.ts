import {flow, Instance, SnapshotOut} from 'mobx-state-tree';
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
  bait: types.integer,
});

const TrapByIdReference = types.maybeNull(
  types.reference(Trap, {
    get(identifier: string, parent: any) {
      return parent.getOrLoadTrap(identifier);
    },
    set(value) {
      return value.id;
    },
  }),
);

export const TrapStore = types
  .model('TrapStore', {
    traps: types.array(Trap),
    selected: TrapByIdReference,
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
    loadTrap: flow(function* (id: TrapSnapshot['id']) {
      const {body}: SupabaseResponse<TrapSnapshot> = yield trapApi.getOne(id);

      if (body) {
        self.traps.push(body);
      }
    }),
    select: (item: Instance<typeof Trap> | null) => {
      self.selected = item;
    },
  }))
  .views(self => ({
    getOrLoadTrap: (id: TrapSnapshot['id']) => {
      const user = self.traps.find(t => t.id === id) || null;
      if (!user) {
        setImmediate(() => self.loadTrap(id));
      }
      return user;
    },
  }));

export type TrapSnapshot = SnapshotOut<typeof Trap>;
