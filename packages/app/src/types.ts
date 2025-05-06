import { JSX, ReactElement } from 'react'

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
  health?: number,
  isLive?: boolean,
  isSelectable?: boolean,
  name: string,
  weapon?: Weapon
}

export type PropsConditionalText = {
  isShow: boolean,
  element: ReactElement
}

export type PropsPlayer = {
  player: Entity
}

export type PropsScreenInitialisation = {
  setPlayer: Function
}

export type Weapon = {
  attack: number,
  name: string,
}
