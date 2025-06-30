import { JSX, ReactElement } from 'react'

export type Action = {
  healthValue?: number,
  type: string
}

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
  id: number,
  isLive?: boolean,
  isParty?: boolean,
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
