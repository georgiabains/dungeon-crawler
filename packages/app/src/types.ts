import { JSX } from 'react'

export type Encounter = {
  render: JSX.Element | undefined,
  name: string,
  type: string,
  description: string,
}

export type EncounterParam = {
  type: string
}

export type Entity = {
  isLive: boolean,
  name: string,
  weapon: Weapon
}

export type PropsScreenInitialisation = {
  setPlayer: Function
}

export type Weapon = {
  attack: number,
  name: string,
}
