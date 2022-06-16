import {nanoid} from 'nanoid';
import create from 'zustand';

export type GetAvalibleCatchesIds = 'lobster' | 'crab' | 'other';
interface BaseCatch {
  id: GetAvalibleCatchesIds;
  amount: number;
  individualData: boolean;

  total: number;
  current: number;
  data: (Lobster | Crab | Other)[];
}

export type Lobster = {
  hasData: boolean;
  carapax: number;
  gender?: 'male' | 'female';
};
interface LobsterCatch extends BaseCatch {
  id: 'lobster';
  data: Lobster[];
}
export type Crab = {
  hasData: boolean;
  size: number;
  gender?: 'male' | 'female';
};
interface CrabCatch extends BaseCatch {
  id: 'crab';
  data: Crab[];
}
export type Other = {
  hasData: boolean;
  gender?: 'male' | 'female';
};
interface OtherCatch extends BaseCatch {
  id: 'other';
  data: Other[];
}

type GetCatch = LobsterCatch | CrabCatch | OtherCatch;

type GetState = {
  current: GetCatch | null;
  data: Record<
    string,
    {
      type: GetAvalibleCatchesIds;
      amount: number;
      data: (Lobster | Crab | Other)[];
    }
  >;

  start: (id: GetAvalibleCatchesIds) => void;
  reset: () => void;
  next: () => void;
  previous: () => void;
  setAmount: (amount: number, individually: boolean) => void;
  complete: () => void;
  addCurrentData: (data: Lobster | Crab | Other) => void;
  editCurrentData: (index: number, editedData: Lobster | Crab | Other) => void;
  publish: () => void;
};

const base: BaseCatch = {
  amount: 1,
  id: 'crab',
  total: 1,
  current: 0,
  individualData: false,
  data: [],
};
const defaults: Record<GetAvalibleCatchesIds, GetCatch> = {
  crab: {
    ...base,
    id: 'crab',
    data: [],
  },
  lobster: {
    ...base,
    id: 'lobster',
    data: [],
  },
  other: {
    ...base,
    id: 'other',
  },
};

const defaultCatch: Record<GetAvalibleCatchesIds, Lobster | Crab | Other> = {
  crab: {
    hasData: false,
    size: 0,
    gender: undefined,
  },
  lobster: {
    hasData: false,
    carapax: 0,
    gender: undefined,
  },
  other: {
    hasData: false,
  },
};

export const useGetState = create<GetState>((set, get) => ({
  current: null,
  data: {},
  start: id => set({current: defaults[id]}),
  reset: () => set({current: null, data: {}}),
  next: () => {
    const s = get();
    if (!s.current) {
      return;
    }

    set({current: {...s.current, current: s.current.current + 1}});
  },
  previous: () => {
    const s = get();
    if (!s.current) {
      return;
    }

    set({current: {...s.current, current: s.current.current - 1}});
  },
  setAmount: (amount, individually) => {
    const s = get();
    if (!s.current) {
      return;
    }

    let data: Array<Lobster | Crab | Other>;
    if (!individually) {
      data = Array<Lobster | Crab | Other>(amount).fill(
        defaultCatch[s.current.id],
      );
    }

    set({
      current: {
        ...s.current,
        amount,
        individualData: individually,
        total: individually ? 1 + amount : 1,
        data: !individually ? data! : (s.current.data as any),
      },
    });
  },
  complete: () => {
    const current = get().current;
    if (!current) {
      return;
    }

    const data = get().data;
    const id = nanoid(5);

    data[id] = {
      data: current.data,
      amount: current.data.length,
      type: current.id,
    };

    set({data, current: null});
  },
  addCurrentData: newData => {
    const s = get().current;
    if (s) {
      const data = s.data;
      data.push(newData as any);

      set({current: {...s, data} as any});
    }
  },
  editCurrentData: (index, editedData) => {
    const s = get().current;
    if (!s) {
      return;
    }

    const data = s.data;
    data[index] = editedData;
  },
  publish: () => {
    get().reset();
  },
}));
