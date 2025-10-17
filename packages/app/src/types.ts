import { JSX, ReactElement } from 'react'

export type ComponentName = symbol
export type ComponentData = Map<string, unknown> // TODO: replace string with Entity
// unknown because a component can be anything

export type Component = {
  name: ComponentName,
  data: ComponentData
}

export type GameWorld = {
  newEntityId: string, // TODO: replace with Entity assuming type Entity = string
  entities: Set<string>, // TODO: replace with Entity
  components: Map<Component["name"], Component["data"]> // TODO: replace with Entity
}

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
  weapon?: Weapon,
  agility?: number | undefined
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
