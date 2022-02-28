import {TrapSnapshot} from '@/store/TrapStore';

export const convertPositionFromDb = (trap: any): TrapSnapshot => {
  return {...trap, pos: trap.pos.coordinates};
};
