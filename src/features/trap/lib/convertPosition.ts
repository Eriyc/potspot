import {Point} from 'geojson';

import {TrapSnapshot} from '@/store/TrapStore';

export const convertPositionFromDb = (trap: any): TrapSnapshot => {
  return {...trap, pos: trap.pos.coordinates};
};

export const convertPositionToDb = (position: [number, number]) => {
  const pos: Point = {
    coordinates: position,
    type: 'Point',
  };

  return pos;
};
