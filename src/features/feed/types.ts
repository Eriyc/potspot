import {Point} from 'geojson';

export type Catch = {
  id: number;
  trap_id: number;
  created_by: string;
  created_at: Date;
  data: Record<string, string>;
  position: Point;
  bait_id: string;
};
