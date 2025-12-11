import type { Fight } from "./fight"

export interface Event {
  id: number
  name: string
  date: string
  location?: string
  fights: Fight[]
}