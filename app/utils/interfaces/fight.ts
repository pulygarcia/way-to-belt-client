import type { Fighter } from "./fighter"

export enum FightStatus {
  PROGRAMADA = 'PROGRAMADA',
  FINALIZADA = 'FINALIZADA',
  CANCELADA = 'CANCELADA',
  POSPUESTA = 'POSPUESTA',
}

export interface FightStats {
  id: number;
  fighter: Fighter; //whole fighter object related to the stats
  knockdowns: number;
  strikesLanded: number;
  strikesAttempted: number;
  takedownsLanded: number;
  takedownsAttempted: number;
  isWinner: boolean;
  roundFinished: number | null;
}

export interface Fight {
  id: number;
  fighterA: Fighter;
  fighterB: Fighter;
  status: FightStatus;
  event: Event;
  //optional fields for finalized fights
  winner?: Fighter | null;
  method?: string | null;
  rounds?: number | null;
  stats?: FightStats[];
}