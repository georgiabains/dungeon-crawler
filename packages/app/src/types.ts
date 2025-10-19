import { JSX, ReactElement } from 'react'

export type Entity = string

export type ComponentName = string
export type ComponentData = Map<Entity, unknown> // unknown because a component can be anything

export type Component = {
  name: ComponentName,
  data: ComponentData
}

export type GameWorld = {
  newEntity: Entity,
  entities: Array<Entity>,
  components: Map<Component["name"], Component["data"]>
}

export type System = (world: GameWorld, entities?: Array<Entity>) => GameWorld;
export type SystemForEntities = {
  run: System,
  entities?: Array<Entity>
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

export type EntityOld = {
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
  player: EntityOld
}

export type PropsScreenInitialisation = {
  setGame: Function
  setPlayer?: Function
}

export type Weapon = {
  attack: number,
  name: string,
}
