import { List } from "immutable";

export interface MandalaLayer {
  color: string;
  distanceFromCenter: number;
  numberOfCircles: number;
  radius: number;
  phase: number;
}

export default interface Mandala {
  center: { x: number; y: number };
  layers: List<MandalaLayer>;
  backgroundColor?: string;
}
