import type { Fighter } from "./fighter"

export interface Fight {
  id: number
  fighterA: Fighter
  fighterB: Fighter
  date: string
  result?: string
  method?: string
  rounds?: number
}