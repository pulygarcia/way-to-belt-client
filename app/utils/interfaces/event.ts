import type { Fight } from "./fight"

export interface FightEvent {
  id: number
  name: string
  date: Date
  location?: string
  fights: Fight[]
}